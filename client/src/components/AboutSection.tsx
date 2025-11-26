import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4 text-center" data-testid="text-about-title">
            {t('about.title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-12 text-center">
            {t('about.subtitle')}
          </p>

          <div className="prose prose-lg max-w-none mb-12">
            <h3 className="text-2xl font-heading font-semibold text-foreground mb-4" data-testid="text-our-story">{t('about.ourStory')}</h3>
            <p className="text-foreground mb-4" data-testid="text-story-content">
              {t('about.storyContent1')}
            </p>
            <p className="text-foreground mb-6">
              {t('about.storyContent2')}
            </p>

            <h3 className="text-2xl font-heading font-semibold text-foreground mb-4" data-testid="text-our-community">{t('about.ourCommunity')}</h3>
            <ul className="space-y-2 mb-6">
              <li className="text-foreground">{t('about.communityItem1')}</li>
              <li className="text-foreground">{t('about.communityItem2')}</li>
              <li className="text-foreground">{t('about.communityItem3')}</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card data-testid="card-combinedbrain">
              <CardHeader>
                <CardTitle className="text-xl font-heading">{t('about.combinedbrainTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('about.combinedbrainDesc')}
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• {t('about.combinedbrainItem1')}</li>
                  <li>• {t('about.combinedbrainItem2')}</li>
                  <li>• {t('about.combinedbrainItem3')}</li>
                  <li>• {t('about.combinedbrainItem4')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card data-testid="card-rare-village">
              <CardHeader>
                <CardTitle className="text-xl font-heading">{t('about.fiscalTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  <strong>{t('about.fiscalOrg')}</strong>
                </p>
                <p className="text-sm text-foreground">
                  {t('about.fiscalDesc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
