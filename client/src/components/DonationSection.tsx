import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

export default function DonationSection() {
  useEffect(() => {
    // Ensure Classy widget initializes when component mounts
    const timer = setTimeout(() => {
      if (window.location.search.includes('campaign=')) {
        // Already triggered by URL param
        return;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleDonateClick = () => {
    // Trigger Classy popup by adding campaign parameter
    window.location.href = `${window.location.pathname}?campaign=743443`;
  };

  return (
    <section id="donate" className="py-16 sm:py-24 bg-gradient-to-br from-accent/40 via-background to-secondary/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-6">
            <Heart className="w-8 h-8 text-secondary" fill="currentColor" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4" data-testid="text-donation-title">
            Support Our Mission
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your donation accelerates research, supports families, and brings us closer to treatments and a cure for MED13 syndrome. Every contribution makes a meaningful difference.
          </p>
        </div>

        <Card className="bg-card/95 backdrop-blur-sm border-card-border max-w-md mx-auto shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                Make an Impact Today
              </h3>
              <p className="text-sm text-muted-foreground">
                100% of donations support research and family programs
              </p>
            </div>

            {/* Classy Inline Widget Container */}
            <div 
              id="classy-donation-inline" 
              className="min-h-[400px] flex items-center justify-center"
              data-testid="classy-inline-container"
            >
              <div className="text-center">
                <button
                  onClick={handleDonateClick}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-secondary text-secondary-foreground hover-elevate active-elevate-2 h-11 px-8 py-2"
                  data-testid="button-open-donation-form"
                >
                  Open Donation Form
                </button>
                <p className="text-xs text-muted-foreground mt-4">
                  Secure donation powered by Classy
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                The MED13 Foundation is fiscally sponsored by Rare Village, a 501(c)(3) nonprofit organization. Your donation is tax-deductible to the extent allowed by law.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-primary mb-2">$50</div>
            <p className="text-sm text-muted-foreground">Supports patient registry maintenance</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-primary mb-2">$250</div>
            <p className="text-sm text-muted-foreground">Funds family support resources</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-primary mb-2">$1,000</div>
            <p className="text-sm text-muted-foreground">Advances critical research</p>
          </div>
        </div>
      </div>
    </section>
  );
}
