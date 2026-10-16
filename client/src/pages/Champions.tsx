import { useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { auctionDonors, recognitionToday, sponsors } from "@/data/galaRecognition";

const entries = [...sponsors, ...auctionDonors].sort((a, b) => a.name.localeCompare(b.name, "en"));

export default function Champions() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    document.title = `${t("recognition.championsTitle")} | MED13 Foundation`;
    return () => { document.title = "MED13 Foundation"; };
  }, [t]);

  const today = recognitionToday();
  const active = entries.filter((entry) => entry.expires >= today);
  const past = entries.filter((entry) => entry.expires < today);
  const monthLabel = (month: string) => {
    const [year, number] = month.split("-").map(Number);
    return new Intl.DateTimeFormat(i18n.language === "es" ? "es" : "en", { month: "long", year: "numeric" }).format(new Date(year, number - 1, 1));
  };
  const list = (items: typeof entries) => (
    <ul className="divide-y divide-border rounded-lg border border-border bg-white px-5 sm:px-8">
      {items.map((entry) => (
        <li key={entry.name} className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-4">
          <span className="font-medium text-primary">
            {entry.url ? <a href={entry.url} target="_blank" rel={entry.tier === "In-Kind Donor" ? "noopener noreferrer" : "sponsored noopener noreferrer"} className="underline-offset-4 hover:underline focus-visible:underline">{entry.name}</a> : entry.name}
          </span>
          <span className="text-sm text-muted-foreground">
            {entry.tier === "In-Kind Donor" ? t("recognition.inKind") : entry.tier} · {monthLabel(entry.recognized)}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="bg-[#edf7f5] px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <Link href="/gala" className="mb-8 inline-block text-sm font-semibold text-primary underline underline-offset-4">{t("recognition.backGala")}</Link>
            <h1 className="font-heading text-4xl font-bold text-primary sm:text-5xl">{t("recognition.championsTitle")}</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{t("recognition.championsIntro")}</p>
          </div>
        </section>
        <section className="mx-auto max-w-4xl px-4 py-14 sm:py-20">
          <h2 className="mb-6 font-heading text-2xl font-bold text-primary">{t("recognition.current")}</h2>
          {active.length ? list(active) : <p className="text-muted-foreground">{t("recognition.noCurrent")}</p>}
          <h2 className="mb-6 mt-16 font-heading text-2xl font-bold text-primary">{t("recognition.past")}</h2>
          {past.length ? list(past) : <p className="text-muted-foreground">{t("recognition.noPast")}</p>}
        </section>
      </main>
      <Footer />
    </div>
  );
}