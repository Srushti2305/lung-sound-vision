import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, Upload, Mic, Activity } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import AudioRecorder from "@/components/AudioRecorder";
import DiagnosisResults from "@/components/DiagnosisResults";
import { ImageAnalysisResult, AudioAnalysisResult } from "@/types/diagnosis";

const Index = () => {
  const [step, setStep] = useState<"welcome" | "image" | "audio" | "results">("welcome");
  const [imageAnalysis, setImageAnalysis] = useState<ImageAnalysisResult | null>(null);
  const [audioAnalysis, setAudioAnalysis] = useState<AudioAnalysisResult | null>(null);

  const handleImageAnalysisComplete = (result: ImageAnalysisResult) => {
    setImageAnalysis(result);
    
    if (result.needsAudioAnalysis) {
      setStep("audio");
    } else {
      setStep("results");
    }
  };

  const handleAudioAnalysisComplete = (result: AudioAnalysisResult) => {
    setAudioAnalysis(result);
    setStep("results");
  };

  const handleReset = () => {
    setStep("welcome");
    setImageAnalysis(null);
    setAudioAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-accent">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              RespiCheck AI
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced respiratory disease detection using AI-powered image and audio analysis
          </p>
        </div>

        {/* Main Content */}
        <Card className="p-8 shadow-lg border-2">
          {step === "welcome" && (
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <Activity className="w-16 h-16 mx-auto text-primary" />
                <h2 className="text-2xl font-semibold">How It Works</h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Our AI system analyzes lung images to detect respiratory conditions. 
                  If needed, we'll also analyze cough or breathing sounds for more accurate diagnosis.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 border-primary/20 hover:border-primary/40 transition-colors">
                  <Upload className="w-10 h-10 text-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Step 1: Upload Image</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload a lung X-ray or CT scan for AI analysis
                  </p>
                </Card>

                <Card className="p-6 border-accent/20 hover:border-accent/40 transition-colors">
                  <Mic className="w-10 h-10 text-accent mb-3" />
                  <h3 className="text-lg font-semibold mb-2">Step 2: Audio (If Needed)</h3>
                  <p className="text-sm text-muted-foreground">
                    Record cough or breathing sounds for enhanced accuracy
                  </p>
                </Card>
              </div>

              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <p className="text-sm text-foreground">
                  <strong className="text-warning">⚠️ Medical Disclaimer:</strong> This is a preliminary screening tool. 
                  Always consult healthcare professionals for proper diagnosis and treatment.
                </p>
              </div>

              <Button 
                size="lg" 
                className="w-full"
                onClick={() => setStep("image")}
              >
                Start Diagnosis
              </Button>
            </div>
          )}

          {step === "image" && (
            <ImageUpload onAnalysisComplete={handleImageAnalysisComplete} />
          )}

          {step === "audio" && (
            <AudioRecorder 
              imageAnalysis={imageAnalysis}
              onAnalysisComplete={handleAudioAnalysisComplete}
              onSkip={() => setStep("results")}
            />
          )}

          {step === "results" && (
            <DiagnosisResults
              imageAnalysis={imageAnalysis}
              audioAnalysis={audioAnalysis}
              onReset={handleReset}
            />
          )}
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Powered by advanced AI models for medical image and audio analysis</p>
        </div>
      </div>
    </div>
  );
};

export default Index;