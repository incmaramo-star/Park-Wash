# Park & Wash - Website Plan

## Context

Park & Wash is een mobile auto detailing business aan huis. De zaakvoerder
besteedt vandaag te veel tijd aan het handmatig zoeken, beantwoorden en
inplannen van klanten. Deze website wordt daarom de primaire lead-generator en
booking-tool, zodat klanten zelf een echt tijdslot kunnen reserveren en de
zaakvoerder zich kan focussen op het werk zelf.

De website bedient zowel particulieren als bedrijven. Beide doelgroepen gaan
door een self-booking flow. Contact blijft beschikbaar als apart leadkanaal,
maar booking is geen aanvraagflow: een klant kiest een echt beschikbaar slot en
krijgt pas succes te zien nadat de reservatie server-side bevestigd is.

---

## Beslissingen

| Onderwerp | Beslissing |
|---|---|
| Type | Mobile auto detailing, aan huis |
| Doelgroep | Particulieren + bedrijven |
| Booking model | Echte tijdslotreservatie, geen aanvraagflow |
| Booking flow bedrijven | Zelfde self-booking flow als particulieren, met extra bedrijfsvelden |
| Talen | NL, FR, EN met functionele parity vanaf dag 1 |
| Hosting | Vercel |
| Tech stack | Next.js (laatste versie, App Router) fullstack |
| Database & Auth | Supabase (PostgreSQL + Supabase Auth) |
| Admin toegang | Enkel zaakvoerder + development team |
| Admin autorisatie | Supabase Auth + allowlist rollen + RLS policies |
| Animaties | Framer Motion |
| Styling | Tailwind CSS |
| Design | Mobile-first, modern, premium uitstraling |
| Visuele identiteit | Vastgelegd via Claude Design bundle (zie `docs/design/` en `docs/strategy/DECISIONS.md`); tokens in `src/styles/tokens.css`, logo's in `public/brand/logo/` |
| Betalingen | Fase 2, architectuur klaar houden |
| Abonnementen | Fase 2 |

---

## Kritieke productregels

- De booking wizard toont alleen werkelijk beschikbare slots.
- Een slot wordt pas gereserveerd nadat beschikbaarheid, overlap, service area
  en business rules server-side gevalideerd zijn.
- De UI mag nooit succes tonen voordat de booking succesvol is opgeslagen.
- Alleen gepubliceerde diensten en prijzen mogen in productie boekbaar zijn.
- Dummy data mag in development en staging, niet in live booking.
- Alle publieke paginas en alle kritieke flows moeten op launch werken in NL,
  FR en EN.
- Alleen allowlisted admins mogen leads, bookings en andere PII bekijken of
  wijzigen.
- Contact- en bookingforms moeten rate limiting, bot protection, consent en
  privacycopy bevatten.
- Publieke contact-lead writes moeten door de server-only rate limiter voordat
  Supabase een lead insert krijgt.

---

## Paginastructuur

### Publieke pagina's

1. **Home** - Hero met video, korte intro diensten, social proof en duidelijke
   CTA's
2. **Particulier / Bedrijf keuze** - Twee opties naast elkaar, beide sturen
   door naar dezelfde booking wizard met aangepast formulier
3. **Over Ons** - Verhaal, werkwijze en vertrouwen opbouwen
4. **Portfolio** - Voor/na foto's en projectgalerij
5. **Contact** - Formulier, telefoon en e-mail van zaakvoerder -> maakt lead in
   admin
6. **Booking Wizard** - Stapsgewijs: kies type (particulier/bedrijf) -> kies
   dienst/pakket -> check service area/adres -> kies een echt beschikbaar
   datum- en tijdslot -> geef contactgegevens in -> bevestiging

### Admin dashboard (afgeschermd)

- Bookings bekijken, filteren, wijzigen, annuleren en verplaatsen
- Leads bekijken en opvolgstatus beheren
- Diensten en prijzen beheren (CRUD + draft/published status). Prijzen zijn
  beheerbaar via admin en mogen niet hardcoded zijn buiten dev-only seeddata.
- Beschikbaarheid beheren: openingsuren, blokdagen, buffers en service area
- Login via Supabase Auth, maar admin enkel voor allowlisted users

---

## Booking en autorisatie

### Booking engine

- Slotgeneratie gebeurt op basis van:
  - openingsuren
  - service duration
  - buffer voor en na een afspraak
  - geblokkeerde dagen/sloten
  - service area / toegelaten postcodes
  - timezone van het bedrijf
