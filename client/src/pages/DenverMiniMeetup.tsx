import { useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { ArrowLeft, CalendarDays, Clock3, ExternalLink, Hotel, MapPin, TestTubes, Users, Video } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const REGISTRATION_URL = "https://givebutter.com/mini-medopathies-family-meetup-denver-zfo4zv";
const RARE_RECEPTION_URL = "https://fundraise.givesmart.com/e/9aSuZA?vid=1sokr3";
const HOTEL_URL = "https://www.hyatt.com/events/en-US/group-booking/DENRD/G-SLC6";
const AES_URL = "https://aesnet.org/AES-annual-meeting";
const COMBINEDBRAIN_URL = "https://combinedbrain.org/";
const SIMONS_SEARCHLIGHT_URL = "https://www.simonssearchlight.org/research/what-we-study/med13/";
const MED12_URL = "https://www.med12.org/";
const MED13L_URL = "https://med13l.org/";
const DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=1750+Welton+St%2C+Denver%2C+CO+80202";

export default function DenverMiniMeetup() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("denverMeetup.metaTitle");
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") ?? null;
    metaDescription?.setAttribute("content", t("denverMeetup.metaDescription"));

    return () => {
      document.title = "MED13 Foundation";
      if (metaDescription && previousDescription !== null) {
        metaDescription.setAttribute("content", previousDescription);
      }
    };
  }, [t]);

  const agenda = [
    ["agenda1Time", "agenda1Title", null],
    ["agenda2Time", "agenda2Title", null],
    ["agenda3Time", "agenda3Title", "agenda3Body"],
    ["agenda4Time", "agenda4Title", null],
    ["agenda5Time", "agenda5Title", "agenda5Body"],
    ["agenda6Time", "agenda6Title", null],
    ["agenda7Time", "agenda7Title", null],
    ["agenda8Time", "agenda8Title", null],
    ["agenda9Time", "agenda9Title", null],
    ["agenda10Time", "agenda10Title", null],
    ["agenda11Time", "agenda11Title", "agenda11Body"],
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="relative overflow-hidden bg-primary/10 px-4 py-14 sm:py-20">
          <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Button variant="ghost" className="mb-8 px-0 text-primary hover:bg-transparent" asChild>
                <Link href="/news-and-events">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("denverMeetup.back")}
                </Link>
              </Button>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                {(["inPersonTag", "respiteTag", "virtualTag"] as const).map((key) => (
                  <Badge key={key} variant="secondary">{t(`denverMeetup.${key}`)}</Badge>
                ))}
              </div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                {t("denverMeetup.eyebrow")}
              </p>
              <h1 className="max-w-4xl font-heading text-4xl font-bold leading-tight text-primary sm:text-6xl">
                {t("denverMeetup.title")}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/75 sm:text-xl">
                {t("denverMeetup.intro")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer">
                    {t("denverMeetup.register")}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href={HOTEL_URL} target="_blank" rel="noopener noreferrer">
                    {t("denverMeetup.bookHotel")}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center gap-8 p-8 sm:p-10">
              <img
                src="/images/medopathies_alliance_no_bg.png"
                alt={t("denverMeetup.medopathiesLogoAlt")}
                className="w-full max-w-xs object-contain"
              />
              <div className="flex w-full items-center justify-center gap-6">
                <a
                  href={MED12_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 transition-opacity hover:opacity-75"
                  aria-label={t("denverMeetup.med12Link")}
                >
                  <img
                    src="/images/med12_foundation_no_bg.png"
                    alt="The MED12 Foundation"
                    className="mx-auto h-14 w-full object-contain"
                  />
                </a>
                <a
                  href={MED13L_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 transition-opacity hover:opacity-75"
                  aria-label={t("denverMeetup.med13lLink")}
                >
                  <img
                    src="/images/med13l_foundation_trimmed.png"
                    alt="The MED13L Foundation"
                    className="mx-auto h-14 w-full object-contain"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-6">
              <Card className="border-primary/15">
                <CardContent className="space-y-6 p-6">
                  <div className="flex gap-3">
                    <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div><p className="font-semibold">{t("denverMeetup.date")}</p><p className="text-sm text-muted-foreground">{t("denverMeetup.day")}</p></div>
                  </div>
                  <div className="flex gap-3">
                    <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <p className="font-semibold">{t("denverMeetup.time")}</p>
                  </div>
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div><p className="font-semibold">{t("denverMeetup.venue")}</p><p className="text-sm text-muted-foreground">{t("denverMeetup.address")}</p></div>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">{t("denverMeetup.directions")}<ExternalLink className="ml-2 h-4 w-4" /></a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-primary/15" data-testid="card-denver-rare-reception">
                <CardContent className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-secondary">{t("denverMeetup.receptionDetailsLabel")}</p>
                  <h2 className="mt-2 font-heading text-xl font-bold">{t("denverMeetup.receptionTitle")}</h2>
                  <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-primary">{t("denverMeetup.receptionWhenWhere")}</h3>
                  <div className="mt-3 flex items-start gap-2 text-sm">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <p className="font-semibold">{t("denverMeetup.receptionVenue")}</p>
                      <p className="mt-1 text-muted-foreground">{t("denverMeetup.receptionAddress")}</p>
                    </div>
                  </div>
                  <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
                    {t("denverMeetup.receptionDate")}
                  </p>
                  <h3 className="mt-6 border-t pt-5 text-xs font-semibold uppercase tracking-wider text-primary">{t("denverMeetup.receptionWhatToKnow")}</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                    {(["receptionAdmission", "receptionWelcome", "receptionAttire", "receptionRefreshments"] as const).map((key) => (
                      <li key={key}>{t(`denverMeetup.${key}`)}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm leading-relaxed text-foreground">{t("denverMeetup.receptionDescription")}</p>
                  <Button variant="outline" className="mt-5 w-full" asChild>
                    <a href={RARE_RECEPTION_URL} target="_blank" rel="noopener noreferrer" data-testid="link-denver-rare-reception">
                      {t("denverMeetup.receptionLink")}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-secondary/30 bg-secondary/10">
                <CardContent className="p-6">
                  <Hotel className="h-6 w-6 text-primary" />
                  <h2 className="mt-3 font-heading text-xl font-bold">{t("denverMeetup.hotelTitle")}</h2>
                  <p className="mt-2 text-muted-foreground">{t("denverMeetup.hotelBody")}</p>
                  <p className="mt-3 font-semibold">{t("denverMeetup.hotelCode")}</p>
                  <Button className="mt-5 w-full" asChild>
                    <a href={HOTEL_URL} target="_blank" rel="noopener noreferrer">{t("denverMeetup.bookHotel")}<ExternalLink className="ml-2 h-4 w-4" /></a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-10">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-primary/15 bg-primary/5 p-5">
                  <TestTubes className="h-6 w-6 text-primary" />
                  <h2 className="mt-3 font-heading text-xl font-bold">{t("denverMeetup.biosampleTitle")}</h2>
                  <p className="mt-2 text-muted-foreground">{t("denverMeetup.biosampleBody")}</p>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <a
                      href={COMBINEDBRAIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-20 items-center justify-center p-3 transition-opacity hover:opacity-75"
                      aria-label={t("denverMeetup.combinedBrainLink")}
                    >
                      <img src="/images/combined_brain.png" alt="COMBINEDBrain" className="max-h-12 w-full object-contain" />
                    </a>
                    <a
                      href={SIMONS_SEARCHLIGHT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-20 items-center justify-center p-3 transition-opacity hover:opacity-75"
                      aria-label={t("denverMeetup.simonsLink")}
                    >
                      <img src="/images/simons-searchlight-logo.png" alt="Simons Searchlight" className="max-h-12 w-full object-contain" />
                    </a>
                  </div>
                </div>
                <div className="rounded-2xl border border-secondary/30 bg-secondary/10 p-5">
                  <Users className="h-6 w-6 text-primary" />
                  <h2 className="mt-3 font-heading text-xl font-bold">{t("denverMeetup.supportTitle")}</h2>
                  <p className="mt-2 text-muted-foreground">{t("denverMeetup.supportBody")}</p>
                  <Button variant="link" className="mt-3 h-auto p-0" asChild>
                    <a href={AES_URL} target="_blank" rel="noopener noreferrer">
                      {t("denverMeetup.aesLink")}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-3xl font-bold text-primary">{t("denverMeetup.agendaTitle")}</h2>
                <p className="mt-2 text-muted-foreground">{t("denverMeetup.agendaNote")}</p>
                <div className="mt-6 divide-y rounded-2xl border bg-card px-5">
                  {agenda.map(([time, title, body]) => (
                    <div key={time} className="grid gap-2 py-5 sm:grid-cols-[7rem_1fr]">
                      <p className="font-semibold text-secondary">{t(`denverMeetup.${time}`)}</p>
                      <div>
                        <h3 className="font-heading font-bold">{t(`denverMeetup.${title}`)}</h3>
                        {body && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(`denverMeetup.${body}`)}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6" data-testid="card-denver-virtual-option">
                <Video className="h-6 w-6 text-primary" />
                <h2 className="mt-3 font-heading text-2xl font-bold text-primary">{t("denverMeetup.virtualTitle")}</h2>
                <p className="mt-2 text-muted-foreground">{t("denverMeetup.virtualBody")}</p>
                <Button variant="outline" className="mt-5" asChild>
                  <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer">
                    {t("denverMeetup.virtualButton")}<ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
                <h2 className="font-heading text-2xl font-bold">{t("denverMeetup.ticketsTitle")}</h2>
                <p className="mt-2 text-primary-foreground/80">{t("denverMeetup.ticketsBody")}</p>
                <Button variant="secondary" className="mt-5" asChild>
                  <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer">{t("denverMeetup.register")}<ExternalLink className="ml-2 h-4 w-4" /></a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}