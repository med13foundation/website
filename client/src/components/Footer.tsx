import { Facebook, Linkedin, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";

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
                <a href="#about" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-footer-story">
                  {t('footer.ourStory')}
                </a>
              </li>
              <li>
                <a href="#about" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-footer-community">
                  {t('footer.ourCommunity')}
                </a>
              </li>
              <li>
                <a href="#roadmap" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-footer-roadmap">
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
                <a href="#get-involved" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-footer-research">
                  {t('footer.joinResearch')}
                </a>
              </li>
              <li>
                <a href="#get-involved" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-footer-board">
                  {t('footer.boardOpportunities')}
                </a>
              </li>
              <li>
                <a href="#get-involved" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-footer-volunteer">
                  {t('footer.volunteer')}
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
                <a href="#events" className="text-sm text-muted-foreground hover:text-foreground" data-testid="link-footer-events">
                  {t('footer.events')}
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
                data-testid="link-footer-facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <button
                className="text-muted-foreground hover:text-foreground cursor-not-allowed opacity-50"
                disabled
                data-testid="link-footer-twitter"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                className="text-muted-foreground hover:text-foreground cursor-not-allowed opacity-50"
                disabled
                data-testid="link-footer-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </button>
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
