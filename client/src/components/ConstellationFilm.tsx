import { useTranslation } from "react-i18next";

export default function ConstellationFilm() {
  const { t } = useTranslation();

  return (
    <section
      id="constellation-film"
      className="bg-background px-4 py-16 sm:px-6 sm:py-20"
      aria-labelledby="constellation-film-title"
      data-testid="section-constellation-film"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-warm">
            {t("home.constellationEyebrow")}
          </p>
          <h2
            id="constellation-film-title"
            className="font-heading text-3xl font-bold text-primary sm:text-4xl"
          >
            {t("home.constellationTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-muted-foreground">
            {t("home.constellationDescription")}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {t("home.constellationCredit")}
          </p>
        </div>

        <div className="overflow-hidden rounded-xl bg-black shadow-lg">
          <div className="aspect-video w-full">
            <iframe
              src="https://www.youtube-nocookie.com/embed/cLBQGa9jew4?rel=0"
              title={t("home.constellationTitle")}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
              className="h-full w-full"
              data-testid="video-constellation-film"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="/#donate"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {t("home.constellationDonate")}
          </a>
          <a
            href="/get-involved#research-cohort"
            className="inline-flex items-center justify-center rounded-md border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {t("home.constellationJoinStudy")}
          </a>
        </div>
      </div>
    </section>
  );
}
