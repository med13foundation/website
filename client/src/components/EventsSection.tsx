import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function EventsSection() {
  const { t } = useTranslation();

  return (
    <section id="events" className="py-16 sm:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4" data-testid="text-events-title">
            {t('events.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('events.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card data-testid="card-family-conference">
            <CardHeader>
              <CardTitle className="text-xl font-heading">{t('events.conferenceTitle')}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <Calendar className="w-4 h-4" />
                <span>{t('events.conferenceDate')}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                  <span className="text-foreground">{t('events.conferenceLocation')}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Users className="w-4 h-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground mb-2">{t('events.conferencePurpose')}</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• {t('events.conferenceItem1')}</li>
                      <li>• {t('events.conferenceItem2')}</li>
                      <li>• {t('events.conferenceItem3')}</li>
                      <li>• {t('events.conferenceItem4')}</li>
                    </ul>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  asChild
                  data-testid="button-register-interest"
                >
                  <a href="#contact">{t('events.registerInterest')}</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-combinedbrain-meeting">
            <CardHeader>
              <CardTitle className="text-xl font-heading">{t('events.combinedbrainTitle')}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <Calendar className="w-4 h-4" />
                <span>{t('events.combinedbrainDate')}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground mb-6">
                {t('events.combinedbrainDesc')}
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                asChild
                data-testid="button-learn-more"
              >
                <a href="https://combinedbrain.org/conferences/" target="_blank" rel="noopener noreferrer">{t('events.learnMore')}</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
