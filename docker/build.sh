#!/usr/bin/env sh
# ---------------------------------------------------------------------------
# Build the pakdul-mobile images.
#
#   ./docker/build.sh            # both targets (dev + web)
#   ./docker/build.sh dev        # Expo dev server only
#   ./docker/build.sh web        # static web bundle only
#
# `--ulimit nofile` is required: `expo export` reads every file of the Metro
# module map at once and buildah (used by `podman build`) defaults the hard
# descriptor limit to 1024, which fails with
# `Error: EMFILE: too many open files, ... lucide-react-native/...`.
# Docker's default limit is high enough, but passing the flag is harmless.
# ---------------------------------------------------------------------------
set -eu

API_URL="${EXPO_PUBLIC_API_URL:-http://localhost:3000}"
TARGETS="${*:-dev web}"

# Prefer podman, fall back to docker.
if command -v podman >/dev/null 2>&1; then
  RUNTIME=podman
else
  RUNTIME=docker
fi

cd "$(dirname "$0")/.."

for target in $TARGETS; do
  case "$target" in
    dev)
      echo "==> building localhost/pakdul-mobile:dev"
      "$RUNTIME" build --ulimit nofile=65536:65536 \
        --target dev \
        -t localhost/pakdul-mobile:dev .
      ;;
    web)
      echo "==> building localhost/pakdul-mobile:web"
      "$RUNTIME" build --ulimit nofile=65536:65536 \
        --target web \
        --build-arg EXPO_PUBLIC_API_URL="$API_URL" \
        -t localhost/pakdul-mobile:web .
      ;;
    *)
      echo "unknown target: $target (expected 'dev' or 'web')" >&2
      exit 1
      ;;
  esac
done
