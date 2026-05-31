# Dev Log

This log tracks concrete project changes by date. It is a working memory for
humans and AI assistants and should be updated whenever meaningful work is
completed.

Rules:

- Add entries under the current date, newest date first.
- Keep entries short and factual.
- Mention changed source-of-truth files when useful.
- Do not store secrets, credentials, private customer data, or raw `.env.local`
  values here.

## 2026-05-31

- Ran issue #9 contact-first preview launch gate after confirming GitHub issues
  #1-#8 are closed.
- Reinstalled dependencies with `npm install --ignore-scripts` because normal
  `npm install` hit the known Windows `&` path postinstall issue.
- Verified local quality gates: `npm run lint`, `npm run typecheck`,
  `npm run test`, `npm run test:db`, `npm run build`, `npm run test:e2e`, and
  `npm run test:a11y` all passed.
- Verified the localized public/contact/admin smoke path: Playwright passed for
  `nl`, `fr`, and `en`, mobile navigation routed to contact, anonymous
  `/admin` redirected to login, and accessibility smoke passed.
- Verified a real local `/nl/contact` submission at a mobile viewport: the
  server action validated consent, passed the local rate-limit fallback, wrote
  a Supabase `leads` row, showed success only after storage, and the test lead
  was deleted afterward.
- Recorded the production launch decision as no-go: the documented Vercel URL
  returned 404, Vercel CLI credentials/link were unavailable in this worktree,
  no Park&Wash Supabase production project was identifiable through the
  connected account, local Upstash env vars were missing, and Bot Protection is
  still documented in `Log` rather than launch `Challenge` mode.
- Updated `docs/operations/RUNBOOK.md`, `docs/TODO.md`,
  `docs/WEEKLY_LOG.md`, `README.md`, and `AGENTS.md` with the issue #9 gate
  evidence and remaining blockers.

## 2026-05-30

- Completed live Vercel setup for issue #8: confirmed production project
  `incmaramo-stars-projects/park_wash`, linked the local checkout, and added
  `.vercel/` to `.gitignore`.
- Set the Vercel project framework preset to `Next.js` with default build,
  install, dev, and output settings.
- Enabled Vercel Firewall and Bot Protection for `park_wash` in initial `Log`
  mode. Bot Protection must move to `Challenge` before public contact form
  submission launches in production.
- Added `docs/operations/RUNBOOK.md` for issue #8 Vercel Bot Protection setup,
  including production project confirmation, Log-first observation, Challenge
  before public contact launch, verification evidence, and no default CAPTCHA
  fallback.
- Updated `docs/TODO.md`, `docs/WEEKLY_LOG.md`,
  `docs/architecture/README.md`, and `docs/strategy/DOCUMENTATION_SYSTEM.md`
  with the issue #8 setup result.
- Completed issue #7 admin leads overview: `/admin` now lists submitted contact
  leads for allowlisted admins with operational follow-up details.
- Added generic admin leads loading, empty, and error states without exposing
  raw Supabase error details or lead PII in failures.
- Added admin lead read-path unit coverage and expanded pgTAP RLS checks so
  anon and non-admin users cannot read lead details while allowlisted admins
  can.
- Completed issue #6 public form rate limiting: contact lead submissions now
  pass the server-only Upstash Redis limiter before Supabase writes.
- Added hashed route-scoped rate-limit identifiers for IP, email, and phone,
  plus a production fail-closed path when Upstash env vars are missing.
- Added localized generic retry-later contact form copy and unit coverage for
  allowed, limited, missing-production-config, and local fallback behavior.
- Completed issue #5 contact lead submission: the localized contact form now
  validates client-side where useful and server-side with Zod before inserting
  Supabase `leads` rows.
- Added a narrow anon insert RLS policy for contact-form leads, keeping public
  reads closed and blocking non-contact sources or admin workflow statuses.
- Added unit coverage for contact lead parsing plus pgTAP RLS coverage for
  public lead insert access, and expanded smoke coverage for the contact form
  entry point in `nl`, `fr`, and `en`.
- Updated `docs/TODO.md`, `docs/WEEKLY_LOG.md`, `docs/PLAN.md`,
  `docs/architecture/README.md`, and `docs/strategy/DECISIONS.md` for the
  completed contact lead slice.
- Completed issue #4 public preview pages: home, services, about, portfolio,
  and contact now have coherent contact-first structures in `nl`, `fr`, and
  `en`.
- Expanded the services page to use the Supabase published services read path
  for displayed service previews and prices.
- Added Playwright smoke coverage for key public preview routes, mobile
  navigation, footer contact routing, published services, and public
  accessibility checks.
- Updated `docs/TODO.md`, `docs/WEEKLY_LOG.md`, and
  `docs/architecture/README.md` for the completed public preview slice.
- Completed issue #3 privacy policy and consent path: added localized
  `/privacy-policy` pages for `nl`, `fr`, and `en`.
- Linked footer privacy access plus contact and booking consent copy to the
  localized privacy policy.
- Added Playwright smoke coverage for privacy links across launch locales.
- Updated `docs/TODO.md`, `docs/WEEKLY_LOG.md`,
  `docs/architecture/README.md`, `docs/ROADMAP.md`, `docs/PLAN.md`, and
  `README.md` for the completed privacy-policy path.
- Completed issue #2 published services read path: homepage service preview
  now reads Supabase `services` records filtered to
  `visibility_status = 'published'`.
- Added unit coverage for localized service row mapping, draft/archived
  filtering, query shape, and all supported service price types.
- Updated `docs/TODO.md`, `docs/WEEKLY_LOG.md`, and
  `docs/architecture/README.md` for the published services read path.
