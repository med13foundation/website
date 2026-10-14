import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Serve from public instead of Vite's /@fs asset path so mobile browsers
// receive a stable same-origin MP4 URL with byte-range support.
const videoUrl = "/med13-syndrome.mp4";

type CaptionLanguage = "es" | "off";

export default function SyndromeVideo() {
  const { t, i18n } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const siteLanguage = i18n.resolvedLanguage === "es" ? "es" : "en";
  const [captionLanguage, setCaptionLanguage] = useState<CaptionLanguage>(siteLanguage === "es" ? "es" : "off");
  const [captionText, setCaptionText] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Keep the native track available for fullscreen, but use the same cues in
  // an opaque in-page band to hide the English text burned into the video.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const track = video.textTracks[0];
    if (!track) return;
    const updateCue = () => {
      const cue = track.activeCues?.[0] as VTTCue | undefined;
      setCaptionText(track.mode === "disabled" ? "" : cue?.text ?? "");
    };
    const updateSelection = () => {
      const nativeFullscreen = document.fullscreenElement === video ||
        Boolean((video as HTMLVideoElement & { webkitDisplayingFullscreen?: boolean }).webkitDisplayingFullscreen);
      if (track.mode === "showing" && !nativeFullscreen) {
        track.mode = "hidden";
      }
      setCaptionLanguage(track.mode === "disabled" ? "off" : "es");
      updateCue();
    };
    track.addEventListener("cuechange", updateCue);
    video.addEventListener("timeupdate", updateCue);
    video.textTracks.addEventListener("change", updateSelection);
    return () => {
      track.removeEventListener("cuechange", updateCue);
      video.removeEventListener("timeupdate", updateCue);
      video.textTracks.removeEventListener("change", updateSelection);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const track = video.textTracks[0];
    if (track) track.mode = siteLanguage === "es" ? (isFullscreen ? "showing" : "hidden") : "disabled";
    setCaptionLanguage(siteLanguage === "es" ? "es" : "off");
  }, [siteLanguage]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === video);
    };
    const onWebkitFullscreenStart = () => setIsFullscreen(true);
    const onWebkitFullscreenEnd = () => setIsFullscreen(false);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    video.addEventListener("webkitbeginfullscreen", onWebkitFullscreenStart);
    video.addEventListener("webkitendfullscreen", onWebkitFullscreenEnd);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      video.removeEventListener("webkitbeginfullscreen", onWebkitFullscreenStart);
      video.removeEventListener("webkitendfullscreen", onWebkitFullscreenEnd);
    };
  }, []);

  useEffect(() => {
    const track = videoRef.current?.textTracks[0];
    if (track) track.mode = captionLanguage === "es" ? (isFullscreen ? "showing" : "hidden") : "disabled";
  }, [captionLanguage, isFullscreen]);

  const chooseCaptions = (language: CaptionLanguage) => {
    const video = videoRef.current;
    const track = video?.textTracks[0];
    if (track) track.mode = language === "es" ? (isFullscreen ? "showing" : "hidden") : "disabled";
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
        <div className="relative">
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
            <track kind="subtitles" src="/captions/med13-es.vtt" srcLang="es" label="Español" default={siteLanguage === "es"} />
            <a href={videoUrl}>{t("home.syndromeVideoFallback")}</a>
          </video>
          {captionLanguage === "es" && captionText && !isFullscreen && (
            <div
              className="pointer-events-none absolute inset-x-[5%] bottom-[5%] flex min-h-[19%] items-center justify-center bg-[#071c1e] px-2 py-1 text-center text-xs leading-snug text-white sm:px-5 sm:text-lg"
              aria-live="polite"
              data-testid="syndrome-spanish-captions"
            >
              <span className="whitespace-pre-line">{captionText}</span>
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-foreground">
          <span>{t("home.syndromeVideoAudio")}</span>
          <span id="syndrome-video-captions">{t("home.syndromeVideoCaptions")}</span>
          <div role="group" aria-labelledby="syndrome-video-captions" className="inline-flex flex-wrap gap-2">
            {(["es", "off"] as const).map((language) => (
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
                  {t(`home.syndromeVideoCaption${language === "off" ? "Off" : "Spanish"}`)}
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
        <div className="mt-6 text-center">
          <Button asChild data-testid="link-syndrome-video-facts">
            <Link href="/what-is-med13-syndrome">
              {t("home.syndromeVideoLearnMore")}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}