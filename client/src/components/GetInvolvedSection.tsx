import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlaskConical, Users2, HandHeart, Heart } from "lucide-react";
import communityBackground from "@assets/generated_images/Community_connection_collaboration_background_7ad860da.webp";
import { useTranslation } from "react-i18next";

export default function GetInvolvedSection() {
  const { t } = useTranslation();

  const pathways = [
    {
      icon: FlaskConical,
      titleKey: "getInvolved.researchTitle",
      descKey: "getInvolved.researchDesc",
      actionKey: "getInvolved.contactUs",
      testId: "research",
      email: "research@med13.org"
    },
    {
      icon: Users2,
      titleKey: "getInvolved.boardTitle",
      descKey: "getInvolved.boardDesc",
      actionKey: "getInvolved.contactUs",
      testId: "board",
      email: "research@med13.org"
    },
    {
      icon: HandHeart,
      titleKey: "getInvolved.volunteerTitle",
      descKey: "getInvolved.volunteerDesc",
      actionKey: "getInvolved.contactUs",
      testId: "volunteer",
      email: "research@med13.org"
    },
    {
      icon: Heart,
      titleKey: "getInvolved.donateTitle",
      descKey: "getInvolved.donateDesc",
      actionKey: "getInvolved.makeDonation",
      testId: "donate",
      isDonation: true
    }
  ];

  return (
    <section id="get-involved" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${communityBackground})` }}
      />
      
      {/* Light Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/95 via-background/92 to-muted/95" />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4" data-testid="text-get-involved-title">
            {t('getInvolved.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('getInvolved.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pathways.map((pathway, index) => {
            const Icon = pathway.icon;
            return (
              <Card key={index} className="flex flex-col bg-card/95 backdrop-blur-sm" data-testid={`card-${pathway.testId}`}>
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-heading">{t(pathway.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <CardDescription className="text-sm mb-6 flex-1">
                    {t(pathway.descKey)}
                  </CardDescription>
                  {pathway.isDonation ? (
                    <Button 
                      variant="default" 
                      className="w-full"
                      asChild
                      data-testid={`button-${pathway.testId}`}
                    >
                      <a href="#donate">{t(pathway.actionKey)}</a>
                    </Button>
                  ) : pathway.email ? (
                    <div className="text-center" data-testid={`button-${pathway.testId}`}>
                      <p className="text-sm text-muted-foreground mb-2">{t(pathway.actionKey)}</p>
                      <p className="font-semibold text-primary">{pathway.email}</p>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      asChild
                      data-testid={`button-${pathway.testId}`}
                    >
                      <a href="#contact">{t(pathway.actionKey)}</a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
