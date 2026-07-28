import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Users, Microscope, Stethoscope, Handshake } from "lucide-react";
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
  {
    id: "amy-krystosik",
    name: "Amy Krystosik, PhD, MPH",
    roleKey: "whoWeAre.director1Role",
    photo: "/images/amy_krystosik.png",
    bio: "Epidemiologist and data scientist who became a rare-disease founder after her son's MED13 diagnosis. She founded the MED13 Foundation in 2024 to build the infrastructure families need to reach emerging therapies, including a biorepository, natural-history registry, and clinical protocols developed through COMBINEDBrain. She previously spent six years as a data scientist at the Chan Zuckerberg Initiative and a decade building global health research cohorts. PhD in Epidemiology; MPH in international health and development; postdoctoral training in pediatric infectious disease epidemiology and community health at Stanford School of Medicine.",
  },
  { id: "alvaro-alvarez", name: "Álvaro Álvarez", roleKey: "whoWeAre.director2Role", photo: "/images/alvaro_alvarez.png" },
  { id: "ed-krystosik", name: "Ed Krystosik", roleKey: "whoWeAre.director3Role", photo: "/images/ed_krystosik.png" },
  { id: "cindy-badon", name: "Cindy Badon", roleKey: "whoWeAre.director4Role", photo: "/images/cindy_badon.png" },
  { id: "marissa-shorey", name: "Marissa Shorey", roleKey: "whoWeAre.director5Role", photo: "/images/marissa_shorey.png" },
  {
    id: "riyad-hafeez",
    name: "Riyad Hafeez",
    roleKey: "whoWeAre.director6Role",
    photo: "/images/riyad_hafeez.jpg",
    bio: "C-suite technology leader with over two decades in enterprise IT strategy, cybersecurity oversight, and digital innovation across Saudi Arabia and international markets, spanning sectors from banking and government to health and retail. His youngest daughter's diagnosis with MED13 syndrome inspired him to champion care and advocacy for affected families. He contributes to patient advocacy, research acceleration, and biorepository development at the MED13 Foundation.",
  },
  { id: "blair-young", name: "Blair Young", roleKey: "whoWeAre.director7Role", photo: "/images/blair_young.png" },
  {
    id: "charlotte-buchanan",
    name: "Charlotte Buchanan",
    roleKey: "whoWeAre.director8Role",
    photo: "/images/charlotte_buchanan.png",
    bio: "Mom to a son with MED13-related syndrome and an expert at navigating therapies and healthcare providers. Passionate about research and advocacy, she also works in product management in the healthcare technology space. She lives in North Carolina with her husband Jon and two boys.",
  },
];

const advisors: Member[] = [
  {
    id: "alicia-campbell",
    name: "Alicia Campbell, PhD",
    roleKey: "whoWeAre.advisor2Role",
    photo: "/images/alicia_campbell.png",
    bio: "Research Program Coordinator at the Brown Virtual Integrated Special Needs Center. Her doctoral work centered on mitochondrial structure and cellular membrane composition dynamics. She focuses on translational research and researcher-clinician-advocate collaborations.",
  },
  {
    id: "katrina-cooper",
    name: "Katrina Cooper, PhD",
    roleKey: "whoWeAre.advisor3Role",
    photo: "/images/katrina_cooper.png",
    bio: "Molecular cell biologist studying the fundamental cellular mechanisms relevant to rare disease, bringing bench-science depth to the alliance's scientific program.",
  },
  {
    id: "dylan-taatjes",
    name: "Dylan J. Taatjes, PhD",
    roleKey: "whoWeAre.advisor6Role",
    photo: "/images/dylan_taatjes.png",
    bio: "Leads a lab defining the architecture and function of the Mediator complex and its CDK8 kinase module, the machinery at the center of the Medopathies. His landmark discovery established foundational links in the gene transcription disrupted across all three MEDopathy genes.",
  },
  {
    id: "katja-brose",
    name: "Katja Brose, PhD",
    roleKey: "whoWeAre.advisor7Role",
    photo: "/images/katja_brose_drive.jpg",
    bio: "Neuroscientist and scientific strategist with 25+ years of experience launching and growing scientific initiatives. Founder of Lark Science Advisors; formerly Neuroscience Program Lead at Chan Zuckerberg Initiative, where she established the Neurodegeneration Challenge Network and helped develop the N=1 Collaborative, which strengthened partnerships between researchers and patient organizations. Previously Editor-in-Chief of Neuron at Cell Press.",
  },
  {
    id: "kuanglei-tsai",
    name: "Kuang-Lei Tsai, PhD",
    roleKey: "whoWeAre.advisor8Role",
    photo: "/images/kuanglei_tsai_drive.jpg",
    bio: "Associate Professor of Biochemistry and Molecular Biology at McGovern Medical School, UTHealth Houston. Internationally recognized for pioneering cryo-EM studies on the structure and function of the Mediator complex, including the critical role of the MED13 subunit in regulating Mediator activity, and how alterations in this complex contribute to human disease.",
  },
];

