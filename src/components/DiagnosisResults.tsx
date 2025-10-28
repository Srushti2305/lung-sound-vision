import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2, Info, RefreshCw } from "lucide-react";
import { ImageAnalysisResult, AudioAnalysisResult } from "@/types/diagnosis";

interface DiagnosisResultsProps {
  imageAnalysis: ImageAnalysisResult | null;
  audioAnalysis: AudioAnalysisResult | null;
  onReset: () => void;
}

const DiagnosisResults = ({ imageAnalysis, audioAnalysis, onReset }: DiagnosisResultsProps) => {
  const finalAnalysis = audioAnalysis || imageAnalysis;
  
  if (!finalAnalysis) return null;

  const primaryDiagnosis = audioAnalysis?.finalDiagnosis || imageAnalysis?.primaryDiagnosis;
  const confidence = audioAnalysis?.confidence || imageAnalysis?.confidence || 0;
  const possibleConditions = audioAnalysis?.possibleConditions || imageAnalysis?.possibleConditions || [];
  const reasoning = audioAnalysis?.reasoning || imageAnalysis?.reasoning;
  const recommendations = audioAnalysis?.recommendations || imageAnalysis?.recommendations;

  const getConfidenceColor = (conf: number) => {
    if (conf >= 0.8) return "text-success";
    if (conf >= 0.6) return "text-warning";
    return "text-destructive";
  };

  const getUrgencyBadge = () => {
    if (!audioAnalysis?.urgencyLevel) return null;
    
    const colors = {
      low: "bg-success/10 text-success border-success/20",
      medium: "bg-warning/10 text-warning border-warning/20",
      high: "bg-destructive/10 text-destructive border-destructive/20"
    };

    return (
      <Badge className={colors[audioAnalysis.urgencyLevel as keyof typeof colors] || colors.medium}>
        {audioAnalysis.urgencyLevel.toUpperCase()} URGENCY
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <CheckCircle2 className="w-10 h-10 text-success" />
          <h2 className="text-2xl font-semibold">Diagnosis Complete</h2>
        </div>
        <p className="text-muted-foreground">
          AI analysis {audioAnalysis ? "with audio confirmation" : "based on imaging"}
        </p>
      </div>

      {/* Primary Diagnosis Card */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Primary Diagnosis</p>
              <h3 className="text-2xl font-bold text-primary">{primaryDiagnosis}</h3>
            </div>
            {getUrgencyBadge()}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Confidence Level</span>
              <span className={`text-lg font-bold ${getConfidenceColor(confidence)}`}>
                {(confidence * 100).toFixed(1)}%
              </span>
            </div>
            <Progress value={confidence * 100} className="h-3" />
          </div>

          {audioAnalysis?.audioCharacteristics && (
            <div className="mt-4 p-4 bg-background/50 rounded-lg space-y-2">
              <p className="text-sm font-medium">Audio Analysis Details</p>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Cough Type</p>
                  <p className="font-medium">{audioAnalysis.audioCharacteristics.coughType}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Breathing</p>
                  <p className="font-medium">{audioAnalysis.audioCharacteristics.breathingPattern}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Severity</p>
                  <p className="font-medium capitalize">{audioAnalysis.audioCharacteristics.severity}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Possible Conditions */}
      <Card className="p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          Differential Diagnosis
        </h4>
        <div className="space-y-3">
          {possibleConditions.slice(0, 5).map((condition, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{condition.condition}</span>
                <Badge variant="outline">{(condition.probability * 100).toFixed(0)}%</Badge>
              </div>
              <Progress value={condition.probability * 100} className="h-2" />
              {(condition.indicators || condition.audioIndicators) && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {[...(condition.indicators || []), ...(condition.audioIndicators || [])].slice(0, 3).map((indicator, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {indicator}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Reasoning */}
      <Card className="p-6 bg-secondary/30">
        <h4 className="font-semibold mb-3">Analysis Summary</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {reasoning}
        </p>
      </Card>

      {/* Recommendations */}
      <Card className="p-6 border-2 border-warning/30 bg-warning/5">
        <h4 className="font-semibold mb-3 flex items-center gap-2 text-warning">
          <AlertCircle className="w-5 h-5" />
          Recommendations
        </h4>
        <p className="text-sm leading-relaxed">
          {recommendations}
        </p>
      </Card>

      {/* Medical Disclaimer */}
      <Card className="p-4 bg-destructive/5 border-destructive/20">
        <p className="text-xs text-center text-muted-foreground">
          <strong>IMPORTANT:</strong> This AI analysis is for preliminary screening only. 
          Please consult with qualified healthcare professionals for proper diagnosis, 
          treatment, and medical advice. Do not use this tool as a substitute for professional medical care.
        </p>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button 
          size="lg" 
          className="flex-1"
          onClick={onReset}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          New Diagnosis
        </Button>
        <Button 
          size="lg" 
          variant="outline"
          onClick={() => window.print()}
        >
          Print Results
        </Button>
      </div>
    </div>
  );
};

export default DiagnosisResults;