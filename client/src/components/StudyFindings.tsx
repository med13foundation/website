import { useTranslation } from "react-i18next";
import { ArrowUpRight, FileText } from "lucide-react";
import { NATURAL_HISTORY_STUDY_URL } from "@/lib/links";

const POSTER_URL = "/research/med13-natural-history-nov-2026.pdf";

export default function StudyFindings() {
  const { t } = useTranslation();

  return (
    <section id="study-findings" aria-labelledby="study-findings-title" className="scroll-mt-24 border-t border-[#dce9e6] bg-[#f2f8f6] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 id="study-findings-title" className="font-heading text-3xl font-bold text-primary sm:text-4xl">
          {t("sciencePage.findingsTitle")}
        </h2>
        <p className="mt-4 text-sm font-medium leading-relaxed text-primary">
          {t("sciencePage.studyDataSchedule")}
        </p>
        <p className="mt-6 max-w-4xl text-lg leading-relaxed text-foreground/85">{t("sciencePage.findingsIntro")}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {["permissions", "sleep", "variants"].map((topic) => (
            <article key={topic} className="rounded-2xl border border-[#c7ded9] bg-white p-6">
              <h3 className="font-heading text-xl font-bold text-primary">{t(`sciencePage.${topic}Title`)}</h3>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">{t(`sciencePage.${topic}Body`)}</p>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-4xl border-l-2 border-warm pl-5 text-sm leading-relaxed text-foreground/75">
          {t("sciencePage.findingsLimitations")}
        </p>

        <figure className="mt-10 overflow-hidden rounded-2xl border border-[#c7ded9] bg-white">
          <a href={POSTER_URL} target="_blank" rel="noopener noreferrer" className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
            <img src="/research/med13-natural-history-nov-2026.png" alt={t("sciencePage.posterAlt")} width={1800} height={1350} loading="lazy" className="h-auto w-full" />
          </a>
          <figcaption className="border-t border-[#c7ded9] p-6">
            <h3 className="font-heading text-xl font-bold text-primary">{t("sciencePage.posterTitle")}</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/75">{t("sciencePage.posterSource")}</p>
            <div className="mt-5 flex flex-wrap gap-4">
              <a href={POSTER_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded font-semibold text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                <FileText className="h-4 w-4" aria-hidden="true" />{t("sciencePage.posterAction")}
              </a>
              <a href="/for-families#natural-history" className="inline-flex items-center gap-2 rounded font-semibold text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                {t("sciencePage.enrollAction")}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={NATURAL_HISTORY_STUDY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded font-semibold text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                {t("sciencePage.matrixAction")}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/75">{t("sciencePage.enrollNote")}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
