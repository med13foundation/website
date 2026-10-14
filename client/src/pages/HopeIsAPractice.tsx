import { useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { ArrowLeft, CalendarDays, Clock3, ExternalLink, MapPin, Sparkles, Video } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Unitarian+Universalist+Church+of+Palo+Alto%2C+505+E+Charleston+Rd%2C+Palo+Alto%2C+CA+94306";
const LIVESTREAM_URL = "https://www.uucpa.org/services/sunday-september-27-2026/";

export default function HopeIsAPractice() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("hopePractice.metaTitle");
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") ?? null;
    metaDescription?.setAttribute("content", t("hopePractice.metaDescription"));

    return () => {
      document.title = "MED13 Foundation";
      if (metaDescription && previousDescription !== null) {
        metaDescription.setAttribute("content", previousDescription);
      }
    };
  }, [t]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="relative overflow-hidden bg-primary px-4 py-16 text-primary-foreground sm:py-24">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary/25 blur-3xl" />
          <div className="relative mx-auto max-w-5xl">
            <Button variant="ghost" className="mb-8 px-0 text-primary-foreground/80 hover:bg-transparent hover:text-white" asChild>
              <Link href="/news-and-events">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("hopePractice.back")}
              </Link>
            </Button>
            <div className="mb-5 flex flex-wrap gap-2">
              {(["communityTag", "bayAreaTag", "freeTag"] as const).map((key) => (
                <Badge key={key} variant="secondary" className="bg-white/15 text-white hover:bg-white/20">
                  {t(`hopePractice.${key}`)}
                </Badge>
              ))}
            </div>
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/75">
              <Sparkles className="h-4 w-4" />
              {t("hopePractice.eyebrow")}
            </p>
            <h1 className="max-w-4xl font-heading text-4xl font-bold leading-tight sm:text-6xl">
              {t("hopePractice.title")}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-primary-foreground/85 sm:text-xl">
              {t("hopePractice.intro")}
            </p>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_2fr]">
            <Card className="h-fit border-primary/15 shadow-sm">
              <CardContent className="space-y-6 p-6">
                <div className="flex gap-3">
                  <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold">{t("hopePractice.date")}</p>
                    <p className="text-sm text-muted-foreground">{t("hopePractice.day")}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="font-semibold">{t("hopePractice.time")}</p>
                </div>
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold">{t("hopePractice.venue")}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{t("hopePractice.address")}</p>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                    {t("hopePractice.directions")}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-9">
              <div className="space-y-5 text-lg leading-relaxed text-foreground/85">
                <p>{t("hopePractice.body1")}</p>
                <p>{t("hopePractice.body2")}</p>
              </div>

              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold">{t("hopePractice.whatToKnow")}</h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {(["welcome", "notFundraiser", "children", "recorded"] as const).map((key) => (
                    <li key={key} className="rounded-xl border border-primary/10 bg-muted/50 p-4 leading-relaxed">
                      {t(`hopePractice.${key}`)}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-secondary/40 bg-secondary/10 p-6">
                <div className="flex items-start gap-3">
                  <Video className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h2 className="font-heading text-xl font-bold">{t("hopePractice.onlineTitle")}</h2>
                    <p className="mt-2 text-muted-foreground">{t("hopePractice.onlineDescription")}</p>
                    <Button className="mt-4" asChild>
                      <a href={LIVESTREAM_URL} target="_blank" rel="noopener noreferrer" data-testid="link-hope-practice-livestream">
                        {t("hopePractice.onlineButton")}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t pt-8">
                <p className="font-semibold">{t("hopePractice.alsoThisFall")}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button variant="outline" asChild>
                    <Link href="/symposium">{t("hopePractice.symposiumLink")}</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/gala">{t("hopePractice.galaLink")}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}