- Beschikbaarheid wordt server-side gecontroleerd op het moment van reserveren.
- Bij een succesvolle booking wordt meteen een echte reservatie aangemaakt.
- Particulieren en bedrijven gebruiken dezelfde booking flow. Bedrijven krijgen
  bijkomende velden zoals bedrijfsnaam en eventueel BTW- of referentieveld in
  een latere iteratie.

### Admin auth en data security

- Supabase Auth verzorgt login.
- Een aparte `admin_users` allowlist bepaalt wie effectief toegang krijgt tot
  het admin dashboard.
- Alleen de zaakvoerder en het development team staan op deze allowlist.
- RLS policies blokkeren standaard alle toegang tot `bookings`, `leads` en
  adminfunctionaliteit voor niet-admin users.
- Publieke formulieren mogen alleen de minimale data schrijven die nodig is voor
  leadcaptatie of booking.

---

## Tech Stack en projectstructuur

```text
park-wash/
|-- src/
|   |-- app/                    # Next.js App Router
|   |   |-- [locale]/           # i18n (nl, fr, en)
|   |   |   |-- page.tsx        # Home
|   |   |   |-- services/       # Particulier/Bedrijf keuze
|   |   |   |-- about/          # Over Ons
|   |   |   |-- portfolio/      # Portfolio
|   |   |   |-- contact/        # Contact
|   |   |   `-- booking/        # Booking Wizard
|   |   |-- admin/              # Admin dashboard (geen locale prefix)
|   |   |   |-- bookings/
|   |   |   |-- leads/
|   |   |   |-- services/
|   |   |   `-- availability/
|   |   `-- api/                # API routes / server handlers
|   |       |-- bookings/
|   |       |-- leads/
|   |       |-- services/
|   |       `-- availability/
|   |-- components/
|   |   |-- ui/                 # Herbruikbare UI componenten
|   |   |-- layout/             # Header, Footer, Navigation
|   |   |-- home/               # Home-specifieke componenten
|   |   |-- booking/            # Booking wizard stappen
|   |   `-- admin/              # Admin componenten
|   |-- lib/
|   |   |-- supabase/           # Supabase client & helpers
|   |   |-- auth/               # Admin guards en allowlist checks
|   |   |-- booking/            # Slotlogica, conflictchecks, beschikbaarheid
|   |   |-- i18n/               # Internationalisatie config
|   |   `-- utils/              # Utility functies
|   |-- messages/               # Vertaalbestanden
|   |   |-- nl.json
|   |   |-- fr.json
|   |   `-- en.json
|   `-- types/                  # TypeScript types
|-- public/
|   |-- images/
|   `-- videos/
|-- supabase/
|   `-- migrations/             # Database migraties
|-- middleware.ts               # Locale handling + session plumbing
|-- next.config.ts
|-- tailwind.config.ts
|-- package.json
`-- tsconfig.json
```

### Brand foundation (al aanwezig in repo)

Brand assets en design tokens staan klaar vóór de Next.js scaffold:

- `src/styles/tokens.css` - canonieke design tokens (kleurenschaal,
  spacing, radii, shadows, fonts). Tijdens project setup importeren vanuit
  `globals.css` en mappen naar het Tailwind theme.
- `public/brand/logo/` - logo SVG's (primary, mono navy, mono white,
  wordmark, app-icon, favicon) + `png/` rasters (logo, app icons,
  favicons).
- `public/favicon.svg`, `public/favicon-16.png`, `public/favicon-32.png`,
  `public/apple-touch-icon.png` - root favicons (Next.js App Router auto-served).
- `public/brand/source/` - originele PNG's van zaakvoerder (referentie).
- `docs/design/` - prototype HTML + JSX componenten + brief + chat
  transcript (read-only referentie, niet importeren vanuit `src/`).

Fonts: Poppins (display) + Montserrat (body), beide via Google Fonts /
`next/font` wanneer de scaffold er staat.

### Key dependencies

- `next` (latest, App Router)
- `react` + `react-dom` (latest)
- `framer-motion` - animaties
- `tailwindcss` - styling
- `@supabase/supabase-js` + `@supabase/ssr` - database & auth
- `next-intl` - internationalisatie (NL/FR/EN)
- `react-hook-form` + `zod` - formulier validatie
- `date-fns` - datum handling voor booking
- `lucide-react` - iconen
- `vitest` + `@testing-library/react` - unit/component tests
- `playwright` + `@axe-core/playwright` - E2E en accessibility tests

---

## Database schema (Supabase)

```sql
-- Diensten die de zaakvoerder aanbiedt
services
  id                    uuid PK
  type                  enum ('particular', 'business')
  name_nl               text
  name_fr               text
  name_en               text
  description_nl        text
  description_fr        text
  description_en        text
  price_min             decimal nullable
  price_max             decimal nullable
  price_type            enum ('fixed', 'from', 'range', 'on_request')
  duration_minutes      int
  buffer_before_minutes int default 0
  buffer_after_minutes  int default 0
  visibility_status     enum ('draft', 'published', 'archived')
  sort_order            int
  created_at            timestamptz
  updated_at            timestamptz

