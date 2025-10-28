import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, Play, Loader2, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ImageAnalysisResult, AudioAnalysisResult } from "@/types/diagnosis";

interface AudioRecorderProps {
  imageAnalysis: ImageAnalysisResult | null;
  onAnalysisComplete: (result: AudioAnalysisResult) => void;
  onSkip: () => void;
}

const AudioRecorder = ({ imageAnalysis, onAnalysisComplete, onSkip }: AudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      toast({
        title: "Recording Started",
        description: "Please cough or breathe normally into the microphone"
      });
    } catch (error) {
      console.error('Recording error:', error);
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access to record audio",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast({
        title: "Recording Stopped",
        description: "Audio recorded successfully"
      });
    }
  };

  const handleAnalyze = async () => {
    if (!audioBlob) return;

    setIsAnalyzing(true);

    try {
      // Convert blob to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        };
      });
      reader.readAsDataURL(audioBlob);
      const audioBase64 = await base64Promise;

      const { data, error } = await supabase.functions.invoke('analyze-audio', {
        body: { 
          audioBase64,
          imageAnalysis 
        }
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      toast({
        title: "Analysis Complete",
        description: "Audio has been analyzed successfully"
      });

      onAnalysisComplete(data as AudioAnalysisResult);
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze audio",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Volume2 className="w-12 h-12 mx-auto text-accent" />
        <h2 className="text-2xl font-semibold">Record Audio Sample</h2>
        <p className="text-muted-foreground">
          Record a cough or breathing sound to help refine the diagnosis
        </p>
      </div>

      <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 text-center space-y-4">
        {!audioUrl ? (
          <>
            <div className="w-24 h-24 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
              <Mic className={`w-12 h-12 text-accent ${isRecording ? 'animate-pulse' : ''}`} />
            </div>
            
            <div>
              {isRecording ? (
                <Button
                  size="lg"
                  variant="destructive"
                  onClick={stopRecording}
                >
                  <Square className="w-4 h-4 mr-2" />
                  Stop Recording
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={startRecording}
                  className="bg-accent hover:bg-accent/90"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Start Recording
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            <audio src={audioUrl} controls className="w-full" />
            <div className="flex gap-2 justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  setAudioUrl(null);
                  setAudioBlob(null);
                }}
              >
                Record Again
              </Button>
            </div>
          </>
        )}
      </div>

      {audioBlob && (
        <Button
          size="lg"
          className="w-full"
          onClick={handleAnalyze}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing Audio...
            </>
          ) : (
            "Analyze Audio"
          )}
        </Button>
      )}

      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onClick={onSkip}
      >
        Skip Audio Analysis
      </Button>

      <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
        <p className="text-sm font-medium">Recording tips:</p>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Find a quiet location</li>
          <li>Hold the microphone close (10-15cm)</li>
          <li>Cough naturally 2-3 times or breathe normally for 10 seconds</li>
          <li>Record for at least 5 seconds</li>
        </ul>
      </div>
    </div>
  );
};

export default AudioRecorder;