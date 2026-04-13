import {
  createArtifactIdentity,
  type DependencyManifest,
  type PermissionEnvelope,
  type WorkcellDefinition,
  type WorkcellPlan,
  type WorkcellRequest
} from "@yellowjacket/contracts";

export function planWorkcell(
  request: WorkcellRequest,
  definition: WorkcellDefinition,
  permissionEnvelope: PermissionEnvelope
): { plan: WorkcellPlan; dependencyManifest: DependencyManifest } {
  if (permissionEnvelope.workcell_id !== definition.workcell_id) {
    throw new Error("Permission envelope workcell id mismatch.");
  }

  const planBase = createArtifactIdentity(
    "WorkcellPlan",
    request.run_id,
    request.workcell_id,
    "yellowjacket-core",
    request.trust_domain
  );

  const manifestBase = createArtifactIdentity(
    "DependencyManifest",
    request.run_id,
    request.workcell_id,
    "yellowjacket-core",
    request.trust_domain
  );

  const plan: WorkcellPlan = {
    ...planBase,
    artifact_type: "WorkcellPlan",
    plan_id: planBase.artifact_id,
    role_sequence: definition.declared_role_set,
    dependency_set: definition.declared_dependency_set,
    budget_limits: {
      max_role_invocations: definition.stop_conditions.max_role_invocations,
      max_retries: definition.stop_conditions.max_retries,
      max_elapsed_ms: definition.stop_conditions.max_elapsed_ms,
      max_branch_concurrency: definition.branch_policy.max_parallel_branches,
      max_model_calls: definition.stop_conditions.max_role_invocations
    },
    stop_conditions: definition.stop_conditions,
    declared_output_classes: definition.declared_output_classes,
    degraded_behavior_plan: ["surface degraded state in review packet", "block undeclared dependency use"],
    branch_policy: definition.branch_policy,
    checkpoint_policy: {
      eligible: definition.checkpoint_eligibility,
      strategy: definition.checkpoint_eligibility ? "manual" : "none"
    }
  };

  const dependencyManifest: DependencyManifest = {
    ...manifestBase,
    artifact_type: "DependencyManifest",
    manifest_id: manifestBase.artifact_id,
    declared_nodes: definition.declared_role_set,
    declared_edges: definition.declared_role_set.slice(1).map((roleId, index) => ({
      from: definition.declared_role_set[index]!,
      to: roleId
    })),
    branch_groups: definition.branch_policy.mode === "bounded_parallel" ? [definition.declared_role_set] : [],
    join_conditions: definition.branch_policy.join_conditions,
    dependency_requirements: definition.declared_dependency_set,
    max_parallel_branches: definition.branch_policy.max_parallel_branches,
    fallback_rules: ["fail closed on undeclared dependency", "surface degraded state"]
  };

  return { plan, dependencyManifest };
}
