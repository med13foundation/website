import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Users, Microscope, Stethoscope, Handshake, Award, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const CONTACT_EMAIL = "research@med13.org";

interface Member {
  id: string;
  name: string;
  roleKey: string;
  photo?: string;
  bioKey?: string;
  photoImgClass?: string;
}

const directors: Member[] = [
  {
    id: "amy-krystosik",
    name: "Amy Krystosik, PhD, MPH",
    roleKey: "whoWeAre.director1Role",
    photo: "/images/amy_krystosik_no_bg.png",
    bioKey: "whoWeAre.director1Bio",
  },
  { id: "alvaro-alvarez", name: "Álvaro Álvarez Peralta", roleKey: "whoWeAre.director2Role", photo: "/images/alvaro_alvarez_no_bg.png", bioKey: "whoWeAre.director2Bio" },
  { id: "ed-krystosik", name: "Ed Krystosik", roleKey: "whoWeAre.director3Role", photo: "/images/ed_krystosik_no_bg.png", bioKey: "whoWeAre.director3Bio" },
  { id: "cindy-badon", name: "Cindy Badon", roleKey: "whoWeAre.director4Role", photo: "/images/cindy_badon_no_bg.png", bioKey: "whoWeAre.director4Bio" },
  { id: "marissa-shorey", name: "Marissa Shorey, PMP", roleKey: "whoWeAre.director5Role", photo: "/images/marissa_shorey_no_bg.png", bioKey: "whoWeAre.director5Bio" },
  {
    id: "riyad-hafeez",
    name: "Riyad Hafeez",
    roleKey: "whoWeAre.director6Role",
    photo: "/images/riyad_hafeez_no_bg.png",
    bioKey: "whoWeAre.director6Bio",
  },
  { id: "blair-young", name: "Blair Young", roleKey: "whoWeAre.director7Role", photo: "/images/blair_young_no_bg.png", bioKey: "whoWeAre.director7Bio" },
  {
    id: "charlotte-buchanan",
    name: "Charlotte Buchanan",
    roleKey: "whoWeAre.director8Role",
    photo: "/images/charlotte_buchanan_no_bg.png",
    bioKey: "whoWeAre.director8Bio",
  },
];

const staff: Member[] = [
  {
    id: "manasa-chandrasekar",
    name: "Manasa Chandrasekar",
    roleKey: "whoWeAre.staff1Role",
    photo: "/images/manasa_chandrasekar_no_bg.png",
    photoImgClass: "object-cover object-top",
    bioKey: "whoWeAre.staff1Bio",
  },
  {
    id: "izabela-rezende",
    name: "Izabela M. Rezende, PhD",
    roleKey: "whoWeAre.staff2Role",
    photo: "/images/izabela_rezende_no_bg.png",
    bioKey: "whoWeAre.staff2Bio",
  },
];

const advisors: Member[] = [
  {
    id: "alicia-campbell",
    name: "Alicia Campbell, PhD",
    roleKey: "whoWeAre.advisor2Role",
    photo: "/images/alicia_campbell_no_bg.png",
    bioKey: "whoWeAre.advisor2Bio",
  },
  {
    id: "katrina-cooper",
    name: "Katrina Cooper, PhD",
    roleKey: "whoWeAre.advisor3Role",
    photo: "/images/katrina_cooper_no_bg.png",
    bioKey: "whoWeAre.advisor3Bio",
  },
  {
    id: "dylan-taatjes",
    name: "Dylan J. Taatjes, PhD",
    roleKey: "whoWeAre.advisor6Role",
    photo: "/images/dylan_taatjes_no_bg.png",
    bioKey: "whoWeAre.advisor6Bio",
  },
  {
    id: "katja-brose",
    name: "Katja Brose, PhD",
    roleKey: "whoWeAre.advisor7Role",
    photo: "/images/katja_brose_no_bg.png",
    bioKey: "whoWeAre.advisor7Bio",
  },
  {
    id: "kuanglei-tsai",
    name: "Kuang-Lei Tsai, PhD",
    roleKey: "whoWeAre.advisor8Role",
    photo: "/images/kuanglei_tsai_no_bg.png",
    bioKey: "whoWeAre.advisor8Bio",
  },
  {
    id: "melissa-haendel",
    name: "Melissa Haendel, PhD",
    roleKey: "whoWeAre.advisor9Role",
    photo: "/images/melissa_haendel_no_bg.png",
    bioKey: "whoWeAre.advisor9Bio",
  },
];

