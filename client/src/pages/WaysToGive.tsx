import { useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, BedDouble, CreditCard, Mail, Plane } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CLASSY_DONATION_URL } from "@/lib/links";

const TRAVEL_CONTACT = "mailto:amy@med13.org?subject=MED13%20family%20travel%20support";

export default function WaysToGive() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t("waysToGive.title")} | MED13 Foundation`;
    const meta = document.querySelector('meta[name="description"]');
    const previous = meta?.getAttribute("content") ?? null;
    meta?.setAttribute("content", t("waysToGive.metaDescription"));
    return () => {
      document.title = "MED13 Foundation";
      if (meta && previous !== null) meta.setAttribute("content", previous);
    };
  }, [t]);

  const methods = [
    { icon: Plane, title: t("waysToGive.milesTitle"), body: t("waysToGive.milesBody"), detail: t("waysToGive.milesDetail") },
    { icon: BedDouble, title: t("waysToGive.pointsTitle"), body: t("waysToGive.pointsBody"), detail: t("waysToGive.pointsDetail") },
    { icon: CreditCard, title: t("waysToGive.cashTitle"), body: t("waysToGive.cashBody"), detail: t("waysToGive.cashDetail") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="relative overflow-hidden bg-primary/10 px-4 py-16 sm:py-24">
          <div className="absolute -right-24 -top-20 h-80 w-80 rounded-full bg-secondary/15 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl">
            <Link href="/get-involved" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t("waysToGive.back")}
            </Link>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">{t("waysToGive.eyebrow")}</p>
            <h1 className="max-w-4xl font-heading text-4xl font-bold leading-tight text-primary sm:text-6xl">{t("waysToGive.title")}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/80 sm:text-xl">{t("waysToGive.hero")}</p>
          </div>
        </section>

        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-secondary">{t("waysToGive.travelEyebrow")}</p>
              <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">{t("waysToGive.travelTitle")}</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t("waysToGive.travelIntro")}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{t("waysToGive.travelContext")}</p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {methods.map(({ icon: Icon, title, body, detail }) => (
                <Card key={title} className="h-full border-border">
                  <CardContent className="p-6 sm:p-7">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-primary">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/80">{body}</p>
                    <p className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground">{detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary/5 px-4 py-14 sm:py-20">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl">{t("waysToGive.coordinateTitle")}</h2>
              <p className="mt-3 text-muted-foreground">{t("waysToGive.coordinateBody")}</p>
              <p className="mt-3 text-sm text-muted-foreground">{t("waysToGive.transferNote")}</p>
            </div>
            <Button asChild size="lg" className="shrink-0 self-start">
              <a href={TRAVEL_CONTACT}>
                <Mail className="mr-2 h-4 w-4" aria-hidden="true" /> {t("waysToGive.contactButton")}
              </a>
            </Button>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-16">
          <div className="mx-auto max-w-6xl border-l-4 border-secondary pl-6 sm:pl-8">
            <h2 className="font-heading text-xl font-bold text-primary">{t("waysToGive.generalTitle")}</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">{t("waysToGive.generalBody")}</p>
            <a href={CLASSY_DONATION_URL} className="mt-4 inline-flex items-center gap-2 font-semibold text-primary underline underline-offset-4">
              {t("waysToGive.generalButton")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}