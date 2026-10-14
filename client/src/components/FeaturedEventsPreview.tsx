import { Calendar, MapPin, Users } from "lucide-react";
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

        <div className="mx-auto max-w-4xl">
          <Card data-testid="card-featured-denver">
            <CardHeader>
              <CardTitle className="flex flex-wrap items-center gap-2 font-heading text-xl">
                <Users className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                {t("nav.eventsDenverMeetup")}
              </CardTitle>
              <CardDescription className="mt-2 flex items-center gap-2">
                <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
                {t("denverMeetup.cardDate")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-start gap-2 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span>{t("denverMeetup.venue")}, {t("denverMeetup.address")}</span>
              </div>
              <p className="text-sm leading-relaxed text-foreground">{t("denverMeetup.cardBlurb")}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("denverMeetup.virtualBody")}</p>
              <Button className="mt-6" asChild data-testid="button-featured-denver">
                <Link href="/news-and-events/denver-mini-medopathies-meetup">{t("denverMeetup.details")}</Link>
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