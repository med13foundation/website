import { FlaskConical, HandHeart, Users2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const communityConnectionFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc5l6wk6J2sCPBU5-cqa82MvYhRAqa-ivPsLPLrvAlh5Iay5w/viewform?usp=sharing&ouid=100823584681284292020";
const researchCohortFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc5l6wk6J2sCPBU5-cqa82MvYhRAqa-ivPsLPLrvAlh5Iay5w/viewform?usp=sharing&ouid=100823584681284292020";
const boardContactEmail = "mailto:research@med13.org";

const pathways = [
  { icon: FlaskConical, titleKey: "getInvolved.researchTitle", descKey: "getInvolved.researchDesc", testId: "research", formUrl: researchCohortFormUrl },
  { icon: Users2, titleKey: "getInvolved.boardTitle", descKey: "getInvolved.boardDesc", testId: "board", formUrl: boardContactEmail },
  { icon: HandHeart, titleKey: "getInvolved.volunteerTitle", descKey: "getInvolved.volunteerDesc", testId: "volunteer", formUrl: communityConnectionFormUrl },
];

export default function GetInvolvedPreview() {
  const { t } = useTranslation();

  return (
    <section id="get-involved" className="relative overflow-hidden py-16 sm:py-20" data-testid="section-get-involved-preview">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/90 via-background to-muted/90" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">{t("home.getInvolvedEyebrow")}</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl" data-testid="text-get-involved-preview-title">
            {t("getInvolved.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("home.getInvolvedSubtitle")}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {pathways.map((pathway) => {
            const Icon = pathway.icon;
            return (
              <Card key={pathway.testId} className="bg-card/95" data-testid={`card-preview-${pathway.testId}`}>
                <CardHeader className="pb-3">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-heading text-xl">{t(pathway.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3 text-sm leading-relaxed">{t(pathway.descKey)}</CardDescription>
                  <Button variant="outline" className="mt-5 w-full" asChild data-testid={`button-preview-${pathway.testId}`}>
                    <a
                      href={pathway.formUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("getInvolved.contactUs")}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}