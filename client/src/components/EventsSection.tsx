import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, FileText, Sparkles, Play, Video, ExternalLink, Star, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

export default function EventsSection() {
  const { t } = useTranslation();

  return (
    <section id="events" className="py-16 sm:py-24 bg-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4" data-testid="text-events-title">
            {t('events.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('events.subtitle')}
          </p>
        </div>

        <Card className="max-w-6xl mx-auto mb-8 overflow-hidden border-primary/30 bg-gradient-to-br from-primary/10 via-background to-secondary/10" data-testid="card-denver-mini-meetup">
          <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="mb-2 flex flex-wrap gap-2">
                  <Badge variant="secondary">{t("denverMeetup.familyTag")}</Badge>
                  <Badge variant="secondary">{t("denverMeetup.inPersonTag")}</Badge>
                </div>
                <CardTitle className="text-xl font-heading">{t("denverMeetup.title")}</CardTitle>
                <CardDescription className="mt-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{t("denverMeetup.cardDate")}</span>
                </CardDescription>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/80">{t("denverMeetup.cardBlurb")}</p>
              </div>
            </div>
            <Button className="shrink-0" asChild data-testid="button-denver-meetup-details">
              <Link href="/news-and-events/denver-mini-medopathies-meetup">{t("denverMeetup.details")}</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="max-w-6xl mx-auto mb-8 overflow-hidden border-secondary/50 bg-gradient-to-br from-secondary/15 via-background to-background" data-testid="card-hope-practice-event">
          <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary/25">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="mb-2 flex flex-wrap gap-2">
                  <Badge variant="secondary">{t("hopePractice.communityTag")}</Badge>
                  <Badge variant="secondary">{t("hopePractice.freeTag")}</Badge>
                </div>
                <CardTitle className="text-xl font-heading">{t("hopePractice.title")}</CardTitle>
                <CardDescription className="mt-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{t("hopePractice.cardDate")}</span>
                </CardDescription>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/80">{t("hopePractice.cardBlurb")}</p>
              </div>
            </div>
            <Button className="shrink-0" asChild data-testid="button-hope-practice-details">
              <Link href="/news-and-events/hope-is-a-practice">{t("hopePractice.details")}</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="max-w-6xl mx-auto mb-8" data-testid="card-gala-event">
          <CardHeader>
            <CardTitle className="text-xl font-heading flex items-center gap-2 flex-wrap">
              <Sparkles className="w-5 h-5 text-primary" />
              {t('gala.eventCardTitle')}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-2">
              <Calendar className="w-4 h-4" />
              <span>{t('gala.eventCardDate')}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-2 text-sm mb-4">
              <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
              <span className="text-foreground">{t('gala.location')}, {t('gala.address')}</span>
            </div>
            <p className="text-sm text-foreground mb-6">{t('gala.eventCardDesc')}</p>
            <Button asChild data-testid="button-gala-details">
              <Link href="/gala">{t('gala.eventCardButton')}</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="max-w-6xl mx-auto mb-8 overflow-hidden border-primary/20 bg-primary text-primary-foreground" data-testid="card-symposium-event">
          <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Video className="h-5 w-5 text-[#bfe9d2]" />
              </div>
              <div>
                <CardTitle className="text-xl font-heading text-primary-foreground">{t('symposium.title')}</CardTitle>
                <CardDescription className="mt-2 flex items-center gap-2 text-primary-foreground/75">
                  <Calendar className="h-4 w-4" />
                  <span>{t('symposium.date')} · {t('symposium.format')}</span>
                </CardDescription>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/85">{t('symposium.eventCardDesc')}</p>
              </div>
            </div>
            <Button variant="secondary" className="shrink-0" asChild data-testid="button-symposium-details">
              <Link href="/symposium">{t('symposium.eventCardButton')}</Link>
            </Button>
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScLNRechZiJeFobenqjbw7THYj419ZWW-5_nHYa00h9EzGICw/viewform?usp=sharing&ouid=100823584681284292020"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('events.registerInterest')}
                  </a>
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
                <a href="https://combinedbrain.org/News/13614445" target="_blank" rel="noopener noreferrer">{t('events.learnMore')}</a>
              </Button>
            </CardContent>
          </Card>

          <Card data-testid="card-roadshows">
            <CardHeader>
              <CardTitle className="text-xl font-heading">{t('events.roadshowsTitle')}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <Calendar className="w-4 h-4" />
                <span>{t('events.roadshowsDate')}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground mb-6">
                {t('events.roadshowsDesc')}
              </p>
              <Button
                variant="outline"
                className="w-full"
                asChild
                data-testid="button-roadshows"
              >
                <a href="https://docs.google.com/presentation/d/1IjaHILXj7AlBDlbTJgvYrkBS_0bnI8VCnTIiPXJ7JGM/edit?slide=id.g3b4b5122442_1_12#slide=id.g3b4b5122442_1_12" target="_blank" rel="noopener noreferrer">{t('events.roadshowsButton')}</a>
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

        {/* Featured Media */}
        <div id="press-room" className="mt-16 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <Play className="h-6 w-6 text-[#2D7A89]" aria-hidden="true" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2">
              {t('events.mediaTitle')}
            </h3>
            <p className="text-muted-foreground">{t('events.mediaSubtitle')}</p>
          </div>
          <Card data-testid="card-featured-video">
            <CardContent className="p-0 overflow-hidden rounded-lg">
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/m50_661nci0"
                  title={t('events.mediaVideoTitle')}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-6">
                <h4 className="font-heading font-bold text-foreground mb-1">{t('events.mediaVideoTitle')}</h4>
                <p className="text-sm text-muted-foreground">{t('events.mediaVideoDesc')}</p>
              </div>
            </CardContent>
          </Card>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card className="overflow-hidden md:col-span-2" data-testid="card-media-article-cpn">
              <a
                href="https://courageousparentsnetwork.org/blog/the-weight-of-a-decision/"
                target="_blank"
                rel="noopener noreferrer"
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                aria-label={t('events.mediaArticleCpnTitle')}
              >
                <img
                  src="/images/news/the-weight-of-a-decision.jpg"
                  alt={t('events.mediaArticleCpnImageAlt')}
                  width={1024}
                  height={681}
                  loading="lazy"
                  className="aspect-[3/2] w-full object-cover"
                />
              </a>
              <CardHeader>
                <p className="text-sm font-semibold text-primary">Courageous Parents Network</p>
                <CardTitle className="font-heading text-xl">{t('events.mediaArticleCpnTitle')}</CardTitle>
                <CardDescription>{t('events.mediaArticleCpnDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild data-testid="button-media-article-cpn">
                  <a
                    href="https://courageousparentsnetwork.org/blog/the-weight-of-a-decision/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('events.readArticle')} <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
            <Card className="overflow-hidden md:col-span-2" data-testid="card-media-article-stanford">
              <a
                href="https://healthier.stanfordchildrens.org/en/a-rare-genetic-diagnosis-gives-arturos-family-answers-and-hope/"
                target="_blank"
                rel="noopener noreferrer"
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                aria-label={t('events.mediaArticleStanfordTitle')}
              >
                <img
                  src="/images/news/stanford-arturo.jpg"
                  alt={t('events.mediaArticleStanfordImageAlt')}
                  width={1200}
                  height={675}
                  loading="lazy"
                  className="aspect-video w-full object-cover"
                />
              </a>
              <CardHeader>
                <CardTitle className="font-heading text-xl">{t('events.mediaArticleStanfordTitle')}</CardTitle>
                <CardDescription>{t('events.mediaArticleStanfordDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild data-testid="button-media-article-stanford">
                  <a
                    href="https://healthier.stanfordchildrens.org/en/a-rare-genetic-diagnosis-gives-arturos-family-answers-and-hope/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('events.readArticle')} <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
            <Card className="overflow-hidden" data-testid="card-media-article-1">
              <a
                href="https://sparkforautism.org/discover_article/family-discovers-cause-of-sons-autism-and-a-path-forward/"
                target="_blank"
                rel="noopener noreferrer"
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                aria-label={t('events.mediaArticle1Title')}
              >
                <img
                  src="/images/news/spark-badon-family.jpg"
                  alt={t('events.mediaArticle1ImageAlt')}
                  width={888}
                  height={469}
                  loading="lazy"
                  className="h-auto w-full"
                />
              </a>
              <CardHeader>
                <CardTitle className="font-heading text-xl">{t('events.mediaArticle1Title')}</CardTitle>
                <CardDescription>{t('events.mediaArticle1Desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild data-testid="button-media-article-1">
                  <a
                    href="https://sparkforautism.org/discover_article/family-discovers-cause-of-sons-autism-and-a-path-forward/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('events.readArticle')} <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
            <Card className="overflow-hidden" data-testid="card-media-article-2">
              <a
                href="https://medium.com/@cindybadon/what-a-genetic-diagnosis-can-mean-for-a-child-on-the-spectrum-89ef08a11091"
                target="_blank"
                rel="noopener noreferrer"
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                aria-label={t('events.mediaArticle2Title')}
              >
                <img
                  src="/images/news/genetic-diagnosis-spectrum.jpg"
                  alt={t('events.mediaArticle2ImageAlt')}
                  width={1000}
                  height={1000}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              </a>
              <CardHeader>
                <CardTitle className="font-heading text-xl">{t('events.mediaArticle2Title')}</CardTitle>
                <CardDescription>{t('events.mediaArticle2Desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild data-testid="button-media-article-2">
                  <a
                    href="https://medium.com/@cindybadon/what-a-genetic-diagnosis-can-mean-for-a-child-on-the-spectrum-89ef08a11091"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('events.readArticle')} <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stories and Essays */}
        <div id="stories-and-essays" className="mt-16 max-w-4xl mx-auto" data-testid="section-stories-and-essays">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <BookOpen className="h-6 w-6 text-[#2D7A89]" aria-hidden="true" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2" data-testid="text-stories-and-essays-title">
              {t('events.storiesAndEssaysTitle')}
            </h3>
            <p className="text-muted-foreground">{t('events.storiesAndEssaysSubtitle')}</p>
          </div>
          <Card className="overflow-hidden border-primary/20" data-testid="card-reflection-essay">
            <CardHeader className="border-b border-border bg-primary/5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <CardTitle className="font-heading text-2xl sm:text-3xl">{t('events.reflectionTitle')}</CardTitle>
                  <CardDescription className="mt-2 text-base">
                    {t('events.reflectionByline')}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {t('events.reflectionDate')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 p-6 sm:p-8">
              <p className="text-base leading-relaxed text-foreground">{t('events.reflectionParagraph1')}</p>
              <p className="text-base leading-relaxed text-foreground">{t('events.reflectionParagraph2')}</p>
            </CardContent>
          </Card>
        </div>

        {/* The Constellation campaign theme */}
        <div className="relative mt-16 overflow-hidden rounded-lg border border-primary/20 bg-primary px-6 py-10 text-primary-foreground shadow-sm sm:px-10 sm:py-12" data-testid="section-constellation-theme">
          <div className="pointer-events-none absolute -right-8 -top-8 opacity-10" aria-hidden="true">
            <Star className="h-32 w-32 fill-white text-white" />
          </div>
          <div className="relative max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">
              <Star className="h-4 w-4 fill-white text-white" aria-hidden="true" />
              {t('events.constellationEyebrow')}
            </div>
            <h3 className="mt-3 font-heading text-3xl font-bold text-primary-foreground sm:text-4xl" data-testid="text-constellation-title">
              {t('events.constellationTitle')}
            </h3>
            <p className="mt-3 font-heading text-xl font-semibold leading-relaxed text-primary-foreground" data-testid="text-constellation-tagline">
              {t('events.constellationTagline')}
            </p>
            <Button variant="secondary" className="mt-5" asChild data-testid="button-share-your-story">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdUyQYZiOEHNsuywUdwtFFsM1-3bV2AZv1OtjsRYRfMltaSoA/viewform?usp=sharing&ouid=100823584681284292020"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('events.shareYourStory')} <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <p className="mt-5 text-base leading-relaxed text-primary-foreground/85">{t('events.constellationIntro')}</p>
            <p className="mt-4 text-base leading-relaxed text-primary-foreground/85">{t('events.constellationMetaphor')}</p>
            <p className="mt-5 font-medium leading-relaxed text-primary-foreground">{t('events.constellationDignity')}</p>
          </div>
        </div>

        <NewsletterArchive />
      </div>
    </section>
  );
}

function NewsletterArchive() {
  const { t, i18n } = useTranslation();

  const { data } = useQuery<{ newsletters: { id: string; title: string; sentAt: string }[] }>({
    queryKey: ["/api/public/newsletters"],
  });

  const newsletters = data?.newsletters || [];

  if (newsletters.length === 0) return null;

  return (
    <div id="newsletter" className="mt-16 max-w-3xl mx-auto">
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
                      {new Date(nl.sentAt).toLocaleDateString(i18n.language, {
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
