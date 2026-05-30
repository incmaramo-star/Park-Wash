# Decisions

Append-only log of decisions that shape the project. Newest entry at the top.

Each entry follows the template from `AGENTS.md` section 2: date, status,
decision, reason, impact, owner, review date.

---

## 2026-05-30 - Keep public lead access insert-only and contact-scoped

- **Status:** Decided
- **Owner:** Project owner
- **Decision:** Public visitors may create `leads` only through anonymous
  inserts scoped to `source = 'contact_form'`, `status = 'new'`, and an
  explicit recent `privacy_consent_at`. Public users may not read leads or set
  admin workflow statuses.
- **Reason:** The contact-first preview needs real lead capture, but leads
  contain PII and must remain private until an allowlisted admin reviews them.
- **Impact:**
  - The contact form shows success only after the server action receives a
    successful Supabase insert result.
  - RLS stays default-closed for lead reads and non-contact writes.
  - Admin lead follow-up remains a separate dashboard slice.
- **Sources of truth:**
  - RLS migration -
    `supabase/migrations/20260530130428_contact_lead_public_insert.sql`
  - Server validation - `src/lib/leads/contact.ts`
  - Contact mutation - `src/app/[locale]/contact/actions.ts`
  - RLS tests - `supabase/tests/rls_public_admin_access.sql`
- **Review date:** Re-evaluate when admin lead management or public form rate
  limiting changes the write path.

---

## 2026-05-17 - Make services and pricing admin-managed

- **Status:** Decided
- **Owner:** Project owner (zaakvoerder)
- **Decision:** Services and prices are managed through the admin dashboard,
  not hardcoded in production code. The initial service prices are:
  Basic detail from EUR 135, Intense detail from EUR 185, paint corrections
  EUR 250-650, coatings EUR 500-1200, and business/fleet work on request.
- **Reason:** The business needs visible start prices for customers, but the
  owner must be able to adjust prices without a deploy. The confirmed pricing
  includes both "from" pricing, ranges, and "on request", so the schema must
  support more than a single decimal price.
- **Impact:**
  - `services` uses `price_min`, nullable `price_max`, and `price_type`
    values `fixed`, `from`, `range`, and `on_request`.
  - `bookings` snapshot the service name and pricing fields at reservation
    time, so later admin price edits do not rewrite historical bookings.
  - Dev/staging seed data may include the start prices; production must only
    publish prices managed through admin.
  - `docs/PLAN.md` and `docs/plan-bootstrap-mobile-first.md` are updated to
    reflect this.
- **Sources of truth:**
  - Product/pricing rule - `docs/PLAN.md`
  - Bootstrap implementation details - `docs/plan-bootstrap-mobile-first.md`
  - Future live values - admin-managed `services` records in Supabase
- **Review date:** Re-evaluate when the admin services CRUD is implemented or
  if pricing packages change materially.

---

## 2026-05-17 - Adopt Park&Wash brand foundation from Claude Design bundle

- **Status:** Decided
- **Owner:** Project owner (zaakvoerder)
- **Decision:** Adopt the brand system delivered by Claude Design bundle
  `MM8VXwOrJaMoweEmLZdxrQ` as the project's visual identity. The bundle's
  `tokens.css` is canonical; the logos in `public/brand/logo/` are the
  shipping assets; the rest of the bundle (HTML prototype, JSX sections,
  brief, chat) lives in `docs/design/` as read-only reference.
- **Reason:** `docs/PLAN.md` flagged "Visuele identiteit" as TBD. The
  bundle closes that gap with a complete system derived from the owner's
  brief (`bedrijfsidentiteit.docx`): signature blue `#1A73E8`, Poppins +
  Montserrat, a full 11-step blue scale, 8 neutrals, support colors,
  spacing/radii/shadow tokens, and a finished logo set (primary, mono
  navy, mono white, wordmark, app-icon, favicon - SVG + PNG exports).
- **Impact:**
  - `docs/PLAN.md` Open/TBD section: "Visuele identiteit" is closed.
  - Next.js setup task (Fase 1, step 1) now has a defined import target
    (`src/styles/tokens.css`) and a defined asset root (`public/brand/`).
  - Future agents building pages, components, or marketing material
    pull from these canonical paths instead of inventing styling.
- **Sources of truth:**
  - Tokens - `src/styles/tokens.css`
  - Shipping logos - `public/brand/logo/` (+ `png/` rasters)
  - Root favicons - `public/favicon.svg`, `public/favicon-16.png`,
    `public/favicon-32.png`, `public/apple-touch-icon.png`
  - Owner originals - `public/brand/source/`
  - Reference (prototype HTML, JSX, brief, chat) - `docs/design/`
- **Review date:** Re-evaluate if owner provides a refreshed brand
  brief or if the Claude Design bundle is updated upstream.
