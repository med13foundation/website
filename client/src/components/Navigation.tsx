import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-heading font-bold text-primary" data-testid="logo-text">
              MED13 Foundation
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md" data-testid="link-about">
              Who We Are
            </Link>
            <Link href="#get-involved" className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md" data-testid="link-get-involved">
              Get Involved
            </Link>
            <Link href="#roadmap" className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md" data-testid="link-roadmap">
              Roadmap
            </Link>
            <Link href="#events" className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md" data-testid="link-events">
              Events
            </Link>
            <Link href="#contact" className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md" data-testid="link-contact">
              Contact
            </Link>
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
            <Link href="#about" className="block px-3 py-2 text-base font-medium text-foreground hover-elevate rounded-md" data-testid="link-mobile-about">
              Who We Are
            </Link>
            <Link href="#get-involved" className="block px-3 py-2 text-base font-medium text-foreground hover-elevate rounded-md" data-testid="link-mobile-get-involved">
              Get Involved
            </Link>
            <Link href="#roadmap" className="block px-3 py-2 text-base font-medium text-foreground hover-elevate rounded-md" data-testid="link-mobile-roadmap">
              Roadmap
            </Link>
            <Link href="#events" className="block px-3 py-2 text-base font-medium text-foreground hover-elevate rounded-md" data-testid="link-mobile-events">
              Events
            </Link>
            <Link href="#contact" className="block px-3 py-2 text-base font-medium text-foreground hover-elevate rounded-md" data-testid="link-mobile-contact">
              Contact
            </Link>
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
