import { Calendar, MapPin, Sparkles, Video } from "lucide-react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FeaturedEventsPreview() {
  const { t } = useTranslation();

  return (
    <section id="events" className="bg-muted py-16 sm:py-20" data-testid="section-featured-events">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">{t("home.featuredEventsEyebrow")}</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl" data-testid="text-featured-events-title">
            {t("events.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("home.featuredEventsSubtitle")}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card data-testid="card-featured-gala">
            <CardHeader>
              <CardTitle className="flex flex-wrap items-center gap-2 font-heading text-xl">
                <Sparkles className="h-5 w-5 text-primary" />
                {t("gala.eventCardTitle")}
              </CardTitle>
              <CardDescription className="mt-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {t("gala.eventCardDate")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-start gap-2 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <span>{t("gala.location")}, {t("gala.address")}</span>
              </div>
              <p className="text-sm leading-relaxed text-foreground">{t("gala.eventCardDesc")}</p>
              <Button className="mt-6" asChild data-testid="button-featured-gala">
                <Link href="/gala">{t("gala.eventCardButton")}</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary text-primary-foreground" data-testid="card-featured-symposium">
            <CardHeader>
              <CardTitle className="flex flex-wrap items-center gap-2 font-heading text-xl text-primary-foreground">
                <Video className="h-5 w-5 text-[#bfe9d2]" />
                {t("symposium.title")}
              </CardTitle>
              <CardDescription className="mt-2 flex items-center gap-2 text-primary-foreground/75">
                <Calendar className="h-4 w-4" />
                {t("symposium.date")} · {t("symposium.format")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-primary-foreground/85">{t("symposium.eventCardDesc")}</p>
              <Button variant="secondary" className="mt-6" asChild data-testid="button-featured-symposium">
                <Link href="/symposium">{t("symposium.eventCardButton")}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" asChild data-testid="button-view-all-events">
            <Link href="/news-and-events">
              {t("home.viewAllEvents")} <ArrowRightIcon />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ArrowRightIcon() {
  return <span aria-hidden="true" className="ml-2">→</span>;
}