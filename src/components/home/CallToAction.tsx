import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Stethoscope, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CallToAction = () => {
  const navigate = useNavigate();

  return (
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
        </Card>
      </div>
    </section>
  );
};
