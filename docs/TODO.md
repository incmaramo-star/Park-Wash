# Todo

This is the operational checklist for the next implementation rounds. Keep it
small and update it after each completed work package.

## Now

- [ ] Resolve contact-first preview production blockers: deploy the Vercel app,
      confirm production Supabase, provision Upstash env vars, and switch Bot
      Protection to `Challenge`.

## Next

- [ ] Build admin services/pricing CRUD.

## Services And Pricing

- [ ] Build admin services/pricing CRUD.
- [ ] Add draft/published/archived controls.
- [ ] Add E2E: draft service does not appear in booking/public flow.
- [ ] Add E2E: admin price update appears in public UI.

## Availability And Booking

- [ ] Define exact service area and allowed postal codes.
- [ ] Implement availability rules UI or seed configuration.
- [ ] Implement blocked slots/days.
- [ ] Implement booking slot generation as pure functions.
- [ ] Add unit tests for duration, buffers, blocked slots and overlaps.
- [ ] Build booking wizard steps.
- [ ] Add server-side final reservation validation.
- [ ] Store booking snapshots for service name and pricing fields.
- [ ] Add E2E booking happy path.
- [ ] Add E2E booking conflict path.

## Admin Operations

- [ ] Build bookings overview.
- [ ] Build booking status changes: confirmed, completed, cancelled, rescheduled.
- [ ] Build leads status changes: new, contacted, converted, closed.
- [ ] Build availability management.
- [ ] Add admin empty/loading/error states.

## Launch Polish

- [ ] Replace placeholder content with final copy in `nl`, `fr`, `en`.
- [ ] Add real photos/video or approved launch placeholders.
- [ ] Run mobile visual QA.
- [ ] Run Lighthouse performance/accessibility checks.
- [ ] Confirm domain name.
- [ ] Confirm production Supabase project and env vars for contact lead writes.
- [ ] Provision or confirm production Upstash Redis env vars in Vercel.
- [ ] Deploy the contact-first preview to the production Vercel URL and smoke
      `/nl/contact`.
- [ ] Switch Vercel Bot Protection from `Log` to `Challenge` before public
      contact form launch.
- [ ] Re-run full launch gate after production blockers are resolved.

## Done

- [x] Issue #9: Ran the contact-first preview launch gate on 2026-05-31.
      Local lint, typecheck, unit tests, pgTAP RLS tests, build, Playwright
      smoke, mobile, contact-submit, and accessibility checks passed.
- [x] Issue #9: Documented the launch decision as production no-go until the
      Vercel deployment/domain, production Supabase, production Upstash env
      vars, and Bot Protection `Challenge` mode are confirmed.
- [x] Issue #8: Confirmed production Vercel project
      `incmaramo-stars-projects/park_wash` with production URL
      `https://parkwash.vercel.app`.
- [x] Issue #8: Linked the local checkout to Vercel, ignored `.vercel/`, and
      set the project framework preset to `Next.js` with default build/install
      settings.
- [x] Issue #8: Enabled Vercel Firewall and Bot Protection in initial `Log`
      mode for traffic observation.
- [x] Issue #8: Added the Vercel Bot Protection operations runbook with
      project-confirmation prerequisites, initial mode policy, verification
      checklist, and no-CAPTCHA fallback position.
- [x] Issue #7: `/admin` now shows submitted contact leads to allowlisted
      admins, including empty, loading, and generic error states.
- [x] Issue #7: admin lead visibility is covered by explicit read-path unit
      tests plus pgTAP RLS checks for anon, non-admin, and admin users.
- [x] Issue #6: contact lead submission now checks the server-only
      Upstash-backed public form rate limiter before writing to Supabase.
- [x] Issue #6: rate-limit Redis keys use route scope plus hashed IP, email,
      and phone identifiers instead of raw visitor data.
- [x] Issue #6: production contact submissions fail closed when required
      Upstash Redis env vars are missing, while local development has an
      explicit permissive fallback.
- [x] Issue #6: contact users receive a generic retry-later message when
      limited, with unit coverage for allowed, limited, missing-production-config,
      and local fallback behavior.
- [x] Issue #5: contact form now validates in the client/browser where useful
      and on the server with Zod before writing leads.
- [x] Issue #5: contact lead submission writes Supabase `leads` rows only
      after consent and validation pass, with server-confirmed success UI.
- [x] Issue #5: public `leads` insert access is limited to anon
      `contact_form` rows with `status = 'new'` and covered by pgTAP RLS
      tests.
- [x] Issue #5: contact form copy, fields, success, and failure states work in
      `nl`, `fr`, and `en`.
- [x] Issue #4: public preview pages now provide contact-first home,
      services, about, portfolio, and contact structures in `nl`, `fr`, and
      `en`.
- [x] Public services page uses Supabase published service records where
      service previews appear.
- [x] Mobile navigation, footer contact link, key public preview routes, and
      public accessibility smoke coverage were expanded for issue #4.
- [x] Polished layout and navigation beyond bootstrap placeholders.
- [x] Built real Home page sections: hero, services preview, trust, CTA.
- [x] Built Particulier/Bedrijf choice page.
- [x] Built About page with story and process.
- [x] Built Portfolio page structure with placeholder galleries.
- [x] Built Contact page UI.
- [x] Issue #1: public preview CTA guardrails route visitors to contact/quote
      intent and keep booking copy honest until server-confirmed reservation is
      implemented.
- [x] Planning and brand baseline committed.
- [x] Next.js bootstrap foundation.
- [x] Tailwind/token integration.
- [x] Locale routes for `nl`, `fr`, `en`.
- [x] Placeholder public pages.
- [x] Supabase client factories.
- [x] Initial schema migration and dev seed.
- [x] Vitest and Playwright smoke tests.
- [x] Admin login route.
- [x] Server-side admin guard.
- [x] Temporary owner allowlist: `lahdhirilouay21@gmail.com`.
- [x] Anonymous `/admin` redirects to `/admin/login`.
- [x] Docker Desktop local setup.
- [x] `supabase db reset` completed successfully.
- [x] Verified migration, seed services and temporary admin allowlist locally.
- [x] Added automatic dev and weekly log workflow.
- [x] Created local `.env.local` from `supabase status` values.
- [x] Created local Supabase Auth user for `lahdhirilouay21@gmail.com`.
- [x] Ran app against local Supabase and verified `/admin/login`.
- [x] Added opt-in E2E coverage for allowlisted admin login.
- [x] Added pgTAP RLS verification for public, non-admin, and admin access.
- [x] Decided Vercel Marketplace Upstash Redis rate limiting approach for public forms.
- [x] Decided Vercel Bot Protection provider for launch bot management.
- [x] Added privacy/consent source copy for contact and booking forms.
- [x] Confirmed production admin allowlist starts owner-only with `lahdhirilouay21@gmail.com`.
- [x] Created a short standalone HTML site mockup in `docs/mockups/site-preview.html`.
- [x] Created a standalone HTML booking wizard mockup in `docs/mockups/booking-wizard.html`.
- [x] Refreshed PRD source-of-truth map, launch gaps, and doodlopende-sporen list.
- [x] Chose contact-first preview as the first MVP launch level.
- [x] Published contact-first preview vertical slices as GitHub issues #1-#9.
- [x] Issue #2: public service query helpers read Supabase published services.
- [x] Issue #2: homepage service preview uses Supabase service records instead of inline pricing data.
- [x] Issue #3: localized privacy-policy page and public consent links.
