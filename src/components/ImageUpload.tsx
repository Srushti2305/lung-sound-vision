import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ImageAnalysisResult } from "@/types/diagnosis";

interface ImageUploadProps {
  onAnalysisComplete: (result: ImageAnalysisResult) => void;
}

const ImageUpload = ({ onAnalysisComplete }: ImageUploadProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleImageSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [toast]);

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-image', {
        body: { imageBase64: selectedImage }
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      toast({
        title: "Analysis Complete",
        description: "Image has been analyzed successfully"
      });

      onAnalysisComplete(data as ImageAnalysisResult);
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze image",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <ImageIcon className="w-12 h-12 mx-auto text-primary" />
        <h2 className="text-2xl font-semibold">Upload Lung Image</h2>
        <p className="text-muted-foreground">
          Upload an X-ray or CT scan of the patient's lungs
        </p>
      </div>

      <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
        {selectedImage ? (
          <div className="space-y-4">
            <img 
              src={selectedImage} 
              alt="Selected lung scan" 
              className="max-h-96 mx-auto rounded-lg shadow-md"
            />
            <Button
              variant="outline"
              onClick={() => setSelectedImage(null)}
            >
              Choose Different Image
            </Button>
          </div>
        ) : (
          <label className="cursor-pointer block">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">Click to upload or drag and drop</p>
            <p className="text-sm text-muted-foreground">PNG, JPG, WEBP up to 10MB</p>
          </label>
        )}
      </div>

      {selectedImage && (
        <Button
          size="lg"
          className="w-full"
          onClick={handleAnalyze}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing Image...
            </>
          ) : (
            "Analyze Image"
          )}
        </Button>
      )}

      <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
        <p className="text-sm font-medium">Tips for best results:</p>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>Use clear, high-quality images</li>
          <li>Ensure proper lighting and contrast</li>
          <li>Frontal chest X-rays work best</li>
          <li>Avoid blurry or distorted images</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUpload;