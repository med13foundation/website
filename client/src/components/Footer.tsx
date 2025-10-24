import { Facebook, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-br from-accent/30 to-background border-t border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left: Join the Family */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-3" data-testid="text-footer-join-title">
              Join the MED13 Family
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Together, we're building a world where every individual with MED13 syndrome reaches their full potential. 
              Stay connected with our community and receive updates on research milestones, family stories, and ways to make an impact.
            </p>
            
            <form className="flex gap-2 mb-8">
              <label htmlFor="newsletter-email" className="sr-only">Email address for newsletter</label>
              <Input 
                id="newsletter-email"
                type="email" 
                placeholder="Your email address"
                aria-label="Email address for newsletter subscription"
                className="flex-1"
                data-testid="input-footer-newsletter"
              />
              <Button 
                type="submit"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                aria-label="Subscribe to newsletter"
                data-testid="button-footer-subscribe"
              >
                <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
                Subscribe
              </Button>
            </form>

            <div className="flex items-center gap-6">
              <a
                href="https://facebook.com/groups/med13"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Visit our Facebook group"
                data-testid="link-footer-facebook"
              >
                <Facebook className="w-6 h-6" aria-hidden="true" />
              </a>
              <a
                href="mailto:info@med13foundation.org"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email us at info@med13foundation.org"
                data-testid="link-footer-email"
              >
                <Mail className="w-6 h-6" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right: Quick Links and Partners */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4" data-testid="text-footer-quick-links">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-story">
                    Who We Are
                  </a>
                </li>
                <li>
                  <a href="#get-involved" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-research">
                    Join Research
                  </a>
                </li>
                <li>
                  <a href="#roadmap" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-roadmap">
                    Roadmap
                  </a>
                </li>
                <li>
                  <a href="#events" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-events">
                    Events
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4" data-testid="text-footer-partners">
                Our Partners
              </h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://combinedbrain.org" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                    data-testid="link-footer-combinedbrain"
                  >
                    <Heart className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
                    COMBINEDBrain
                  </a>
                </li>
                <li>
                  <a 
                    href="https://rarevillage.org" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                    data-testid="link-footer-rarevillage"
                  >
                    <Heart className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
                    Rare Village
                  </a>
                </li>
              </ul>
              
              <div className="mt-6">
                <p className="text-xs text-muted-foreground italic">
                  Operating under fiscal sponsorship while pursuing 501(c)(3) status
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-border pt-8">
          <div className="text-center mb-4">
            <p className="text-lg font-serif italic text-primary mb-2" data-testid="text-footer-tagline">
              Led by families. Guided by science. United by hope.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p data-testid="text-footer-copyright">
              © 2025 MED13 Foundation. All rights reserved.
            </p>
            <p className="text-xs">
              Contact: <a href="mailto:info@med13foundation.org" className="hover:text-primary transition-colors">info@med13foundation.org</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
