import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Stethoscope, Image, Mic, FileCheck, ArrowRight, Shield, Zap, Users, Activity } from "lucide-react";
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
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center animate-fade-in"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(14,165,233,0.1),transparent_50%)]" />
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full backdrop-blur-sm hover:scale-105 transition-transform">
              <Stethoscope className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI-Powered Medical Diagnostics
              </span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-bold tracking-tight">
              <span className="inline-block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                RespiCheck AI
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed font-light">
              Advanced respiratory disease detection using cutting-edge AI technology. 
              Analyze lung images and breathing sounds for accurate preliminary diagnosis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button 
                size="lg" 
                className="text-lg px-10 py-7 rounded-xl shadow-lg hover:shadow-xl bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all group"
                onClick={() => navigate("/diagnosis")}
              >
                Start Diagnosis
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-10 py-7 rounded-xl border-2 hover:bg-accent/10 hover:border-accent hover:scale-105 transition-all"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
            
            <div className="pt-12 flex flex-wrap justify-center gap-12 text-sm">
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-br from-accent/5 to-transparent backdrop-blur-sm">
                <Zap className="w-5 h-5 text-accent" />
                <span className="font-medium">Instant Results</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">How It Works</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              Smart <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Detection</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Our AI-powered system combines image and audio analysis for comprehensive respiratory health assessment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <Card className="group p-8 border-2 hover:border-primary/50 transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 bg-gradient-to-br from-card to-card/50 backdrop-blur">
              <div className="relative mb-8 overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src={featureAnalysis} 
                  alt="Image Analysis" 
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                <div className="absolute top-6 left-6 bg-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center font-bold text-xl shadow-lg">
                  1
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-primary/10 rounded-xl w-fit">
                  <Image className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Upload Lung Scan</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Upload chest X-rays or CT scans for AI-powered analysis. Our system detects patterns associated with various respiratory conditions.
                </p>
              </div>
            </Card>

            {/* Feature 2 */}
            <Card className="group p-8 border-2 hover:border-accent/50 transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 bg-gradient-to-br from-card to-card/50 backdrop-blur">
              <div className="relative mb-8 overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src={featureAudio} 
                  alt="Audio Analysis" 
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent" />
                <div className="absolute top-6 left-6 bg-accent text-accent-foreground rounded-full w-14 h-14 flex items-center justify-center font-bold text-xl shadow-lg">
                  2
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-accent/10 rounded-xl w-fit">
                  <Mic className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-2xl font-bold">Record Audio</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Record cough or breathing sounds for enhanced accuracy. Audio analysis helps differentiate between similar conditions.
                </p>
              </div>
            </Card>

            {/* Feature 3 */}
            <Card className="group p-8 border-2 hover:border-primary/50 transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 bg-gradient-to-br from-card to-card/50 backdrop-blur">
              <div className="relative mb-8 overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src={featureResults} 
                  alt="Results" 
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                <div className="absolute top-6 left-6 bg-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center font-bold text-xl shadow-lg">
                  3
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-primary/10 rounded-xl w-fit">
                  <FileCheck className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Get Results</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Receive comprehensive analysis with confidence scores and potential diagnoses.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
        
        <div className="container mx-auto px-4 relative">
          <Card className="max-w-4xl mx-auto p-12 lg:p-16 text-center border-2 bg-gradient-to-br from-card via-card/95 to-accent/5 backdrop-blur shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            
            <div className="relative space-y-8">
              <div className="inline-flex p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl">
                <Stethoscope className="w-16 h-16 text-primary" />
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold">
                Ready for Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Health Assessment?</span>
              </h2>
              
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
                Get started with AI-powered respiratory analysis in seconds. 
                Our advanced system provides preliminary screening results.
              </p>
              
              <Button 
                size="lg" 
                className="text-lg px-12 py-7 rounded-xl shadow-xl hover:shadow-2xl bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all group"
                onClick={() => navigate("/diagnosis")}
              >
                Start Free Diagnosis
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
                <Stethoscope className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                RespiCheck AI
              </span>
            </div>
            <p className="text-center text-sm text-foreground/60">
              &copy; 2025 RespiCheck AI. Powered by advanced AI models for medical diagnostics.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
