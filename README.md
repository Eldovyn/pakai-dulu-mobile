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

### Host ports are already taken?

Every published port can be remapped from the shell — no file edits needed. This
is what to do when `up` fails with
`Bind for 0.0.0.0:8080 failed: port is already allocated`:

```bash
WEB_PORT=8090 docker compose up                 # http://localhost:8090
METRO_PORT=8091 docker compose up expo          # Metro on 8091 instead
WEB_PORT=8090 METRO_PORT=8091 docker compose up # both at once
```

| Variable             | Default  | Service | Purpose                        |
| -------------------- | -------- | ------- | ------------------------------ |
| `WEB_PORT`           | `8080`   | web     | Static web preview (Nginx)     |
| `METRO_PORT`         | `8081`   | expo    | Metro bundler                  |
| `EXPO_DEV_PORT`      | `19000`  | expo    | Expo dev server                |
| `EXPO_DEVTOOLS_PORT` | `19001`  | expo    | Expo dev tools                 |
| `EXPO_WEBUI_PORT`    | `19002`  | expo    | Expo dev tools (web UI)        |
| `EXPO_CONTAINER_NAME`| `pakdul-mobile-expo` | expo | Container name      |
| `WEB_CONTAINER_NAME` | `pakdul-mobile-web`  | web  | Container name      |

> Only the **container-internal** ports are fixed; remapping a host port does not
> change anything the app or Expo expects.

Two things commonly hold these ports:

- **A second checkout of this repo.** The compose file pins `container_name`, so
  two directories share the same project name (`name: pakdul-mobile`), the same
  container names, *and* the same host ports. Running `up` in both gives exactly
  this error. Run only one checkout at a time, or give the second one its own
  names/ports (table above).
- **A leftover container or another project on 8080** (e.g. an `adminer`, a
  `kubo`/IPFS gateway, or anything else bound to 8080).

Find and clear the owner before re-running:

```bash
ss -ltnp | grep ':8080'                          # host process
docker ps --filter publish=8080                  # container holding it
docker compose down --remove-orphans             # drop this project's leftovers
```

> **If a failed `up` left things broken:** a port conflict can abort *after* the
> container was created, leaving the rootless port forwarder (`rootlessport`)
> and the container's network namespace out of sync — the container looks
> `healthy` and serves fine from `docker exec`, but every request from the host
> is reset (`curl: (56) Recv failure: Connection reset by peer`). Restart the
> container to rebuild the forwarder:
>
> ```bash
> docker restart pakdul-mock-api   # or whichever container stops answering
> ```

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
