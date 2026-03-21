#!/bin/bash

# VERCEL PROFESSIONAL BUILD OPTIMIZATION
# Reference: https://vercel.com/docs/concepts/projects/overview#ignored-build-step

echo "Branch: $VERCEL_GIT_COMMIT_REF"
echo "Current Commit: $VERCEL_GIT_COMMIT_SHA"

# 1. Always build the main production branch if we can't determine the remote state
if [[ -z "$VERCEL_GIT_COMMIT_REF" || -z "$VERCEL_GIT_COMMIT_SHA" ]]; then
  echo "Missing Vercel variables. Proceeding with safety build."
  exit 1
fi

# 2. Skip automated sync branches from the CI workflow
if [[ "$VERCEL_GIT_COMMIT_REF" == auto-sync-* ]]; then
  echo "Automated sync branch detected ($VERCEL_GIT_COMMIT_REF). Skipping preview deployment."
  exit 0
fi

# 3. Fetch the latest commit hash from the remote for the current branch
LATEST_REMOTE_COMMIT=$(git ls-remote origin "refs/heads/$VERCEL_GIT_COMMIT_REF" | cut -f1)

if [[ -z "$LATEST_REMOTE_COMMIT" ]]; then
  echo "Could not fetch remote commit for $VERCEL_GIT_COMMIT_REF. Proceeding by default."
  exit 1
fi

echo "Latest Remote Commit: $LATEST_REMOTE_COMMIT"

# 3. Decision Logic:
# Only exit 1 (build) if we are on the HEAD of the branch.
if [[ "$VERCEL_GIT_COMMIT_SHA" == "$LATEST_REMOTE_COMMIT" ]]; then
  echo "Matches HEAD. Triggering deployment."
  exit 1
else
  echo "Redundant commit detected. Skipping this build to prioritize the latest push."
  exit 0
fi
