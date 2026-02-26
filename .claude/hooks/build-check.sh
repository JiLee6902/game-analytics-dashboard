#!/bin/bash
# Stop hook: Verify both projects build before ending session

echo "Running final build checks..."

ERRORS=0

cd backend && npx tsc --noEmit 2>&1
if [ $? -ne 0 ]; then
  echo "FAIL: Backend has TypeScript errors"
  ERRORS=$((ERRORS + 1))
fi

cd ../frontend && npx tsc --noEmit 2>&1
if [ $? -ne 0 ]; then
  echo "FAIL: Frontend has TypeScript errors"
  ERRORS=$((ERRORS + 1))
fi

if [ $ERRORS -eq 0 ]; then
  echo "All build checks passed"
else
  echo "WARNING: $ERRORS project(s) have build errors"
  exit 1
fi
