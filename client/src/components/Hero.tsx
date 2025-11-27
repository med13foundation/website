import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Beaker } from "lucide-react";
import heroBackground from "@assets/generated_images/Family_unity_hope_background_8e3f922d.png";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-secondary/90" />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6" data-testid="text-hero-title">
            {t('hero.title')}
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed" data-testid="text-hero-subtitle">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 border-white"
              asChild
              data-testid="button-join-research"
            >
              <a href="#get-involved">{t('hero.joinResearch')}</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white/20"
              asChild
              data-testid="button-learn-story"
            >
              <a href="#about">{t('hero.learnStory')}</a>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Badge variant="outline" className="px-4 py-2 text-sm bg-white/10 backdrop-blur-sm border-white/20 text-white" data-testid="badge-families">
              <Users className="w-4 h-4 mr-2" />
              {t('hero.familiesWorldwide')}
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm bg-white/10 backdrop-blur-sm border-white/20 text-white" data-testid="badge-research">
              <Beaker className="w-4 h-4 mr-2" />
              {t('hero.foundationBuilding')}
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
