import { randomUUID } from "node:crypto";
import {
  SCHEMA_VERSION,
  createArtifactIdentity,
  type PermissionEnvelope,
  type WorkcellRequest
} from "@yellowjacket/contracts";

export interface AuthorForgeSceneReviewInput {
  sceneDocumentRefs: string[];
  requestedBy: string;
}

export function createAuthorForgePermissionEnvelope(): PermissionEnvelope {
  return {
    permission_envelope_id: `pe-${randomUUID()}`,
    workcell_id: "scene-continuity-review",
    trust_domain: "local_sensitive_review",
    allowed_dependencies: ["cortex", "neuronforge-local"],
    allowed_role_ids: ["source-prep", "continuity-review", "evidence-assembler", "review-packet-assembler"],
    allowed_source_scopes: ["authorforge:scene"],
    allowed_artifact_outputs: ["WorkerResult", "EvidenceBundle", "VerificationDecision", "ReviewPacket", "RunTrace", "DegradedStatus"],
    blocked_action_classes: ["canonical_writeback", "autonomous_execution"],
    approval_required_action_classes: ["promotion_proposal"],
    retention_expectations: ["bounded_evidence_only", "review_packet_redaction_when_needed"],
    resume_eligibility: true
  };
}

export function createAuthorForgeSceneContinuityRequest(
  input: AuthorForgeSceneReviewInput,
  permissionEnvelope: PermissionEnvelope
): WorkcellRequest {
  const runId = `run-${randomUUID()}`;
  const base = createArtifactIdentity(
    "WorkcellRequest",
    runId,
    "scene-continuity-review",
    "authorforge-binding",
    permissionEnvelope.trust_domain
  );

  return {
    ...base,
    artifact_type: "WorkcellRequest",
    schema_version: SCHEMA_VERSION,
    request_id: base.artifact_id,
    requested_by: input.requestedBy,
    request_context: {
      app: "AuthorForge",
      feature: "Scene Continuity Review"
    },
    input_refs: input.sceneDocumentRefs,
    requested_outputs: ["ReviewPacket", "VerificationDecision", "EvidenceBundle", "RunTrace"],
    review_owner_class: "human_author",
    baseline_path_id: "single-pass-scene-review",
    permission_envelope_ref: permissionEnvelope.permission_envelope_id
  };
}
