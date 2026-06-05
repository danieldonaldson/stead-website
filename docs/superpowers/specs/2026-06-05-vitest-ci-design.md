# Vitest + GitHub CI Design

## Goal

Add component render tests using Vitest and the Astro Container API, and wire them into a GitHub Actions CI workflow that also verifies the build.

## Test Setup

- Add `vitest` to `devDependencies`
- Add a `vitest.config.ts` at the project root configured for the `node` environment (Container API is SSR, not DOM)
- Tests live in `src/tests/`
- Add a `"test": "vitest run"` script to `package.json`
- No separate `vite.config.ts` needed — Vitest picks up the Vite config embedded in `astro.config.mjs`

## What Gets Tested

Tests cover all 7 pages and 3 components using the Astro Container API (`experimental_AstroContainer` from `astro/container`).

For each:

1. **Render without throwing** — `container.renderToString(Component)` completes without error
2. **Contains expected landmark content** — a basic string assertion on the HTML output (e.g. index contains `"stead"`, contact contains `"contact"`, nav renders a link to `/`)

No snapshot tests — copy on a marketing site changes too frequently. Structural smoke tests only.

**Pages:** `index`, `contact`, `ourstory`, `excellence`, `performance`, `processes`, `stories`

**Components:** `Nav`, `Footer`, `ContactCard`

## GitHub CI Workflow

File: `.github/workflows/ci.yml`

Triggers: `push` and `pull_request` to `main`

Steps:
1. Checkout
2. Setup pnpm via `pnpm/action-setup` (version from `packageManager` field: `11.4.0`)
3. Setup Node 22
4. `pnpm install --frozen-lockfile`
5. `pnpm run build` — runs `astro check` + `astro build`
6. `pnpm test` — runs Vitest render tests

Two separate steps so build failures and test failures are clearly attributed. No dependency caching.

## Files Changed

- `package.json` — add `vitest` devDependency, add `test` script
- `vitest.config.ts` — new file, node environment, points at `src/tests/**/*.test.ts`
- `src/tests/pages.test.ts` — render tests for all 7 pages
- `src/tests/components.test.ts` — render tests for Nav, Footer, ContactCard
- `.github/workflows/ci.yml` — new CI workflow
