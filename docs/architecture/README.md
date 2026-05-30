# Architecture Overview

This document describes the current technical architecture after the initial
bootstrap. Product scope and invariants remain in `docs/PLAN.md`; durable
decisions remain in `docs/strategy/DECISIONS.md`.

## Current State

The app is a Next.js App Router project with:

- public locale routes for `/nl`, `/fr`, and `/en`
- contact-first public preview pages for home, services, about, portfolio, and
  contact in `nl`, `fr`, and `en`
- contact lead submission through a Server Action with Zod validation,
  explicit consent, generic failure handling, and server-confirmed Supabase
  insert feedback
- a booking preview page that keeps direct reservation unavailable until
  server-confirmed availability is implemented
- localized privacy-policy page with footer and public consent links
- protected `/admin` shell with Supabase login and email allowlist
- Tailwind CSS wired to Park&Wash tokens
- next-intl routing through `src/proxy.ts`
- Supabase browser/server client factories
- initial Supabase schema migration and dev seed
- Vitest unit tests, Supabase pgTAP RLS tests, and Playwright
  smoke/accessibility tests

## App Structure

```text
src/
  app/
    [locale]/          # public localized pages
    admin/             # non-localized admin shell
    api/               # future route handlers
    globals.css        # Tailwind + brand token mapping
  components/
    layout/            # Header, Footer, MobileNav, LocaleSwitcher, Logo
    forms/             # Consent notice and contact lead form
  i18n/                # next-intl routing, navigation, request config
  lib/
    leads/             # contact lead validation and action state helpers
    pricing/           # price formatting helpers
    services/          # public/admin service read helpers
    supabase/          # lazy Supabase client factories
  messages/            # nl/fr/en messages
```

## Routing

- Public routes live under `/{locale}`.
- Supported locales are `nl`, `fr`, and `en`.
- Default locale is `nl`.
- `src/proxy.ts` handles locale routing and excludes `/admin`, `/api`, static
  assets, and Next internals.
- `/admin` is intentionally not locale-prefixed.

## Styling

- Canonical tokens live in `src/styles/tokens.css`.
- `src/app/globals.css` imports those tokens and exposes them to Tailwind v4
  via `@theme inline`.
- Fonts are loaded with `next/font/google` in `src/app/fonts.ts`.
- Logo assets are loaded from `public/brand/logo/`.

## Data And Supabase

- The first schema migration is
  `supabase/migrations/0001_initial_schema.sql`.
- Local Supabase project config is in `supabase/config.toml`.
- Dev seed data is in `supabase/seed.sql`.
- Supabase clients are lazy factories:
  - `src/lib/supabase/client.ts`
  - `src/lib/supabase/server.ts`
- Public service previews use `src/lib/services/public.ts` to read
  `services` from Supabase with `visibility_status = 'published'`, ordered by
  `sort_order`, and mapped to the active `nl`, `fr`, or `en` fields. Home and
  services public previews both use this read path.
- The localized contact form submits through
  `src/app/[locale]/contact/actions.ts`, validates via
  `src/lib/leads/contact.ts`, and inserts a `leads` row only after validation
  and consent pass.
- Public lead writes are opened narrowly by
  `supabase/migrations/20260530130428_contact_lead_public_insert.sql`: anon can
  insert `contact_form` leads with `status = 'new'` and recent
  `privacy_consent_at`; public reads and workflow-status writes remain closed.
- Missing env vars throw only when a Supabase client is created, not at import
  time.

## Admin Auth

- `/admin/login` signs in with Supabase Auth.
- `/admin` is protected by `src/app/admin/(protected)/layout.tsx`.
- `src/lib/auth/admin.ts` is the central server-side admin guard.
- An authenticated user is only an admin when `admin_users.is_active = true`
  and either:
  - `admin_users.user_id = auth.uid()`, or
  - `admin_users.email` matches the authenticated JWT email.
- The production admin allowlist starts owner-only with
  `lahdhirilouay21@gmail.com` in `supabase/seed.sql`; no developer account is
  allowlisted by default.
- Missing Supabase env vars cause admin access to redirect to login instead of
  crashing public builds.

## Pricing

Services support:

- `fixed`
- `from`
- `range`
- `on_request`

The UI uses `src/lib/pricing/format.ts` for price labels. Production service
prices shown in public previews come from admin-managed Supabase records.

## Public Form Rate Limiting

- Production rate limiting for public contact and booking form mutations will
  use Upstash Redis provisioned through the Vercel Marketplace.
- The future implementation should use `@upstash/redis` and
  `@upstash/ratelimit` with sliding-window limits in a shared server-only
  helper.
- Rate-limit identifiers should combine route scope with hashed IP and, where
  available, hashed normalized email/phone values. Do not store raw IP
  addresses, emails, or phone numbers in Redis keys.
- Public mutations should return a generic retry-later error when limited and
  should fail closed in production if rate-limit configuration is missing.
- Local development may use an explicit permissive fallback until the Vercel
  Upstash resource is provisioned.
- Issue #5 deliberately leaves this helper as the next slice; the current
  contact action returns generic failures but does not rate-limit yet.

## Bot Protection

- Launch bot protection will use Vercel Bot Protection from the Vercel Firewall
  managed rulesets.
- Configure the managed ruleset in the Vercel project before public contact or
  booking forms go live. Start with logging/traffic observation where possible,
  then switch suspicious traffic to challenge mode before launch.
- Do not add Cloudflare Turnstile, hCaptcha, or reCAPTCHA by default in the
  first form implementation.
- Cloudflare Turnstile is the preferred fallback if Vercel Bot Protection plus
  rate limiting is not enough for real spam traffic.
- Vercel Attack Challenge Mode is reserved for targeted attacks and should not
  be the normal always-on form protection.

## Public Form Consent Copy

- Source text for contact and booking consent lives in
  `src/messages/{locale}.json` under `PrivacyConsent`.
- The copy covers checkbox labels, short privacy notices, validation errors,
  and privacy-policy link text for `nl`, `fr`, and `en`.
- The localized privacy-policy page lives at `/{locale}/privacy-policy`.
- Contact and booking consent notices link to the localized privacy policy.

## Testing

Commands:

```bash
npm run lint
npm run typecheck
npm run test
npm run test:db
npm run test:e2e
npm run build
```

Notes:

- The workspace path contains `&`, so `package.json` scripts invoke local tools
  through `node ./node_modules/...` instead of NPM `.bin` shims.
- Playwright Chromium is installed explicitly with
  `node ./node_modules/playwright/cli.js install chromium`.
- Public smoke coverage checks the contact-first preview routes, mobile
  navigation, footer contact routing, and published service display across
  launch locales.
- Contact smoke coverage checks that the form entry point renders across
  launch locales; unit coverage checks validation/consent parsing.
- Public accessibility smoke coverage runs against home, services, about,
  portfolio, and contact.
- `npm run test:db` runs `supabase test db`, including the pgTAP RLS
  verification suite in `supabase/tests/rls_public_admin_access.sql`.
- `package.json` overrides PostCSS to a patched `8.5.10+` line because the
  current Next dependency tree otherwise triggers an NPM audit advisory.
- `supabase db reset` and `npm run test:db` require Docker Desktop and the
  local Supabase stack.

## Next Technical Step

Fase 1, step 2 is partially implemented: admin login, server-side admin guard,
owner-only admin allowlist, and anonymous admin redirect smoke coverage are in
place.

Remaining auth/security work:

- implementation of the decided Upstash-backed public form rate limiter
- Vercel Bot Protection managed ruleset configuration before form launch
