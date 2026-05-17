# Project Discovery Workflow

Gebruik deze workflow wanneer je nog niet genoeg weet om meteen een definitieve
`AGENTS.md` in te vullen.

Dit is de juiste aanpak als:

- de repo nog leeg is
- je nog geen tech stack hebt gekozen
- je nog niet weet wat de non-negotiables zijn
- je nog twijfelt over productrichting, scope, of architectuur

Het doel is eenvoudig:

AI moet jou de juiste vragen stellen, jullie nemen samen beslissingen, en die
beslissingen worden daarna omgezet naar projectdocumentatie.

## Wanneer Deze Workflow Beter Is Dan Direct Bootstrap

Gebruik niet meteen de normale bootstrapflow als te veel van deze dingen nog
onbekend zijn:

- wat het product precies is
- wie de primaire gebruiker is
- welke workflows kritiek zijn
- welke risico's absoluut vermeden moeten worden
- welke stack logisch is
- welke deploymentvorm past

In dat geval moet AI eerst helpen ontdekken, niet meteen invullen.

## De Juiste Werkwijze

Gebruik dit in twee fases:

### Fase 1: Discovery

AI stelt vragen en helpt keuzes maken.

### Fase 2: Documentatie

AI zet de genomen beslissingen om in:

- `AGENTS.md`
- `README.md`
- `docs/strategy/DECISIONS.md`
- `docs/product/PRD.md`
- `docs/operations/RUNBOOK.md`

## Hoe AI Zich Moet Gedragen In Discovery

AI moet in discovery mode:

- niet doen alsof keuzes al vastliggen
- niet te vroeg een stack forceren
- niet alles in een keer vragen
- per ronde 1 tot 3 vragen stellen
- opties voorstellen wanneer dat helpt
- na elke ronde kort samenvatten wat nu beslist is
- open vragen expliciet bijhouden
- voorlopige keuzes markeren als `Hypothese` of `TBD`

Het doel is niet snelheid.
Het doel is duidelijke beslissingen met goede context.

## Aanbevolen Vraagvolgorde

Laat AI in deze volgorde werken:

### Ronde 1: Productbasis

- Wat wil je bouwen?
- Voor wie?
- Welk probleem los je op?
- Wat moet de gebruiker uiteindelijk kunnen doen?

### Ronde 2: Scope En Kritieke Flows

- Wat zijn de 2 tot 4 belangrijkste workflows?
- Welke flow mag absoluut niet stuk?
- Wat gebeurt er als deze flow faalt?

### Ronde 3: Business En Risico

- Hoe verdient dit project geld of waarde?
- Wat mag commercieel of operationeel niet fout lopen?
- Zijn er juridische, privacy-, of compliance-risico's?

### Ronde 4: Productvorm

- Is dit een web app, mobiele app, intern dashboard, API, SaaS, of iets anders?
- Single-tenant of multi-tenant?
- Is auth nodig?
- Zijn betalingen nodig?
- Is realtime nodig?
- Is offline belangrijk?

### Ronde 5: Technische Richting

- Welke stack past bij de gekozen productvorm?
- Wat wil je optimaliseren: snelheid van bouwen, lage kosten, schaalbaarheid,
  flexibiliteit, of controle?
- Zijn er voorkeuren of afkeuren voor specifieke tools?

### Ronde 6: Definitieve Samenvatting

AI vat samen:

- wat beslist is
- wat voorlopig beslist is
- wat nog open staat
- wat dat betekent voor `AGENTS.md`

## Standaard Discovery Prompt

Gebruik deze prompt in een nieuwe sessie of in een lege repo:

```md
We zitten nog in de discoveryfase van dit project.

Gebruik een discovery-first aanpak.
Ik wil niet dat je meteen alles invult of aannames maakt.

Je taak:
1. Stel me de juiste vragen om samen tot beslissingen te komen.
2. Werk in kleine rondes van 1 tot 3 vragen tegelijk.
3. Begin met product, gebruiker, probleem en kritieke workflows.
4. Stel pas technische vragen wanneer de productrichting duidelijker is.
5. Geef waar nuttig 2 of 3 concrete opties met tradeoffs.
6. Vat na elke ronde kort samen:
   - wat besloten is
   - wat nog open staat
   - welke aannames voorlopig zijn
7. Houd onzekerheden expliciet bij als `TBD` of `Hypothese`.
8. Zodra er genoeg duidelijkheid is, stel voor om daarvan
   `AGENTS.md`, `README.md`, en de eerste docs te maken.

Belangrijk:
- Forceer geen stack te vroeg.
- Doe geen alsof-beslissingen.
- Help me keuzes maken door goed te structureren.
```

## Gewenste Eindoutput Na Discovery

Zodra discovery voldoende duidelijkheid heeft opgeleverd, laat AI dit maken:

### 1. `AGENTS.md`

Moet bevatten:

- Project Context
- Commands
- Non-Negotiables
- Critical Workflows
- Project-Specific Invariants
- Sources Of Truth

### 2. `README.md`

Moet een korte, heldere projectintro geven.

### 3. `docs/strategy/DECISIONS.md`

Moet de eerste echte beslissingen vastleggen.

### 4. `docs/product/PRD.md`

Moet beschrijven wat het product doet en voor wie.

### 5. `docs/operations/RUNBOOK.md`

Moet de eerste operationele aannames of releasebasis vastleggen.

## Als Je Nog Echt Bijna Niets Weet

Dan is dit genoeg om te starten:

- projectnaam
- idee in een zin
- soort gebruiker

Zelfs met alleen dat kan AI discovery starten en de rest via vragen helpen
vormgeven.

## Praktisch Gebruik In Een Lege Repo

1. Maak een lege repo.
2. Zet `PROJECT_UNIVERSALS.md` erin.
3. Kopieer die als `AGENTS.md`, ook al is die nog niet ingevuld.
4. Gebruik de discovery prompt uit deze file.
5. Beantwoord de vragen van AI in rondes.
6. Laat AI na voldoende duidelijkheid de docs uitwerken.
7. Commit pas daarna de basisstructuur.

## Praktisch Besluit

Ja, dit kan perfect in een lege repo.

Sterker nog: als je nog veel niet weet, is discovery-first meestal beter dan
direct proberen een volledig projectdocument in te vullen.
