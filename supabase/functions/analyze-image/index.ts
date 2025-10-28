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
    const { imageBase64 } = await req.json();
    
    if (!imageBase64) {
      throw new Error('No image data provided');
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Analyzing lung image...");

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
            content: `You are an expert medical AI assistant specializing in respiratory disease detection from lung imaging. 
            
            Analyze the provided lung image and identify potential respiratory conditions. Focus on:
            - Pneumonia (bacterial, viral, or fungal)
            - COVID-19 indicators
            - Tuberculosis
            - Chronic Obstructive Pulmonary Disease (COPD)
            - Lung cancer signs
            - Pleural effusion
            - Pneumothorax
            - Bronchitis
            
            Return your analysis in JSON format with this exact structure:
            {
              "primaryDiagnosis": "name of most likely condition",
              "confidence": 0.0-1.0,
              "needsAudioAnalysis": true/false,
              "possibleConditions": [
                {
                  "condition": "condition name",
                  "probability": 0.0-1.0,
                  "indicators": ["list", "of", "visual", "indicators"]
                }
              ],
              "reasoning": "detailed explanation of findings",
              "recommendations": "what to do next"
            }
            
            Set needsAudioAnalysis to true if:
            - Confidence is below 0.75
            - Multiple conditions have similar probabilities
            - Audio analysis (cough/breathing sounds) would help differentiate
            
            Be thorough but also honest about uncertainty. This is preliminary analysis, not a replacement for medical consultation.`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Please analyze this lung image for respiratory diseases."
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
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
      
      throw new Error("Failed to analyze image");
    }

    const data = await response.json();
    console.log("AI Response received");
    
    const aiResponse = data.choices?.[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error("No response from AI");
    }

    // Extract JSON from response
    let analysisResult;
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        analysisResult = JSON.parse(aiResponse);
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
    console.error("Error in analyze-image:", error);
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