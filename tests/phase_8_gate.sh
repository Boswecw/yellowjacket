#!/usr/bin/env bash
set -euo pipefail

fail() {
  echo "PHASE_8_GATE_FAIL: $1" >&2
  exit 1
}

require_file() {
  local path="$1"
  [[ -f "$path" ]] || fail "missing file: $path"
}

require_file "packages/yellowjacket-hardening/package.json"
require_file "packages/yellowjacket-hardening/tsconfig.json"
require_file "packages/yellowjacket-hardening/src/contracts/audit-event.ts"
require_file "packages/yellowjacket-hardening/src/services/build-idempotency-key.ts"
require_file "packages/yellowjacket-hardening/src/services/assert-replay-packet-invariants.ts"
require_file "packages/yellowjacket-hardening/src/services/build-audit-event.ts"
require_file "tests/phase_8_proof.ts"
require_file "docs/implementation/hermes_openclaw/phase_8_hardening.md"
require_file "tests/phase_8_gate.sh"

command -v bun >/dev/null 2>&1 || fail "bun is not installed or not on PATH"

bunx tsc -p packages/yellowjacket-execution-adapters/tsconfig.json --noEmit
bunx tsc -p packages/yellowjacket-admission/tsconfig.json --noEmit
bunx tsc -p packages/yellowjacket-replay/tsconfig.json --noEmit
bunx tsc -p packages/yellowjacket-hardening/tsconfig.json --noEmit
bun tests/phase_8_proof.ts | grep -q "PHASE_8_PROOF_PASS"

echo "PHASE_8_GATE_PASS"
