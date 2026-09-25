import { Facebook, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { RESEARCH_COHORT_FORM_URL, VOLUNTEER_FORM_URL } from "@/lib/links";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="bg-card border-t border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4" data-testid="text-footer-about">
              {t('footer.about')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/#about" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-footer-story">
                  {t('footer.ourStory')}
                </a>
              </li>
              <li>
                <a href="/#about" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-footer-community">
                  {t('footer.ourCommunity')}
                </a>
              </li>
              <li>
                <a href="/roadmap" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-footer-roadmap">
                  {t('footer.researchRoadmap')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4" data-testid="text-footer-get-involved">
              {t('footer.getInvolved')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={RESEARCH_COHORT_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-testid="link-footer-research"
                >
                  {t('footer.joinResearch')}
                </a>
              </li>
              <li>
                <a href="/#get-involved" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-footer-board">
                  {t('footer.boardOpportunities')}
                </a>
              </li>
              <li>
                <a
                  href={VOLUNTEER_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-testid="link-footer-volunteer"
                >
                  {t('footer.volunteer')}
                </a>
              </li>
              <li>
                <a href="/ways-to-give" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-footer-ways-to-give">
                  {t('footer.otherWaysToGive')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4" data-testid="text-footer-resources">
              {t('footer.resources')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="https://combinedbrain.org" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-footer-combinedbrain">
                  {t('footer.combinedbrain')}
                </a>
              </li>
              <li>
                <a href="/news-and-events" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-footer-events">
                  {t('footer.events')}
                </a>
              </li>
              <li>
                <a href="/gala" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-footer-gala">
                  {t('footer.gala')}
                </a>
              </li>
              <li>
                <a href="/symposium" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-footer-symposium">
                  {t('footer.symposium')}
                </a>
              </li>
              <li>
                <a
                  href="https://www.simonssearchlight.org/gene-guide/med13/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground"
                  data-testid="link-footer-simons-searchlight"
                >
                  {t('footer.simonsSearchlight')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4" data-testid="text-footer-contact">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:research@med13.org" className="hover:text-foreground" data-testid="link-footer-email-research">
                  research@med13.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61584064750085"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
                aria-label="MED13 Foundation on Facebook"
                data-testid="link-footer-facebook"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/company/med13-foundation/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
                aria-label="MED13 Foundation on LinkedIn"
                data-testid="link-footer-linkedin"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>

            <p className="text-sm text-muted-foreground" data-testid="text-footer-copyright">
              {t('footer.copyright')}
            </p>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            {t('footer.fiscalNote')}
          </p>
        </div>
      </div>
    </footer>
  );
}
