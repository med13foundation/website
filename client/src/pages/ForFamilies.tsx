import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowDown, ArrowUpRight, BookOpen, FlaskConical, HeartHandshake, UsersRound } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  BIOREPOSITORY_FAMILIES_URL,
  CENSUS_FORM_URL,
  NATURAL_HISTORY_STUDY_URL,
} from "@/lib/links";

const opportunities = [
  {
    id: "community",
    number: "01",
    icon: UsersRound,
    tone: "community",
    url: CENSUS_FORM_URL,
    titleKey: "communityTitle",
    introKey: "communityIntro",
    detailKey: "communityDetail",
    actionKey: "communityAction",
  },
  {
    id: "natural-history",
    number: "02",
    icon: FlaskConical,
    tone: "study",
    url: NATURAL_HISTORY_STUDY_URL,
    titleKey: "studyTitle",
    introKey: "studyIntro",
    detailKey: "studyDetail",
    actionKey: "studyAction",
  },
  {
    id: "biorepository",
    number: "03",
    icon: HeartHandshake,
    tone: "sample",
    url: BIOREPOSITORY_FAMILIES_URL,
    titleKey: "sampleTitle",
    introKey: "sampleIntro",
    detailKey: "sampleDetail",
    actionKey: "sampleAction",
  },
] as const;

export default function ForFamilies() {
  const { t } = useTranslation(undefined, { keyPrefix: "forFamilies" });

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    document.title = t("metaTitle");
    if (description) description.content = t("metaDescription");
    const sectionId = window.location.hash.slice(1);
    if (opportunities.some((item) => item.id === sectionId)) {
      window.requestAnimationFrame(() => document.getElementById(sectionId)?.scrollIntoView({ block: "start", behavior: "instant" }));
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription !== undefined) description.content = previousDescription;
    };
  }, [t]);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Navigation />
      <main>
        <section className="relative isolate overflow-hidden bg-[#e9f5f3] px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
          <div className="pointer-events-none absolute -right-24 -top-28 -z-10 h-80 w-80 rounded-full bg-[#edab98]/25 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-36 left-[8%] -z-10 h-80 w-80 rounded-full bg-[#a9d6ce]/45 blur-3xl" aria-hidden="true" />
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#a55d4c]">
                {t("eyebrow")}
              </p>
              <h1 className="font-heading text-4xl font-bold leading-[1.08] text-primary sm:text-6xl">
                {t("title")}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-foreground/80 sm:text-xl">
                {t("intro")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3" aria-label={t("jumpNavLabel")}>
                {opportunities.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <ArrowDown className="h-4 w-4" aria-hidden="true" />
                    {t(item.titleKey)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="opportunities-heading">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a55d4c]">{t("optionsEyebrow")}</p>
              <h2 id="opportunities-heading" className="mt-3 font-heading text-3xl font-bold text-primary sm:text-4xl">
                {t("optionsTitle")}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/75 sm:text-lg">{t("optionsIntro")}</p>
            </div>

            <div className="space-y-5">
              {opportunities.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.id}
                    id={item.id}
                    className={`scroll-mt-24 overflow-hidden rounded-2xl border ${
                      item.tone === "community"
                        ? "border-[#c7ded9] bg-[#f2f8f6]"
                        : item.tone === "study"
                          ? "border-[#e6d8cf] bg-[#fbf6f1]"
                          : "border-[#d9d7bd] bg-[#f7f7ed]"
                    }`}
                  >
                    <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[6rem_minmax(0,1fr)_15rem] lg:items-start lg:gap-8 lg:p-10">
                      <div className="flex items-center gap-4 lg:block">
                        <span className="font-mono text-sm font-semibold tracking-widest text-primary/55">{item.number}</span>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/15 bg-background/70 text-primary lg:mt-5 lg:h-16 lg:w-16">
                          <Icon className="h-6 w-6 lg:h-7 lg:w-7" strokeWidth={1.6} aria-hidden="true" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-heading text-2xl font-bold leading-tight text-primary sm:text-3xl">{t(item.titleKey)}</h3>
                        <p className="mt-4 text-base leading-relaxed text-foreground/85 sm:text-lg">{t(item.introKey)}</p>
                        <div className="mt-5 flex items-start gap-3 border-l-2 border-[#bd7968] pl-4">
                          <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-[#a55d4c]" aria-hidden="true" />
                          <p className="text-sm leading-relaxed text-foreground/75 sm:text-base">{t(item.detailKey)}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-3 lg:pt-1">
                        <Button asChild className="w-full justify-between sm:w-auto lg:w-full">
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            {t(item.actionKey)}
                            <ArrowUpRight className="ml-3 h-4 w-4" aria-hidden="true" />
                          </a>
                        </Button>
                        {item.id === "community" && (
                          <p className="text-xs leading-relaxed text-foreground/65">{t("communityLinkNote")}</p>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="mt-10 grid gap-6 rounded-2xl border border-[#dce9e6] bg-[#fbf8f1] p-6 sm:grid-cols-[auto_1fr] sm:items-start sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e9f5f3] text-primary">
                <HeartHandshake className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-primary sm:text-2xl">{t("reassuranceTitle")}</h2>
                <p className="mt-3 max-w-4xl text-sm leading-relaxed text-foreground/75 sm:text-base">{t("reassuranceBody")}</p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
