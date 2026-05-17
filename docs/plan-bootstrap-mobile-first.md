# Plan: Project Setup (Fase 1, stap 1 uit master-plan)

> **Verhouding tot [docs/PLAN.md](PLAN.md):** Dit document is een **uitwerking van stap 1 ("Project setup") uit Fase 1** van het master-plan. Alle architectuur-, datamodel- en faseringsbeslissingen komen uit `docs/PLAN.md` — dit document voegt alleen de concrete bootstrap-stappen toe en lost een aantal openstaande detailvragen op (pricing-ranges, Tailwind/tokens-mapping, font-loading).

---

## Context

Het Park-Wash repo bevat vandaag enkel planning ([docs/PLAN.md](PLAN.md)) en brand-foundation ([src/styles/tokens.css](../src/styles/tokens.css), [public/brand/logo/](../public/brand/logo/), [docs/design/](design/)). Er is geen `package.json`, geen Next.js project, geen Supabase-verbinding. Zonder dit fundament kunnen de overige 11 stappen van Fase 1 niet starten.

**Waarom mobile-first:** klanten boeken hoofdzakelijk vanaf telefoon (vaak naast de auto). Master-plan [docs/PLAN.md](PLAN.md) noemt dit ook expliciet onder "Design".

**Scope-grens:** deze stap levert het **skelet** — Next.js + Tailwind + Supabase clients + i18n + brand-tokens geïntegreerd + één placeholder homepage. Géén booking-engine, géén admin, géén auth, géén echte content. Die zijn aparte stappen in [docs/PLAN.md](PLAN.md).

---

## Pricing-besluit

Prijzen zijn bevestigd als startwaarden, maar moeten via het admin dashboard
aanpasbaar zijn. Ze mogen dus niet hardcoded worden in productiecode. De admin
wordt de bron van waarheid voor gepubliceerde diensten en prijzen.

**Startprijzen:**

- Basic detail — vanaf EUR 135
- Intense detail — vanaf EUR 185
- Lakcorrecties — EUR 250-650
- Coatings — EUR 500-1200
- Bedrijven/vloten — op aanvraag

**Schema:** breid `services` uit met `price_min decimal nullable`,
`price_max decimal nullable` en `price_type enum ('fixed', 'from', 'range',
'on_request')`. Dit dekt "vanaf", ranges en "op aanvraag" zonder tekstuele
workarounds. De eerste migratie moet dit direct meenemen.

---

## Wijzigingen

### 1. Project bootstrap

Initialiseer Next.js 15 (App Router) + TypeScript + Tailwind v4 in de project-root. **De folder-structuur volgt exact die in [docs/PLAN.md](PLAN.md)** — `services/` (niet `diensten/`), `src/messages/` (niet `src/i18n/messages/`), `src/app/admin/` zónder locale prefix.

**Top-level bestanden:**
```
package.json
tsconfig.json
next.config.ts                  # met next-intl plugin
tailwind.config.ts              # met tokens.css mapping (zie sectie 3)
postcss.config.mjs
middleware.ts                   # locale routing + (later) session plumbing
.env.local.example
.gitignore                      # node_modules, .next, .env*.local
```

