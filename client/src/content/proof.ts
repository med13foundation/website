type ProofItem = {
  valueKey: string;
  labelKey: string;
  noteKey?: string;
};

// Reuse the Impact page's translation keys so both dashboards stay in sync.
export const proofItems: readonly ProofItem[] = [
  { valueKey: "impact.metricFamilies", labelKey: "impact.metricLabels.families", noteKey: "home.proofKnownFamiliesContext" },
  { valueKey: "impact.metricBiobank", labelKey: "impact.metricLabels.biobank" },
  { valueKey: "impact.metricSurveys", labelKey: "impact.metricLabels.surveys", noteKey: "impact.metricSurveysNote" },
  { valueKey: "impact.metricCells", labelKey: "impact.metricLabels.cells", noteKey: "home.proofModelsContext" },
  { valueKey: "impact.metricResearch", labelKey: "impact.metricLabels.research", noteKey: "impact.metricResearchNote" },
  { valueKey: "impact.fundraisingFigure", labelKey: "impact.fundraisingTitle", noteKey: "impact.fundraisingContext" },
];