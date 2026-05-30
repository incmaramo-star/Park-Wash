# Weekly Log

This log summarizes what happened in each working week. It is for orientation:
what changed, what was decided, what remains risky, and what should happen
next.

Rules:

- Use ISO week labels: `YYYY-Www`.
- Add or update the current week whenever meaningful work is completed.
- Keep detailed day-by-day changes in `docs/DEV_LOG.md`; keep this file
  higher-level.
- Do not store secrets, credentials, private customer data, or raw `.env.local`
  values here.

## 2026-W22 (2026-05-25 to 2026-05-31)

Status: Active

Highlights:

- Chose contact-first preview as the first MVP launch level before full
  server-confirmed booking launch.
- Published the contact-first preview vertical slices as GitHub issues #1-#9.
- Completed issue #1 preview CTA guardrails: public CTAs now point to
  contact/quote intent and direct booking copy says online booking is not active
  yet.
- Completed issue #2 published services read path: the homepage service preview
  now uses Supabase published service records instead of inline pricing data.
- Configured repo-specific Matt Pocock skill metadata for GitHub Issues,
  default triage labels, and single-context domain docs.
- Refreshed the PRD/current plan with the current product state,
  source-of-truth map, launch levels, launch gaps, and doodlopende sporen to
  avoid.
- Clarified that contact-first can be a preview, but the full product launch
  still requires server-confirmed booking.

Current focus:

- Polish layout and navigation beyond bootstrap placeholders.
- Continue the first AFK slices: privacy policy/consent path.

Risks / watch points:

- Running GitHub or app commands from the parent `Park&Wash` folder hits the
  wrong repo; use the nested `Park-Wash` app repo.
- Service area, production infrastructure, privacy policy, and real media are
  still open launch blockers.
- Standalone mockups and the completed bootstrap plan are references, not
  current implementation truth.

## 2026-W21 (2026-05-18 to 2026-05-24)

Status: Active

Highlights:

- Established the project planning system: roadmap, operational TODO list,
  documentation ownership rules, and automatic update rules.
- Bootstrapped and verified the local Supabase/Docker development setup.
- Completed a successful `supabase db reset` after disabling local analytics
  for Windows development.
- Verified the initial seed state, including services and the temporary owner
  allowlist email.
- Connected the app to local Supabase with `.env.local`.
- Created and verified a local allowlisted admin login.
- Added opt-in E2E coverage for the admin login happy path.
- Added pgTAP RLS verification for anonymous public access, non-admin denial,
  and allowlisted admin access.
- Chose Vercel Marketplace Upstash Redis as the public form rate-limiting
  approach.
- Chose Vercel Bot Protection as the launch bot-management provider.
- Added three-language privacy/consent source copy for future contact and
  booking forms.
- Confirmed the production admin allowlist starts owner-only with
  `lahdhirilouay21@gmail.com`.
- Created a short standalone HTML mockup to preview the public site direction
  before changing the Next.js layout.
- Created an interactive standalone HTML booking wizard mockup for customer
  type, service, and time-slot selection.
- Re-ran the local quality gate successfully after the admin-login verification.
- Added persistent dev and weekly logs so future work does not depend on chat
  history.

Current focus:

- Polish layout and navigation beyond bootstrap placeholders.
- Implement the decided Upstash-backed public form rate limiter when contact or
  booking mutations are built.
- Configure Vercel Bot Protection before public forms launch.
- Create the full privacy-policy page and connect form privacy links before
  production launch.

Risks / watch points:

- `.env.local` must not be committed.
- Developer admin access is intentionally absent until a specific email is
  requested and documented.
- Future public lead insert and booking policies need matching RLS tests when
  those flows are implemented.
- The Vercel Upstash resource is not provisioned yet; production public form
  mutations must not launch without the rate-limit helper and env vars.
- Vercel Bot Protection is chosen but not configured yet because the production
  Vercel project still needs confirmation.
- Form consent copy exists, but the full privacy-policy page still needs to be
  created before launch.
