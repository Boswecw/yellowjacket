import { randomUUID } from "node:crypto";
import { SCHEMA_VERSION } from "./enums.js";
import type { ArtifactType, BaseArtifact, Provenance, TrustDomain, VerificationStatus } from "./index.js";

export function createArtifactIdentity(
  artifactType: ArtifactType,
  runId: string,
  workcellId: string,
  createdBySystem: string,
  trustDomain?: TrustDomain
): BaseArtifact {
  const artifact: BaseArtifact = {
    artifact_id: `${artifactType}-${randomUUID()}`,
    artifact_type: artifactType,
    schema_version: SCHEMA_VERSION,
    run_id: runId,
    workcell_id: workcellId,
    created_at: new Date().toISOString(),
    created_by_system: createdBySystem,
    trace_id: `trace-${runId}`
  };

  if (trustDomain !== undefined) {
    artifact.trust_domain = trustDomain;
  }

  return artifact;
}

export function createProvenance(
  producerIdentity: string,
  component: string,
  sourceRefs: string[],
  verificationStatus: VerificationStatus = "unverified"
): Provenance {
  return {
    provenance_id: `prov-${randomUUID()}`,
    producer_type: "system",
    producer_identity: producerIdentity,
    model_family_or_system_component: component,
    produced_at: new Date().toISOString(),
    source_refs: sourceRefs,
    verification_status: verificationStatus,
    verification_method_refs: [],
    confidence_class: "not_applicable",
    confidence_source: "not_applicable",
    degraded_impact: []
  };
}