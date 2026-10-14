type ProofItem = {
  valueKey: string;
  labelKey: string;
  noteKey?: string;
  warningKey?: string;
};

// Reuse the Impact page's translation keys so both dashboards stay in sync.
export const proofItems: readonly ProofItem[] = [
  { valueKey: "impact.metricFamilies", labelKey: "impact.metricLabels.families", noteKey: "home.proofKnownFamiliesContext" },
  { valueKey: "impact.metricBiobank", labelKey: "impact.metricLabels.biobank" },
  { valueKey: "impact.metricSurveys", labelKey: "impact.metricLabels.surveys" },
  { valueKey: "impact.metricEeg", labelKey: "impact.metricLabels.eeg" },
  { valueKey: "impact.metricCells", labelKey: "impact.metricLabels.cells", noteKey: "home.proofModelsContext" },
  { valueKey: "impact.metricGrants", labelKey: "impact.metricLabels.grants", noteKey: "impact.metricGrantsNote" },
  { valueKey: "impact.metricResearch", labelKey: "impact.metricLabels.research", noteKey: "impact.metricResearchNote" },
  { valueKey: "impact.fundraisingFigure", labelKey: "impact.fundraisingTitle", warningKey: "impact.awaitingConfirmation" },
];