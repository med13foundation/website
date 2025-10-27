import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logoImage from "@assets/generated_images/MED13_Foundation_logo_transparent_b0bb02da.png";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3">
            <img 
              src={logoImage} 
              alt="MED13 Foundation Logo" 
              className="h-12 w-12 object-contain"
              style={{ mixBlendMode: 'multiply' }}
              data-testid="logo-image"
            />
            <span className="text-xl font-heading font-bold text-primary" data-testid="logo-text">
              MED13 Foundation
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md" data-testid="link-about">
              Who We Are
            </a>
            <a href="#get-involved" className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md" data-testid="link-get-involved">
              Get Involved
            </a>
            <a href="#roadmap" className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md" data-testid="link-roadmap">
              Roadmap
            </a>
            <a href="#events" className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md" data-testid="link-events">
              Events
            </a>
            <a href="#contact" className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md" data-testid="link-contact">
              Contact
            </a>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => console.log('Donate clicked')}
              data-testid="button-donate"
            >
              Donate
            </Button>
          </div>

          <button
            className="md:hidden p-2 hover-elevate rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
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
              variant="destructive" 
              className="w-full"
              onClick={() => console.log('Donate clicked')}
              data-testid="button-mobile-donate"
            >
              Donate
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
