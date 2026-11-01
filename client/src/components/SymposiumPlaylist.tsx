import { useTranslation } from "react-i18next";
import { ExternalLink, Play } from "lucide-react";

export const SYMPOSIUM_PLAYLIST_URL = "https://www.youtube.com/playlist?list=PLXgylYmVXWF8";

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

        <a
          href={SYMPOSIUM_PLAYLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mx-auto block aspect-video max-w-3xl overflow-hidden rounded-xl bg-primary shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          aria-label={t("home.symposiumPlaylistOpen")}
          data-testid="link-symposium-playlist-preview"
        >
          <img
            src="/medopathies-symposium-playlist.jpg"
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/25">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
              <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
            </span>
          </span>
        </a>

        <div className="mt-5 text-center">
          <a
            href={SYMPOSIUM_PLAYLIST_URL}
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
