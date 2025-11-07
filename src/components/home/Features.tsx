import { Card } from "@/components/ui/card";
import { Image, Mic, FileCheck } from "lucide-react";
import featureAnalysis from "@/assets/feature-analysis.jpg";
import featureAudio from "@/assets/feature-audio.jpg";
import featureResults from "@/assets/feature-results.jpg";

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            How It <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered system combines image and audio analysis for comprehensive respiratory health assessment
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <Card className="p-8 border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
            <div className="relative mb-6 overflow-hidden rounded-lg">
              <img 
                src={featureAnalysis} 
                alt="Image Analysis" 
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold">
                1
              </div>
            </div>
            <Image className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Upload Lung Scan</h3>
            <p className="text-muted-foreground">
              Upload chest X-rays or CT scans for AI-powered analysis. Our system detects patterns associated with various respiratory conditions.
            </p>
          </Card>

          {/* Feature 2 */}
          <Card className="p-8 border-2 hover:border-accent/50 transition-all hover:shadow-lg group">
            <div className="relative mb-6 overflow-hidden rounded-lg">
              <img 
                src={featureAudio} 
                alt="Audio Analysis" 
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-accent text-accent-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold">
                2
              </div>
            </div>
            <Mic className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Record Audio (Optional)</h3>
            <p className="text-muted-foreground">
              If needed, record cough or breathing sounds for enhanced accuracy. Audio analysis helps differentiate between similar conditions.
            </p>
          </Card>

          {/* Feature 3 */}
          <Card className="p-8 border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
            <div className="relative mb-6 overflow-hidden rounded-lg">
              <img 
                src={featureResults} 
                alt="Results" 
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold">
                3
              </div>
            </div>
            <FileCheck className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Get Detailed Results</h3>
            <p className="text-muted-foreground">
              Receive comprehensive analysis with confidence scores, potential diagnoses, and recommendations for next steps.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
