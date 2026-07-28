import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DOMPurify from "dompurify";
import type { Newsletter } from "@shared/schema";
import logoUrl from "@assets/Med 13_1764216026949.png";
import heroBackground from "@assets/generated_images/Family_unity_hope_background_8e3f922d.webp";

function NewsletterSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="h-8 w-48 bg-muted rounded-md animate-pulse mb-6" />
        <div className="h-64 bg-muted rounded-md animate-pulse mb-4" />
        <div className="h-4 w-full bg-muted rounded-md animate-pulse mb-2" />
        <div className="h-4 w-3/4 bg-muted rounded-md animate-pulse mb-2" />
        <div className="h-4 w-1/2 bg-muted rounded-md animate-pulse" />
      </div>
      <Footer />
    </div>
  );
}

function NewsletterNotFound() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-heading font-bold mb-4" data-testid="text-newsletter-not-found">
          {t("newsletter.viewNotFound")}
        </h1>
        <p className="text-muted-foreground mb-6">
          {t("newsletter.viewNotFoundDesc")}
        </p>
        <Link href="/">
          <Button data-testid="button-go-home">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("newsletter.viewBackHome")}
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default function NewsletterView() {
  const params = useParams<{ id: string }>();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();

  const { data, isLoading, error } = useQuery<{ newsletter: Newsletter }>({
    queryKey: ["/api/public/newsletters", params.id],
  });

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: data?.newsletter.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast({ title: t("newsletter.viewLinkCopied") });
      }
    } catch {
      await navigator.clipboard.writeText(url);
      toast({ title: t("newsletter.viewLinkCopied") });
    }
  };

  if (isLoading) return <NewsletterSkeleton />;
  if (error || !data?.newsletter) return <NewsletterNotFound />;

  const newsletter = data.newsletter;
  const formattedDate = new Date(newsletter.createdAt).toLocaleDateString(i18n.language, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-secondary/90" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge
            variant="outline"
            className="mb-4 bg-white/10 backdrop-blur-sm border-white/20 text-white"
            data-testid="badge-newsletter-label"
          >
            <Calendar className="w-3 h-3 mr-1" />
            {formattedDate}
          </Badge>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4"
            data-testid="text-newsletter-view-title"
          >
            {newsletter.title}
          </h1>
          <div className="flex items-center justify-center gap-3 mt-6">
            <Link href="/">
              <Button
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/40 text-white"
                data-testid="button-newsletter-back-home"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("newsletter.viewHome")}
              </Button>
            </Link>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/40 text-white"
              onClick={handleShare}
              data-testid="button-newsletter-share"
            >
              <Share2 className="w-4 h-4 mr-2" />
              {t("newsletter.viewShare")}
            </Button>
          </div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <img src={logoUrl} alt="MED13 Foundation" className="h-10 w-10" data-testid="img-newsletter-logo" />
          <div>
            <p className="text-sm font-heading font-semibold" data-testid="text-newsletter-org">MED13 Foundation</p>
            <p className="text-xs text-muted-foreground">{t("newsletter.viewLabel")}</p>
          </div>
        </div>

        <Separator className="mb-8" />

        <div
          className="newsletter-content prose prose-sm sm:prose max-w-none"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(newsletter.content) }}
          data-testid="text-newsletter-view-content"
        />

        <Separator className="my-10" />

        <div className="text-center py-6">
          <img src={logoUrl} alt="MED13 Foundation" className="h-14 w-14 mx-auto mb-3" />
          <p className="text-sm font-heading font-semibold text-foreground mb-1">MED13 Foundation</p>
          <p className="text-xs text-muted-foreground mb-4">
            {t("newsletter.viewTagline")}
          </p>
          <Link href="/">
            <Button variant="outline" data-testid="button-newsletter-visit-site">
              {t("newsletter.viewVisitSite")}
            </Button>
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}
