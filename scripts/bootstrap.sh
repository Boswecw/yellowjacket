#!/usr/bin/env bash
set -euo pipefail

echo "== YellowJacket bootstrap =="

if command -v bun >/dev/null 2>&1; then
  echo "Using bun"
  bun install
  bun run typecheck
  bun test
else
  echo "Using npm"
  npm install
  npm run typecheck
  npm test
fi

echo
echo "Bootstrap complete."
echo "Next:"
echo "1. Review docs/build-set"
echo "2. Review docs/setup/01-implementation-checklist.md"
echo "3. Start in packages/yellowjacket-contracts"
