import { useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Camera,
  ExternalLink,
  Film,
  FlaskConical,
  HeartHandshake,
  Play,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SymposiumPlaylist from "@/components/SymposiumPlaylist";
import { AuctionDonorRecognition, SponsorRecognition } from "@/components/GalaRecognition";
import logoUrl from "@assets/gala_disco_logo.png";

const albums = [
  {
    id: "pro-bono",
    name: "Pro Bono Photo",
    noteKey: "albumProBonoNote",
    href: "https://www.probonophoto.org/2026/10Oct26PaloAltoMED13",
    credit: "Chris Cassell/ProBonoPhoto.org",
    image: "/images/gala-ccassell-8942.webp",
    altKey: "albumProBonoAlt",
    previews: [
      { image: "/images/gala-ccassell-8942.webp", altKey: "selectedPhotoChildAlt" },
      { image: "/images/gala-ccassell-8837.webp", altKey: "selectedPhotoEmbraceAlt" },
      { image: "/images/gala-ccassell-8753.webp", altKey: "selectedPhotoWaveAlt" },
      { image: "/images/gala-ccassell-8683.webp", altKey: "selectedPhotoPaddleAlt" },
    ],
  },
  {
    id: "ajm",
    name: "AJM Photography",
    noteKey: "albumAjmNote",
    href: "https://ajmphotography628.pixieset.com/med13gala/",
    credit: "AJM Photography",
    image: "/images/gala-ajm-77.webp",
    altKey: "albumAjmAlt",
    previews: [
      { image: "/images/gala-ajm-77.webp", altKey: "ajmPhotoDisplayAlt" },
      { image: "/images/gala-ajm-81.webp", altKey: "ajmPhotoGuestsAlt" },
      { image: "/images/gala-ajm-72.webp", altKey: "ajmPhotoPropsAlt" },
      { image: "/images/gala-ajm-84.webp", altKey: "ajmPhotoEmbraceAlt" },
    ],
  },
  {
    id: "photobooth",
    name: "Twin Flames Photobooth",
    noteKey: "albumBoothNote",
    href: "https://boothpics.com/KYIN",
    credit: "Twin Flames Photobooth",
    image: "/images/gala-photobooth-guests.webp",
    altKey: "albumBoothAlt",
    previews: [
      { image: "/images/gala-photobooth-guests.webp", altKey: "boothPhotoGuestsAlt" },
      { image: "/images/gala-photobooth-hats.webp", altKey: "boothPhotoHatsAlt" },
      { image: "/images/gala-photobooth-group.webp", altKey: "boothPhotoGroupAlt" },
      { image: "/images/gala-photobooth-friends.webp", altKey: "boothPhotoFriendsAlt" },
    ],
  },
];

export default function Gala() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = `${t("galaRecap.metaTitle")} | MED13 Foundation`;
    const meta = document.querySelector('meta[name="description"]');
    const oldDescription = meta?.getAttribute("content");
    const description = t("galaRecap.metaDescription");
    if (meta) meta.setAttribute("content", description);
    else {
      const element = document.createElement("meta");
      element.name = "description";
      element.content = description;
      document.head.appendChild(element);
    }
    return () => {
      document.title = "MED13 Foundation";
      if (meta && oldDescription !== null && oldDescription !== undefined) {
        meta.setAttribute("content", oldDescription);
      }
    };
  }, [t, i18n.language]);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Navigation />

      <main>
        <section className="relative overflow-hidden bg-[#f2f5ee] pb-16 pt-10 sm:pb-24 sm:pt-16" data-testid="section-gala-hero">
          <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[#dcebe5] opacity-80 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:px-8">
            <div className="max-w-2xl">
              <img src={logoUrl} alt="MED13 Foundation" className="mb-7 h-16 w-auto object-contain object-left" />
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#b56855]">{t("galaRecap.eyebrow")}</p>
              <h1 className="font-heading text-5xl font-bold leading-[1.02] tracking-tight text-[#235b5e] sm:text-6xl lg:text-7xl">
                {t("galaRecap.title")}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#435957] sm:text-xl">{t("galaRecap.intro")}</p>
              <Link href="/impact" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#235b5e] underline decoration-[#d59b83] underline-offset-4 hover:text-[#b56855]">
                {t("galaRecap.explore")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <div className="mt-12 grid max-w-lg grid-cols-2 items-end gap-4 border-t border-[#bdcfc7] pt-6">
                <div>
                  <p className="font-heading text-3xl font-bold tracking-tight text-[#235b5e] sm:text-5xl">$123,660</p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.13em] text-[#526c68]">{t("galaRecap.raisedLabel")}</p>
                </div>
                <div>
                  <p className="font-heading text-3xl font-semibold tracking-tight text-[#b56855] sm:text-4xl">$100,000</p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.13em] text-[#526c68]">{t("galaRecap.goalLabel")}</p>
                </div>
              </div>
            </div>
            <figure className="relative mx-auto w-full max-w-xl lg:ml-auto">
              <div className="absolute -bottom-4 -left-4 h-full w-full rounded-[2rem] border border-[#b7d1c9]" />
              <img
                src="/images/gala-2026-hero.webp"
                alt={t("galaRecap.heroPhotoAlt")}
                className="relative aspect-[4/3] w-full rounded-[2rem] object-cover object-top shadow-xl shadow-[#315a5120]"
                fetchPriority="high"
              />
              <figcaption className="relative mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#526c68]">
                <span>{t("galaRecap.heroCaption")}</span>
                <span>Allyson Moore</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="recap-progress" className="scroll-mt-20 border-b border-[#d7e1db] bg-[#fbfaf5] py-16 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[.75fr_1.25fr] lg:px-8">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#b56855]">{t("galaRecap.progressEyebrow")}</p>
              <h2 className="font-heading text-3xl font-bold leading-tight text-[#235b5e] sm:text-4xl">{t("galaRecap.progressTitle")}</h2>
            </div>
            <div className="rounded-3xl border border-[#d9e2dc] bg-white/80 p-6 sm:p-9">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e4efea] text-[#235b5e]">
                  <FlaskConical className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#235b5e]">{t("galaRecap.cohortTitle")}</h3>
                  <p className="mt-2 leading-relaxed text-[#50615d]">{t("galaRecap.cohortBody")}</p>
                </div>
              </div>
              <p className="mt-7 border-l-2 border-[#d59b83] pl-4 text-sm leading-relaxed text-[#6b716c]">{t("galaRecap.fundingNote")}</p>
              <div className="mt-7 flex items-start gap-3 border-t border-[#e1e7e2] pt-6">
                <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-[#b56855]" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-[#52615d]">{t("galaRecap.thanks")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#e8f0eb] py-16 sm:py-24" aria-labelledby="gala-gallery-title">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#b56855]">{t("galaRecap.galleryEyebrow")}</p>
                <h2 id="gala-gallery-title" className="font-heading text-3xl font-bold text-[#235b5e] sm:text-4xl">{t("galaRecap.galleryTitle")}</h2>
                <p className="mt-3 max-w-2xl text-[#52615d]">{t("galaRecap.galleryIntro")}</p>
              </div>
              <a href={albums[0].href} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#235b5e] underline underline-offset-4">
                {t("galaRecap.allPhotos")} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {albums.map((album) => (
                <a
                  key={album.name}
                  href={album.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex gap-4 rounded-2xl border border-[#cbd9d0] bg-[#f8faf6] p-4 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#235b5e] ${album.previews ? "flex-col md:col-span-2 lg:flex-row lg:items-center" : "items-center"}`}
                >
                  <span className={`flex min-w-0 items-center gap-4 ${album.previews ? "w-full lg:w-64 lg:shrink-0" : "w-full"}`}>
                    {!album.previews && (
                      <img src={album.image} alt={t(`galaRecap.${album.altKey}`)} loading="lazy" className="h-16 w-20 shrink-0 rounded-xl object-cover" />
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-[#235b5e]">{album.name}</span>
                      <span className="mt-1 block text-xs text-[#62716b]">{t(`galaRecap.${album.noteKey}`)}</span>
                      <span className="mt-1 block text-[11px] text-[#62716b]">{t("galaRecap.photoCredit")}: {album.credit}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[#b56855]" aria-hidden="true" />
                  </span>
                  {album.previews && (
                    <span className="grid w-full flex-1 grid-cols-2 gap-2 sm:grid-cols-4" data-testid={`gala-${album.id}-selected-photos`}>
                      {album.previews.map((photo) => (
                        <img
                          key={photo.image}
                          src={photo.image}
                          alt={t(`galaRecap.${photo.altKey}`)}
                          loading="lazy"
                          className={`w-full rounded-xl ${album.id === "photobooth" ? "aspect-[1/3] max-h-80 bg-white object-contain" : "aspect-[4/3] object-cover object-top"}`}
                        />
                      ))}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fbfaf5] py-16 sm:py-24" aria-labelledby="gala-video-title">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-9 max-w-2xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#b56855]">{t("galaRecap.filmEyebrow")}</p>
              <h2 id="gala-video-title" className="font-heading text-3xl font-bold text-[#235b5e] sm:text-4xl">{t("galaRecap.filmTitle")}</h2>
              <p className="mt-3 leading-relaxed text-[#52615d]">{t("galaRecap.filmIntro")}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <article className="rounded-3xl bg-[#245c5e] p-6 text-[#f5f3eb] sm:p-8">
                <div className="flex items-center justify-between">
                  <Film className="h-7 w-7 text-[#efb89d]" aria-hidden="true" />
                  <span className="rounded-full border border-white/25 px-3 py-1 text-xs font-semibold">{t("galaRecap.comingSoon")}</span>
                </div>
                <h3 className="mt-7 font-heading text-2xl font-bold">{t("galaRecap.galaFilmTitle")}</h3>
                <p className="mt-2 leading-relaxed text-white/80">{t("galaRecap.galaFilmBody")}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#f0c1a8]">
                  <Play className="h-4 w-4" aria-hidden="true" /> {t("galaRecap.videoPending")}
                </div>
              </article>
              <article className="rounded-3xl border border-[#d9e2dc] bg-white p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <Play className="h-7 w-7 text-[#b56855]" aria-hidden="true" />
                  <span className="rounded-full bg-[#f4e8df] px-3 py-1 text-xs font-semibold text-[#915540]">{t("galaRecap.comingSoon")}</span>
                </div>
                <h3 className="mt-7 font-heading text-2xl font-bold text-[#235b5e]">{t("galaRecap.mimiTitle")}</h3>
                <p className="mt-2 leading-relaxed text-[#52615d]">{t("galaRecap.mimiBody")}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#8b624f]"><Play className="h-4 w-4" aria-hidden="true" />{t("galaRecap.videoPending")}</span>
                  <a href="https://opus132.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-[#235b5e] underline underline-offset-4">
                    opus132.org <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="border-y border-[#d5ded7] bg-[#f1ede2] py-12 sm:py-16">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fffaf0] text-[#b56855]">
                <CalendarDays className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a45e4a]">{t("galaRecap.nextEyebrow")}</p>
                <h2 className="mt-1 font-heading text-2xl font-bold text-[#235b5e]">{t("galaRecap.nextTitle")}</h2>
                <p className="mt-1 text-[#52615d]">{t("galaRecap.nextDate")}</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#66716b]">{t("galaRecap.nextNote")}</p>
          </div>
        </section>

        <SponsorRecognition />
        <AuctionDonorRecognition />

        <SymposiumPlaylist />

        <section className="border-t border-[#d9e2dc] bg-[#fbfaf5] py-12">
          <div className="mx-auto max-w-4xl space-y-4 px-4 text-center sm:px-6">
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-[#235b5e]">
              <Camera className="h-4 w-4" aria-hidden="true" />
              {t("galaRecap.musicBy")}{" "}
              <a href="https://www.twinflamebayarea.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Twin Flame</a>
              <span aria-hidden="true">·</span>
              {t("galaRecap.hostedBy")}
            </div>
            <p className="text-xs leading-relaxed text-[#66716b]">{t("gala.footerFiscal")}</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <Link href="/champions" className="font-semibold text-[#235b5e] underline underline-offset-4">{t("recognition.seeAll")}</Link>
              <Link href="/" className="inline-flex items-center gap-1 font-semibold text-[#235b5e] underline underline-offset-4">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t("galaRecap.backHome")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
