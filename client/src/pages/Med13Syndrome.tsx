import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Dna } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import QuickFacts from "@/components/QuickFacts";

export default function Med13Syndrome() {
  const { t } = useTranslation();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = t("home.syndromeVideoTitle");

    return () => {
      document.title = previousTitle;
    };
  }, [t]);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Navigation />
      <main>
        <section className="relative isolate overflow-hidden bg-[#e9f5f3] px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8">
          <div
            className="pointer-events-none absolute -right-20 -top-28 -z-10 h-80 w-80 rounded-full bg-[#edab98]/25 blur-3xl sm:h-[28rem] sm:w-[28rem]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-36 left-[8%] -z-10 h-72 w-72 rounded-full bg-[#a9d6ce]/40 blur-3xl"
            aria-hidden="true"
          />
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
            <div className="max-w-4xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-warm">
                {t("syndromePage.eyebrow")}
              </p>
              <h1 className="max-w-4xl font-heading text-4xl font-bold leading-[1.08] text-primary sm:text-6xl">
                {t("home.syndromeVideoTitle")}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-foreground/80 sm:text-xl">
                {t("syndromePage.intro")}
              </p>
            </div>
            <div className="relative mx-auto flex aspect-square w-48 items-center justify-center sm:w-56 lg:w-64">
              <div className="absolute inset-0 rounded-full border border-primary/15" aria-hidden="true" />
              <div className="absolute inset-5 rounded-full border border-primary/20" aria-hidden="true" />
              <div className="absolute inset-10 rounded-full bg-background/70 shadow-[0_18px_55px_-30px_rgba(37,93,93,0.45)]" aria-hidden="true" />
              <Dna className="relative h-20 w-20 text-primary sm:h-24 sm:w-24" strokeWidth={1.35} aria-hidden="true" />
              <span className="absolute right-2 top-7 h-3 w-3 rounded-full bg-[#d88b77]" aria-hidden="true" />
              <span className="absolute bottom-8 left-1 h-2.5 w-2.5 rounded-full bg-primary/50" aria-hidden="true" />
            </div>
          </div>
        </section>

        <QuickFacts />

        <aside className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-2xl border border-[#c7ded9] bg-[#f2f8f6] px-6 py-6 sm:px-8 sm:py-7">
            <p className="mb-4 text-sm leading-relaxed text-foreground/75 sm:text-base">
              {t("syndromePage.populationNote")}
            </p>
            <p className="border-l-2 border-[#bd7968] pl-4 text-sm leading-relaxed text-foreground/75 sm:text-base">
              {t("syndromePage.disclaimer")}
            </p>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
