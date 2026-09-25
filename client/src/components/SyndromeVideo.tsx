import { useTranslation } from "react-i18next";
import videoUrl from "@assets/MED13-Syndrome-Explained_1790295374008.mp4";

export default function SyndromeVideo() {
  const { t } = useTranslation();

  return (
    <section className="bg-[#f2f7f6] px-4 py-16 sm:px-6 sm:py-20" aria-labelledby="syndrome-video-title" data-testid="section-syndrome-video">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h2 id="syndrome-video-title" className="font-heading text-3xl font-bold text-primary sm:text-4xl">
            {t("home.syndromeVideoTitle")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("home.syndromeVideoDescription")}</p>
        </div>
        <video
          controls
          playsInline
          preload="none"
          poster="/med13-syndrome-poster.jpg"
          aria-label={t("home.syndromeVideoTitle")}
          className="aspect-video w-full rounded-xl bg-black shadow-lg"
          data-testid="video-syndrome-explained"
        >
          <source src={videoUrl} type="video/mp4" />
          <a href={videoUrl}>{t("home.syndromeVideoFallback")}</a>
        </video>
      </div>
    </section>
  );
}