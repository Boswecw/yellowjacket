export interface BaselineComparisonInput {
  usefulnessScore: number;
  reviewBurdenScore: number;
  structuralCorrectnessScore: number;
  degradedHonestyScore: number;
  performanceCostScore: number;
}

export function summarizeBaselineComparison(
  workcellName: string,
  candidate: BaselineComparisonInput,
  baseline: BaselineComparisonInput
): string {
  const candidateTotal =
    candidate.usefulnessScore +
    candidate.reviewBurdenScore +
    candidate.structuralCorrectnessScore +
    candidate.degradedHonestyScore -
    candidate.performanceCostScore;

  const baselineTotal =
    baseline.usefulnessScore +
    baseline.reviewBurdenScore +
    baseline.structuralCorrectnessScore +
    baseline.degradedHonestyScore -
    baseline.performanceCostScore;

  if (candidateTotal > baselineTotal) {
    return `${workcellName} currently justifies itself against the simpler baseline.`;
  }

  if (candidateTotal === baselineTotal) {
    return `${workcellName} is tied with the simpler baseline and is not yet clearly justified.`;
  }

  return `${workcellName} does not yet justify its orchestration burden against the simpler baseline.`;
}
