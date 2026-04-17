#!/usr/bin/env bash
set -euo pipefail

fail() {
  echo "PHASE_2_GATE_FAIL: $1" >&2
  exit 1
}

require_file() {
  local path="$1"
  [[ -f "$path" ]] || fail "missing file: $path"
}

require_file "packages/yellowjacket-execution-adapters/src/contracts/invocation-packet.ts"
require_file "packages/yellowjacket-execution-adapters/src/contracts/provider-capabilities.ts"
require_file "packages/yellowjacket-execution-adapters/src/contracts/provider-receipt.ts"
require_file "packages/yellowjacket-execution-adapters/src/contracts/review-packet.ts"
require_file "packages/yellowjacket-execution-adapters/src/contracts/runtime-status.ts"
require_file "packages/yellowjacket-execution-adapters/src/interfaces/execution-adapter.ts"
require_file "packages/yellowjacket-execution-adapters/src/hermes-local/mapper.ts"
require_file "packages/yellowjacket-execution-adapters/src/hermes-local/transport.ts"
require_file "docs/implementation/hermes_openclaw/phase_2_contract_schema_expansion.md"
require_file "tests/phase_2_gate.sh"

command -v bun >/dev/null 2>&1 || fail "bun is not installed or not on PATH"

bunx tsc -p packages/yellowjacket-execution-adapters/tsconfig.json --noEmit

echo "PHASE_2_GATE_PASS"
