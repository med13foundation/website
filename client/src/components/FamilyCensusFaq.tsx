import { ChevronDown } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";

const questions = ["counted", "research", "next", "help"] as const;

export default function FamilyCensusFaq() {
  const { t } = useTranslation(undefined, { keyPrefix: "forFamilies" });

  return (
    <section className="mt-12" aria-labelledby="family-faq-heading">
      <h2 id="family-faq-heading" className="font-heading text-2xl font-bold text-primary sm:text-3xl">
        {t("faqTitle")}
      </h2>
      <div className="mt-6 divide-y divide-primary/15 rounded-2xl border border-primary/15 px-6 sm:px-8">
        {questions.map((question) => (
          <details key={question} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm font-semibold text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
              {t(`faq.${question}.question`)}
              <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-foreground/80 sm:text-base">
              <Trans
                t={t}
                i18nKey={`faq.${question}.answer`}
                components={{
                  contact: <a href="mailto:research@med13.org" className="font-semibold text-primary underline underline-offset-4" />,
                }}
              />
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
