import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function RoadmapSection() {
  const { t } = useTranslation();

  const phases = [
    {
      yearKey: "roadmap.phase1Year",
      titleKey: "roadmap.phase1Title",
      status: "in-progress",
      itemKeys: [
        "roadmap.phase1Item1",
        "roadmap.phase1Item2",
        "roadmap.phase1Item3",
        "roadmap.phase1Item4"
      ]
    },
    {
      yearKey: "roadmap.phase2Year",
      titleKey: "roadmap.phase2Title",
      status: "upcoming",
      itemKeys: [
        "roadmap.phase2Item1",
        "roadmap.phase2Item2",
        "roadmap.phase2Item3",
        "roadmap.phase2Item4"
      ]
    },
    {
      yearKey: "roadmap.phase3Year",
      titleKey: "roadmap.phase3Title",
      status: "upcoming",
      itemKeys: [
        "roadmap.phase3Item1",
        "roadmap.phase3Item2",
        "roadmap.phase3Item3",
        "roadmap.phase3Item4"
      ]
    },
    {
      yearKey: "roadmap.phase4Year",
      titleKey: "roadmap.phase4Title",
      status: "upcoming",
      itemKeys: [
        "roadmap.phase4Item1",
        "roadmap.phase4Item2",
        "roadmap.phase4Item3",
        "roadmap.phase4Item4"
      ]
    },
    {
      yearKey: "roadmap.phase5Year",
      titleKey: "roadmap.phase5Title",
      status: "upcoming",
      itemKeys: [
        "roadmap.phase5Item1",
        "roadmap.phase5Item2",
        "roadmap.phase5Item3"
      ]
    }
  ];

  return (
    <section id="roadmap" className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4" data-testid="text-roadmap-title">
            {t('roadmap.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('roadmap.subtitle')}
          </p>
        </div>

        <div className="grid gap-6">
          {phases.map((phase, index) => (
            <Card key={index} data-testid={`card-phase-${index}`}>
              <CardHeader>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    {phase.status === "in-progress" ? (
                      <CheckCircle2 className="w-6 h-6 text-chart-4" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground" />
                    )}
                    <div>
                      <CardTitle className="text-xl font-heading">{t(phase.titleKey)}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{t(phase.yearKey)}</p>
                    </div>
                  </div>
                  {phase.status === "in-progress" && (
                    <Badge variant="secondary" data-testid="badge-in-progress">
                      {t('roadmap.inProgress')}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {phase.itemKeys.map((itemKey, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-muted-foreground mt-1">•</span>
                      <span>{t(itemKey)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
