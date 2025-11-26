import { Card, CardContent } from "@/components/ui/card";
import { Dna, Users, Calendar, MapPin, Activity, Puzzle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function QuickFacts() {
  const { t } = useTranslation();

  const facts = [
    { icon: Users, labelKey: "quickFacts.affected", valueKey: "quickFacts.affectedValue", testId: "affected" },
    { icon: Dna, labelKey: "quickFacts.inheritance", valueKey: "quickFacts.inheritanceValue", testId: "inheritance" },
    { icon: Activity, labelKey: "quickFacts.speech", valueKey: "quickFacts.speechValue", testId: "speech" },
    { icon: Puzzle, labelKey: "quickFacts.autism", valueKey: "quickFacts.autismValue", testId: "autism" },
    { icon: Calendar, labelKey: "quickFacts.year", valueKey: "quickFacts.yearValue", testId: "year" },
    { icon: MapPin, labelKey: "quickFacts.location", valueKey: "quickFacts.locationValue", testId: "location" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4" data-testid="text-facts-title">
            {t('quickFacts.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('quickFacts.subtitle')}
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
                        {t(fact.valueKey)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t(fact.labelKey)}
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
                <strong>{t('quickFacts.keyFeatures')}</strong> {t('quickFacts.keyFeaturesDesc')}
              </p>
              <p className="text-sm text-foreground mt-2">
                <strong>{t('quickFacts.associatedConditions')}</strong> {t('quickFacts.associatedConditionsDesc')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