**Dependencies (exact volgens [docs/PLAN.md](PLAN.md)):**
- `next`, `react`, `react-dom` (latest)
- `framer-motion`
- `tailwindcss`, `@tailwindcss/postcss`, `autoprefixer`
- `@supabase/supabase-js`, `@supabase/ssr`
- `next-intl`
- `react-hook-form`, `zod`, `@hookform/resolvers`
- `date-fns`
- `lucide-react`
- Test: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`,
  `jsdom`, `playwright`, `@axe-core/playwright`
- Dev: `typescript`, `@types/react`, `@types/node`, `eslint`,
  `eslint-config-next`, `prettier`

**Scripts in `package.json`:**

```json
{
  "dev": "next dev",
  "build": "next build",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test",
  "test:a11y": "playwright test tests/e2e/accessibility.spec.ts"
}
```

### 2. Folder-skelet (leeg of placeholder per stap)

Maak de volledige skeletstructuur conform [docs/PLAN.md](PLAN.md) leeg aan (placeholder `page.tsx` of `.gitkeep` waar nodig), zodat latere stappen consistent landen:

```
src/
  app/
    [locale]/
      layout.tsx                # root locale layout met Header/Footer
      page.tsx                  # Home placeholder (zie sectie 5)
      services/page.tsx         # Particulier/Bedrijf keuze (placeholder)
      about/page.tsx
      portfolio/page.tsx
      contact/page.tsx
      booking/page.tsx
    admin/
      bookings/.gitkeep
      leads/.gitkeep
      services/.gitkeep
      availability/.gitkeep
    api/
      bookings/.gitkeep
      leads/.gitkeep
      services/.gitkeep
      availability/.gitkeep
    globals.css                 # importeert ../styles/tokens.css
  components/
    ui/.gitkeep
    layout/
      Header.tsx                # mobile-first met hamburger
      Footer.tsx
      MobileNav.tsx             # slide-over drawer
      LocaleSwitcher.tsx
      Logo.tsx                  # kiest juiste SVG uit public/brand/logo/
    home/.gitkeep
    booking/.gitkeep
    admin/.gitkeep
  lib/
    supabase/
      client.ts                 # browser client
      server.ts                 # server client (cookies)
    auth/.gitkeep               # admin guards (volgende stap)
    booking/.gitkeep            # slotlogica (volgende stap)
    i18n/request.ts             # next-intl config
    utils/.gitkeep
  messages/
    nl.json
    fr.json
    en.json
  types/.gitkeep
  styles/
    tokens.css                  # AL AANWEZIG — niet aanraken
tests/
  unit/
    pricing.test.ts             # prijslabels voor from/range/on_request
  e2e/
    smoke.spec.ts               # /nl, /fr, /en laden
    accessibility.spec.ts       # axe smoke checks
supabase/
  migrations/                   # eerste migratie zie sectie 6
public/                         # AL AANWEZIG (brand/, favicons)
  videos/.gitkeep
