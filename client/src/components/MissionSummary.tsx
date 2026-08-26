import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export default function MissionSummary() {
  const { t } = useTranslation();

  return (
    <section id="about" className="border-b border-border bg-background py-16 sm:py-20" data-testid="section-mission-summary">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">{t("home.missionEyebrow")}</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl" data-testid="text-mission-summary-title">
            {t("about.title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t("about.subtitle")}</p>
        </div>
        <div>
          <p className="text-lg leading-relaxed text-foreground">{t("about.storyContent1")}</p>
          <Button variant="outline" className="mt-6" asChild data-testid="button-mission-summary">
            <Link href="/who-we-are">
              {t("home.missionButton")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}