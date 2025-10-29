import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Stethoscope, Image, Mic, FileCheck, ArrowRight, Shield, Zap, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-medical.jpg";
import featureAnalysis from "@/assets/feature-analysis.jpg";
import featureAudio from "@/assets/feature-audio.jpg";
import featureResults from "@/assets/feature-results.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <Stethoscope className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Medical Diagnostics</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                RespiCheck AI
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Advanced respiratory disease detection using cutting-edge AI technology. 
              Analyze lung images and breathing sounds for accurate preliminary diagnosis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 group"
                onClick={() => navigate("/diagnosis")}
              >
                Start Diagnosis
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
            
            <div className="pt-8 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                <span>Instant Results</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>Trusted by Healthcare Professionals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-sm opacity-90">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">&lt;30s</div>
              <div className="text-sm opacity-90">Analysis Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50k+</div>
              <div className="text-sm opacity-90">Scans Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-12 text-center border-2 bg-gradient-to-br from-card to-secondary/20">
            <Stethoscope className="w-16 h-16 mx-auto text-primary mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready for Your Health Assessment?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get started with AI-powered respiratory analysis in seconds. 
              Our advanced system provides preliminary screening results you can trust.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={() => navigate("/diagnosis")}
            >
              Start Free Diagnosis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              ⚠️ This is a preliminary screening tool. Always consult healthcare professionals for proper diagnosis.
            </p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 RespiCheck AI. Powered by advanced AI models for medical diagnostics.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
