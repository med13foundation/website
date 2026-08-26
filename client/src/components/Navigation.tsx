import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import logoUrl from "@assets/Med 13_1764216026949.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 rounded-lg">
            <img 
              src={logoUrl} 
              alt="MED13 Foundation Logo" 
              className="h-12 w-12" 
              data-testid="logo-image"
            />
            <span className="hidden sm:inline text-lg font-heading font-bold text-primary" data-testid="logo-text">
              {t('nav.logo')}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/who-we-are" className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md" data-testid="link-about">
              {t('nav.about')}
            </Link>
            <Link href="/get-involved" className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md" data-testid="link-get-involved">
              {t('nav.getInvolved')}
            </Link>
            <Link href="/roadmap" className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md" data-testid="link-roadmap">
              {t('nav.roadmap')}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger
                className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md outline-none"
                data-testid="button-events-menu"
              >
                {t('nav.events')}
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/news-and-events" data-testid="link-events-overview">
                    {t('nav.eventsOverview')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/gala" data-testid="link-events-gala">
                    {t('nav.eventsGala')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/symposium" data-testid="link-events-symposium">
                    {t('nav.eventsSymposium')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/news-and-events#newsletter" data-testid="link-events-newsletter">
                    {t('nav.eventsNewsletter')}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/news-and-events#star-of-month" data-testid="link-events-star-of-month">
                    {t('nav.eventsStarOfMonth')}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/news-and-events#press-room" data-testid="link-events-press-room">
                    {t('nav.eventsPressRoom')}
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <a href="/#contact" className="text-sm font-medium text-foreground hover-elevate px-3 py-2 rounded-md" data-testid="link-contact">
              {t('nav.contact')}
            </a>
            <LanguageSwitcher />
            <Button 
              variant="destructive" 
              size="sm"
              asChild
              data-testid="button-donate"
            >
              <a href="/#donate">{t('nav.donate')}</a>
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
            <Link 
              href="/who-we-are" 
              className="block px-3 py-2 text-base font-medium text-foreground hover-elevate rounded-md" 
              data-testid="link-mobile-about"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link 
              href="/get-involved" 
              className="block px-3 py-2 text-base font-medium text-foreground hover-elevate rounded-md" 
              data-testid="link-mobile-get-involved"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.getInvolved')}
            </Link>
            <Link 
              href="/roadmap" 
              className="block px-3 py-2 text-base font-medium text-foreground hover-elevate rounded-md" 
              data-testid="link-mobile-roadmap"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.roadmap')}
            </Link>
            <div className="px-3 py-2" data-testid="mobile-events-menu">
              <p className="text-base font-semibold text-foreground mb-1">{t('nav.events')}</p>
              <div className="border-l border-border ml-1 pl-3 space-y-1">
                <Link
                  href="/news-and-events"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover-elevate rounded-md"
                  data-testid="link-mobile-events-overview"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.eventsOverview')}
                </Link>
                <Link
                  href="/gala"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover-elevate rounded-md"
                  data-testid="link-mobile-events-gala"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.eventsGala')}
                </Link>
                <Link
                  href="/symposium"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover-elevate rounded-md"
                  data-testid="link-mobile-events-symposium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.eventsSymposium')}
                </Link>
                <a
                  href="/news-and-events#newsletter"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover-elevate rounded-md"
                  data-testid="link-mobile-events-newsletter"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.eventsNewsletter')}
                </a>
                <a
                  href="/news-and-events#star-of-month"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover-elevate rounded-md"
                  data-testid="link-mobile-events-star-of-month"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.eventsStarOfMonth')}
                </a>
                <a
                  href="/news-and-events#press-room"
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover-elevate rounded-md"
                  data-testid="link-mobile-events-press-room"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.eventsPressRoom')}
                </a>
              </div>
            </div>
            <a 
              href="/#contact" 
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
              <a href="/#donate" onClick={() => setMobileMenuOpen(false)}>{t('nav.donate')}</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
