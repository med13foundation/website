import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle } from "lucide-react";

export default function RoadmapSection() {
  const phases = [
    {
      year: "Year 1-2",
      title: "Foundation Building",
      status: "in-progress",
      items: [
        "Establish organizational structure and COMBINEDBrain membership",
        "Launch patient registry and biorepository enrollment",
        "Form Scientific Advisory Board",
        "Create family support network"
      ]
    },
    {
      year: "Year 2-3",
      title: "Research Infrastructure",
      status: "upcoming",
      items: [
        "Commission Strategic Research Plan",
        "Fund initial research grants",
        "Develop clinical outcome measures",
        "Host first family/researcher conference"
      ]
    },
    {
      year: "Year 4-5",
      title: "Preclinical Development",
      status: "upcoming",
      items: [
        "Support animal model development",
        "Fund drug repurposing screens",
        "Explore gene therapy approaches",
        "Build clinical trial network"
      ]
    },
    {
      year: "Year 6-7",
      title: "Trial Readiness",
      status: "upcoming",
      items: [
        "Complete natural history study",
        "Validate biomarkers",
        "Engage with FDA",
        "Prepare trial protocols"
      ]
    },
    {
      year: "Year 8+",
      title: "Clinical Trials",
      status: "upcoming",
      items: [
        "Phase 1 safety studies",
        "Expanded access programs",
        "Long-term outcome tracking"
      ]
    }
  ];

  return (
    <section id="roadmap" className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4" data-testid="text-roadmap-title">
            Roadmap to Treatment
          </h2>
          <p className="text-lg text-muted-foreground">
            Following the proven path from foundation to clinical trials
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
                      <CardTitle className="text-xl font-heading">{phase.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{phase.year}</p>
                    </div>
                  </div>
                  {phase.status === "in-progress" && (
                    <Badge variant="secondary" data-testid="badge-in-progress">
                      In Progress
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {phase.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-muted-foreground mt-1">•</span>
                      <span>{item}</span>
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
