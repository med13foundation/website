import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4 text-center" data-testid="text-about-title">
            Who We Are
          </h2>
          <p className="text-lg text-muted-foreground mb-12 text-center">
            Building a foundation for discovery, treatment, and hope
          </p>

          <div className="prose prose-lg max-w-none mb-12">
            <h3 className="text-2xl font-heading font-semibold text-foreground mb-4" data-testid="text-our-story">Our Story</h3>
            <p className="text-foreground mb-4" data-testid="text-story-content">
              The MED13 Foundation was established by families directly affected by MED13 syndrome, one of the rarest neurodevelopmental disorders with just over 51 identified patients worldwide. Following the first comprehensive characterization of MED13 syndrome in 2018, our community recognized the urgent need for organized advocacy and research infrastructure.
            </p>
            <p className="text-foreground mb-6">
              As parents navigating this ultra-rare diagnosis, we understand the isolation, uncertainty, and determination that defines this journey. We've witnessed our children's struggles with speech, learning, and development – but also their incredible resilience and unique personalities that shine through every challenge.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-foreground mb-4" data-testid="text-our-community">Our Community</h3>
            <ul className="space-y-2 mb-6">
              <li className="text-foreground">51+ families worldwide connected through shared experience</li>
              <li className="text-foreground">Researchers and clinicians pioneering understanding of the Mediator complex</li>
              <li className="text-foreground">Advocates and allies committed to improving outcomes for all individuals with neurodevelopmental differences</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card data-testid="card-combinedbrain">
              <CardHeader>
                <CardTitle className="text-xl font-heading">COMBINEDBrain Partnership</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Through COMBINEDBrain membership, we gain access to:
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Centralized biorepository with 900+ samples</li>
                  <li>• Leading scientific advisory board</li>
                  <li>• Strategic research planning support</li>
                  <li>• Drug discovery partnerships with AI-enabled screening</li>
                </ul>
              </CardContent>
            </Card>

            <Card data-testid="card-rare-village">
              <CardHeader>
                <CardTitle className="text-xl font-heading">Fiscal Sponsorship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  <strong>Rare Village</strong>
                </p>
                <p className="text-sm text-foreground">
                  Our 501(c)(3) tax-deductible donations are processed through Rare Village, allowing immediate fundraising while we establish independent nonprofit status.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
