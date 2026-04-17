#!/usr/bin/env bash
set -euo pipefail

fail() {
  echo "PHASE_7_GATE_FAIL: $1" >&2
  exit 1
}

require_file() {
  local path="$1"
  [[ -f "$path" ]] || fail "missing file: $path"
}

require_file "packages/yellowjacket-replay/package.json"
require_file "packages/yellowjacket-replay/tsconfig.json"
require_file "packages/yellowjacket-replay/src/contracts/replay.ts"
require_file "packages/yellowjacket-replay/src/services/evaluate-replay.ts"
require_file "packages/yellowjacket-replay/src/services/build-replay-invocation-packet.ts"
require_file "tests/phase_7_proof.ts"
require_file "docs/implementation/hermes_openclaw/phase_7_replay.md"
require_file "tests/phase_7_gate.sh"

command -v bun >/dev/null 2>&1 || fail "bun is not installed or not on PATH"

bunx tsc -p packages/yellowjacket-execution-adapters/tsconfig.json --noEmit
bunx tsc -p packages/yellowjacket-admission/tsconfig.json --noEmit
bunx tsc -p packages/yellowjacket-replay/tsconfig.json --noEmit
bun tests/phase_7_proof.ts | grep -q "PHASE_7_PROOF_PASS"

echo "PHASE_7_GATE_PASS"
