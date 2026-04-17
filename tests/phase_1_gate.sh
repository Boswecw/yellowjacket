#!/usr/bin/env bash
set -euo pipefail

fail() {
  echo "PHASE_1_GATE_FAIL: $1" >&2
  exit 1
}

require_file() {
  local path="$1"
  [[ -f "$path" ]] || fail "missing file: $path"
}

require_file "package.json"
require_file "tsconfig.base.json"
require_file "packages/yellowjacket-execution-adapters/package.json"
require_file "packages/yellowjacket-execution-adapters/tsconfig.json"
require_file "packages/yellowjacket-execution-adapters/src/index.ts"
require_file "packages/yellowjacket-execution-adapters/src/interfaces/execution-adapter.ts"
require_file "packages/yellowjacket-execution-adapters/src/hermes-local/protocol.ts"
require_file "packages/yellowjacket-execution-adapters/src/hermes-local/transport.ts"
require_file "packages/yellowjacket-execution-adapters/src/hermes-local/mapper.ts"
require_file "packages/yellowjacket-execution-adapters/src/hermes-local/health.ts"
require_file "packages/yellowjacket-execution-adapters/src/hermes-local/errors.ts"
require_file "tests/phase_1_gate.sh"
require_file "docs/implementation/hermes_openclaw/phase_1_repo_skeleton.md"

command -v bun >/dev/null 2>&1 || fail "bun is not installed or not on PATH"

bunx tsc -p packages/yellowjacket-execution-adapters/tsconfig.json --noEmit

echo "PHASE_1_GATE_PASS"
