import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/20 to-secondary/30" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-accent/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Where stories come alive
            </span>
          </div>

          {/* Main heading */}
          <h1 className="heading-xl mb-6">
            Share your{" "}
            <span className="bg-hero-gradient bg-clip-text text-transparent">
              stories
            </span>{" "}
            with the world
          </h1>

          {/* Subtitle */}
          <p className="body-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Barruu is a modern publishing platform where writers, creators, and 
            thinkers share their ideas. Join a community that values quality 
            content and meaningful conversations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button variant="hero" size="xl" className="group">
              Start Writing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl">
              Explore Stories
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-lg mx-auto">
            <div>
              <div className="heading-sm text-primary">10K+</div>
              <div className="body-sm text-muted-foreground">Stories Published</div>
            </div>
            <div>
              <div className="heading-sm text-primary">5K+</div>
              <div className="body-sm text-muted-foreground">Active Writers</div>
            </div>
            <div>
              <div className="heading-sm text-primary">50K+</div>
              <div className="body-sm text-muted-foreground">Monthly Readers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;