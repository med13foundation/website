import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import logoUrl from "@assets/Med 13_1764216026949.png";
import heroBackground from "@assets/generated_images/Family_unity_hope_background_8e3f922d.png";

export default function Flyer() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        
        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-secondary/95" />
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <img 
              src={logoUrl} 
              alt="MED13 Foundation Logo" 
              className="h-24 w-24 sm:h-32 sm:w-32 mx-auto mb-8 drop-shadow-xl"
              data-testid="logo-flyer"
            />
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-white mb-2" data-testid="text-flyer-title">
              MED13 FOUNDATION
            </h1>
            
            <p className="text-2xl sm:text-3xl font-heading font-semibold text-white/95 mb-8">
              Advancing Research & Supporting Families
            </p>
            
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-8">
              MED13 syndrome is an ultra-rare genetic condition affecting neurodevelopment. With limited cases identified worldwide, there is a critical need for collaborative research to better understand this condition and develop effective interventions.
            </p>

            <div className="flex justify-center">
              <ChevronDown className="w-8 h-8 text-white animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* About MED13 Syndrome */}
          <div className="mb-16">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-12 text-center">About MED13 Syndrome</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card data-testid="card-neurodevelopmental" className="hover-elevate">
                <CardHeader>
                  <CardTitle className="text-xl font-heading text-primary">Neurodevelopmental Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">
                    Affects cognitive development, with presentations ranging from mild to severe. Many individuals experience developmental delays and intellectual disability.
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-epilepsy" className="hover-elevate">
                <CardHeader>
                  <CardTitle className="text-xl font-heading text-secondary">Epilepsy & Seizures</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">
                    Some individuals with MED13 syndrome experience seizures, including cases of infantile spasms and drug-resistant epilepsy requiring specialized management.
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="card-multisystem" className="hover-elevate">
                <CardHeader>
                  <CardTitle className="text-xl font-heading text-primary">Multi-System Involvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">
                    May include autism spectrum behaviors, ADHD, motor challenges, and in some cases, cardiac or other organ involvement.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Research Opportunities */}
          <div className="mb-16">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-6 text-center">Research Opportunities</h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              As an emerging diagnosis, MED13 syndrome offers unique opportunities for groundbreaking research in genetics, neurology, and therapeutic development.
            </p>

            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-6">SEEKING RESEARCH PARTNERS</h3>
              <p className="text-lg text-foreground mb-8">
                We are actively seeking collaborations with investigators interested in:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Natural History Studies",
                  "Epilepsy Characterization",
                  "Biomarker Development",
                  "Clinical Trial Design",
                  "Registry Development",
                  "Outcome Measures",
                  "Basic Science Research",
                  "Therapeutic Targets"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-foreground font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Partner */}
          <div className="mb-16">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-12 text-center">Why Partner with the MED13 Foundation?</h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                "Direct access to a motivated patient and family community",
                "Support for grant applications and study recruitment",
                "Commitment to open science and data sharing",
                "Opportunity to shape understanding of an emerging condition",
                "Potential funding support for innovative research projects"
              ].map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-lg text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <section className="relative py-16 bg-gradient-to-r from-primary to-secondary rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative max-w-3xl mx-auto px-6 text-center">
              <h2 className="text-4xl font-heading font-bold text-white mb-6">Join Us in Making a Difference</h2>
              <p className="text-lg text-white/90 mb-8">
                Every research partnership brings us closer to understanding MED13 syndrome and developing treatments. Your expertise in epilepsy research could be crucial in improving outcomes for our community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold"
                  asChild
                  data-testid="button-contact-research"
                >
                  <a href="mailto:research@med13.org">Contact for Collaboration</a>
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 font-semibold"
                  asChild
                  data-testid="button-learn-more"
                >
                  <a href="/">Learn More</a>
                </Button>
              </div>
            </div>
          </section>

          {/* Footer Info */}
          <div className="mt-16 text-center text-muted-foreground">
            <p className="mb-2">Visit us at: med13foundation.org</p>
            <p>Contact: research@med13.org</p>
          </div>
        </div>
      </section>
    </div>
  );
}
