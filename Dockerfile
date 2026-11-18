# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# pakdul-mobile — Expo (React Native) app
#
# Targets:
#   dev -> Expo dev server + Metro bundler (Android / iOS / web development)
#   web -> Nginx serving the static web export (production preview)
# ---------------------------------------------------------------------------

# --- install dependencies ---------------------------------------------------
# Bun is used only as a fast package manager (it reads bun.lock). The Expo CLI
# and Metro must run on Node: Bun's `Error.captureStackTrace` rejects the error
# objects that axios' node build (`follow-redirects`) creates while a module is
# being evaluated, which makes Expo's static web rendering fail with
# `TypeError: First argument must be an Error object`.
FROM docker.io/oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# --- runtime base (Node) ----------------------------------------------------
FROM docker.io/library/node:22-slim AS base
WORKDIR /app
ENV EXPO_NO_TELEMETRY=1
COPY --from=deps /app/node_modules ./node_modules

# --- development: Expo dev server + Metro bundler ---------------------------
FROM base AS dev
ENV NODE_ENV=development
COPY . .
# 8081 = Metro bundler, 19000-19002 = Expo dev server / dev tools
EXPOSE 8081 19000 19001 19002
CMD ["node", "node_modules/expo/bin/cli", "start"]

# --- build the static web bundle --------------------------------------------
FROM base AS build-web
# EXPO_PUBLIC_* values are inlined into the bundle at build time
ARG EXPO_PUBLIC_API_URL=http://localhost:3000
ENV NODE_ENV=production \
    EXPO_PUBLIC_API_URL=${EXPO_PUBLIC_API_URL}
COPY . .
RUN node node_modules/expo/bin/cli export --platform web --output-dir dist

# --- serve the static web bundle --------------------------------------------
FROM docker.io/library/nginx:1.27-alpine AS web
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-web /app/dist /usr/share/nginx/html
EXPOSE 80
