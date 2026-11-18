# Minimal Template

This is a [React Native](https://reactnative.dev/) project built with [Expo](https://expo.dev/) and [React Native Reusables](https://reactnativereusables.com).

It was initialized using the following command, then the `Minimal (Nativewind)` template was selected when prompted:

```bash
npx @react-native-reusables/cli@latest init
```

## Getting Started

To run the development server:

```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
```

> **Bun:** use it as a package manager (`bun install`), but run the Expo CLI with
> Node (`npx expo start`, `npm run dev`, …). Running it with `bun dev` breaks web
> static rendering because Bun's `Error.captureStackTrace` rejects the error
> objects built by `axios`/`follow-redirects` (`TypeError: First argument must be
> an Error object`). The Docker image below follows the same rule.

This will start the Expo Dev Server. Open the app in:

- **iOS**: press `i` to launch in the iOS simulator _(Mac only)_
- **Android**: press `a` to launch in the Android emulator
- **Web**: press `w` to run in a browser

You can also scan the QR code using the [Expo Go](https://expo.dev/go) app on your device. This project fully supports running in Expo Go for quick testing on physical devices.

## Docker

Works with both **Docker Compose** and **Podman** (`podman compose`).

Build the images first (the `web` target needs a raised file-descriptor limit, see below):

```bash
./docker/build.sh          # both targets: dev + web
./docker/build.sh dev      # Expo dev server only
./docker/build.sh web      # static web bundle only
```

Then start the Expo dev server (Metro bundler) plus a static web preview:

```bash
docker compose up          # or: podman compose up
```

- Metro bundler / Expo dev server: http://localhost:8081
- Static web preview (Nginx): http://localhost:8080
- Legacy dev-tools ports are also published: `19000`, `19001`, `19002`

The terminal is interactive — press `w` to open the web version, `a` for Android, etc. For a physical device, advertise your machine's LAN IP:

```bash
REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.10 docker compose up
```

Start only one service:

```bash
docker compose up expo   # dev server only
docker compose up web    # web preview only
```

The API base URL comes from `.env` (`EXPO_PUBLIC_API_URL`). Override it per-run:

```bash
EXPO_PUBLIC_API_URL=http://my-api:3000 ./docker/build.sh web && docker compose up web
```

> **Why a build script instead of `compose build`?**
>
> - `expo export` opens many files at once. Buildah (the builder behind
>   `podman build`) defaults the hard file-descriptor limit to `1024`, which
>   aborts the web build with
>   `EMFILE: too many open files … lucide-react-native/…`. `docker/build.sh`
>   passes `--ulimit nofile=65536:65536` to work around it. Docker's own default
>   is already high enough.
> - The `EXPO_PUBLIC_API_URL` value is read from `docker-compose.yml`'s
>   `${EXPO_PUBLIC_API_URL}` at build time, so the variable needs to be in the
>   shell environment (or in `.env` for compose) when building.

> **Podman notes**
>
> - Image names are fully qualified (`docker.io/...`, `localhost/...`) so no `unqualified-search-registries` config is needed.
> - Prefer short names instead? Add `unqualified-search-registries = ["docker.io"]` to `~/.config/containers/registries.conf`.
> - On SELinux hosts the project bind mount uses `:z`; keep it if the container reports `Permission denied`.


## Adding components

You can add more reusable components using the CLI:

```bash
npx react-native-reusables/cli@latest add [...components]
```

> e.g. `npx react-native-reusables/cli@latest add input textarea`

If you don't specify any component names, you'll be prompted to select which components to add interactively. Use the `--all` flag to install all available components at once.

## Project Features

- ⚛️ Built with [Expo Router](https://expo.dev/router)
- 🎨 Styled with [Tailwind CSS](https://tailwindcss.com/) via [Nativewind](https://www.nativewind.dev/)
- 📦 UI powered by [React Native Reusables](https://github.com/founded-labs/react-native-reusables)
- 🚀 New Architecture enabled
- 🔥 Edge to Edge enabled
- 📱 Runs on iOS, Android, and Web

## Learn More

To dive deeper into the technologies used:

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [Nativewind Docs](https://www.nativewind.dev/)
- [React Native Reusables](https://reactnativereusables.com)

## Deploy with EAS

The easiest way to deploy your app is with [Expo Application Services (EAS)](https://expo.dev/eas).

- [EAS Build](https://docs.expo.dev/build/introduction/)
- [EAS Updates](https://docs.expo.dev/eas-update/introduction/)
- [EAS Submit](https://docs.expo.dev/submit/introduction/)

---

If you enjoy using React Native Reusables, please consider giving it a ⭐ on [GitHub](https://github.com/founded-labs/react-native-reusables). Your support means a lot!
