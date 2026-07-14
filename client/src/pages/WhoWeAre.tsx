import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Users, Microscope, Handshake } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const CONTACT_EMAIL = "research@med13.org";

interface Member {
  id: string;
  name: string;
  roleKey: string;
  photo?: string;
  bio?: string;
}

const directors: Member[] = [
  { id: "amy-krystosik", name: "Amy Krystosik, PhD, MPH", roleKey: "whoWeAre.director1Role" },
  { id: "alvaro-alvarez", name: "Álvaro Álvarez", roleKey: "whoWeAre.director2Role" },
  { id: "ed-krystosik", name: "Ed Krystosik", roleKey: "whoWeAre.director3Role" },
  { id: "cindy-badon", name: "Cindy Badon", roleKey: "whoWeAre.director4Role" },
  { id: "marissa-shorey", name: "Marissa Shorey", roleKey: "whoWeAre.director5Role" },
  { id: "riyad-hafeez", name: "Riyad Hafeez", roleKey: "whoWeAre.director6Role" },
  { id: "blair-young", name: "Blair Young", roleKey: "whoWeAre.director7Role" },
  { id: "charlotte-buchanan", name: "Charlotte Buchanan", roleKey: "whoWeAre.director8Role" },
];

const advisors: Member[] = [
  { id: "alysson-muotri", name: "Alysson Muotri, PhD", roleKey: "whoWeAre.advisor1Role" },
  { id: "alicia-campbell", name: "Alicia Campbell, PhD", roleKey: "whoWeAre.advisor2Role" },
  { id: "katrina-cooper", name: "Katrina Cooper, PhD", roleKey: "whoWeAre.advisor3Role" },
  { id: "angelica-delgado-vega", name: "Angelica Delgado-Vega, MD, PhD", roleKey: "whoWeAre.advisor4Role" },
  { id: "ann-nordgren", name: "Ann Nordgren, MD, PhD", roleKey: "whoWeAre.advisor5Role" },
];

const partners = [
  "COMBINEDBrain",
  "Rare Village Foundation",
  "CureNDD",
  "Simons Searchlight",
  "MED12 Foundation",
  "MED13L Foundation",
  "UCSF Rare Disease Center",
  "Muotri Lab — UC San Diego",
  "Ultragenyx",
  "EveryLife Foundation",
  "NORD",
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
    <Card data-testid={`card-member-${member.id}`}>
      <CardContent className="pt-6 flex flex-col items-center text-center gap-3">
        <Avatar className="h-24 w-24">
          {member.photo && <AvatarImage src={member.photo} alt={member.name} />}
          <AvatarFallback className="text-xl font-heading bg-[#68B0AB]/20 text-[#1d5f66]">
            {initials(member.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-heading font-bold text-foreground" data-testid={`text-member-name-${member.id}`}>
            {member.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1" data-testid={`text-member-role-${member.id}`}>
            {t(member.roleKey)}
          </p>
        </div>
        <p className="text-xs text-muted-foreground/70 italic">
          {member.bio ?? t("whoWeAre.bioComingSoon")}
        </p>
      </CardContent>
    </Card>
  );
}

export default function WhoWeAre() {
  const { t } = useTranslation();

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
      <section className="relative overflow-hidden py-20 sm:py-24" data-testid="section-who-hero">
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
      <section className="py-16" data-testid="section-who-story">
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
            <footer className="text-sm text-muted-foreground">— {t("whoWeAre.storyQuoteAuthor")}</footer>
          </blockquote>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-16 bg-muted/40" data-testid="section-who-board">
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

      {/* Scientific Advisory Board */}
      <section className="py-16" data-testid="section-who-sab">
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

      {/* Board Openings */}
      <section className="py-16 bg-muted/40" data-testid="section-who-openings">
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

      {/* Partners */}
      <section className="py-16" data-testid="section-who-partners">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-3">
            <Handshake className="h-8 w-8 text-[#2D7A89]" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
            {t("whoWeAre.partnersTitle")}
          </h2>
          <p className="text-muted-foreground mb-8">{t("whoWeAre.partnersSubtitle")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {partners.map((p) => (
              <span
                key={p}
                className="px-4 py-2 rounded-md bg-[#68B0AB]/10 text-sm font-medium text-[#1d5f66]"
                data-testid={`text-partner-${p.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}`}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
