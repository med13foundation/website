type ProofItem = {
  valueKey: string;
  labelKey: string;
};

// Reuse the Impact page's translation keys so both dashboards stay in sync.
export const proofItems: readonly ProofItem[] = [
  { valueKey: "impact.metricFamilies", labelKey: "impact.metricLabels.families" },
  { valueKey: "impact.metricBiobank", labelKey: "impact.metricLabels.biobank" },
  { valueKey: "impact.metricSurveys", labelKey: "impact.metricLabels.surveys" },
  { valueKey: "impact.metricCells", labelKey: "impact.metricLabels.cells" },
  { valueKey: "impact.metricResearch", labelKey: "impact.metricLabels.research" },
  { valueKey: "impact.fundraisingFigure", labelKey: "impact.fundraisingTitle" },
];