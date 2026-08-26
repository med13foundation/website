import { useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, BookOpenText, CalendarDays, CheckCircle2, Clock3, Globe2, LockKeyhole, PlayCircle, Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

type Session = {
  time: string;
  type?: string;
  title: string;
  description: string;
  speakers?: string;
};

type Speaker = {
  name: string;
  affiliation: string;
  role?: string;
  bio: string;
  image?: string;
};

function Initials({ name }: { name: string }) {
  const letters = name
    .replace(/[^A-Za-z\s-]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-secondary/40 bg-secondary/10 text-xl font-heading font-bold text-primary">
      {letters}
    </div>
  );
}

export default function Symposium() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("symposium.metaTitle");
    const metaDesc = document.querySelector('meta[name="description"]');
    const previousDescription = metaDesc?.getAttribute("content") ?? null;
    const description = t("symposium.metaDescription");

    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    return () => {
      document.title = "MED13 Foundation";
      const currentMeta = document.querySelector('meta[name="description"]');
      if (currentMeta && previousDescription !== null) {
        currentMeta.setAttribute("content", previousDescription);
      }
    };
  }, [t]);

  const morningSessions: Session[] = [
    {
      time: t("symposium.session1Time"),
      title: t("symposium.session1Title"),
      description: t("symposium.session1Description"),
      speakers: t("symposium.session1Speakers"),
    },
    {
      time: t("symposium.session2Time"),
      type: t("symposium.keynoteLabel"),
      title: t("symposium.session2Title"),
      description: t("symposium.session2Description"),
      speakers: t("symposium.session2Speakers"),
    },
    {
      time: t("symposium.session3Time"),
      type: t("symposium.panelLabel"),
      title: t("symposium.session3Title"),
      description: t("symposium.session3Description"),
      speakers: t("symposium.session3Speakers"),
    },
  ];

  const afternoonSessions: Session[] = [
    {
      time: t("symposium.session4Time"),
      title: t("symposium.session4Title"),
      description: t("symposium.session4Description"),
      speakers: t("symposium.session4Speakers"),
    },
    {
      time: t("symposium.session5Time"),
      type: t("symposium.panelLabel"),
      title: t("symposium.session5Title"),
      description: t("symposium.session5Description"),
      speakers: t("symposium.session5Speakers"),
    },
    {
      time: t("symposium.session6Time"),
      type: t("symposium.keynoteLabel"),
      title: t("symposium.session6Title"),
      description: t("symposium.session6Description"),
      speakers: t("symposium.session6Speakers"),
    },
    {
      time: t("symposium.session7Time"),
      type: t("symposium.familyPanelLabel"),
      title: t("symposium.session7Title"),
      description: t("symposium.session7Description"),
      speakers: t("symposium.session7Speakers"),
    },
    {
      time: t("symposium.session8Time"),
      title: t("symposium.session8Title"),
      description: t("symposium.session8Description"),
    },
  ];

  const speakers: Speaker[] = [
    {
      name: t("symposium.speaker1Name"),
      affiliation: t("symposium.speaker1Affiliation"),
      role: t("symposium.speaker1Role"),
      bio: t("symposium.speaker1Bio"),
      image: "/images/kuanglei_tsai_no_bg.png",
    },
    {
      name: t("symposium.speaker2Name"),
      affiliation: t("symposium.speaker2Affiliation"),
      role: t("symposium.speaker2Role"),
      bio: t("symposium.speaker2Bio"),
      image: "/images/dylan_taatjes_no_bg.png",
    },
    {
      name: t("symposium.speaker3Name"),
      affiliation: t("symposium.speaker3Affiliation"),
      bio: t("symposium.speaker3Bio"),
      image: "/images/carla_marini_no_bg.png",
    },
    {
      name: t("symposium.speaker4Name"),
      affiliation: t("symposium.speaker4Affiliation"),
      bio: t("symposium.speaker4Bio"),
    },
    {
      name: t("symposium.speaker5Name"),
      affiliation: t("symposium.speaker5Affiliation"),
      bio: t("symposium.speaker5Bio"),
    },
    {
      name: t("symposium.speaker6Name"),
      affiliation: t("symposium.speaker6Affiliation"),
      role: t("symposium.speaker6Role"),
      bio: t("symposium.speaker6Bio"),
    },
    {
      name: t("symposium.speaker7Name"),
      affiliation: t("symposium.speaker7Affiliation"),
      bio: t("symposium.speaker7Bio"),
    },
    {
      name: t("symposium.speaker8Name"),
      affiliation: t("symposium.speaker8Affiliation"),
      role: t("symposium.speaker8Role"),
      bio: t("symposium.speaker8Bio"),
    },
    {
      name: t("symposium.speaker9Name"),
      affiliation: t("symposium.speaker9Affiliation"),
      role: t("symposium.speaker9Role"),
      bio: t("symposium.speaker9Bio"),
    },
    {
      name: t("symposium.speaker10Name"),
      affiliation: t("symposium.speaker10Affiliation"),
      role: t("symposium.speaker10Role"),
      bio: t("symposium.speaker10Bio"),
    },
    {
      name: t("symposium.speaker11Name"),
      affiliation: t("symposium.speaker11Affiliation"),
      bio: t("symposium.speaker11Bio"),
    },
  ];

  const renderSession = (session: Session, index: number) => (
    <div
      key={`${session.time}-${session.title}`}
      className="grid gap-4 border-b border-border py-6 last:border-b-0 sm:grid-cols-[7rem_1fr]"
      data-testid={`card-symposium-session-${index}`}
    >
      <p className="font-semibold tabular-nums text-secondary">{session.time}</p>
      <div>
        {session.type && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary/65">{session.type}</p>
        )}
        <h3 className="font-heading text-lg font-bold text-foreground">{session.title}</h3>
        <p className="mt-2 leading-relaxed text-muted-foreground">{session.description}</p>
        {session.speakers && <p className="mt-3 text-sm font-medium leading-relaxed text-foreground">{session.speakers}</p>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        <section className="relative overflow-hidden border-b border-border bg-[#f4f8f5] py-16 sm:py-24" data-testid="section-symposium-hero">
          <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-[#d9f0e7] blur-3xl" aria-hidden="true" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#f7dce8] blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="text-center lg:text-left">
                <img
                  src="/images/medopathies_alliance_no_bg.png"
                  alt={t("symposium.logoAlt")}
                  className="mx-auto mb-8 w-56 sm:w-64 lg:mx-0"
                  data-testid="img-symposium-logo"
                />
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-secondary" data-testid="text-symposium-eyebrow">
                  {t("symposium.heroEyebrow")}
                </p>
                <h1 className="font-heading text-4xl font-bold leading-tight text-primary sm:text-5xl lg:text-6xl" data-testid="text-symposium-title">
                  {t("symposium.title")}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground lg:text-xl" data-testid="text-symposium-intro">
                  {t("symposium.heroIntro")}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <Button size="lg" disabled data-testid="button-symposium-registration">
                    {t("symposium.registrationStatus")}
                  </Button>
                  <Button size="lg" variant="outline" asChild data-testid="button-symposium-program">
                    <a href="#program">
                      {t("symposium.viewProgram")} <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
                <p className="mt-3 text-sm text-muted-foreground" data-testid="text-symposium-registration-note">
                  {t("symposium.registrationNote")}
                </p>
              </div>

              <div className="rounded-2xl border border-primary/10 bg-white/80 p-5 shadow-sm backdrop-blur sm:p-8">
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="flex items-start gap-3 rounded-xl bg-primary px-4 py-4 text-primary-foreground">
                    <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-[#bfe9d2]" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">{t("symposium.dateLabel")}</p>
                      <p className="mt-1 font-semibold">{t("symposium.date")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl bg-secondary/10 px-4 py-4 text-foreground">
                    <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">{t("symposium.timeLabel")}</p>
                      <p className="mt-1 font-semibold">{t("symposium.time")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl bg-[#f7e7ef] px-4 py-4 text-foreground">
                    <Globe2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c65f9e]" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">{t("symposium.formatLabel")}</p>
                      <p className="mt-1 font-semibold">{t("symposium.format")}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-start gap-3 border-t border-border pt-6">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                  <p className="text-sm leading-relaxed text-muted-foreground">{t("symposium.openAccessNote")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24" data-testid="section-symposium-why">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">{t("symposium.whyEyebrow")}</p>
                <h2 className="mt-3 font-heading text-3xl font-bold text-primary sm:text-4xl" data-testid="text-symposium-why-title">
                  {t("symposium.whyTitle")}
                </h2>
              </div>
              <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
                <p>{t("symposium.whyBody1")}</p>
                <p>{t("symposium.whyBody2")}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="program" className="bg-muted py-16 sm:py-24" data-testid="section-symposium-program">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">{t("symposium.programEyebrow")}</p>
                <h2 className="mt-3 font-heading text-3xl font-bold text-primary sm:text-4xl" data-testid="text-symposium-program-title">
                  {t("symposium.programTitle")}
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{t("symposium.programNote")}</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card data-testid="card-symposium-morning">
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-heading text-2xl font-bold text-primary">{t("symposium.morningTitle")}</h3>
                    <span className="text-sm font-semibold text-secondary">{t("symposium.morningTime")}</span>
                  </div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t("symposium.morningTheme")}</p>
                  <div>{morningSessions.map((session, index) => renderSession(session, index + 1))}</div>
                  <div className="border-t border-dashed border-border pt-5 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {t("symposium.middayBreak")}
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-symposium-afternoon">
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-heading text-2xl font-bold text-primary">{t("symposium.afternoonTitle")}</h3>
                    <span className="text-sm font-semibold text-secondary">{t("symposium.afternoonTime")}</span>
                  </div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t("symposium.afternoonTheme")}</p>
                  <div>{afternoonSessions.map((session, index) => renderSession(session, index + 4))}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24" data-testid="section-symposium-speakers">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">{t("symposium.speakersEyebrow")}</p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-primary sm:text-4xl" data-testid="text-symposium-speakers-title">
                {t("symposium.speakersTitle")}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("symposium.speakersIntro")}</p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {speakers.map((speaker, index) => (
                <Card key={speaker.name} className="h-full" data-testid={`card-symposium-speaker-${index + 1}`}>
                  <CardContent className="flex h-full gap-5 p-5 sm:p-6">
                    {speaker.image ? (
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="h-20 w-20 shrink-0 rounded-full border-4 border-secondary/40 object-cover"
                      />
                    ) : (
                      <Initials name={speaker.name} />
                    )}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="font-heading text-lg font-bold text-foreground">{speaker.name}</h3>
                        {speaker.role && <span className="text-xs font-semibold uppercase tracking-wider text-secondary">{speaker.role}</span>}
                      </div>
                      <p className="mt-1 text-sm font-medium leading-relaxed text-muted-foreground">{speaker.affiliation}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{speaker.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-16 text-primary-foreground sm:py-24" data-testid="section-symposium-access">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#bfe9d2]">{t("symposium.accessEyebrow")}</p>
              <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl" data-testid="text-symposium-access-title">
                {t("symposium.accessTitle")}
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-xl border border-white/15 bg-white/10 p-6">
                <BookOpenText className="mb-5 h-6 w-6 text-[#bfe9d2]" />
                <h3 className="font-heading text-lg font-bold">{t("symposium.openTitle")}</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">{t("symposium.openBody")}</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/10 p-6">
                <LockKeyhole className="mb-5 h-6 w-6 text-[#f4b5d2]" />
                <h3 className="font-heading text-lg font-bold">{t("symposium.familyTitle")}</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">{t("symposium.familyBody")}</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/10 p-6">
                <Users className="mb-5 h-6 w-6 text-[#bfe9d2]" />
                <h3 className="font-heading text-lg font-bold">{t("symposium.privacyTitle")}</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">{t("symposium.privacyBody")}</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/15 pt-6 text-sm text-primary-foreground/80">
              <Video className="h-4 w-4 text-[#bfe9d2]" />
              <span>{t("symposium.recordingNote")}</span>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20" data-testid="section-symposium-closing">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <PlayCircle className="mx-auto h-8 w-8 text-secondary" />
            <h2 className="mt-4 font-heading text-3xl font-bold text-primary sm:text-4xl" data-testid="text-symposium-closing-title">
              {t("symposium.closingTitle")}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t("symposium.closingBody")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button variant="outline" asChild data-testid="button-symposium-back-gala">
                <Link href="/gala">
                  <ArrowLeft className="mr-2 h-4 w-4" /> {t("symposium.backGala")}
                </Link>
              </Button>
              <Button asChild data-testid="button-symposium-home">
                <Link href="/">{t("symposium.backHome")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}