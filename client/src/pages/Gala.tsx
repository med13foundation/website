import { useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  Martini,
  Gavel,
  Music,
  Microscope,
  Sparkles,
  ArrowLeft,
  Wine,
  Tent,
  Ship,
  UtensilsCrossed,
  Video,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AuctionDonorRecognition, SponsorRecognition } from "@/components/GalaRecognition";
import logoUrl from "@assets/gala_disco_logo.png";

const RSVP_EMAIL = "gala@med13.org";
const AUCTION_URL = "https://givebutter.com/c/med13-gala-an-evening-for-answers-utpaup/auction";

function SparkleAccent({ className }: { className?: string }) {
  return <Sparkles className={`absolute pointer-events-none ${className || ""}`} aria-hidden="true" />;
}

export default function Gala() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = "An Evening for Answers - First Annual Gala | MED13 Foundation";
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute("content") ?? null;
    const description =
      "Join the MED13 Foundation's First Annual Gala, An Evening for Answers, on Saturday, October 10, 2026 at 7:00 PM at the UU Church of Palo Alto. RSVP at med13.org/gala.";
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    } else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = description;
      document.head.appendChild(m);
    }
    return () => {
      document.title = "MED13 Foundation";
      const md = document.querySelector('meta[name="description"]');
      if (md && prevDesc !== null) md.setAttribute("content", prevDesc);
    };
  }, []);

  const highlights = [
    { icon: Martini, title: t("gala.highlight1Title"), desc: t("gala.highlight1Desc") },
    { icon: Gavel, title: t("gala.highlight2Title"), desc: t("gala.highlight2Desc") },
    { icon: Music, title: t("gala.highlight3Title"), desc: t("gala.highlight3Desc") },
    { icon: Microscope, title: t("gala.highlight4Title"), desc: t("gala.highlight4Desc") },
  ];

  const program = [1, 2, 3, 4, 5, 6].map((i) => ({
    time: t(`gala.program${i}Time`),
    title: t(`gala.program${i}Title`),
  }));

  const auctionItems = [
    { icon: Wine, title: t("gala.auction1Title"), desc: t("gala.auction1Desc") },
    { icon: Tent, title: t("gala.auction2Title"), desc: t("gala.auction2Desc") },
    { icon: Ship, title: t("gala.auction3Title"), desc: t("gala.auction3Desc") },
    { icon: UtensilsCrossed, title: t("gala.auction4Title"), desc: t("gala.auction4Desc") },
  ];

  const sponsors = [1, 2, 3, 4, 5, 6].map((i) => ({
    title: t(`gala.sponsor${i}Title`),
    amount: t(`gala.sponsor${i}Amount`),
    desc: t(`gala.sponsor${i}Desc`),
    featured: i === 1,
  }));

  const moments = [1, 2, 3, 4, 5].map((i) => ({
    title: t(`gala.moment${i}Title`),
    amount: t(`gala.moment${i}Amount`),
    desc: t(`gala.moment${i}Desc`),
  }));

  const funds = [1, 2, 3].map((i) => ({
    title: t(`gala.funds${i}Title`),
    amount: t(`gala.funds${i}Amount`),
    desc: t(`gala.funds${i}Desc`),
  }));

  const readinessStats = [
    { value: "125+", label: t("gala.readinessFamilies") },
    { value: "17", label: t("gala.readinessCountries") },
    { value: "51", label: t("gala.readinessRegistry") },
    { value: "9", label: t("gala.readinessStudy") },
    { value: "2", label: t("gala.readinessLines") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28" data-testid="section-gala-hero">
        <div className="absolute inset-0 bg-gradient-to-b from-[#68B0AB] via-[#b8d8d3] to-[#FFD9C7]" />
        <SparkleAccent className="w-8 h-8 text-[#2D7A89]/60 top-10 left-[8%]" />
        <SparkleAccent className="w-6 h-6 text-[#E67E5C]/60 top-24 right-[10%]" />
        <SparkleAccent className="w-5 h-5 text-white/70 bottom-16 left-[15%]" />
        <SparkleAccent className="w-7 h-7 text-[#2D7A89]/50 bottom-10 right-[18%]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src={logoUrl} alt="MED13 Foundation Logo" className="h-32 w-auto mx-auto mb-6 drop-shadow-sm" data-testid="img-gala-logo" />
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#E67E5C] mb-4" data-testid="text-gala-eyebrow">
            {t("gala.eyebrow")}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-[#1d5f66] mb-4" data-testid="text-gala-title">
            {t("gala.title")}
          </h1>
          <p className="text-lg sm:text-xl italic text-[#d96a45] font-medium mb-8" data-testid="text-gala-tagline">
            {t("gala.tagline")}
          </p>
          <p className="text-base sm:text-lg text-[#3a3a3a] max-w-2xl mx-auto mb-10" data-testid="text-gala-invite">
            {t("gala.invite")}
          </p>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10">
            <div className="text-center">
              <p className="text-xs font-semibold tracking-widest uppercase text-[#1d5f66] flex items-center justify-center gap-1 mb-1">
                <Calendar className="w-3.5 h-3.5" /> {t("gala.dateLabel")}
              </p>
              <p className="text-lg font-semibold text-[#2a2a2a]" data-testid="text-gala-date">{t("gala.date")}</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold tracking-widest uppercase text-[#1d5f66] flex items-center justify-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5" /> {t("gala.timeLabel")}
              </p>
              <p className="text-lg font-semibold text-[#2a2a2a]" data-testid="text-gala-time">{t("gala.time")}</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold tracking-widest uppercase text-[#1d5f66] flex items-center justify-center gap-1 mb-1">
                <MapPin className="w-3.5 h-3.5" /> {t("gala.locationLabel")}
              </p>
              <p className="text-lg font-semibold text-[#2a2a2a]" data-testid="text-gala-location">{t("gala.location")}</p>
              <p className="text-sm text-[#4a4a4a]" data-testid="text-gala-address">{t("gala.address")}</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="bg-[#1d5f66] text-white hover:bg-[#174f55]"
              asChild
              data-testid="button-gala-auction-hero"
            >
              <a href={AUCTION_URL} target="_blank" rel="noopener noreferrer">
                <Gavel className="w-4 h-4 mr-2" />
                {t("gala.auctionButton")}
              </a>
            </Button>
            <Button
              size="lg"
              className="bg-[#E67E5C] border-[#d96a45] text-white"
              asChild
              data-testid="button-gala-rsvp"
            >
              <a href="https://givebutter.com/c/med13-gala-an-evening-for-answers-utpaup?gba_donor_ref=MH2MOtNFWTZCCdVB" target="_blank" rel="noopener noreferrer">
                {t("gala.rsvp")}
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#1d5f66] bg-white/70 text-[#1d5f66] hover:bg-white"
              asChild
              data-testid="button-gala-livestream"
            >
              <a href="https://givebutter.com/c/med13-gala-an-evening-for-answers-utpaup?gba_donor_ref=MH2MOtNFWTZCCdVB" target="_blank" rel="noopener noreferrer">
                <Video className="w-4 h-4 mr-2" />
                {t("gala.livestreamButton")}
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#1d5f66] bg-white/70 text-[#1d5f66] hover:bg-white"
              asChild
              data-testid="button-gala-sponsor"
            >
              <a
                href="#sponsorship"
                onClick={(event) => {
                  event.preventDefault();
                  const sponsorshipSection = document.getElementById("sponsorship");
                  if (sponsorshipSection) {
                    const headerOffset = 88;
                    const targetTop = sponsorshipSection.getBoundingClientRect().top + window.scrollY - headerOffset;
                    window.scrollTo({ top: targetTop, behavior: "auto" });
                    window.history.pushState(null, "", "#sponsorship");
                  }
                }}
              >
                {t("gala.sponsorButton")}
              </a>
            </Button>
          </div>
          <p className="text-sm text-[#4a4a4a] mt-4" data-testid="text-gala-rsvp-note">
            {t("gala.rsvpNote")}
          </p>
          <p className="text-sm text-[#4a4a4a] mt-1" data-testid="text-gala-livestream-note">
            {t("gala.livestreamNote")}
          </p>
          <p className="text-sm font-semibold text-[#1d5f66] mt-2" data-testid="text-gala-auction-opening">
            {t("gala.auctionOpening")}
          </p>
        </div>
      </section>

      {/* Registration and recognition stay close to the top of the page. */}
      <section className="py-16 sm:py-24 bg-muted" data-testid="section-gala-tickets">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary" data-testid="text-gala-tickets-title">
              {t("gala.ticketsTitle")}
            </h2>
          </div>
          <Card data-testid="card-gala-tickets">
            <CardContent className="pt-8 pb-8 text-center">
              <p className="text-lg font-heading font-bold text-foreground mb-1">{t("gala.ticketsGeneral")}</p>
              <p className="text-5xl font-heading font-bold text-primary mb-1" data-testid="text-gala-ticket-price">
                {t("gala.ticketsPrice")}
              </p>
              <p className="text-sm text-muted-foreground mb-6">{t("gala.ticketsPerPerson")}</p>
              <div className="flex justify-center mb-6">
                <Button asChild data-testid="button-gala-tickets-rsvp">
                  <a href="https://givebutter.com/c/med13-gala-an-evening-for-answers-utpaup?gba_donor_ref=MH2MOtNFWTZCCdVB" target="_blank" rel="noopener noreferrer">
                    {t("gala.rsvp")}
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground" data-testid="text-gala-attire">
                <span className="font-semibold text-foreground">{t("gala.ticketsAttireLabel")}</span>{" "}
                {t("gala.ticketsAttire")}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <SponsorRecognition />
      <AuctionDonorRecognition />

      {/* Auction preview */}
      <section id="auction" className="py-16 sm:py-24" data-testid="section-gala-auction">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase text-secondary mb-3">{t("gala.auctionEyebrow")}</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary" data-testid="text-gala-auction-title">
              {t("gala.auctionTitle")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {auctionItems.map((a, i) => (
              <Card key={i} data-testid={`card-gala-auction-${i + 1}`}>
                <CardContent className="pt-6">
                  <div className="w-11 h-11 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                    <a.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">{a.title}</h3>
                  <p className="text-sm text-muted-foreground">{a.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button size="lg" asChild data-testid="button-gala-auction">
              <a href={AUCTION_URL} target="_blank" rel="noopener noreferrer">
                <Gavel className="mr-2 h-4 w-4" />
                {t("gala.auctionButton")}
              </a>
            </Button>
            <p className="mt-3 text-sm font-medium text-muted-foreground">{t("gala.auctionOpening")}</p>
          </div>
        </div>
      </section>

      {/* The Evening */}
      <section className="py-16 sm:py-24" data-testid="section-gala-evening">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase text-secondary mb-3">{t("gala.eveningEyebrow")}</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-2">
              <span className="text-primary">{t("gala.eveningTitle1")}</span>{" "}
              <span className="text-destructive">{t("gala.eveningTitle2")}</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-4" data-testid="text-gala-evening-desc">
              {t("gala.eveningDesc")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h, i) => (
              <Card key={i} data-testid={`card-gala-highlight-${i + 1}`}>
                <CardContent className="pt-6">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <h.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">{h.title}</h3>
                  <p className="text-sm text-muted-foreground">{h.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 max-w-2xl mx-auto text-center">
            <blockquote className="text-xl italic text-foreground" data-testid="text-gala-quote">
              {t("gala.quote")}
            </blockquote>
            <p className="text-sm font-semibold text-secondary mt-3" data-testid="text-gala-quote-attribution">
              {t("gala.quoteAttribution")}
            </p>
          </div>
        </div>
      </section>

      {/* Trial readiness */}
      <section className="bg-primary py-12 sm:py-16" data-testid="section-gala-trial-readiness">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-sm font-semibold tracking-widest uppercase text-primary-foreground/75 mb-3">
              {t("gala.readinessEyebrow")}
            </p>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary-foreground" data-testid="text-gala-trial-readiness-title">
              {t("gala.readinessTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {readinessStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-5 text-center"
              >
                <p className="text-4xl font-heading font-bold text-[#FFD9C7]">{stat.value}</p>
                <p className="mt-2 text-sm leading-snug text-primary-foreground/90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Symposium */}
      <section className="py-16 sm:py-24 bg-muted" data-testid="section-gala-symposium">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold tracking-widest uppercase text-destructive mb-3">
            {t("gala.symposiumEyebrow")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-2" data-testid="text-gala-symposium-title">
            {t("gala.symposiumTitle")}
          </h2>
          <p className="text-base font-semibold text-[#2a2a2a] mb-4 flex items-center gap-2" data-testid="text-gala-symposium-date">
            <Calendar className="w-4 h-4 text-primary shrink-0" />
            {t("gala.symposiumDate")}
          </p>
          <p className="text-lg text-muted-foreground mb-6" data-testid="text-gala-symposium-desc">
            {t("gala.symposiumDesc")}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <p className="text-sm font-semibold text-primary" data-testid="text-gala-symposium-registration-status">
              {t("gala.symposiumRegistrationComingSoon")}
            </p>
            <Button variant="outline" size="sm" asChild data-testid="button-gala-symposium-details">
              <Link href="/symposium">
                {t("gala.symposiumDetailsButton")} <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Program */}
      <section className="py-16 sm:py-24" data-testid="section-gala-program">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase text-destructive mb-3">{t("gala.programEyebrow")}</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary" data-testid="text-gala-program-title">
              {t("gala.programTitle")}
            </h2>
          </div>
          <div>
            {program.map((p, i) => (
              <div
                key={i}
                className={`flex items-baseline gap-6 py-4 flex-wrap ${i < program.length - 1 ? "border-b border-border" : ""}`}
                data-testid={`row-gala-program-${i + 1}`}
              >
                <span className="font-semibold text-primary w-20 shrink-0">{p.time}</span>
                <span className="text-foreground">{p.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship */}
      <section id="sponsorship" className="scroll-mt-24 py-16 sm:py-24" data-testid="section-gala-sponsorship">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-sm font-semibold tracking-widest uppercase text-destructive mb-3">{t("gala.sponsorEyebrow")}</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-4" data-testid="text-gala-sponsor-title">
              {t("gala.sponsorTitle")}
            </h2>
            <p className="text-lg text-muted-foreground">{t("gala.sponsorDesc")}</p>
          </div>
          <div className="space-y-4">
            {sponsors.map((s, i) => (
              <Card
                key={i}
                className={s.featured ? "bg-primary text-primary-foreground" : undefined}
                data-testid={`card-gala-sponsor-${i + 1}`}
              >
                <CardContent className="pt-6 flex items-start justify-between gap-4 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-semibold tracking-widest uppercase mb-2 ${s.featured ? "text-primary-foreground/80" : "text-secondary"}`}>
                      {s.title}
                    </p>
                    <p className={`text-sm ${s.featured ? "text-primary-foreground/90" : "text-muted-foreground"}`}>{s.desc}</p>
                  </div>
                  <p className={`text-2xl font-heading font-bold shrink-0 ${s.featured ? "text-primary-foreground" : "text-primary"}`}>
                    {s.amount}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-sm font-semibold text-destructive mt-6" data-testid="text-gala-sponsor-deadline">
            {t("gala.sponsorDeadline")}
          </p>
          <Button className="mt-4" variant="outline" asChild data-testid="button-gala-sponsor-contact">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdn_spAtvG94tqcqpN1bvK0UwOsUfqiswTzmJpuvF855E2Isw/viewform?usp=sharing&ouid=100823584681284292020" target="_blank" rel="noopener noreferrer">
              {t("gala.sponsorContact")}
            </a>
          </Button>
        </div>
      </section>

      {/* Named moments */}
      <section className="py-16 sm:py-24 bg-muted" data-testid="section-gala-moments">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-sm font-semibold tracking-widest uppercase text-destructive mb-3">{t("gala.momentsEyebrow")}</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-4" data-testid="text-gala-moments-title">
              {t("gala.momentsTitle")}
            </h2>
            <p className="text-lg text-muted-foreground">{t("gala.momentsDesc")}</p>
          </div>
          <div className="space-y-4">
            {moments.map((m, i) => (
              <Card key={i} data-testid={`card-gala-moment-${i + 1}`}>
                <CardContent className="pt-6 flex items-start justify-between gap-4 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold tracking-widest uppercase text-secondary mb-2">{m.title}</p>
                    <p className="text-sm text-muted-foreground">{m.desc}</p>
                  </div>
                  <p className="text-2xl font-heading font-bold text-primary shrink-0">{m.amount}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6" data-testid="text-gala-moments-inkind">
            {t("gala.momentsInKind")}
          </p>
        </div>
      </section>

      {/* What your gift funds */}
      <section className="py-16 sm:py-24" data-testid="section-gala-funds">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-sm font-semibold tracking-widest uppercase text-destructive mb-3">{t("gala.fundsEyebrow")}</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4" data-testid="text-gala-funds-title">
              <span className="text-primary">{t("gala.fundsTitle1")}</span>{" "}
              <span className="text-destructive">{t("gala.fundsTitle2")}</span>
            </h2>
            <p className="text-lg text-muted-foreground">{t("gala.fundsDesc")}</p>
          </div>
          <div className="space-y-4">
            {funds.map((f, i) => (
              <Card key={i} data-testid={`card-gala-fund-${i + 1}`}>
                <CardContent className="pt-6 flex items-center justify-between gap-4 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <p className="font-heading font-bold text-foreground mb-1">{f.title}</p>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                  <p className="text-2xl font-heading font-bold text-primary shrink-0">{f.amount}</p>
                </CardContent>
              </Card>
            ))}
            <Card className="bg-primary text-primary-foreground" data-testid="card-gala-fund-4">
              <CardContent className="pt-6 flex items-center justify-between gap-4 flex-wrap">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold tracking-widest uppercase text-primary-foreground/80 mb-1">
                    {t("gala.funds4Label")}
                  </p>
                  <p className="font-heading font-bold mb-1">{t("gala.funds4Title")}</p>
                  <p className="text-sm text-primary-foreground/90">{t("gala.funds4Desc")}</p>
                </div>
                <p className="text-2xl font-heading font-bold shrink-0">{t("gala.funds4Amount")}</p>
              </CardContent>
            </Card>
            <Card className="bg-destructive text-destructive-foreground" data-testid="card-gala-goal">
              <CardContent className="pt-6 flex items-center justify-between gap-4 flex-wrap">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold tracking-widest uppercase text-destructive-foreground/80 mb-1">
                    {t("gala.fundsGoalLabel")}
                  </p>
                  <p className="text-sm text-destructive-foreground/90">{t("gala.fundsGoalDesc")}</p>
                </div>
                <p className="text-3xl font-heading font-bold shrink-0" data-testid="text-gala-goal-amount">
                  {t("gala.fundsGoalAmount")}
                </p>
              </CardContent>
            </Card>
          </div>
          <p className="text-sm font-semibold text-secondary mt-6 text-center" data-testid="text-gala-match-note">
            {t("gala.fundsMatch")}
          </p>
          <div className="text-center mt-6">
            <Button size="lg" variant="destructive" asChild data-testid="button-gala-donate">
              <a href="https://med13.org/?campaign=743443&frequency=one-time#donate" target="_blank" rel="noopener noreferrer">{t("gala.donateButton")}</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer notes */}
      <section className="py-12 border-t border-border" data-testid="section-gala-footer-notes">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <p className="text-sm font-semibold text-foreground" data-testid="text-gala-music-host">
            {t("gala.footerMusicBy")}{" "}
            <a
              href="https://www.twinflamebayarea.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
              data-testid="link-gala-music"
            >
              Twin Flame
            </a>{" "}
            · {t("gala.footerHost")}
          </p>
          <p className="text-sm text-muted-foreground" data-testid="text-gala-questions">
            {t("gala.footerQuestions")}
          </p>
          <p className="text-sm">
            <Link href="/champions" className="font-semibold text-primary underline underline-offset-4">{t("recognition.seeAll")}</Link>
          </p>
          <p className="text-xs text-muted-foreground" data-testid="text-gala-fiscal">
            {t("gala.footerFiscal")}
          </p>
          <div className="pt-4">
            <Button variant="ghost" asChild data-testid="button-gala-back-home">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("gala.backHome")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
