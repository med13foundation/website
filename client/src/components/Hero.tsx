import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import heroBackground from "@assets/generated_images/Family_unity_hope_background_8e3f922d.webp";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { proofItems } from "@/content/proof";

export default function Hero() {
  const { t } = useTranslation();
  const metricFootnotes = proofItems.filter((item) => item.noteKey);
  const footnoteId = (valueKey: string) => `home-impact-note-${valueKey.split(".").at(-1)}`;

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-secondary/90" />
      
      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Link
            href="/news-and-events/denver-mini-medopathies-meetup"
            className="group mb-8 inline-flex max-w-full items-center gap-3 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-left text-sm text-primary-foreground backdrop-blur-sm transition-colors hover:bg-white/20"
            data-testid="link-top-denver-invitation"
          >
            <Sparkles className="h-4 w-4 shrink-0 text-[#bfe9d2]" aria-hidden="true" />
            <span className="min-w-0">
              <span className="font-semibold">{t('home.upcomingEventLabel')}:</span>{' '}
               <span>{t('nav.eventsDenverMeetup')} · {t('denverMeetup.cardDate')}</span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground mb-6 min-h-[2.5em]" data-testid="text-hero-title">
            {t('hero.title')}
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 leading-relaxed" data-testid="text-hero-subtitle">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-4">
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 border-white"
              asChild
              data-testid="button-join-research"
            >
              <Link href="/get-involved#research-cohort">
                {t('hero.joinResearch')}
              </Link>
            </Button>
            <Link
              href="/who-we-are"
              className="text-sm font-semibold text-primary-foreground underline underline-offset-4 hover:text-primary-foreground/80"
              data-testid="link-our-story"
            >
              {t('hero.learnStory')}
            </Link>
          </div>
        </div>
        <Link
          href="/impact"
          className="group mt-10 block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          data-testid="link-hero-impact"
        >
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3" data-testid="hero-proof-band">
            {proofItems.map((item) => (
              <div
                key={item.labelKey}
                className="min-w-0 rounded-lg border border-white/20 bg-white/10 px-4 py-4 text-center text-primary-foreground backdrop-blur-sm transition-colors group-hover:bg-white/20"
                data-testid={`hero-metric-${item.valueKey.split(".").at(-1)}`}
                role="group"
                aria-label={t(item.labelKey)}
                aria-describedby={item.noteKey ? footnoteId(item.valueKey) : undefined}
              >
                <p className="font-heading text-2xl font-bold">{t(item.valueKey)}</p>
                <p className="mt-1 text-sm leading-snug text-primary-foreground/90">
                  {t(item.labelKey)}
                  {item.noteKey && (
                    <sup className="ml-1 text-xs" aria-hidden="true">{metricFootnotes.findIndex((note) => note.valueKey === item.valueKey) + 1}</sup>
                  )}
                </p>
              </div>
            ))}
          </div>
          <span className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-primary-foreground underline underline-offset-4">
            {t("nav.impact")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </Link>
        <aside className="mt-6 border-t border-white/20 pt-4 text-xs leading-relaxed text-primary-foreground/90" aria-labelledby="home-impact-footnotes-title" data-testid="home-impact-footnotes">
          <h2 id="home-impact-footnotes-title" className="mb-2 font-semibold text-primary-foreground">{t("home.proofFootnotesTitle")}</h2>
          <ol className="list-decimal space-y-1.5 pl-4">
            {metricFootnotes.map((item) => (
              <li key={item.valueKey} id={footnoteId(item.valueKey)}>
                {t(item.noteKey!)}
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