-- Welke users admin mogen zijn
admin_users
  user_id               uuid PK
  email                 text unique
  role                  enum ('owner', 'developer')
  is_active             boolean
  created_at            timestamptz
  updated_at            timestamptz

-- Openingsuren voor slotgeneratie
availability_rules
  id                    uuid PK
  day_of_week           int                 -- 0-6
  start_time            time
  end_time              time
  is_active             boolean
  created_at            timestamptz
  updated_at            timestamptz

-- Tijdsloten of dagen die niet boekbaar zijn
blocked_slots
  id                    uuid PK
  starts_at             timestamptz
  ends_at               timestamptz
  reason                text nullable
  created_at            timestamptz
  updated_at            timestamptz

-- Bookings van klanten
bookings
  id                    uuid PK
  service_id            uuid FK -> services
  customer_name         text
  customer_email        text
  customer_phone        text
  customer_type         enum ('particular', 'business')
  company_name          text nullable
  address               text
  city                  text
  postal_code           text
  slot_start            timestamptz
  slot_end              timestamptz
  timezone              text default 'Europe/Brussels'
  status                enum ('confirmed', 'completed', 'cancelled', 'rescheduled')
  service_name_snapshot text
  service_price_min_snapshot decimal nullable
  service_price_max_snapshot decimal nullable
  service_price_type_snapshot enum ('fixed', 'from', 'range', 'on_request')
  notes                 text nullable
  created_at            timestamptz
  updated_at            timestamptz

-- Leads vanuit contactformulier
leads
  id                    uuid PK
  name                  text
  email                 text
  phone                 text nullable
  customer_type         enum ('particular', 'business')
  company_name          text nullable
  message               text
  source                enum ('contact_form', 'quote_request')
  status                enum ('new', 'contacted', 'converted', 'closed')
  privacy_consent_at    timestamptz
  created_at            timestamptz
  updated_at            timestamptz
