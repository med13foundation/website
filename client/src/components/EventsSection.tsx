import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

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

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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

          <Card data-testid="card-monthly-gathering">
            <CardHeader>
              <CardTitle className="text-xl font-heading">{t('events.monthlyTitle')}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <Calendar className="w-4 h-4" />
                <span>{t('events.monthlyDate')}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground mb-6">
                {t('events.monthlyDesc')}
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                asChild
                data-testid="button-monthly-rsvp"
              >
                <a href="https://forms.gle/HBAJpfaU7ain3kx86" target="_blank" rel="noopener noreferrer">{t('events.monthlyRsvp')}</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <NewsletterArchive />
      </div>
    </section>
  );
}

function NewsletterArchive() {
  const { t } = useTranslation();

  const { data } = useQuery<{ newsletters: { id: string; title: string; sentAt: string }[] }>({
    queryKey: ["/api/public/newsletters"],
  });

  const newsletters = data?.newsletters || [];

  if (newsletters.length === 0) return null;

  return (
    <div className="mt-16 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2" data-testid="text-newsletter-archive-title">
          {t('events.newsletterArchiveTitle')}
        </h3>
        <p className="text-muted-foreground" data-testid="text-newsletter-archive-subtitle">
          {t('events.newsletterArchiveSubtitle')}
        </p>
      </div>
      <div className="space-y-3">
        {newsletters.map((nl) => (
          <Link key={nl.id} href={`/newsletter/${nl.id}`}>
            <Card className="hover-elevate cursor-pointer" data-testid={`card-newsletter-archive-${nl.id}`}>
              <CardContent className="flex items-center justify-between gap-3 py-4 flex-wrap">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 shrink-0">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate" data-testid={`text-archive-title-${nl.id}`}>
                      {nl.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(nl.sentAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="shrink-0">
                  {t('events.readNewsletter')}
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
