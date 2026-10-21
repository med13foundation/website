import { useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import {
  ArrowDown,
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

const photoGallery = [
  {
    image: "https://photos.smugmug.com/2026/10Oct26PaloAltoMED13/i-pdjkgX9/0/KfZRsDqdwSMNStFvFMBNqZVn9fX69vvNVRMbTm98W/S/MED13_1stGala_CCassell-8388-S.jpg",
    href: "https://www.probonophoto.org/2026/10Oct26PaloAltoMED13/i-pdjkgX9",
    altKey: "photo1Alt",
  },
  {
    image: "https://photos.smugmug.com/2026/10Oct26PaloAltoMED13/i-WmLLXnW/0/Mj9kz5QMmp67zgrScMwNHT7rrtHG3TH8ZnPQXwJPD/S/MED13_1stGala_CCassell-8405-S.jpg",
    href: "https://www.probonophoto.org/2026/10Oct26PaloAltoMED13/i-WmLLXnW",
    altKey: "photo2Alt",
  },
  {
    image: "https://photos.smugmug.com/2026/10Oct26PaloAltoMED13/i-ptSjP6J/0/LZRjdjVNJb7BcLBVJcKGHDLnHMN6hZThTwzPvmzwR/S/MED13_1stGala_CCassell-8426-S.jpg",
    href: "https://www.probonophoto.org/2026/10Oct26PaloAltoMED13/i-ptSjP6J",
    altKey: "photo3Alt",
  },
  {
    image: "https://photos.smugmug.com/2026/10Oct26PaloAltoMED13/i-3ThFGsC/0/K949HZfPNMLTxZ62tXkRdGJJVbNxCJgbfK3Q8Fhmn/S/MED13_1stGala_CCassell-8467-S.jpg",
    href: "https://www.probonophoto.org/2026/10Oct26PaloAltoMED13/i-3ThFGsC",
    altKey: "photo4Alt",
  },
  {
    image: "https://photos.smugmug.com/2026/10Oct26PaloAltoMED13/i-pmxNbqv/0/K7jdpGkqwstz8wLbLfztczFzdxcDpbmmRhRKTwFMJ/S/MED13_1stGala_CCassell-8498-S.jpg",
    href: "https://www.probonophoto.org/2026/10Oct26PaloAltoMED13/i-pmxNbqv",
    altKey: "photo5Alt",
  },
  {
    image: "https://photos.smugmug.com/2026/10Oct26PaloAltoMED13/i-VgJpTjx/0/Lqp8jH9pn54HSTb6G9mvS6DrD2hc9RqnVjS863ZMb/S/MED13_1stGala_CCassell-8523-S.jpg",
    href: "https://www.probonophoto.org/2026/10Oct26PaloAltoMED13/i-VgJpTjx",
    altKey: "photo6Alt",
  },
];

const albums = [
  {
    name: "Pro Bono Photo",
    noteKey: "albumProBonoNote",
    href: "https://www.probonophoto.org/2026/10Oct26PaloAltoMED13",
    credit: "Chris Cassell/ProBonoPhoto.org",
    image: photoGallery[0].image,
    altKey: "albumProBonoAlt",
  },
  {
    name: "AJM Photography",
    noteKey: "albumAjmNote",
    href: "https://ajmphotography628.pixieset.com/med13gala/",
    credit: "AJM Photography",
    image: "https://images.pixieset.com/932724421/166a46d5701a9f00e778333be082f019-xlarge.jpg",
    altKey: "albumAjmAlt",
  },
  {
    name: "Photobooth",
    noteKey: "albumBoothNote",
    href: "https://boothpics.com/KYIN",
    credit: "Photobooth",
    image: "https://d2dsm5y8gyd937.cloudfront.net/e77bab8c-7342-5be5-9f69-f54930aad422/CAPTURE/9d27c78e-b5e4-49c4-876d-ac0b7c133352/MKRGBOLVP3M9XT1X.thumb.jpeg",
    altKey: "albumBoothAlt",
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
              <a href="#recap-progress" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#235b5e] underline decoration-[#d59b83] underline-offset-4 hover:text-[#b56855]">
                {t("galaRecap.explore")} <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
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
                src={photoGallery[3].image}
                alt={t(`galaRecap.${photoGallery[3].altKey}`)}
                className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-xl shadow-[#315a5120]"
                fetchPriority="high"
              />
              <figcaption className="relative mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#526c68]">
                <span>{t("galaRecap.heroCaption")}</span>
                <span>Chris Cassell/ProBonoPhoto.org</span>
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
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {photoGallery.map((photo, index) => (
                <a
                  key={photo.href}
                  href={photo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-2xl bg-[#d1ddd6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#235b5e]"
                  aria-label={`${t("galaRecap.openPhoto")} ${index + 1}: ${t(`galaRecap.${photo.altKey}`)}`}
                >
                  <img
                    src={photo.image}
                    alt={t(`galaRecap.${photo.altKey}`)}
                    loading="lazy"
                    className="aspect-[1.5/1] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-[#172d2c]/85 to-transparent px-4 pb-4 pt-12 text-white">
                    <span className="text-xs font-medium">{t("galaRecap.photoCredit")}: Chris Cassell/ProBonoPhoto.org</span>
                    <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {albums.map((album) => (
                <a
                  key={album.name}
                  href={album.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-[#cbd9d0] bg-[#f8faf6] p-3 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#235b5e]"
                >
                  <img src={album.image} alt={t(`galaRecap.${album.altKey}`)} loading="lazy" className="h-16 w-20 shrink-0 rounded-xl object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-[#235b5e]">{album.name}</span>
                    <span className="mt-1 block text-xs text-[#62716b]">{t(`galaRecap.${album.noteKey}`)}</span>
                    <span className="mt-1 block text-[11px] text-[#62716b]">{t("galaRecap.photoCredit")}: {album.credit}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[#b56855]" aria-hidden="true" />
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
