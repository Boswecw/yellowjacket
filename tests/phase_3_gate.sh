#!/usr/bin/env bash
set -euo pipefail

fail() {
  echo "PHASE_3_GATE_FAIL: $1" >&2
  exit 1
}

require_file() {
  local path="$1"
  [[ -f "$path" ]] || fail "missing file: $path"
}

require_file "packages/yellowjacket-execution-adapters/src/hermes-local/config.ts"
require_file "packages/yellowjacket-execution-adapters/src/hermes-local/http.ts"
require_file "packages/yellowjacket-execution-adapters/src/hermes-local/protocol.ts"
require_file "packages/yellowjacket-execution-adapters/src/hermes-local/mapper.ts"
require_file "packages/yellowjacket-execution-adapters/src/hermes-local/transport.ts"
require_file "docs/implementation/hermes_openclaw/phase_3_runtime_hermes_adapter_foundation.md"
require_file "tests/phase_3_gate.sh"

command -v bun >/dev/null 2>&1 || fail "bun is not installed or not on PATH"

bunx tsc -p packages/yellowjacket-execution-adapters/tsconfig.json --noEmit

echo "PHASE_3_GATE_PASS"
