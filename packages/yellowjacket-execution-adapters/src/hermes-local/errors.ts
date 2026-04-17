export const HERMES_ERROR_FAMILIES = [
  "transport_error",
  "provider_reject",
  "provider_timeout",
  "provider_internal_error",
  "normalization_error",
  "policy_mismatch",
  "unsupported_capability",
] as const;

export type HermesErrorFamily = (typeof HERMES_ERROR_FAMILIES)[number];

export class HermesAdapterError extends Error {
  readonly family: HermesErrorFamily;

  constructor(message: string, family: HermesErrorFamily) {
    super(message);
    this.name = "HermesAdapterError";
    this.family = family;
  }
}
