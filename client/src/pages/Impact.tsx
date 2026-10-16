import { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowDown, ArrowRight, Check, Circle, Clock3, ExternalLink, Mail, Microscope, Users, Wallet } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ImpactSources, { ImpactCitation } from "@/components/impact/ImpactSources";
import { RESEARCH_COHORT_FORM_URL, CLASSY_DONATION_URL } from "@/lib/links";

type Milestone = { title: string; detail: string; status: "done" | "inProgress" | "next" | "notStarted"; tag?: string; sources?: number[] };
type Stage = { id: string; title: string; years: string; count: string; milestones: Milestone[] };

export default function Impact() {
  const { t } = useTranslation();
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const section = document.getElementById(window.location.hash.slice(1));
      section?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    document.title = t("impact.metaTitle");
    const meta = document.querySelector('meta[name="description"]');
    const previous = meta?.getAttribute("content") ?? null;
    meta?.setAttribute("content", t("impact.metaDescription"));
    return () => {
      document.title = "MED13 Foundation";
      if (meta && previous !== null) meta.setAttribute("content", previous);
    };
  }, [t]);

  const stages: Stage[] = [
    { id: "stage-1", title: t("impact.stage1Title"), years: t("impact.stage1Years"), count: t("impact.stage1Count"), milestones: [
      { title: t("impact.m1Title"), detail: t("impact.m1Detail"), status: "done", sources: [1, 6] },
      { title: t("impact.m2Title"), detail: t("impact.m2Detail"), status: "done" },
      { title: t("impact.m3Title"), detail: t("impact.m3Detail"), status: "done" },
      { title: t("impact.m4Title"), detail: t("impact.m4Detail"), status: "inProgress" },
    ]},
    { id: "stage-2", title: t("impact.stage2Title"), years: t("impact.stage2Years"), count: t("impact.stage2Count"), milestones: [
      { title: t("impact.m5Title"), detail: t("impact.m5Detail"), status: "done", sources: [7] },
      { title: t("impact.m6Title"), detail: t("impact.m6Detail"), status: "done" },
      { title: t("impact.m7Title"), detail: t("impact.m7Detail"), status: "inProgress" },
      { title: t("impact.m8Title"), detail: t("impact.m8Detail"), status: "inProgress", tag: t("impact.newMilestone") },
      { title: t("impact.m10Title"), detail: t("impact.m10Detail"), status: "next" },
    ]},
    { id: "stage-3", title: t("impact.stage3Title"), years: t("impact.stage3Years"), count: t("impact.stage3Count"), milestones: [
      { title: t("impact.m11Title"), detail: t("impact.m11Detail"), status: "inProgress", tag: t("impact.newMilestone"), sources: [7, 9] },
      { title: t("impact.m12Title"), detail: t("impact.m12Detail"), status: "notStarted" },
      { title: t("impact.m13Title"), detail: t("impact.m13Detail"), status: "notStarted" },
      { title: t("impact.m14Title"), detail: t("impact.m14Detail"), status: "notStarted" },
      { title: t("impact.m15Title"), detail: t("impact.m15Detail"), status: "notStarted" },
    ]},
    { id: "stage-4", title: t("impact.stage4Title"), years: t("impact.stage4Years"), count: t("impact.stage4Count"), milestones: [
      { title: t("impact.m16Title"), detail: t("impact.m16Detail"), status: "inProgress" },
      { title: t("impact.m17Title"), detail: t("impact.m17Detail"), status: "inProgress" },
      { title: t("impact.m18Title"), detail: t("impact.m18Detail"), status: "notStarted" },
      { title: t("impact.m19Title"), detail: t("impact.m19Detail"), status: "notStarted" },
    ]},
    { id: "stage-5", title: t("impact.stage5Title"), years: t("impact.stage5Years"), count: t("impact.stage5Count"), milestones: [
      { title: t("impact.m20Title"), detail: t("impact.m20Detail"), status: "notStarted" },
      { title: t("impact.m21Title"), detail: t("impact.m21Detail"), status: "notStarted" },
      { title: t("impact.m22Title"), detail: t("impact.m22Detail"), status: "notStarted" },
    ]},
  ];
  const statusStyles = {
    done: "border-teal-200 bg-teal-50 text-teal-800",
    inProgress: "border-amber-200 bg-amber-50 text-amber-900",
    next: "border-orange-200 bg-orange-50 text-orange-900",
    notStarted: "border-stone-200 bg-stone-50 text-stone-600",
  };
  const StatusIcon = ({ status }: { status: Milestone["status"] }) => status === "done" ? <Check className="h-4 w-4" aria-hidden="true" /> : status === "inProgress" ? <Clock3 className="h-4 w-4" aria-hidden="true" /> : <Circle className="h-4 w-4" aria-hidden="true" />;
  const metrics = [
    ["families", t("impact.metricFamilies"), t("impact.metricFamiliesNote"), t("impact.metricFamiliesNext")],
    ["biobank", t("impact.metricBiobank"), t("impact.metricBiobankNote"), t("impact.metricBiobankNext")],
    ["surveys", t("impact.metricSurveys"), t("impact.metricSurveysNote"), t("impact.metricSurveysNext")],
    ["cells", t("impact.metricCells"), t("impact.metricCellsNote"), t("impact.metricCellsNext")],
    ["research", t("impact.metricResearch"), t("impact.metricResearchNote"), t("impact.metricResearchNext")],
  ];
  const metricSources: Record<string, number[]> = {
    families: [1, 2], biobank: [1], surveys: [1],
    cells: [7], research: [7, 8],
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section className="relative overflow-hidden bg-[#e9f5f3] px-4 pb-14 pt-14 sm:pb-20 sm:pt-20">
          <div className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full bg-[#edab98]/25 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-warm">{t("impact.eyebrow")}</p>
            <h1 className="max-w-4xl font-heading text-4xl font-bold leading-[1.08] text-primary sm:text-6xl">{t("impact.title")}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/80 sm:text-xl">{t("impact.intro")}<ImpactCitation numbers={[4]} /></p>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground/80">{t("impact.studyContext")}</p>
            <p className="mt-5 max-w-3xl border-l-2 border-primary/50 pl-4 text-base leading-relaxed text-muted-foreground">{t("impact.denominatorPromise")}</p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-primary">
              <span>{t("impact.snapshot")}</span><span>{t("impact.staffNote")}</span>
            </div>
            <a href="#numbers" className="mt-9 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              {t("impact.explore")} <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>

        <nav aria-label={t("impact.sectionNavLabel")} className="border-b border-border bg-background">
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 text-sm font-semibold sm:px-6 lg:px-8">
            {["numbers", "fit", "roadmap", "next-steps", "take-part", "definitions", "sources"].map((id, index) => (
              <a key={id} href={`#${id}`} className="shrink-0 rounded-full px-3 py-2 text-primary hover:bg-[#e9f5f3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                {t(id === "sources" ? "impact.sourcesTitle" : `impact.anchor${index + 1}`)}
              </a>
            ))}
          </div>
        </nav>

        <section id="numbers" className="scroll-mt-24 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-9 max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-warm">{t("impact.numbersEyebrow")}</p>
              <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">{t("impact.numbersTitle")}</h2>
              <p className="mt-3 text-muted-foreground">{t("impact.numbersIntro")}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {metrics.map(([id, value, note, next]) => (
                <Fragment key={id}>
                  {(id === "families" || id === "cells") && (
                    <h3 className="col-span-full mt-4 font-heading text-xl font-bold text-primary">
                      {t(id === "families" ? "impact.familiesDataTitle" : "impact.researchFundingTitle")}
                    </h3>
                  )}
                <article key={id} className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
                  <h4 className="mb-3 font-heading text-base font-semibold text-foreground">{t(`impact.metricLabels.${id}`)}</h4>
                  <p className="font-mono text-3xl font-bold tracking-tight text-primary sm:text-4xl">{value}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{note}<ImpactCitation numbers={metricSources[id]} /></p>
                  {id === "cells" && (
                    <div className="mt-4 rounded-lg bg-primary/5 p-3 text-sm leading-relaxed">
                      <p className="font-semibold text-primary">{t("impact.modelCapitalTitle")}</p>
                      <p className="mt-1 text-foreground/80">{t("impact.modelCapitalNote")}<ImpactCitation numbers={[7, 9]} /></p>
                    </div>
                  )}
                  {next && <p className="mt-3 border-t border-border pt-3 text-xs font-medium leading-relaxed text-foreground/75">{next}</p>}
                </article>
                </Fragment>
              ))}
              <article className="rounded-xl border border-[#e9c6b8] bg-[#fff7f2] p-5 shadow-sm sm:p-6">
                <h4 className="mb-3 font-heading text-base font-semibold text-foreground">{t("impact.fundraisingTitle")}</h4>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div><p className="font-mono text-3xl font-bold tracking-tight text-primary sm:text-4xl">{t("impact.fundraisingFigure")}</p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/80">{t("impact.fundraisingContext")}<ImpactCitation numbers={[8]} /></p></div>
                </div>
                <p className="mt-3 border-t border-[#e9c6b8] pt-3 text-xs leading-relaxed text-muted-foreground">{t("impact.fundraisingNext")}</p>
              </article>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{t("impact.numberDefinitionNote")}</p>
          </div>
        </section>

        <section id="fit" className="scroll-mt-24 bg-[#f2f7f6] px-4 py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-warm">{t("impact.fitEyebrow")}</p>
              <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">{t("impact.fitTitle")}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{t("impact.fitIntro")}</p>
              <div className="mt-6 rounded-lg border-l-4 border-secondary bg-white/70 p-5">
                <h3 className="font-heading text-lg font-bold text-primary">{t("impact.whyFourTitle")}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("impact.whyFourBody")}<ImpactCitation numbers={[4, 5]} /></p>
              </div>
            </div>
            <ol className="space-y-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <li key={n} className="flex gap-4 rounded-xl border border-border bg-card p-4 sm:p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{n}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-heading text-lg font-bold text-primary">{t(`impact.fit${n}Title`)}</h3>
                      <span className="rounded-full bg-[#e9f5f3] px-3 py-1 text-xs font-semibold text-primary">{t(`impact.fit${n}Status`)}</span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(`impact.fit${n}Body`)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="roadmap" className="scroll-mt-24 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-warm">{t("impact.roadmapEyebrow")}</p>
              <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">{t("impact.roadmapTitle")}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{t("impact.roadmapIntro")}</p>
              <div className="mt-5 flex flex-wrap gap-2" aria-label={t("impact.legendLabel")}>
                {(["done", "inProgress", "next", "notStarted"] as const).map((status) => <span key={status} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyles[status]}`}><StatusIcon status={status} />{t(`impact.status.${status}`)}</span>)}
              </div>
            </div>
            <div className="mt-9 space-y-6">
              {stages.map((stage, i) => (
                <section key={stage.id} id={stage.id} className="scroll-mt-24 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                  <header className="flex flex-col gap-4 border-b border-border bg-[#f7faf9] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-3xl font-bold text-secondary sm:text-4xl">0{i + 1}</span>
                      <div><h3 className="font-heading text-xl font-bold text-primary sm:text-2xl">{stage.title}</h3><p className="mt-1 text-sm text-muted-foreground">{stage.years}</p></div>
                    </div>
                    <span className="w-fit rounded-full bg-[#e9f5f3] px-4 py-2 text-sm font-semibold text-primary">{stage.count}</span>
                  </header>
                  <ul className="divide-y divide-border">
                    {stage.milestones.map((milestone, j) => (
                      <li key={`${stage.id}-${j}`} className="grid gap-3 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:px-7">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-semibold text-foreground">{milestone.title}</h4>
                            {milestone.tag && <span className="rounded bg-[#fff0e9] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#9b5947]">{milestone.tag}</span>}
                          </div>
                          <p className="mt-2 max-w-4xl text-sm leading-relaxed text-muted-foreground">{milestone.detail}{milestone.sources && <ImpactCitation numbers={milestone.sources} />}</p>
                        </div>
                        <span className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[milestone.status]}`}><StatusIcon status={milestone.status} />{t(`impact.status.${milestone.status}`)}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section id="next-steps" className="scroll-mt-24 bg-[#f2f7f6] px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl"><p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-warm">{t("impact.nextEyebrow")}</p><h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">{t("impact.nextTitle")}</h2></div>
            <ol className="mt-8 grid gap-4 md:grid-cols-2">
              {[1, 3, 4, 5, 6].map((n) => <li key={n} className="flex gap-4 rounded-xl border border-border bg-card p-5">
                <span className="mt-0.5 font-mono text-sm font-bold text-warm">{t(`impact.step${n}When`)}</span>
                <p className="text-sm leading-relaxed text-foreground/85">{t(`impact.step${n}Body`)}</p>
              </li>)}
            </ol>
          </div>
        </section>

        <section id="take-part" className="scroll-mt-24 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-9 max-w-3xl"><p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-warm">{t("impact.moveEyebrow")}</p><h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">{t("impact.moveTitle")}</h2></div>
            <div className="grid gap-5 lg:grid-cols-3">
              <article className="flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-7"><Users className="h-7 w-7 text-primary" aria-hidden="true" /><h3 className="mt-4 font-heading text-xl font-bold text-primary">{t("impact.familiesTitle")}</h3><p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{t("impact.familiesBody")}</p><a href={RESEARCH_COHORT_FORM_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{t("impact.joinStudy")} <ExternalLink className="h-4 w-4" aria-hidden="true" /></a></article>
              <article className="flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-7"><Microscope className="h-7 w-7 text-primary" aria-hidden="true" /><h3 className="mt-4 font-heading text-xl font-bold text-primary">{t("impact.researchersTitle")}</h3><p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{t("impact.researchersBody")}</p><a href="mailto:research@med13.org" className="mt-6 inline-flex w-fit items-center gap-2 rounded-md border border-primary px-4 py-2.5 text-sm font-semibold text-primary hover:bg-[#e9f5f3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{t("impact.contactUs")} <Mail className="h-4 w-4" aria-hidden="true" /></a></article>
              <article className="flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-7"><Wallet className="h-7 w-7 text-primary" aria-hidden="true" /><h3 className="mt-4 font-heading text-xl font-bold text-primary">{t("impact.donorsTitle")}</h3><p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{t("impact.donorsBody")}</p><a href={CLASSY_DONATION_URL} className="mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-warm px-4 py-2.5 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm">{t("impact.donate")} <ArrowRight className="h-4 w-4" aria-hidden="true" /></a></article>
            </div>
          </div>
        </section>

        <section id="definitions" className="scroll-mt-24 border-t border-border bg-[#f7f5f0] px-4 py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div><p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-warm">{t("impact.aboutEyebrow")}</p><h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">{t("impact.aboutTitle")}</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t("impact.aboutIntro")}</p></div>
            <div className="space-y-4">
              {["definition1", "definition2", "definitionGeneticIncidence", "definition3", "definitionCapital", "definition4", "definition5"].map((key) => (
                <p key={key} className="border-b border-border pb-4 text-sm leading-relaxed text-foreground/80">
                  {t(`impact.${key}`)}
                  {key === "definitionGeneticIncidence" && <ImpactCitation numbers={[3]} />}
                  {key === "definitionCapital" && <ImpactCitation numbers={[7, 9]} />}
                </p>
              ))}
              <div className="rounded-xl border border-[#e5c6b8] bg-white/75 p-5">
                <p className="font-semibold text-primary">{t("impact.fiscalTitle")}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("impact.fiscalBody")}</p>
              </div>
            </div>
          </div>
        </section>
        <ImpactSources />
      </main>
      <Footer />
    </div>
  );
}
