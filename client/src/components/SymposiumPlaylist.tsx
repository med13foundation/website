import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";

const playlistUrl = "https://www.youtube.com/playlist?list=PLXgylYmVXWF8";

export default function SymposiumPlaylist() {
  const { t } = useTranslation();

  return (
    <section
      id="symposium-recordings"
      className="bg-[#f2f7f6] px-4 py-16 sm:px-6 sm:py-20"
      aria-labelledby="symposium-recordings-title"
      data-testid="section-symposium-playlist"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#b56855]">
            {t("home.symposiumPlaylistEyebrow")}
          </p>
          <h2
            id="symposium-recordings-title"
            className="font-heading text-3xl font-bold text-primary sm:text-4xl"
          >
            {t("home.symposiumPlaylistTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-muted-foreground">
            {t("home.symposiumPlaylistDescription")}
          </p>
        </div>

        <div className="overflow-hidden rounded-xl bg-black shadow-lg">
          <div className="aspect-video w-full">
            <iframe
              src="https://www.youtube.com/embed/videoseries?list=PLXgylYmVXWF8&rel=0"
              title={t("home.symposiumPlaylistTitle")}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
              className="h-full w-full"
              data-testid="video-symposium-playlist"
            />
          </div>
        </div>

        <div className="mt-5 text-center">
          <a
            href={playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {t("home.symposiumPlaylistOpen")}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