const clinicians: Member[] = [
  {
    id: "carla-marini",
    name: "Carla Marini, MD, PhD",
    roleKey: "whoWeAre.clinician1Role",
    photo: "/images/carla_marini_no_bg.png",
    bioKey: "whoWeAre.clinician1Bio",
  },
  {
    id: "angelica-delgado-vega",
    name: "Angelica Delgado-Vega, MD, PhD",
    roleKey: "whoWeAre.advisor4Role",
    photo: "/images/angelica_delgado_no_bg.png",
    bioKey: "whoWeAre.advisor4Bio",
  },
  {
    id: "ann-nordgren",
    name: "Ann Nordgren, MD, PhD",
    roleKey: "whoWeAre.advisor5Role",
    photo: "/images/ann_nordgren_no_bg.png",
    bioKey: "whoWeAre.advisor5Bio",
  },
];

interface Partner {
  name: string;
  logo?: string;
  url?: string;
  darkBg?: boolean;
  tall?: boolean;
  wide?: boolean;
}

const partners: Partner[] = [
  { name: "COMBINEDBrain", logo: "/images/combined_brain.png", url: "https://combinedbrain.org/" },
  { name: "Rare Village Foundation", logo: "/images/rare_village.png", url: "https://rarevillage.org/" },
  { name: "CureNDD", logo: "/images/curendd-community-partner.png", url: "https://www.curendd.org/", wide: true },

  { name: "MED12 Foundation", logo: "/images/med12_foundation_no_bg.png", url: "https://www.med12.org/" },
  { name: "MED13L Foundation", logo: "/images/med13l_foundation_trimmed.png", url: "https://med13l.org/" },
  { name: "MEDopathies Alliance", logo: "/images/medopathies_alliance_no_bg.png", wide: true },
  { name: "REN", logo: "/images/ren_logo.avif", url: "https://www.rareepilepsynetwork.org/" },
];

