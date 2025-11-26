import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-heading font-bold text-primary" data-testid="logo-text">
              {t('nav.logo')}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md" data-testid="link-about">
              {t('nav.about')}
            </a>
            <a href="#get-involved" className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md" data-testid="link-get-involved">
              {t('nav.getInvolved')}
            </a>
            <a href="#roadmap" className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md" data-testid="link-roadmap">
              {t('nav.roadmap')}
            </a>
            <a href="#events" className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md" data-testid="link-events">
              {t('nav.events')}
            </a>
            <a href="#contact" className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md" data-testid="link-contact">
              {t('nav.contact')}
            </a>
            <LanguageSwitcher />
            <Button 
              variant="destructive" 
              size="sm"
              asChild
              data-testid="button-donate"
            >
              <a href="#donate">{t('nav.donate')}</a>
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
              {t('nav.about')}
            </a>
            <a 
              href="#get-involved" 
              className="block px-3 py-2 text-base font-medium text-foreground hover-elevate rounded-md" 
              data-testid="link-mobile-get-involved"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.getInvolved')}
            </a>
            <a 
              href="#roadmap" 
              className="block px-3 py-2 text-base font-medium text-foreground hover-elevate rounded-md" 
              data-testid="link-mobile-roadmap"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.roadmap')}
            </a>
            <a 
              href="#events" 
              className="block px-3 py-2 text-base font-medium text-foreground hover-elevate rounded-md" 
              data-testid="link-mobile-events"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.events')}
            </a>
            <a 
              href="#contact" 
              className="block px-3 py-2 text-base font-medium text-foreground hover-elevate rounded-md" 
              data-testid="link-mobile-contact"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </a>
            <div className="px-3 py-2">
              <LanguageSwitcher />
            </div>
            <Button 
              variant="destructive" 
              className="w-full"
              asChild
              data-testid="button-mobile-donate"
            >
              <a href="#donate" onClick={() => setMobileMenuOpen(false)}>{t('nav.donate')}</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
