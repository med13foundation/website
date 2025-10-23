import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Beaker } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-secondary/5 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6" data-testid="text-hero-title">
            A world where every individual with MED13 syndrome reaches their full potential
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="text-hero-subtitle">
            The MED13 Foundation unites families, researchers, and clinicians to accelerate scientific discovery, fund research toward treatments and a cure, and support families through their diagnostic journey.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              size="lg"
              onClick={() => console.log('Join Research Cohort clicked')}
              data-testid="button-join-research"
            >
              Join Research Cohort
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => console.log('Learn Our Story clicked')}
              data-testid="button-learn-story"
            >
              Learn Our Story
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm" data-testid="badge-families">
              <Users className="w-4 h-4 mr-2" />
              51+ Families Worldwide
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm" data-testid="badge-research">
              <Beaker className="w-4 h-4 mr-2" />
              Year 1-2: Foundation Building
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
