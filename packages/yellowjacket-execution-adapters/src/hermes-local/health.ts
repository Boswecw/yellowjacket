import type { ProviderHealthSnapshot } from "../interfaces/execution-adapter";

export function providerIsUsable(snapshot: ProviderHealthSnapshot): boolean {
  return snapshot.healthState === "ready" || snapshot.healthState === "degraded";
}
