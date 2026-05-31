# Operations Runbook

This runbook stores operational setup and verification steps that live outside
application code. Do not store secrets, tokens, customer data, or raw
environment values here.

## Contact-First Preview Launch Gate

Issue: [#9 Contact-first preview launch gate](https://github.com/incmaramo-star/Park-Wash/issues/9)

Status: ran on 2026-05-31. Local implementation gates passed, but production
launch is no-go until the open production readiness items below are resolved.

### Launch Decision

Do not launch the public contact-first preview in production yet.

The local app is ready for review, but the production surface is not confirmed:
the documented production URL returned 404, Vercel CLI credentials/link were
not available in this worktree, no identifiable Park&Wash Supabase production
project was visible through the connected account, production Upstash env vars
were not confirmed, and Bot Protection is still documented in `Log` mode rather
than launch `Challenge` mode.

### Gate Checklist

- [x] GitHub issues #1-#8 are closed.
- [x] `npm run lint` passed.
- [x] `npm run typecheck` passed.
- [x] `npm run test` passed: 5 files, 16 tests.
- [x] `npm run test:db` passed: 1 pgTAP file, 35 tests.
- [x] `npm run build` passed.
- [x] `npm run test:e2e` passed: 19 passed, 1 skipped opt-in admin login test.
- [x] `npm run test:a11y` passed: 5 pages.
- [x] Public pages and contact flow smoke passed for `nl`, `fr`, and `en`.
- [x] Mobile navigation smoke passed and routed to `/nl/contact`.
- [x] Contact form write smoke passed locally at a 390x844 mobile viewport: the
      server action accepted only a valid consented submission, wrote a
      Supabase `leads` row, showed success after storage, and the test row was
      deleted afterward.
- [x] Contact validation, consent, rate-limit, and missing production config
      behavior are covered by unit tests.
- [x] Lead insert/read privacy is covered by pgTAP RLS tests, including anon
      insert-only access, public/non-admin read denial, and allowlisted admin
      read access.
- [x] Anonymous `/admin` redirects to `/admin/login` in Playwright.
- [x] Privacy policy links and contact/booking consent copy are verified in
      `nl`, `fr`, and `en`.
- [x] Preview and booking copy do not claim completed online booking before
      server-confirmed booking exists.
- [ ] Production Vercel deployment is confirmed and serving the preview.
- [ ] Production Supabase project and env vars are confirmed.
- [ ] Production Upstash Redis env vars are provisioned in Vercel.
- [ ] Vercel Bot Protection is switched from `Log` to `Challenge` and
      published before public contact form launch.
- [ ] Firewall/Bot Protection events are visible after a controlled production
      smoke request.

### Evidence

```text
Gate run date: 2026-05-31
Branch: codex/issue-9-contact-first-preview-launch-gate
GitHub dependencies: issues #1-#8 closed
Dependency install note: normal npm install failed in the Windows path with
  `&`; npm install --ignore-scripts completed with 0 vulnerabilities.
Local env presence: Supabase URL, anon key, and service-role key were present
  in .env.local; Upstash env vars were missing locally.
Local Supabase: local stack reachable; pgTAP RLS tests passed.
Contact submit smoke: passed against local `/nl/contact`; test lead deleted.
Production URL smoke: https://parkwash.vercel.app and `/nl/contact` returned
  404.
Vercel CLI: no local credentials and no `.vercel/project.json` in this
  worktree, so project/env/firewall state could not be re-confirmed.
Supabase connector: visible projects were not identifiable as Park&Wash
  production.
Launch decision: no-go for public production launch until the unchecked items
  above are complete.
```

## Vercel Bot Protection

Issue: [#8 Vercel Bot Protection setup](https://github.com/incmaramo-star/Park-Wash/issues/8)

Status: configured for the confirmed production Vercel project. The initial
Bot Protection action is `Log`; switch it to `Challenge` before public contact
form submission launches in production.

### Current Evidence

- The confirmed Vercel project is `incmaramo-stars-projects/park_wash`.
- The production Vercel URL is `https://parkwash.vercel.app`.
- The project uses the `Next.js` framework preset with default build, install,
  and output settings.
- Vercel Firewall is enabled for the project.
- Vercel Bot Protection is enabled in `Log` mode as the initial observation
  mode.
- `.vercel/` is intentionally local-only and ignored by git.

### Required Production Setup

1. Confirm the production Vercel project that serves the Park&Wash public site.
   Record the Vercel team, project slug, production domain, and confirmation
   date in the evidence section below.
2. Open the confirmed project in Vercel.
3. Go to `Firewall` -> `Rules`.
4. In `Bot Management`, enable the `Bot Protection` managed ruleset.
5. Set the first action to `Log` if the site is still in a private or
   observation phase. This gives traffic visibility before challenging users.
6. Before public contact form submission is launched in production, switch Bot
   Protection to `Challenge` and publish the Firewall change.
7. Monitor the Firewall overview after publishing. Confirm that legitimate
   traffic, search crawlers, and operational tooling are not disrupted.

Official references:

- [Vercel WAF managed rulesets](https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets)
- [Vercel Bot Management](https://vercel.com/docs/bot-protection)

### Launch Policy

- The launch target is Vercel Bot Protection plus the existing server-side
  Upstash rate limiter for public forms.
- Do not add Cloudflare Turnstile, hCaptcha, reCAPTCHA, or other CAPTCHA
  widgets by default.
- If real production abuse continues after Bot Protection is in `Challenge`
  mode and rate limiting is active, review evidence first. Cloudflare
  Turnstile remains the preferred fallback only if form-level tokens become
  necessary.
- Do not put a reverse proxy or third-party CDN in front of Vercel Bot
  Protection without re-evaluating detection quality.

### Verification Checklist

- [x] Production Vercel project is confirmed.
- [x] Bot Protection managed ruleset is enabled on the confirmed project.
- [x] Initial mode is recorded as `Log` or `Challenge`.
- [ ] Public contact form launch mode is `Challenge`.
- [x] Firewall changes are published, not just staged.
- [ ] Firewall overview shows Bot Protection events after publish or after a
      controlled smoke request.
- [x] No CAPTCHA package, provider key, or form widget was added by default.
- [x] `docs/TODO.md`, `docs/DEV_LOG.md`, and `docs/WEEKLY_LOG.md` are updated
      with the live configuration result.

### Evidence

```text
Production Vercel team: incmaramo-star's projects (incmaramo-stars-projects)
Production Vercel project: park_wash
Production domain: https://parkwash.vercel.app
Confirmed by: Vercel CLI authenticated as incmaramo-star
Confirmed at: 2026-05-30 17:16 Europe/Brussels
Bot Protection action after publish: Log
Published by: Vercel Firewall REST API using local authenticated CLI session
Published at: 2026-05-30T15:17:34.645Z
Firewall dashboard URL: https://vercel.com/incmaramo-stars-projects/park_wash/firewall
Verification notes: `vercel project inspect` reports Framework Preset `Next.js`;
`GET /v1/security/firewall/config/active` reports firewallEnabled true and
managedRules.bot_protection active true with action `log`.
```

Use this template for later mode changes.

```text
Production Vercel team:
Production Vercel project:
Production domain:
Confirmed by:
Confirmed at:
Bot Protection action after publish:
Published by:
Published at:
Firewall dashboard URL:
Verification notes:
```
