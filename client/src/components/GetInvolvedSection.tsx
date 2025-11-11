import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlaskConical, Users2, HandHeart, Heart } from "lucide-react";
import communityBackground from "@assets/generated_images/Community_connection_collaboration_background_7ad860da.png";

export default function GetInvolvedSection() {
  const pathways = [
    {
      icon: FlaskConical,
      title: "Join Our Research Cohort",
      description: "Your participation drives discovery. Enroll in our patient registry and contribute to the biorepository to provide crucial data for natural history studies and enable researchers worldwide to study MED13 syndrome.",
      action: "Learn How to Participate",
      testId: "research"
    },
    {
      icon: Users2,
      title: "Join Our Board of Directors",
      description: "Shape the future of MED13 research and advocacy. We're seeking parents, medical advisors, fundraising professionals, and advocates to guide our strategic direction through quarterly meetings and committee work.",
      action: "Apply to the Board",
      testId: "board"
    },
    {
      icon: HandHeart,
      title: "Volunteer Your Skills",
      description: "Every talent makes a difference. We need help with website development, grant writing, event planning, social media, translation, data management, and family mentorship for newly diagnosed families.",
      action: "Get Involved",
      testId: "volunteer"
    },
    {
      icon: Heart,
      title: "Support Our Mission",
      description: "Your financial contribution accelerates research and provides direct support to families navigating MED13 syndrome. Every donation brings us closer to treatments and a cure.",
      action: "Make a Donation",
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
            Get Involved
          </h2>
          <p className="text-lg text-muted-foreground">
            Four ways to make an impact in the MED13 community
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
                  <CardTitle className="text-xl font-heading">{pathway.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <CardDescription className="text-sm mb-6 flex-1">
                    {pathway.description}
                  </CardDescription>
                  {pathway.isDonation ? (
                    <Button 
                      variant="default" 
                      className="w-full"
                      asChild
                      data-testid={`button-${pathway.testId}`}
                    >
                      <a href="?campaign=743443">{pathway.action}</a>
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      asChild
                      data-testid={`button-${pathway.testId}`}
                    >
                      <a href="#contact">{pathway.action}</a>
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
