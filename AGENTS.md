# Park&Wash Agent Guide

This file is the working contract for humans and AI coding agents in this
repository. Read it before changing product logic, schema, public flows, admin
flows, pricing, or brand implementation.

## Project Context

- **Product:** Park&Wash website and booking tool.
- **Business:** Mobile auto detailing at home or on location.
- **Users:** Private customers, business fleet customers, the owner, and the
  development team.
- **Problem solved:** Customers can discover services and reserve a real
  available time slot without manual back-and-forth.
- **Product promise:** The customer gives the key; Park&Wash returns a
  showroom-ready car.
- **Primary workflow:** Self-booking with real server-confirmed availability.
- **Secondary workflow:** Contact form creates a lead for follow-up.
- **Admin workflow:** Owner and development team manage bookings, leads,
  services, prices, availability, blocked slots, and service area.
- **Launch languages:** Dutch, French, and English with functional parity.
- **Deploy target:** Vercel.
- **Database/auth:** Supabase PostgreSQL + Supabase Auth.
- **Frontend stack:** Next.js App Router, TypeScript, Tailwind CSS,
  next-intl, Framer Motion.

## Current Phase

The repository currently contains planning and brand foundation. It does not
yet contain a bootstrapped Next.js application.

Before app bootstrap, preserve the existing brand assets and docs:

- `src/styles/tokens.css`
- `public/brand/logo/`
- `public/favicon.svg`
- `public/favicon-16.png`
- `public/favicon-32.png`
- `public/apple-touch-icon.png`
- `docs/design/`

Do not import production code from `docs/design/`. That folder is read-only
reference material.

## Commands

These commands become active after the Next.js bootstrap is implemented.
Until then, do not invent commands that are not present in `package.json`.

| Purpose | Command |
|---|---|
| Install | `npm install` |
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Type check | `npm run typecheck` |
| Format | `npm run format` |
| Tests | `npm run test` |
| E2E tests | `npm run test:e2e` |
| Accessibility smoke | `npm run test:a11y` |
| Full gate | `npm run lint && npm run typecheck && npm run test && npm run test:e2e && npm run build` |
| Local DB reset | `supabase db reset` |

If a command is missing, add it deliberately during the bootstrap or relevant
implementation step and update this table.

## Sources Of Truth

| Topic | Source |
|---|---|
| Master product and architecture plan | `docs/PLAN.md` |
| Bootstrap implementation plan | `docs/plan-bootstrap-mobile-first.md` |
| Durable decisions | `docs/strategy/DECISIONS.md` |
| Documentation system | `docs/strategy/DOCUMENTATION_SYSTEM.md` |
| Brand tokens | `src/styles/tokens.css` |
| Shipping logos and favicons | `public/brand/logo/`, `public/favicon*`, `public/apple-touch-icon.png` |
| Design reference | `docs/design/` |
| Future schema truth | `supabase/migrations/` |
| Future environment docs | `.env.local.example` and `README.md` |

When sources disagree, stop and reconcile them before implementing. For
pricing and schema decisions, update `docs/strategy/DECISIONS.md`.

## Non-Negotiables

- The booking UI must never show success until the reservation has been saved
  server-side.
- The booking wizard may show only genuinely available slots.
- Availability, overlap, service area, and business rules must be validated on
  the server at reservation time.
- Production booking may use only published services and prices.
- Services and prices are admin-managed; production prices must not be
  hardcoded in UI code.
- Bookings must snapshot service name and pricing fields at reservation time.
- Private customer data, leads, bookings, and admin data must be protected by
  Supabase Auth, allowlisted admin users, and RLS.
- Public forms need validation, rate limiting, bot protection, consent, and
  privacy copy before launch.
- Production public form submissions require
  `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`; missing production
  rate-limit configuration must fail closed before Supabase writes.
- Dutch, French, and English routes must remain functionally equivalent for
  launch-critical public flows.
- Dummy data is allowed in development and staging only, not in live booking.

## Critical Workflows

| Workflow | Must not fail because |
|---|---|
| Booking reservation | Customers rely on real time slots; double bookings or false success damage trust. |
| Admin login | PII and operational controls must only be visible to allowlisted admins. |
| Services and pricing CRUD | The owner must be able to adjust prices without code changes or redeploys. |
| Contact lead creation | Leads are a business channel and must not silently disappear. |
| Availability management | Slots are only trustworthy if opening hours, buffers, blocked slots, and service area are correct. |

