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
    <section id="roadmap" className="py-16 sm:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4" data-testid="text-roadmap-title">
            Roadmap to Treatment
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Following the proven path from foundation to clinical trials
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline connector line */}
          <div className="absolute left-[29px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-muted hidden md:block" />
          
          <div className="space-y-8">
            {phases.map((phase, index) => (
              <div key={index} className="relative" data-testid={`card-phase-${index}`}>
                {/* Timeline dot */}
                <div className="absolute left-0 top-8 hidden md:flex items-center justify-center">
                  {phase.status === "in-progress" ? (
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-muted border-2 border-border flex items-center justify-center">
                      <Circle className="w-7 h-7 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Card content */}
                <Card className={`md:ml-24 ${phase.status === "in-progress" ? 'border-primary shadow-md' : ''}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-2xl font-heading">{phase.title}</CardTitle>
                          {phase.status === "in-progress" && (
                            <Badge className="bg-secondary text-secondary-foreground" data-testid="badge-in-progress">
                              In Progress
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm font-medium text-primary">{phase.year}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {phase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-foreground flex items-start gap-3">
                          <span className="text-primary mt-0.5 font-bold">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
