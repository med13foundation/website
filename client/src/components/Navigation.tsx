import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const isActive = (sectionId: string) => activeSection === sectionId;

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-heading font-bold text-primary" data-testid="logo-text">
              MED13 Foundation
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#about" 
              className={`text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors border-b-2 ${
                isActive('about') ? 'text-primary border-primary' : 'text-foreground border-transparent'
              }`}
              data-testid="link-about"
            >
              Who We Are
            </a>
            <a 
              href="#get-involved" 
              className={`text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors border-b-2 ${
                isActive('get-involved') ? 'text-primary border-primary' : 'text-foreground border-transparent'
              }`}
              data-testid="link-get-involved"
            >
              Get Involved
            </a>
            <a 
              href="#roadmap" 
              className={`text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors border-b-2 ${
                isActive('roadmap') ? 'text-primary border-primary' : 'text-foreground border-transparent'
              }`}
              data-testid="link-roadmap"
            >
              Roadmap
            </a>
            <a 
              href="#events" 
              className={`text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors border-b-2 ${
                isActive('events') ? 'text-primary border-primary' : 'text-foreground border-transparent'
              }`}
              data-testid="link-events"
            >
              Events
            </a>
            <a 
              href="#contact" 
              className={`text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors border-b-2 ${
                isActive('contact') ? 'text-primary border-primary' : 'text-foreground border-transparent'
              }`}
              data-testid="link-contact"
            >
              Contact
            </a>
            <Button 
              size="sm"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              onClick={() => console.log('Donate clicked')}
              aria-label="Make a donation to support our mission"
              data-testid="button-donate"
            >
              <Heart className="w-4 h-4 mr-2" aria-hidden="true" />
              Donate
            </Button>
          </div>

          <button
            className="md:hidden p-2 hover-elevate rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-border bg-background">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <a 
              href="#about" 
              className="block px-3 py-2 text-base font-medium text-foreground hover-elevate rounded-md" 
              data-testid="link-mobile-about"
              onClick={() => setMobileMenuOpen(false)}
            >
              Who We Are
            </a>
            <a 
              href="#get-involved" 
              className="block px-3 py-2 text-base font-medium text-foreground hover-elevate rounded-md" 
              data-testid="link-mobile-get-involved"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Involved
            </a>
            <a 
              href="#roadmap" 
              className="block px-3 py-2 text-base font-medium text-foreground hover-elevate rounded-md" 
              data-testid="link-mobile-roadmap"
              onClick={() => setMobileMenuOpen(false)}
            >
              Roadmap
            </a>
            <a 
              href="#events" 
              className="block px-3 py-2 text-base font-medium text-foreground hover-elevate rounded-md" 
              data-testid="link-mobile-events"
              onClick={() => setMobileMenuOpen(false)}
            >
              Events
            </a>
            <a 
              href="#contact" 
              className="block px-3 py-2 text-base font-medium text-foreground hover-elevate rounded-md" 
              data-testid="link-mobile-contact"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <Button 
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
              onClick={() => console.log('Donate clicked')}
              aria-label="Make a donation to support our mission"
              data-testid="button-mobile-donate"
            >
              <Heart className="w-4 h-4 mr-2" aria-hidden="true" />
              Donate
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
