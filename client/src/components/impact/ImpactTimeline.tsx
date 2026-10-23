import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, ChevronDown, Circle, Clock3, ListCollapse, ListPlus } from "lucide-react";
import { ImpactCitation } from "@/components/impact/ImpactSources";

export type ImpactMilestone = {
  title: string;
  detail: string;
  status: "done" | "inProgress" | "next" | "notStarted";
  tag?: string;
  sources?: number[];
};

export type ImpactStage = {
  id: string;
  title: string;
  years: string;
  count: string;
  milestones: ImpactMilestone[];
};

const statusStyles = {
  done: "border-teal-200 bg-teal-50 text-teal-800",
  inProgress: "border-amber-200 bg-amber-50 text-amber-900",
  next: "border-orange-200 bg-orange-50 text-orange-900",
  notStarted: "border-stone-200 bg-stone-50 text-stone-600",
};

function StatusMark({ status }: { status: ImpactMilestone["status"] }) {
  if (status === "done") return <Check className="h-4 w-4" aria-hidden="true" />;
  if (status === "inProgress") return <Clock3 className="h-4 w-4" aria-hidden="true" />;
  return <Circle className="h-4 w-4" aria-hidden="true" />;
}

export default function ImpactTimeline({ stages }: { stages: ImpactStage[] }) {
  const { t } = useTranslation();
  const [openStages, setOpenStages] = useState<string[]>([]);
  const [openMilestones, setOpenMilestones] = useState<string[]>([]);

  const milestoneIds = useMemo(
    () => stages.flatMap((stage) => stage.milestones.map((_, index) => `${stage.id}-milestone-${index + 1}`)),
    [stages],
  );

  useEffect(() => {
    const openHashDestination = () => {
      const hash = window.location.hash.slice(1);
      const stage = stages.find((item) => item.id === hash || item.milestones.some((_, index) => `${item.id}-milestone-${index + 1}` === hash));
      if (!stage) return;
      setOpenStages((current) => current.includes(stage.id) ? current : [...current, stage.id]);
      if (hash !== stage.id) {
        setOpenMilestones((current) => current.includes(hash) ? current : [...current, hash]);
      }
      requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ block: "start" }));
    };
    openHashDestination();
    window.addEventListener("hashchange", openHashDestination);
    return () => window.removeEventListener("hashchange", openHashDestination);
  }, [stages]);

  const allStagesOpen = stages.length > 0 && openStages.length === stages.length;
  const allMilestonesOpen = milestoneIds.length > 0 && openMilestones.length === milestoneIds.length;

  return (
    <div className="mt-9">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#d5e6e2] bg-[#f2f8f6] px-4 py-3">
        <p className="text-sm leading-relaxed text-foreground/80">{t("impact.timelinePrompt")}</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              if (allStagesOpen) {
                setOpenStages([]);
                setOpenMilestones([]);
              } else {
                setOpenStages(stages.map((stage) => stage.id));
              }
            }}
            aria-expanded={allStagesOpen}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-primary/25 bg-card px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {allStagesOpen ? <ListCollapse className="h-4 w-4" aria-hidden="true" /> : <ListPlus className="h-4 w-4" aria-hidden="true" />}
            {t(allStagesOpen ? "impact.collapseAllStages" : "impact.expandAllStages")}
          </button>
          <button
            type="button"
            onClick={() => {
              if (!allMilestonesOpen) setOpenStages(stages.map((stage) => stage.id));
              setOpenMilestones(allMilestonesOpen ? [] : milestoneIds);
            }}
            aria-expanded={allMilestonesOpen}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-primary/25 bg-card px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {t(allMilestonesOpen ? "impact.collapseMilestones" : "impact.expandMilestones")}
          </button>
        </div>
      </div>

      <ol className="relative space-y-4 before:absolute before:bottom-8 before:left-[1.15rem] before:top-8 before:w-px before:bg-[#c8dcd7] sm:before:left-[1.55rem]">
        {stages.map((stage, index) => {
          const stageOpen = openStages.includes(stage.id);
          return (
            <li key={stage.id} className="relative pl-11 sm:pl-14">
              <span className="absolute left-0 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#c8dcd7] bg-[#e9f5f3] font-mono text-xs font-bold text-primary sm:left-1 sm:h-10 sm:w-10">
                0{index + 1}
              </span>
              <details
                id={stage.id}
                open={stageOpen}
                className="group/stage scroll-mt-28 overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                onToggle={(event) => {
                  const isOpen = event.currentTarget.open;
                  setOpenStages((current) => isOpen
                    ? current.includes(stage.id) ? current : [...current, stage.id]
                    : current.filter((item) => item !== stage.id));
                }}
              >
                <summary className="flex min-h-[108px] cursor-pointer list-none items-center gap-4 p-4 outline-none transition-colors hover:bg-[#f7faf9] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:gap-6 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-heading text-lg font-bold leading-tight text-primary sm:text-xl">{stage.title}</span>
                      <span className="rounded-full bg-[#e9f5f3] px-3 py-1 text-xs font-semibold text-primary">{stage.count}</span>
                    </span>
                    <span className="mt-2 block text-sm text-muted-foreground">{stage.years}</span>
                  </span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf5f3] text-primary transition-transform group-open/stage:rotate-180">
                    <ChevronDown className="h-5 w-5" aria-hidden="true" />
                  </span>
                </summary>
                <ol className="border-t border-border">
                  {stage.milestones.map((milestone, milestoneIndex) => {
                    const milestoneId = `${stage.id}-milestone-${milestoneIndex + 1}`;
                    const milestoneOpen = openMilestones.includes(milestoneId);
                    return (
                      <li key={milestoneId} className="border-b border-border last:border-b-0">
                        <details
                          id={milestoneId}
                          open={milestoneOpen}
                          className="group/milestone scroll-mt-28"
                          onToggle={(event) => {
                            const isOpen = event.currentTarget.open;
                            setOpenMilestones((current) => isOpen
                              ? current.includes(milestoneId) ? current : [...current, milestoneId]
                              : current.filter((item) => item !== milestoneId));
                          }}
                        >
                          <summary className="flex min-h-[68px] cursor-pointer list-none items-center gap-3 px-4 py-3 outline-none transition-colors hover:bg-[#f8faf9] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:px-6 sm:py-4 [&::-webkit-details-marker]:hidden">
                            <ChevronDown className="h-4 w-4 shrink-0 text-primary transition-transform group-open/milestone:rotate-180" aria-hidden="true" />
                            <span className="min-w-0 flex-1">
                              <span className="flex flex-wrap items-center gap-2">
                                <span className="text-left text-sm font-semibold text-foreground sm:text-base">{milestone.title}</span>
                                {milestone.tag && <span className="rounded bg-[#fff0e9] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#9b5947]">{milestone.tag}</span>}
                              </span>
                            </span>
                            <span aria-label={t(`impact.status.${milestone.status}`)} className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold sm:px-3 sm:text-xs ${statusStyles[milestone.status]}`}>
                              <StatusMark status={milestone.status} />
                              <span className="hidden min-[420px]:inline">{t(`impact.status.${milestone.status}`)}</span>
                            </span>
                          </summary>
                          <div className="pb-5 pl-11 pr-4 text-sm leading-relaxed text-muted-foreground sm:pl-[3.75rem] sm:pr-6">
                            {milestone.detail}
                            {milestone.sources && <ImpactCitation numbers={milestone.sources} />}
                          </div>
                        </details>
                      </li>
                    );
                  })}
                </ol>
              </details>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
