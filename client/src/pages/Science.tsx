import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowDown, BookOpen, Microscope } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import QuickFacts from "@/components/QuickFacts";
import SyndromeVideo from "@/components/SyndromeVideo";
import SymposiumPlaylist from "@/components/SymposiumPlaylist";

export default function Science() {
  const { t } = useTranslation();

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    document.title = t("sciencePage.metaTitle");
    if (description) description.content = t("sciencePage.metaDescription");

    const scrollToHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "smooth" });
      });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      document.title = previousTitle;
      if (description && previousDescription !== undefined) description.content = previousDescription;
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [t]);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Navigation />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <section
          id="what-is-med13-syndrome"
          className="relative isolate scroll-mt-24 overflow-hidden bg-[#e9f5f3] px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8"
          aria-labelledby="science-title"
        >
          <div className="pointer-events-none absolute -right-28 -top-32 -z-10 h-96 w-96 rounded-full bg-[#edab98]/25 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-40 left-[12%] -z-10 h-80 w-80 rounded-full bg-[#a9d6ce]/45 blur-3xl" aria-hidden="true" />
          <div className="mx-auto max-w-7xl">
            <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
              <div className="max-w-4xl">
                <p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-warm">
                  <Microscope className="h-4 w-4" aria-hidden="true" />
                  {t("sciencePage.eyebrow")}
                </p>
                <h1 id="science-title" className="font-heading text-4xl font-bold leading-[1.08] text-primary sm:text-6xl">
                  {t("home.syndromeVideoTitle")}
                </h1>
                <p className="mt-7 max-w-3xl text-lg leading-relaxed text-foreground/80 sm:text-xl">
                  {t("syndromePage.intro")}
                </p>
              </div>
              <div className="hidden justify-self-end lg:block" aria-hidden="true">
                <div className="flex h-52 w-52 items-center justify-center rounded-full border border-primary/20 bg-background/50">
                  <div className="flex h-36 w-36 items-center justify-center rounded-full border border-primary/20 bg-background/70 text-primary shadow-[0_18px_55px_-30px_rgba(37,93,93,0.45)]">
                    <BookOpen className="h-14 w-14" strokeWidth={1.35} />
                  </div>
                </div>
              </div>
            </div>
            <nav aria-label={t("sciencePage.sectionNavLabel")} className="mt-10 flex flex-wrap gap-3">
              <a
                href="#med13-facts"
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
                {t("sciencePage.factsLink")}
              </a>
              <a
                href="#symposium-recordings"
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
                {t("sciencePage.recordingsLink")}
              </a>
            </nav>
          </div>
        </section>

        <div id="med13-facts" className="scroll-mt-24">
          <QuickFacts />
        </div>

        <aside className="px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-2xl border border-[#c7ded9] bg-[#f2f8f6] px-6 py-6 sm:px-8 sm:py-7">
            <p className="mb-4 text-sm leading-relaxed text-foreground/75 sm:text-base">
              {t("syndromePage.populationNote")}
            </p>
            <p className="border-l-2 border-[#bd7968] pl-4 text-sm leading-relaxed text-foreground/75 sm:text-base">
              {t("syndromePage.disclaimer")}
            </p>
          </div>
        </aside>

        <div className="border-y border-[#dce9e6] bg-[#fbf8f1]">
          <SyndromeVideo />
        </div>

        <div className="border-t border-[#dce9e6]">
          <SymposiumPlaylist />
        </div>
      </main>
      <Footer />
    </div>
  );
}
