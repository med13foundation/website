import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// Serve from public instead of Vite's /@fs asset path so mobile browsers
// receive a stable same-origin MP4 URL with byte-range support.
const videoUrl = "/med13-syndrome.mp4";

type CaptionLanguage = "en" | "es" | "off";

export default function SyndromeVideo() {
  const { t, i18n } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const siteLanguage = i18n.resolvedLanguage === "es" ? "es" : "en";
  const [captionLanguage, setCaptionLanguage] = useState<CaptionLanguage>(siteLanguage);

  // The native text-track menu can also change the selected track. Keep our
  // visible buttons in sync when the user makes that choice.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const updateSelection = () => {
      const active = Array.from(video.textTracks).find((track) => track.mode === "showing");
      setCaptionLanguage(active?.language === "es" ? "es" : active?.language === "en" ? "en" : "off");
    };
    video.textTracks.addEventListener("change", updateSelection);
    return () => video.textTracks.removeEventListener("change", updateSelection);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    Array.from(video.textTracks).forEach((track) => {
      track.mode = track.language === siteLanguage ? "showing" : "disabled";
    });
    setCaptionLanguage(siteLanguage);
  }, [siteLanguage]);

  const chooseCaptions = (language: CaptionLanguage) => {
    const video = videoRef.current;
    if (video) {
      Array.from(video.textTracks).forEach((track) => {
        track.mode = language !== "off" && track.language === language ? "showing" : "disabled";
      });
    }
    setCaptionLanguage(language);
  };

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
          ref={videoRef}
          controls
          playsInline
          preload="none"
          poster="/med13-syndrome-poster.jpg"
          aria-label={t("home.syndromeVideoTitle")}
          className="aspect-video w-full rounded-xl bg-black shadow-lg"
          data-testid="video-syndrome-explained"
        >
          <source src="/med13-syndrome.webm" type="video/webm" />
          <source src={videoUrl} type="video/mp4" />
          <track kind="captions" src="/captions/med13-en.vtt" srcLang="en" label="English" default={siteLanguage === "en"} />
          <track kind="subtitles" src="/captions/med13-es.vtt" srcLang="es" label="Español" default={siteLanguage === "es"} />
          <a href={videoUrl}>{t("home.syndromeVideoFallback")}</a>
        </video>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-foreground">
          <span>{t("home.syndromeVideoAudio")}</span>
          <span id="syndrome-video-captions">{t("home.syndromeVideoCaptions")}</span>
          <div role="group" aria-labelledby="syndrome-video-captions" className="inline-flex flex-wrap gap-2">
            {(["en", "es", "off"] as const).map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => chooseCaptions(language)}
                aria-pressed={captionLanguage === language}
                className={`rounded-full border px-3 py-1.5 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  captionLanguage === language
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-primary/30 bg-white text-primary hover:bg-primary/10"
                }`}
              >
                {t(`home.syndromeVideoCaption${language === "off" ? "Off" : language === "en" ? "English" : "Spanish"}`)}
              </button>
            ))}
          </div>
        </div>
        <details className="mx-auto mt-4 max-w-3xl text-sm text-foreground">
          <summary className="cursor-pointer font-medium underline underline-offset-2">{t("home.syndromeVideoVisualsTitle")}</summary>
          <p className="mt-3">{t("home.syndromeVideoVisualsIntro")}</p>
          <p className="mt-2">{t("home.syndromeVideoVisualsFeatures")}</p>
          <p className="mt-2">{t("home.syndromeVideoVisualsClosing")}</p>
        </details>
      </div>
    </section>
  );
}