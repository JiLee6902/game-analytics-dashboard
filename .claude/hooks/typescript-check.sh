#!/bin/bash
# Post-tool hook: Type-check the project that was modified
# Triggered after Write/Edit on .ts or .tsx files

CHANGED_FILE="$1"

if [[ "$CHANGED_FILE" == *"backend/src/"* ]]; then
  cd backend && npx tsc --noEmit 2>&1
  if [ $? -ne 0 ]; then
    echo "WARN: Backend TypeScript errors detected"
    exit 1
  fi
elif [[ "$CHANGED_FILE" == *"frontend/src/"* ]]; then
  cd frontend && npx tsc --noEmit 2>&1
  if [ $? -ne 0 ]; then
    echo "WARN: Frontend TypeScript errors detected"
    exit 1
  fi
fi
