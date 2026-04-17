#!/usr/bin/env bash
set -euo pipefail

fail() {
  echo "PHASE_CLOSEOUT_GATE_FAIL: $1" >&2
  exit 1
}

require_file() {
  local path="$1"
  [[ -f "$path" ]] || fail "missing file: $path"
}

require_file "scripts/full_plan_closeout.sh"
require_file "docs/implementation/hermes_openclaw/post_phase_closeout_verification.md"
require_file "tests/phase_closeout_gate.sh"

bash scripts/full_plan_closeout.sh | grep -q "FULL_PLAN_CLOSEOUT_PASS"

echo "FULL_PLAN_CLOSEOUT_PASS"