const clinicians: Member[] = [
  {
    id: "carla-marini",
    name: "Carla Marini, MD, PhD",
    roleKey: "whoWeAre.clinician1Role",
    photo: "/images/carla_marini.jpg",
  },
  {
    id: "angelica-delgado-vega",
    name: "Angelica Delgado-Vega, MD, PhD",
    roleKey: "whoWeAre.advisor4Role",
    photo: "/images/angelica_delgado.png",
    bio: "Clinical geneticist focused on the diagnosis and characterization of rare neurodevelopmental disorders, contributing European clinical and genomic expertise.",
  },
  {
    id: "ann-nordgren",
    name: "Ann Nordgren, MD, PhD",
    roleKey: "whoWeAre.advisor5Role",
    photo: "/images/ann_nordgren.png",
    bio: "Senior clinical geneticist at Karolinska Institute in Stockholm, specializing in rare genetic disorders and rare disease gene discovery and diagnostics.",
  },
];

interface Partner {
  name: string;
  logo?: string;
  darkBg?: boolean;
  tall?: boolean;
}

const partners: Partner[] = [
  { name: "COMBINEDBrain", logo: "/images/combined_brain.png" },
  { name: "Rare Village Foundation", logo: "/images/rare_village.png" },
  { name: "CureNDD", logo: "/images/curendd.png" },

  { name: "MED12 Foundation", logo: "/images/med12_foundation.png" },
  { name: "MED13L Foundation", logo: "/images/med13l_foundation.png" },
  { name: "MEDopathies Alliance", logo: "/images/medopathies_alliance_no_bg.png", tall: true },
  { name: "REN", logo: "/images/ren_logo.avif" },
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
            className="w-full h-full object-cover object-top grayscale"
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
        {member.bio ? (
          <p className="text-xs text-muted-foreground leading-relaxed">
            {member.bio}
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

      {/* Clinical Advisory Board */}
      <section className="py-16 bg-muted/40" data-testid="section-who-cab">
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
      <section className="py-16" data-testid="section-who-openings">
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
      <section className="py-16 bg-muted/40" data-testid="section-who-partners">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-3">
            <Handshake className="h-8 w-8 text-[#2D7A89]" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
            {t("whoWeAre.partnersTitle")}
          </h2>
          <p className="text-muted-foreground mb-8">{t("whoWeAre.partnersSubtitle")}</p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {partners.map((p) => (
              p.logo ? (
                <span
                  key={p.name}
                  className="flex items-center justify-center px-6 py-4 h-24"
                  data-testid={`text-partner-${p.name.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}`}
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    className={`object-contain ${p.tall ? "h-32 w-auto max-w-[200px]" : "h-full w-auto max-w-[160px]"}`}
                  />
                </span>
              ) : (
                <span
                  key={p.name}
                  className="flex items-center justify-center px-5 py-3 rounded-lg h-16 bg-[#68B0AB]/10 text-sm font-medium text-[#1d5f66]"
                  data-testid={`text-partner-${p.name.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}`}
                >
                  {p.name}
                </span>
              )
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