## Product Rules

### Services And Pricing

Initial services and prices:

- Basic detail: `from`, `price_min = 135`, `price_max = null`
- Intense detail: `from`, `price_min = 185`, `price_max = null`
- Lakcorrecties: `range`, `price_min = 250`, `price_max = 650`
- Coatings: `range`, `price_min = 500`, `price_max = 1200`
- Bedrijven/vloten: `on_request`, `price_min = null`, `price_max = null`

Schema shape:

- `services.price_min decimal nullable`
- `services.price_max decimal nullable`
- `services.price_type enum ('fixed', 'from', 'range', 'on_request')`
- booking snapshot fields for service name, price type, price min, and price max

Admin services CRUD must be the production source of truth. Seed data is for
development and staging only.

### Booking Engine

Slot generation must consider:

- opening hours
- service duration
- buffer before and after each appointment
- blocked days and blocked slots
- service area / allowed postal codes
- company timezone, default `Europe/Brussels`
- existing confirmed bookings

All final checks must run server-side immediately before insert/update.
Client-side checks are convenience only.

### Admin And Security

- Supabase Auth handles login.
- `admin_users` is the allowlist for actual admin access.
- Roles currently are `owner` and `developer`.
- RLS should default closed and open only explicit public insert/admin access
  paths.
- Never expose service role keys to browser code.
- Do not log PII unless there is a clear operational need and the value is
  redacted or minimized.

### Internationalization

- Public routes live under `/{locale}` with `nl`, `fr`, and `en`.
- Default locale is `nl`.
- Admin routes are not locale-prefixed unless a later decision changes this.
- Do not ship visible UI strings in only one language for launch-critical
  public flows.

### Brand And UI

- Use `src/styles/tokens.css` as the canonical token source.
- Map tokens into Tailwind during bootstrap; do not duplicate color values
  casually across components.
- Use Poppins for display/headings and Montserrat for body/UI.
- Use logo assets from `public/brand/logo/`.
- Treat `docs/design/` as reference, not as importable app code.
- Build mobile-first. Tap targets should be at least 44x44px.

## Architecture Rules

- Use Next.js App Router with TypeScript.
- Use `src/app/[locale]/` for public pages.
- Use `src/app/admin/` for admin pages.
- Use `src/app/api/` or server actions for server-side mutations, following
  the pattern chosen during implementation.
- Use Supabase migrations for schema changes.
- Use `next-intl` for translations.
- Use `react-hook-form` and `zod` for form validation.
- Use `date-fns` for date utilities unless a stronger need appears.
- Use `lucide-react` for UI icons where an icon is needed.
- Use Framer Motion for purposeful motion, not decorative noise.

## Working Rules For Agents

- Inspect the current code and docs before proposing architecture changes.
- Prefer the existing plan and decision log over new assumptions.
- Keep changes small and easy to review.
- Update docs when product rules, schema, env vars, commands, or critical
  workflows change.
- Use `docs/strategy/DOCUMENTATION_SYSTEM.md` to decide which document owns new
  project knowledge.
- Add migrations with the code that depends on them.
- Do not commit secrets or `.env.local`.
- Do not overwrite brand assets or generated logo files unless the user asks
  for a brand refresh.
- Do not edit `docs/design/` by hand unless explicitly maintaining the design
  handoff.
- If a change touches booking, admin auth, RLS, pricing, or PII, treat it as
  high risk and verify more carefully.

## Definition Of Done

For code changes:

- Relevant implementation is complete.
- `npm run lint`, `npm run typecheck`, relevant unit/integration/E2E tests,
  and `npm run build` pass when those commands exist.
- Database migrations are created and applied locally when schema changes.
- Public flows still work in `nl`, `fr`, and `en` when affected.
- Booking/admin/security changes include failure-path handling.
- Docs and examples are updated when behavior, commands, env vars, or schema
  change.

For planning/doc-only changes:

- The relevant source of truth is updated.
- Any durable decision is added to `docs/strategy/DECISIONS.md`.
- Open questions are marked clearly instead of hidden in prose.

## Temporary Open Items

- Bootstrap the Next.js app structure from `docs/plan-bootstrap-mobile-first.md`.
- Create Supabase migrations and dev seed data.
- Fill in exact service area / allowed postal codes.
- Fill in admin allowlist emails.
- Choose bot protection provider.
- Confirm domain name.
- Provide or choose launch-quality hero/portfolio media.
