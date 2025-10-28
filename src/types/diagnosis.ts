export interface PossibleCondition {
  condition: string;
  probability: number;
  indicators?: string[];
  audioIndicators?: string[];
}

export interface ImageAnalysisResult {
  primaryDiagnosis: string;
  confidence: number;
  needsAudioAnalysis: boolean;
  possibleConditions: PossibleCondition[];
  reasoning: string;
  recommendations: string;
}

export interface AudioAnalysisResult {
  finalDiagnosis: string;
  confidence: number;
  audioCharacteristics: {
    coughType: string;
    breathingPattern: string;
    severity: string;
  };
  possibleConditions: PossibleCondition[];
  reasoning: string;
  recommendations: string;
  urgencyLevel: string;
}