- Completed issue #1 preview CTA guardrails: public header/mobile CTA now routes
  to contact/quote intent, booking placeholder copy states online booking is not
  active yet, and Playwright smoke coverage checks the promise in `nl`, `fr`,
  and `en`.
- Decided that the first MVP launch level is a contact-first preview before
  full server-confirmed booking launch.
- Documented the contact-first preview decision in
  `docs/strategy/DECISIONS.md`, `docs/PLAN.md`, `docs/ROADMAP.md`, and
  `docs/TODO.md`.
- Published contact-first preview vertical slices as GitHub issues #1-#9.
- Configured Matt Pocock skill metadata for this repo in `CLAUDE.md` and
  `docs/agents/`.
- Refreshed `docs/PLAN.md` with current product state, source-of-truth map,
  MVP launch levels, launch-blocking gaps, and doodlopende sporen to avoid.
- Updated `docs/strategy/DOCUMENTATION_SYSTEM.md` to include `docs/agents/`,
  runtime messages, mockups, and seed data ownership.
- Updated `docs/TODO.md` to add launch-level confirmation as the next product
  decision and mark the PRD/source-of-truth refresh complete.

## 2026-05-20

- Created `docs/mockups/booking-wizard.html`, an interactive standalone HTML
  mockup for the three-step booking flow: customer type, service, and time
  slot.
- Verified the booking wizard mockup in the browser through a temporary local
  static server: company/customer selection, service selection, slot selection,
  consent, summary updates, and horizontal overflow check passed.
- Created `docs/mockups/site-preview.html`, a standalone HTML mockup of the
  Park&Wash public site direction using the brand assets, service pricing,
  booking/consent concepts, and security decisions from today's work.
- Verified the HTML mockup through a temporary local static server in the
  browser: hero/content/consent/media rendered, the remote hero image loaded,
  and no horizontal overflow was detected.
- Confirmed that the production admin allowlist starts owner-only with
  `lahdhirilouay21@gmail.com`; no developer account is allowlisted by default.
- Documented the owner-only admin allowlist decision in
  `docs/strategy/DECISIONS.md`, `docs/PLAN.md`, and
  `docs/architecture/README.md`.
- Updated `docs/TODO.md` to mark the final admin/developer allowlist task done
  and promote layout/navigation polish as the next active task.
- Re-ran `npm run test:db -- supabase/tests/rls_public_admin_access.sql`
  successfully after the allowlist documentation and seed comment update.
- Added reusable privacy/consent copy for contact and booking forms in
  `src/messages/nl.json`, `src/messages/fr.json`, and `src/messages/en.json`.
- Documented that the form copy is practical launch copy and does not replace a
  full privacy-policy page.
- Updated `docs/TODO.md` to mark form privacy/consent source copy complete and
  add a launch task for a full privacy-policy page and form links.
- Verified the consent copy changes with JSON parsing, `npm run lint`,
  `npm run typecheck`, `npm run test`, and `npm run build`.
- Decided that launch bot protection will use Vercel Bot Protection from the
  Vercel Firewall managed rulesets, with Cloudflare Turnstile reserved as a
  fallback if form-level tokens become necessary.
- Documented the bot protection decision in `docs/strategy/DECISIONS.md`,
  `docs/PLAN.md`, and `docs/architecture/README.md`.
- Updated `docs/TODO.md` to replace the bot provider decision with a future
  Vercel Bot Protection configuration task.
- Decided that public contact and booking form mutations will use
  Vercel Marketplace Upstash Redis for server-side rate limiting.
- Documented the rate-limit approach in `docs/strategy/DECISIONS.md`,
  `docs/PLAN.md`, and `docs/architecture/README.md`.
- Updated `docs/TODO.md` to replace the rate-limit decision task with a future
  implementation task for a Vercel Upstash-backed helper.
- Added `supabase/tests/rls_public_admin_access.sql` with pgTAP coverage for
  anonymous public reads, non-admin denial, and allowlisted admin access across
  services, admin users, availability, blocked slots, bookings, and leads.
- Added `npm run test:db` as the database verification command.
- Ran `supabase test db supabase/tests/rls_public_admin_access.sql`
  successfully with 28 RLS checks.
- Ran `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`,
  and `npm run test:e2e` successfully after the RLS test addition.
- Updated `docs/TODO.md`, `docs/architecture/README.md`, `README.md`, and
  `AGENTS.md` for the completed RLS verification work.
- Created local `.env.local` from the local Supabase status values; the file is
  ignored by git.
- Created a local Supabase Auth user for `lahdhirilouay21@gmail.com` and linked
  it to the admin allowlist.
- Added an opt-in Playwright E2E test for allowlisted admin login using
  `E2E_ADMIN_EMAIL` and `E2E_ADMIN_PASSWORD`.
- Replaced the non-ASCII separator in the admin header with an ASCII hyphen.
- Verified the app against local Supabase: `npm run test:e2e` passed with 6
  tests, including the admin login happy path.
- Ran `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build`
  successfully.
- Added `docs/DEV_LOG.md` and `docs/WEEKLY_LOG.md` as persistent project logs.
- Added agent rules so future work updates TODO, dev log, and weekly log in
  the same turn as completed work.
- Added README and Claude entry-point references to the new project logs.
- Ran local Supabase setup through Docker Desktop and completed
  `supabase db reset`.
- Verified local seed data: 5 services and temporary owner allowlist
  `lahdhirilouay21@gmail.com`.
- Disabled local Supabase analytics in `supabase/config.toml` because the
  Windows Vector service needs Docker TCP socket exposure and is not required
  for the current app work.
- Updated `docs/TODO.md` after the completed Docker/Supabase setup.
