export interface DriftMetrics {
  semantic_drift: number;
  coordination_cost_drift: number;
  review_burden_drift: number;
}

export function isWithinDriftThresholds(
  metrics: DriftMetrics,
  thresholds: DriftMetrics
): boolean {
  return (
    metrics.semantic_drift <= thresholds.semantic_drift &&
    metrics.coordination_cost_drift <= thresholds.coordination_cost_drift &&
    metrics.review_burden_drift <= thresholds.review_burden_drift
  );
}
