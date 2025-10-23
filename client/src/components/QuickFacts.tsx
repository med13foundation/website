import { Card, CardContent } from "@/components/ui/card";
import { Dna, Users, Calendar, MapPin, Activity, Puzzle } from "lucide-react";

export default function QuickFacts() {
  const facts = [
    { icon: Users, label: "Affected worldwide", value: "51+", testId: "affected" },
    { icon: Dna, label: "Inheritance", value: "De novo (92%)", testId: "inheritance" },
    { icon: Activity, label: "Speech disorders", value: "100%", testId: "speech" },
    { icon: Puzzle, label: "Autism prevalence", value: "41%", testId: "autism" },
    { icon: Calendar, label: "First described", value: "2018", testId: "year" },
    { icon: MapPin, label: "Gene location", value: "17q23.2", testId: "location" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4" data-testid="text-facts-title">
            Quick Facts About MED13 Syndrome
          </h2>
          <p className="text-lg text-muted-foreground">
            Understanding the condition at a glance
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {facts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <Card key={index} data-testid={`card-fact-${fact.testId}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-heading font-bold text-foreground mb-1" data-testid={`value-${fact.testId}`}>
                        {fact.value}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {fact.label}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 max-w-3xl mx-auto">
          <Card className="bg-accent">
            <CardContent className="p-6">
              <p className="text-sm text-foreground">
                <strong>Key features:</strong> Developmental delays, speech disorders (100%), intellectual disability, distinctive facial features
              </p>
              <p className="text-sm text-foreground mt-2">
                <strong>Associated conditions:</strong> Autism (41%), ADHD (23%), epilepsy (14%)
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
