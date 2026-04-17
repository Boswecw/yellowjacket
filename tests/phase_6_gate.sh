#!/usr/bin/env bash
set -euo pipefail

fail() {
  echo "PHASE_6_GATE_FAIL: $1" >&2
  exit 1
}

require_file() {
  local path="$1"
  [[ -f "$path" ]] || fail "missing file: $path"
}

require_file "packages/yellowjacket-admission/package.json"
require_file "packages/yellowjacket-admission/tsconfig.json"
require_file "packages/yellowjacket-admission/src/contracts/scheduled-admission.ts"
require_file "packages/yellowjacket-admission/src/scheduler/admission-window.ts"
require_file "packages/yellowjacket-admission/src/scheduler/evaluate-scheduled-admission.ts"
require_file "tests/phase_6_proof.ts"
require_file "docs/implementation/hermes_openclaw/phase_6_scheduled_admission.md"
require_file "tests/phase_6_gate.sh"

command -v bun >/dev/null 2>&1 || fail "bun is not installed or not on PATH"

bunx tsc -p packages/yellowjacket-execution-adapters/tsconfig.json --noEmit
bunx tsc -p packages/yellowjacket-admission/tsconfig.json --noEmit
bun tests/phase_6_proof.ts | grep -q "PHASE_6_PROOF_PASS"

echo "PHASE_6_GATE_PASS"