function initials(name: string) {
  return name
    .replace(/,.*$/, "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function MemberCard({ member }: { member: Member }) {
  const { t } = useTranslation();
  return (
    <Card className="overflow-hidden" data-testid={`card-member-${member.id}`}>
      {/* Photo */}
      <div className="w-full h-44 bg-[#68B0AB]/10 overflow-hidden">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className={`w-full h-full ${member.photoImgClass ?? "object-contain"} grayscale`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl font-heading font-bold text-[#1d5f66]/40">
              {initials(member.name)}
            </span>
          </div>
        )}
      </div>
      {/* Info */}
      <CardContent className="pt-4 pb-5 flex flex-col gap-2">
        <div>
          <h3 className="font-heading font-bold text-foreground leading-snug" data-testid={`text-member-name-${member.id}`}>
            {member.name}
          </h3>
          <p className="text-sm text-[#2D7A89] font-medium mt-0.5" data-testid={`text-member-role-${member.id}`}>
            {t(member.roleKey)}
          </p>
        </div>
        {member.bioKey ? (
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t(member.bioKey)}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground/50 italic">
            {t("whoWeAre.bioComingSoon")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function WhoWeAre() {
  const { t } = useTranslation();

  useEffect(() => {
    let intervalId: number | undefined;

    const scrollToSection = () => {
      if (intervalId !== undefined) window.clearInterval(intervalId);
      if (!window.location.hash) return;

      const id = decodeURIComponent(window.location.hash.slice(1));
      let attempts = 0;
      let stablePasses = 0;

      intervalId = window.setInterval(() => {
        attempts += 1;
        const target = document.getElementById(id);

        if (target) {
          const headerOffset = 64;
          const currentTop = target.getBoundingClientRect().top;

          if (Math.abs(currentTop - headerOffset) > 2) {
            const targetTop = currentTop + window.scrollY - headerOffset;
            window.scrollTo(0, Math.max(0, targetTop));
            stablePasses = 0;
          } else {
            stablePasses += 1;
          }
        }

        if (stablePasses >= 5 || attempts >= 50) {
          if (intervalId !== undefined) window.clearInterval(intervalId);
        }
      }, 100);
    };

    scrollToSection();
    window.addEventListener("hashchange", scrollToSection);

    return () => {
      if (intervalId !== undefined) window.clearInterval(intervalId);
      window.removeEventListener("hashchange", scrollToSection);
    };
  }, []);

  useEffect(() => {
    document.title = "Who We Are - Board & Scientific Advisors | MED13 Foundation";
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute("content") ?? null;
    const description =
      "Meet the MED13 Foundation team: our parent-led Board of Directors and world-class Scientific Advisory Board working to accelerate research for MED13 syndrome.";
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
        <section id="who-overview" className="scroll-mt-16 relative overflow-hidden py-20 sm:py-24" data-testid="section-who-hero">
        <div className="absolute inset-0 bg-gradient-to-b from-[#68B0AB] via-[#b8d8d3] to-background" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-[#1d5f66] mb-4" data-testid="text-who-title">
            {t("whoWeAre.heroTitle")}
          </h1>
          <p className="text-lg text-[#E67E5C] font-medium mb-6" data-testid="text-who-subtitle">
            {t("whoWeAre.heroSubtitle")}
          </p>
          <p className="text-base text-foreground/80" data-testid="text-who-intro">
            {t("whoWeAre.heroIntro")}
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section id="our-story" className="scroll-mt-16 py-16" data-testid="section-who-story">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6 text-center">
            {t("whoWeAre.storyTitle")}
          </h2>
          <p className="text-muted-foreground mb-4">{t("whoWeAre.storyContent1")}</p>
          <p className="text-muted-foreground mb-8">{t("whoWeAre.storyContent2")}</p>
          <blockquote className="text-center px-6 py-8 rounded-md bg-[#68B0AB]/10">
            <p className="text-xl font-highlight italic text-[#1d5f66] mb-3">
              "{t("whoWeAre.storyQuote")}"
            </p>
            <footer className="text-sm text-muted-foreground">{t("whoWeAre.storyQuoteAuthor")}</footer>
          </blockquote>
        </div>
      </section>

      {/* Board of Directors */}
      <section id="board-of-directors" className="scroll-mt-16 py-16 bg-muted/40" data-testid="section-who-board">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-3">
              <Users className="h-8 w-8 text-[#2D7A89]" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
              {t("whoWeAre.boardTitle")}
            </h2>
            <p className="text-muted-foreground">{t("whoWeAre.boardSubtitle")}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {directors.map((m) => (
              <MemberCard key={m.id} member={m} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section id="our-team" className="scroll-mt-16 py-16" data-testid="section-who-staff">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-3">
              <Handshake className="h-8 w-8 text-[#2D7A89]" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
              {t("whoWeAre.staffTitle")}
            </h2>
            <p className="text-muted-foreground">{t("whoWeAre.staffSubtitle")}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-2xl mx-auto">
            {staff.map((m) => (
              <MemberCard key={m.id} member={m} />
            ))}
          </div>
        </div>
      </section>

      {/* Scientific Advisory Board */}
      <section id="scientific-advisory-board" className="scroll-mt-16 py-16 bg-muted/40" data-testid="section-who-sab">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-3">
              <Microscope className="h-8 w-8 text-[#2D7A89]" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
              {t("whoWeAre.sabTitle")}
            </h2>
            <p className="text-muted-foreground">{t("whoWeAre.sabSubtitle")}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {advisors.map((m) => (
              <MemberCard key={m.id} member={m} />
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Advisory Board */}
      <section id="clinical-advisory-board" className="scroll-mt-16 py-16 bg-muted/40" data-testid="section-who-cab">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-3">
              <Stethoscope className="h-8 w-8 text-[#2D7A89]" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
              {t("whoWeAre.cabTitle")}
            </h2>
            <p className="text-muted-foreground">{t("whoWeAre.cabSubtitle")}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {clinicians.map((m) => (
              <MemberCard key={m.id} member={m} />
            ))}
          </div>
        </div>
      </section>

      {/* Board Openings */}
      <section id="board-openings" className="scroll-mt-16 py-16" data-testid="section-who-openings">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            {t("whoWeAre.openingsTitle")}
          </h2>
          <p className="text-muted-foreground mb-6">{t("whoWeAre.openingsText")}</p>
          <Button asChild data-testid="button-who-contact">
            <a href={`mailto:${CONTACT_EMAIL}?subject=Board%20Member%20Interest`}>
              <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
              {t("whoWeAre.openingsButton")}
            </a>
          </Button>
        </div>
      </section>

      {/* Funders */}
      <section id="funders" className="scroll-mt-16 py-16 bg-[#f4f8f5]" data-testid="section-who-funders">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-3">
              <Award className="h-8 w-8 text-[#2D7A89]" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
              {t("whoWeAre.fundersTitle")}
            </h2>
            <p className="text-muted-foreground">{t("whoWeAre.fundersSubtitle")}</p>
          </div>

          <Card className="overflow-hidden border-primary/20 shadow-sm" data-testid="card-funder-anthropic">
            <div className="grid md:grid-cols-[0.8fr_1.2fr]">
              <a
                href="https://www.anthropic.com/news/rare-disease-research-grants"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-48 items-center justify-center bg-[#f7f6f2] p-8 transition-colors hover:bg-[#efede7]"
                aria-label={t("whoWeAre.anthropicLinkLabel")}
                data-testid="link-funder-anthropic-logo"
              >
                <img
                  src="/images/anthropic-wordmark.svg"
                  alt={t("whoWeAre.anthropicLogoAlt")}
                  className="w-full max-w-[285px]"
                />
              </a>
              <CardContent className="flex flex-col justify-center p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                  {t("whoWeAre.anthropicProgram")}
                </p>
                <h3 className="mt-3 font-heading text-2xl font-bold text-foreground sm:text-3xl" data-testid="text-anthropic-award">
                  {t("whoWeAre.anthropicAward")}
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {t("whoWeAre.anthropicDescription")}
                </p>
                <p className="mt-4 font-medium leading-relaxed text-foreground">
                  {t("whoWeAre.anthropicThanks")}
                </p>
                <Button variant="outline" className="mt-6 self-start" asChild data-testid="button-anthropic-announcement">
                  <a
                    href="https://www.anthropic.com/news/rare-disease-research-grants"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("whoWeAre.anthropicReadAnnouncement")}
                    <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="scroll-mt-16 py-16 bg-muted/40" data-testid="section-who-partners">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-3">
            <Handshake className="h-8 w-8 text-[#2D7A89]" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
            {t("whoWeAre.partnersTitle")}
          </h2>
          <p className="text-muted-foreground mb-8">{t("whoWeAre.partnersSubtitle")}</p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {partners.map((p) => {
              const PartnerContainer = p.url ? "a" : "span";
              return p.logo ? (
                <PartnerContainer
                  key={p.name}
                  href={p.url}
                  target={p.url ? "_blank" : undefined}
                  rel={p.url ? "noopener noreferrer" : undefined}
                  className={`flex items-center justify-center px-6 py-4 h-24${p.url ? " rounded-lg transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" : ""}`}
                  data-testid={`text-partner-${p.name.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}`}
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    className={`object-contain ${
                      p.wide
                        ? "h-auto max-h-20 w-full max-w-[320px]"
                        : p.tall
                          ? "h-32 w-auto max-w-[200px]"
                          : "h-full w-auto max-w-[160px]"
                    }`}
                  />
                </PartnerContainer>
              ) : (
                <span
                  key={p.name}
                  className="flex items-center justify-center px-5 py-3 rounded-lg h-16 bg-[#68B0AB]/10 text-sm font-medium text-[#1d5f66]"
                  data-testid={`text-partner-${p.name.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}`}
                >
                  {p.name}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
