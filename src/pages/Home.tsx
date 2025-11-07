import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { CallToAction } from "@/components/home/CallToAction";
import { Footer } from "@/components/home/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <Hero />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
