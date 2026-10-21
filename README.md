# Fairway Air

Marketing site for Fairway Air, an owner-operated HVAC contractor in Palm Desert, California.

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4. Every route is statically prerendered.

## Quick start

```sh
nvm use            # Node 24 (see .nvmrc)
npm ci
cp .env.example .env.local
npm run dev        # http://localhost:3000
```

## Scripts

| Script             | Purpose                                                   |
| ------------------ | --------------------------------------------------------- |
| `npm run dev`      | Dev server (Turbopack)                                    |
| `npm run build`    | Production build                                          |
| `npm start`        | Serve the production build                                |
| `npm run check`    | Format check, lint (zero warnings), typecheck, unit tests |
| `npm run format`   | Format with Prettier (sorts Tailwind classes)             |
| `npm test`         | Unit tests (Node's built-in runner, native TypeScript)    |
| `npm run test:e2e` | Playwright against the production build                   |

### End-to-end tests

The suite runs against `npm start`, so build first:

```sh
npm run build
npx playwright install      # once; downloads Chromium, Firefox, WebKit
npm run test:e2e
```

Projects cover desktop and mobile on Chromium, Firefox, and WebKit (Safari's engine). To use an installed Chrome or Edge instead of downloading Chromium, set `PW_CHANNEL=chrome` or `PW_CHANNEL=msedge`. Every test fails on any console error, which also catches Content Security Policy violations. `e2e/accessibility.spec.ts` runs axe WCAG 2.2 AA scans on every page and every step of the request form.

## Environment

| Variable                     | Default                               | Notes                                                    |
| ---------------------------- | ------------------------------------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`       | Vercel production URL, else localhost | Canonical origin for metadata, sitemap, structured data  |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `false`                               | Set `true` only after the owner approves a public launch |

While indexing is off, pages send `noindex, nofollow` and `robots.txt` disallows crawling.

## Project structure

```
app/                    Routes, metadata, error boundaries, robots, sitemap, manifest, icon
  globals.css           Design tokens (@theme), type scale, motion
components/
  sections/             One file per homepage section
  request/              Service-request context, trigger, and dialog (code-split)
  site-header.tsx       Fixed header and full-screen mobile menu
  site-footer.tsx
  mobile-action-bar.tsx
  reveal-observer.tsx   One IntersectionObserver for every [data-reveal] element
  ui.tsx, icons.tsx     Shared primitives
lib/
  site.ts               Business facts and navigation (single source of truth)
  content.ts            Services, FAQs, process steps, map coordinates
  request.ts            Pure request helpers, unit-tested in request.test.ts
e2e/                    Playwright specs
assets/images/          Images imported statically by next/image
public/og.jpg           1200 × 630 social preview
source-assets/          Original generated artwork (not deployed)
docs/                   Content provenance and image prompts
```

Server Components are the default. Client components are limited to what needs the browser: header scroll state and menu, the request dialog, the service-area selector, the temperature readout, the mobile action bar, and the reveal observer.

## Design system

- **Color:** navy `#102540` and gold `#ffd033` from the Fairway Air badge; warm sand neutrals sampled from the hero photograph. Tokens live in `app/globals.css` under `@theme`.
- **Type:** Archivo with its width axis (`font-wide`, `font-extrawide`) and IBM Plex Mono for instrument-style labels. Fluid sizes: `text-display-xl`, `text-display`, `text-title`, `text-lede`, `mono-label`.
- **Layout:** `shell` container (16px minimum gutter on phones) and `section-y` vertical rhythm, mobile first.
- **Motion:** progressive. With reduced motion or no JavaScript, all content is simply visible.

## Production

- **Hosting:** built for Vercel or any Node 22.18+ host: `npm run build && npm start`.
- **Security headers** (production only, see `next.config.ts`): Content Security Policy, HSTS, `X-Frame-Options: DENY`, `nosniff`, strict referrer policy, COOP, and a restrictive Permissions Policy. `X-Powered-By` is removed. Because pages are statically prerendered, the CSP allows inline scripts for Next's bootstrap and the JSON-LD block. If you add third-party scripts (analytics, Vercel toolbar on previews), extend the policy.
- **SEO:** per-page metadata, canonical URLs, Open Graph image, `HVACBusiness` structured data, sitemap, and web manifest.
- **Errors:** `app/error.tsx` (route-level) and `app/global-error.tsx` (root layout), both with a call-us fallback.

### CI

`.github/workflows/ci.yml` runs on every push to `main` and every pull request:

1. `npm run check` and `npm run build`
2. Playwright across Chromium, Firefox, and WebKit against that build; the HTML report is uploaded on failure

Dependabot (`.github/dependabot.yml`) opens weekly grouped npm updates and monthly GitHub Actions updates.

### Known advisories

`npm audit` reports a high-severity `braces` advisory reached through `eslint-config-next` → `fast-glob`. It is dev-only tooling, never shipped to users, and no patched release exists; `npm audit fix --force` would downgrade the Next lint config to v14. Production dependencies audit clean (`npm audit --omit=dev`).

## Request behavior

The request flow prepares an email to `fairwayair2021@gmail.com`; the visitor sends it from their own email app. There is no backend submission, booking confirmation, payment, or storage of contact details. A copy-to-clipboard fallback is included. For direct help, call `(760) 574-9788`.

If a delivery or booking service is added later, keep the confirmation language honest until it is live and tested. `lib/request.test.ts` guards against booking-confirmation wording.

## Accessibility

Semantic landmarks, a skip link, one `h1` per page, native `<dialog>` with focus moved to each step heading and returned to the trigger (including Safari, which does not focus buttons on click), inline form errors linked with `aria-describedby`, 44px minimum touch targets, safe-area insets, and WCAG AA color contrast.

## Content policy

Business facts come from the owner's reference site (reviewed 2026-10-21); see `docs/content-sources.md`. Imagery is illustrative and labelled as such. Ratings, testimonials, savings figures, guaranteed response times, and licensing claims are deliberately omitted until the owner verifies them.

### Before public launch

- [ ] Owner approves copy, business details, and imagery rights
- [ ] Replace the commercial rooftop photo (shows a manufacturer name) with owner-supplied or logo-free photography
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain and `NEXT_PUBLIC_ALLOW_INDEXING=true`
