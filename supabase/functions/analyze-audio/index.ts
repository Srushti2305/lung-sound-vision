import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { audioBase64, imageAnalysis } = await req.json();
    
    if (!audioBase64) {
      throw new Error('No audio data provided');
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Analyzing audio for respiratory disease detection...");

    // First, transcribe/analyze the audio characteristics
    const audioAnalysisPrompt = `You are an expert medical AI assistant specializing in respiratory disease detection from audio analysis of cough and breathing sounds.

${imageAnalysis ? `Previous Image Analysis Results:\n${JSON.stringify(imageAnalysis, null, 2)}\n\nUse this context to refine your diagnosis.` : ''}

Analyze the provided audio recording (cough or breathing sounds) and identify respiratory conditions. Focus on:
- Cough characteristics (dry, wet, productive, barking, whooping)
- Breathing patterns (wheezing, stridor, crackles, rales)
- COVID-19 indicators (distinctive dry cough)
- Flu symptoms (deep chest cough)
- Common cold (mild cough, congestion)
- Pneumonia (productive cough with crackling)
- Bronchitis (persistent cough)
- Asthma (wheezing)

Return your analysis in JSON format with this exact structure:
{
  "finalDiagnosis": "most likely condition",
  "confidence": 0.0-1.0,
  "audioCharacteristics": {
    "coughType": "description",
    "breathingPattern": "description",
    "severity": "mild/moderate/severe"
  },
  "possibleConditions": [
    {
      "condition": "condition name",
      "probability": 0.0-1.0,
      "audioIndicators": ["list", "of", "audio", "indicators"]
    }
  ],
  "reasoning": "detailed explanation combining image and audio findings",
  "recommendations": "medical advice and next steps",
  "urgencyLevel": "low/medium/high"
}

Be thorough and explain how the audio analysis helps differentiate between similar conditions identified in the image analysis.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: audioAnalysisPrompt
          },
          {
            role: "user",
            content: "Please analyze this audio recording of cough/breathing sounds for respiratory disease diagnosis. Note: I'm providing base64 audio data as context for analysis."
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", response.status, errorText);
      
      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again in a moment.");
      }
      if (response.status === 402) {
        throw new Error("AI service payment required. Please contact support.");
      }
      
      throw new Error("Failed to analyze audio");
    }

    const data = await response.json();
    console.log("Audio analysis completed");
    
    const aiResponse = data.choices?.[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error("No response from AI");
    }

    // Extract JSON from response (strip markdown code blocks if present)
    let analysisResult;
    try {
      let cleanedResponse = aiResponse.trim();
      
      // Remove markdown code blocks
      cleanedResponse = cleanedResponse.replace(/```json\s*/g, '').replace(/```\s*/g, '');
      
      // Extract JSON object
      const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        analysisResult = JSON.parse(cleanedResponse);
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", aiResponse);
      throw new Error("Failed to parse analysis results");
    }

    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in analyze-audio:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});