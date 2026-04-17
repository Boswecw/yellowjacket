#!/usr/bin/env bash
set -euo pipefail

fail() {
  echo "FULL_PLAN_CLOSEOUT_FAIL: $1" >&2
  exit 1
}

run_gate() {
  local repo_path="$1"
  local gate_path="$2"

  [[ -d "$repo_path" ]] || fail "missing repo: $repo_path"
  [[ -f "$repo_path/$gate_path" ]] || fail "missing gate: $repo_path/$gate_path"

  (
    cd "$repo_path"
    bash "$gate_path"
  )
}

YJ_REPO="${YJ_REPO:-$HOME/Forge/ecosystem/yellowjacket}"
OPENCLAW_REPO="${OPENCLAW_REPO:-$HOME/Forge/ecosystem/openclaw}"

run_gate "$YJ_REPO" "tests/phase_0_gate.sh"
run_gate "$YJ_REPO" "tests/phase_1_gate.sh"
run_gate "$YJ_REPO" "tests/phase_2_gate.sh"
run_gate "$YJ_REPO" "tests/phase_3_gate.sh"

run_gate "$OPENCLAW_REPO" "tests/phase_4_gate.sh"
run_gate "$OPENCLAW_REPO" "tests/phase_5_gate.sh"

run_gate "$YJ_REPO" "tests/phase_6_gate.sh"
run_gate "$YJ_REPO" "tests/phase_7_gate.sh"
run_gate "$YJ_REPO" "tests/phase_8_gate.sh"

echo "FULL_PLAN_CLOSEOUT_PASS"
