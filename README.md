# Park&Wash

Park&Wash is a mobile auto detailing website and booking tool for private
customers and business fleets. The goal is to let customers reserve real
available time slots while the owner manages bookings, leads, services, prices,
and availability through an admin dashboard.

## Current Status

This repository contains the bootstrapped Next.js contact-first preview for
`nl`, `fr`, and `en`. Public pages, privacy/consent copy, contact lead
submission, public form rate limiting, admin lead visibility, and local
verification coverage are implemented.

The issue #9 launch gate was run on 2026-05-31. Local lint, typecheck, unit,
database, build, E2E, mobile, contact-submit, and accessibility checks passed.
Production launch is not ready yet because the production deployment,
Supabase project/env vars, Upstash env vars, and Vercel Bot Protection
`Challenge` mode still need confirmation.

## Read First

For humans and AI coding assistants, read these files in order:

1. `AGENTS.md` - canonical working contract and project-specific rules.
2. `docs/PLAN.md` - master product, architecture, schema, and test plan.
3. `docs/plan-bootstrap-mobile-first.md` - concrete implementation plan for
   Fase 1, step 1.
4. `docs/strategy/DECISIONS.md` - durable decisions, including brand and
   admin-managed pricing.
5. `docs/strategy/DOCUMENTATION_SYSTEM.md` - where project knowledge belongs
   and how to evolve docs over time.
6. `docs/operations/RUNBOOK.md` - operational setup and launch-gate evidence.
7. `docs/design/README.md` - design handoff guide and asset map.

Claude Code should read `CLAUDE.md`, which points back to `AGENTS.md`.

## Sources Of Truth

| Topic | Source |
|---|---|
| Agent instructions | `AGENTS.md` |
| Product and architecture plan | `docs/PLAN.md` |
| Bootstrap plan | `docs/plan-bootstrap-mobile-first.md` |
| Decisions | `docs/strategy/DECISIONS.md` |
| Documentation system | `docs/strategy/DOCUMENTATION_SYSTEM.md` |
| Operations and launch gates | `docs/operations/RUNBOOK.md` |
| Brand tokens | `src/styles/tokens.css` |
| Shipping logos | `public/brand/logo/` |
| Design reference | `docs/design/` |

## Planned Stack

- Next.js App Router + TypeScript
- Tailwind CSS mapped to `src/styles/tokens.css`
- Supabase PostgreSQL + Supabase Auth
- next-intl for Dutch, French, and English
- react-hook-form + zod for forms
- Vitest and Playwright for tests
- Vercel hosting

## Important Product Rules

- Booking is a real reservation flow, not a request form.
- The UI must not show booking success before the server confirms the write.
- Services and prices are admin-managed and must not be hardcoded in
  production code.
- Production booking may only use published services.
- Admin access is restricted to allowlisted users.
- `docs/design/` is read-only reference material; production code must use the
  canonical assets and tokens instead.

## Commands

Active commands:

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

## Environment

Use `.env.local.example` as the local template. Public contact form
submissions require these Supabase values to write leads:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Production public form submissions also require Vercel Marketplace Upstash
Redis:

```bash
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

Local development without the Upstash variables uses the explicit permissive
rate-limit fallback. Production fails closed when they are missing.