```

### Datamodel regels

- De booking wizard toont in productie alleen `services.visibility_status =
  'published'`.
- Elke booking bewaart een snapshot van dienstnaam, prijstype, minimumprijs en
  maximumprijs op het moment van reserveren.
- Diensten en prijzen zijn admin-beheerbaar. De startprijzen zijn: Basic detail
  vanaf EUR 135, Intense detail vanaf EUR 185, lakcorrecties EUR 250-650,
  coatings EUR 500-1200 en bedrijven/vloten op aanvraag.
- Tijdsblokken worden opgeslagen als echte timestamps, niet als vrije tekst.
- RLS staat standaard dicht en opent alleen wat expliciet nodig is.
- Publieke contact-lead writes zijn beperkt tot anonieme inserts met
  `source = 'contact_form'`, `status = 'new'` en expliciete
  `privacy_consent_at`; publieke reads blijven dicht.
- Contact-lead inserts worden vooraf rate-limited via Upstash Redis in
  productie; Redis keys bevatten alleen scope en gehashte identifiers, geen
  ruwe IP-, e-mail- of telefoonwaarden.

---

## Fasering

### Fase 1 - Foundation (huidige scope)

1. **Project setup** - Next.js, Tailwind, Supabase, i18n, projectstructuur
2. **Auth en security basis** - Supabase Auth, admin allowlist, RLS basis,
   privacycopy, rate limiting en bot protection
3. **Layout en navigatie** - Header, footer, taalswitch, mobile menu
4. **Home pagina** - Hero met video, diensten preview, CTA's, animaties
5. **Particulier/Bedrijf keuze pagina** - Twee kaarten naast elkaar, beide naar
   self-booking
6. **Over Ons pagina**
7. **Portfolio pagina** - Galerij met placeholder content
8. **Beschikbaarheidsbeheer** - openingsuren, blokdagen, buffers en service
   area
9. **Contact pagina** - Formulier -> lead in database
10. **Booking Wizard** - Stapsgewijze flow met echte slotreservering en
    validatie
11. **Admin dashboard** - Login, bookings beheer, leads overzicht, diensten en
    prijzen CRUD, draft/published status en availability beheer
12. **Responsive en launch polish** - Mobile-first optimalisatie, animaties
    finetunen en 3-talige parity check

### Fase 2 - Uitbreidingen (toekomst)

- Online betalingen (Stripe/Mollie integratie)
- Abonnementssysteem
- Automatische e-mailbevestigingen
- Foto's/portfolio beheer via admin
- Reviews/testimonials systeem

---

## Verificatie

### Teststrategie

Gebruik gelaagde tests, met de meeste aandacht voor booking, admin security,
pricing en PII.

**Unit tests**

- Prijsformattering voor `fixed`, `from`, `range` en `on_request`.
- Slotgeneratie op basis van openingsuren, service duration en buffers.
- Overlapdetectie en dubbele-reservatie checks.
- Service area / postcode validatie.
- Zod-validatie voor booking-, contact- en adminformulieren.

**Integration tests**

- Booking insert faalt bij overlap, buiten service area of unpublished service.
- Booking bewaart service- en prijssnapshot op reservatiemoment.
- Contactformulier maakt correct een lead aan.
- Admin services/pricing CRUD schrijft de juiste `price_min`, `price_max` en
  `price_type` waarden.
- RLS blokkeert reads/writes voor anonieme gebruikers en niet-admin users.

**E2E tests**

- `/nl`, `/fr` en `/en` laden en tonen functioneel equivalente publieke flows.
- Mobile navigatie opent, sluit en navigeert correct.
- Klant kan end-to-end een beschikbaar slot boeken.
- Bezet of ongeldig slot kan niet geboekt worden.
- UI toont pas succes nadat de server de reservatie bevestigt.
- Contactformulier maakt een lead en toont correcte feedback.
- Allowlisted admin kan inloggen; niet-admin kan `/admin` niet openen.
- Admin past een prijs aan; publieke service/booking UI toont de nieuwe prijs.
- Admin zet een service op draft; die service verdwijnt uit de booking flow.

**Accessibility en visual checks**

- Axe checks op home, contact, booking wizard, admin login en admin dashboard.
- Keyboard/focus checks voor mobile nav, forms en wizard stappen.
- Visual screenshots voor home, service cards, booking wizard en admin services
  op mobile en desktop.

### Launch gate

Na elke stap:

- [ ] `npm run build` slaagt zonder errors
- [ ] `npm run lint` en `npm run typecheck` slagen zodra beschikbaar
- [ ] Relevante unit/integration tests slagen
- [ ] Relevante Playwright E2E tests slagen voor gewijzigde kritieke flows
- [ ] Pagina's en flows werken in NL, FR en EN
- [x] Contact flow werkt end-to-end en maakt correct een lead aan
- [ ] Booking wizard doorloopt een echte slotreservering end-to-end
- [ ] Overlap en dubbele reservaties worden server-side geblokkeerd
- [ ] Alleen gepubliceerde diensten zijn live boekbaar
- [ ] Admin login werkt alleen voor allowlisted accounts
- [ ] RLS schermt `bookings`, `leads` en admin writes correct af
- [ ] Mobile responsive check (Chrome DevTools)
- [ ] Lighthouse score controleren (performance, accessibility)
- [ ] Animaties smooth op mobile devices

---

## Open / TBD

- **Dienstenpakketten** - Startprijzen zijn beslist, maar moeten via admin
  aanpasbaar blijven. Dummy data mag enkel in development of staging; productie
  gaat pas live met echte, gepubliceerde diensten en prijzen.
- **Service area** - Exacte regio, toegelaten postcodes en eventuele
  verplaatsingsregels nog vastleggen voor launch.
- **Admin allowlist** - Exacte e-mailadressen van zaakvoerder en developers nog
  invullen bij setup.
- **Domeinnaam** - TBD
- **Video voor hero** - TBD, placeholder gebruiken
- **Bot protection provider** - TBD, maar verplicht voor publieke formulieren
