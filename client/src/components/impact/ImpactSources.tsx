import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const sourceLinks: Record<number, { url: string; label: string }> = {
  3: { url: "https://genie.broadinstitute.org/dashboard", label: "genie.broadinstitute.org/dashboard" },
  4: { url: "https://doi.org/10.1007/s00439-018-1887-y", label: "doi.org/10.1007/s00439-018-1887-y" },
  5: { url: "https://doi.org/10.1101/gad.207720.112", label: "doi.org/10.1101/gad.207720.112" },
};

export function ImpactCitation({ numbers }: { numbers: number[] }) {
  const { t } = useTranslation();
  return (
    <sup className="ml-1 text-xs font-semibold text-primary">
      {numbers.map((number, index) => (
        <Fragment key={number}>
          {index > 0 && ", "}
          <a
            href={`#source-${number}`}
            aria-label={t("impact.sourceLabel", { number })}
            className="rounded-sm underline decoration-dotted underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {number}
          </a>
        </Fragment>
      ))}
    </sup>
  );
}

export default function ImpactSources() {
  const { t } = useTranslation();
  return (
    <section id="sources" aria-labelledby="impact-sources-title" className="scroll-mt-24 border-t border-border bg-muted px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <h2 id="impact-sources-title" className="font-heading text-2xl font-bold text-primary">{t("impact.sourcesTitle")}</h2>
        <ol className="mt-5 max-w-4xl list-decimal space-y-4 pl-6 text-sm leading-relaxed text-foreground/80">
          {Array.from({ length: 9 }, (_, index) => index + 1).map((number) => (
            <li key={number} id={`source-${number}`} className="scroll-mt-24">
              {t(`impact.sources.${number}`)}
              {sourceLinks[number] && (
                <>{" "}
                  <a href={sourceLinks[number].url} target="_blank" rel="noopener noreferrer" className="break-words text-primary underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                    {sourceLinks[number].label}
                  </a>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