```

> `src/styles/tokens.css` en `public/brand/**` bestaan al — niet overschrijven.

### 3. Tailwind ↔ tokens.css mapping

In `tailwind.config.ts` map de CSS-variabelen uit [src/styles/tokens.css](../src/styles/tokens.css) naar het Tailwind theme. Voorbeeld:

```ts
theme: {
  extend: {
    colors: {
      "pw-blue": {
        50:  "var(--pw-blue-50)",
        100: "var(--pw-blue-100)",
        // ... t/m 950
        600: "var(--pw-blue-600)",  // signature
      },
      "pw-ink":      "var(--pw-ink)",
      "pw-graphite": "var(--pw-graphite)",
      "pw-paper":    "var(--pw-paper)",
      "pw-signal":   "var(--pw-signal)",
      "pw-alert":    "var(--pw-alert)",
      // ... rest van tokens.css
    },
    borderRadius: { xs: "var(--r-xs)", sm: "var(--r-sm)", md: "var(--r-md)", lg: "var(--r-lg)", xl: "var(--r-xl)", pill: "var(--r-pill)" },
    boxShadow:    { 1: "var(--sh-1)", 2: "var(--sh-2)", 3: "var(--sh-3)", blue: "var(--sh-blue)" },
    fontFamily:   { display: "var(--f-display)", body: "var(--f-body)", mono: "var(--f-mono)" },
    spacing:      { 1: "var(--s-1)", 2: "var(--s-2)", /* etc */ },
  },
}
```

`app/globals.css` importeert `../styles/tokens.css` één keer aan de top, gevolgd door Tailwind's `@import "tailwindcss"`.

### 4. Fonts via next/font

Conform [docs/PLAN.md](PLAN.md): Poppins (display) + Montserrat (body) via `next/font/google`. In `app/[locale]/layout.tsx`:

```ts
import { Poppins, Montserrat } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400","600","700"], variable: "--font-poppins" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400","500","600"], variable: "--font-montserrat" });
```

`tokens.css` hoeft niet aangepast: de `--f-display`/`--f-body` waarden vallen al terug op de juiste families. Voeg de `variable` classes toe aan `<body>` zodat `next/font` correct de family levert.

### 5. Homepage placeholder

Minimaal genoeg om bootstrap te valideren — géén volledige Home (dat is stap 4 in [docs/PLAN.md](PLAN.md)):

`src/app/[locale]/page.tsx`:
- `<Logo variant="primary" />` uit `public/brand/logo/park-and-wash-primary.svg`
- Korte hero met `font-display` titel "Park & Wash" en `font-body` subtitle (vertaald)
- Lijst van 4 particulier-diensten + 1 bedrijven-blok, hardcoded vanuit een tijdelijke array (zie sectie 6 over waarom géén DB-call hier)
- Geen CTA's naar booking — die routes bestaan nog niet functioneel

### 6. Database & seed-strategie

**Eerste migratie (`supabase/migrations/0001_initial_schema.sql`):** implementeert het volledige schema uit [docs/PLAN.md](PLAN.md) — `services`, `admin_users`, `availability_rules`, `blocked_slots`, `bookings`, `leads`. Neem het pricing-besluit direct mee: `price_min`, `price_max` en `price_type` met `fixed`, `from`, `range`, `on_request`.

**Geen TS-bestand met diensten.** In tegenstelling tot mijn vorige planversie schrijven we **geen `src/lib/services/data.ts`** — dat zou later moeten migreren naar Supabase en is dubbel werk. In plaats daarvan:

- De homepage placeholder gebruikt een **inline array** binnen `page.tsx` met de 4 diensten (label + prijs als string). Deze wordt verwijderd zodra Home daadwerkelijk uit Supabase leest (Fase 1, stap 4).
- Een **dev-only seed** (`supabase/seed.sql`) vult de startprijzen in
  `services` voor lokale ontwikkeling: Basic detail vanaf EUR 135, Intense
  detail vanaf EUR 185, lakcorrecties EUR 250-650, coatings EUR 500-1200 en
  bedrijven/vloten op aanvraag. Productie blijft leeg tot de zaakvoerder echte
  data invoert of publiceert via admin (Fase 1, stap 11) — conform de regel uit
  [docs/PLAN.md](PLAN.md) "Dummy data mag in development en staging, niet in
  live booking".

### 7. i18n setup

- `next-intl` middleware (`middleware.ts`) voor `/nl|/fr|/en` routing, default = `nl`
- `src/messages/{nl,fr,en}.json` met identieke key-structuur
- Begin met sleutels voor: layout (header nav, footer, locale switcher), home (hero, services), en error pages
- Alle UI-tekst vanaf dag 1 vertaald

### 8. Mobile-first layout shell

**Header:**
- `< md` (768px): logo links, hamburger rechts → opent `MobileNav` drawer
- `≥ md`: horizontale nav inline

**MobileNav (drawer):**
- Full-height slide-over, grote tap-targets (min 44×44)
- Locale switcher onderaan
- Sluit op route-change

**Globale CSS-regels:**
- `min-h-dvh` ipv `100vh` (mobile browser chrome)
- Safe-area insets via `env(safe-area-inset-*)`
- Body font-size ≥ 16px (voorkomt iOS auto-zoom op input)
- Tap-targets ≥ 44×44px

### 9. Supabase clients

`src/lib/supabase/client.ts` — browser client via `@supabase/ssr` createBrowserClient.
`src/lib/supabase/server.ts` — server client met cookie handling voor App Router server components.

Beide moeten importeerbaar zijn zonder runtime-error wanneer env-vars ontbreken (in dev geven we een duidelijke melding ipv crash).

### 10. Environment

`.env.local.example` (commit) + `.env.local` (gitignored):
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### 11. README bijwerken

[README.md](../README.md) is nu twee regels. Vervang door: korte projectomschrijving + verwijzingen naar [docs/PLAN.md](PLAN.md) (master) en deze bootstrap-doc + dev-instructies (`npm install`, `npm run dev`).

---

## Kritieke bestanden om te maken

- [package.json](../package.json) — dependencies + scripts
- [tsconfig.json](../tsconfig.json), [next.config.ts](../next.config.ts), [tailwind.config.ts](../tailwind.config.ts), [postcss.config.mjs](../postcss.config.mjs)
- [vitest.config.ts](../vitest.config.ts), [playwright.config.ts](../playwright.config.ts) — testconfiguratie
- [middleware.ts](../middleware.ts) — locale routing
- [src/app/globals.css](../src/app/globals.css) — importeert `../styles/tokens.css` + Tailwind
- [src/app/[locale]/layout.tsx](../src/app/[locale]/layout.tsx) — root layout + fonts
- [src/app/[locale]/page.tsx](../src/app/[locale]/page.tsx) — home placeholder
- [src/components/layout/Header.tsx](../src/components/layout/Header.tsx), [MobileNav.tsx](../src/components/layout/MobileNav.tsx), [Footer.tsx](../src/components/layout/Footer.tsx), [LocaleSwitcher.tsx](../src/components/layout/LocaleSwitcher.tsx), [Logo.tsx](../src/components/layout/Logo.tsx)
- [src/lib/supabase/client.ts](../src/lib/supabase/client.ts) + [server.ts](../src/lib/supabase/server.ts)
- [src/lib/i18n/request.ts](../src/lib/i18n/request.ts)
- [src/messages/nl.json](../src/messages/nl.json) + fr.json + en.json
- [tests/unit/pricing.test.ts](../tests/unit/pricing.test.ts), [tests/e2e/smoke.spec.ts](../tests/e2e/smoke.spec.ts), [tests/e2e/accessibility.spec.ts](../tests/e2e/accessibility.spec.ts)
- [supabase/migrations/0001_initial_schema.sql](../supabase/migrations/0001_initial_schema.sql) — met pricingvelden `price_min`, `price_max`, `price_type`
- [supabase/seed.sql](../supabase/seed.sql) — dev-only diensten met echte prijzen
- [README.md](../README.md) — herschreven
- [.env.local.example](../.env.local.example)

## Bestaande bestanden om te (her)gebruiken — niet aanraken

- [src/styles/tokens.css](../src/styles/tokens.css) — design tokens
- [public/brand/logo/](../public/brand/logo/) — alle logo SVG's + PNG-rasters
- [public/favicon.svg](../public/favicon.svg), [public/favicon-16.png](../public/favicon-16.png), [public/favicon-32.png](../public/favicon-32.png), [public/apple-touch-icon.png](../public/apple-touch-icon.png)
- [docs/PLAN.md](PLAN.md) — master, read-only referentie
- [docs/design/](design/) — read-only referentie volgens `docs/PLAN.md`, niet importeren vanuit `src/`

---

## Verificatie

1. **Build:** `npm install && npm run build` slaagt zonder TypeScript- of build-errors.
2. **Quality gate:** `npm run lint`, `npm run typecheck` en `npm run test`
   slagen.
3. **E2E smoke:** `npm run test:e2e` valideert dat `/nl`, `/fr` en `/en`
   laden. `npm run test:a11y` draait een eerste axe smoke check.
4. **Dev server:** `npm run dev` start op `localhost:3000`, redirect naar `/nl`.
3. **Brand-integratie:**
   - Pagina toont logo uit `public/brand/logo/park-and-wash-primary.svg`
   - Headings gebruiken Poppins, body Montserrat (DevTools check)
   - Achtergrond `--pw-paper`, hero-CTA blauw `--pw-blue-600`
   - Favicon zichtbaar in browser-tab
4. **Mobile-first check** (Chrome DevTools, iPhone 12 viewport 390×844):
   - Header: logo + hamburger, géén horizontale nav zichtbaar
   - Hamburger opent drawer; tap op link sluit en navigeert
   - Hero past in viewport zonder horizontale scroll
   - Diensten-lijst zichtbaar met prijzen
5. **Desktop check (1280px):** Header schakelt naar horizontale nav, hero blijft binnen max-width container, leesbaar.
6. **Locale switching:** `/nl`, `/fr`, `/en` tonen elk de hero in vertaalde tekst.
7. **Accessibility:** Lighthouse mobile audit Accessibility ≥ 90; alle tap-targets ≥ 44×44px.
8. **Supabase:** browser-client en server-client importeerbaar zonder runtime-error, ook wanneer env-vars leeg zijn (toont duidelijke dev-melding).
9. **Migratie:** `supabase db reset` (lokaal) past `0001_initial_schema.sql` toe zonder errors; `seed.sql` vult `services` met de 4 particulier-diensten + bedrijven-entry conform pricing-besluit.

---

## Wat deze stap *niet* doet (vervolgstappen uit [docs/PLAN.md](PLAN.md))

- Stap 2: Auth + admin allowlist + RLS basis + rate limiting + bot protection
- Stap 3-7: Layout-finetuning, echte Home (met video), Particulier/Bedrijf-keuze, Over Ons, Portfolio
- Stap 8: Beschikbaarheidsbeheer (availability_rules, blocked_slots, service area)
- Stap 9: Contact-formulier backend
- Stap 10: Booking wizard met slotgeneratie en server-side validatie
- Stap 11: Admin dashboard
- Stap 12: Responsive/launch polish, 3-talige parity check
- Fase 2: Betalingen, abonnementen, e-mailbevestigingen, reviews
