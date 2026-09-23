import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { auctionDonors, recognitionToday, sponsors } from "@/data/galaRecognition";

export function SponsorRecognition() {
  const { t } = useTranslation();

  return (
    <section id="sponsors" className="scroll-mt-24 border-y border-border bg-white py-14 sm:py-20" data-testid="section-gala-recognition">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">{t("recognition.sponsorsTitle")}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("recognition.sponsorsIntro")}</p>
        </div>
        <div className="space-y-10">
          {[sponsors.slice(0, 2), sponsors.slice(2)].map((row, index) => (
            <div key={index} className="flex flex-wrap items-center justify-center gap-x-10 gap-y-10 sm:gap-x-16">
              {row.map((sponsor) => {
                const logo = <img src={sponsor.logo} alt={`${sponsor.name}, ${sponsor.tier} of the MED13 Foundation gala.`} className="mx-auto h-32 max-w-full object-contain" style={{ width: sponsor.width }} />;
                return (
                  <div key={sponsor.name} className="flex min-w-[150px] flex-col items-center text-center" style={{ width: sponsor.width }}>
                    {sponsor.url ? (
                      <a href={sponsor.url} target="_blank" rel="sponsored noopener noreferrer" aria-label={sponsor.name}>{logo}</a>
                    ) : logo}
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">{sponsor.tier}</p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AuctionDonorRecognition() {
  const { t } = useTranslation();
  // Gala recognition runs through the quarter after the event; the Champions archive remains available afterward.
  if (recognitionToday() > "2027-03-31") return null;

  return (
    <section className="bg-[#f5f8f7] py-12 sm:py-16" data-testid="section-gala-auction-donors">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl">{t("recognition.donorsTitle")}</h2>
        <p className="mt-3 text-muted-foreground">{t("recognition.donorsIntro")}</p>
        <ul className="mt-7 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {auctionDonors.map((donor) => (
            <li key={donor.name} className="border-b border-border py-2 text-sm">
              <a href={donor.url} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline focus-visible:underline">{donor.name}</a>
            </li>
          ))}
        </ul>
        <p className="mt-9 text-sm">
          <Link href="/champions" className="font-semibold text-primary underline underline-offset-4">{t("recognition.seeAll")}</Link>
        </p>
      </div>
    </section>
  );
}