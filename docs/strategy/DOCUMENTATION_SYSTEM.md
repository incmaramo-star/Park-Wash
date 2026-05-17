# Documentation System

This file explains how Park&Wash keeps project knowledge organized so future
contributors and AI assistants know where to put information.

## Principle

Do not rely on memory or chat history. Durable project knowledge must live in
the repository.

When adding or changing important information, update the right source of truth
instead of scattering the same rule across many files.

## Document Roles

| File | Role |
|---|---|
| `README.md` | Entry point. Explains what the project is and what to read first. |
| `AGENTS.md` | Working contract for AI assistants and human contributors. |
| `CLAUDE.md` | Claude Code entry point. Points back to `AGENTS.md`. |
| `docs/PLAN.md` | Current master product and architecture plan while the project is small. |
| `docs/plan-bootstrap-mobile-first.md` | Temporary execution plan for Fase 1, step 1. Remove or archive after bootstrap is done. |
| `docs/strategy/DECISIONS.md` | Durable decision log for choices that should not be reopened casually. |
| `docs/strategy/DOCUMENTATION_SYSTEM.md` | This file. Explains how the documentation system works. |
| `docs/design/README.md` | Explains the read-only design handoff and canonical brand asset locations. |
| `src/styles/tokens.css` | Canonical brand/design token file. |
| `supabase/migrations/` | Future source of truth for database schema. |

## When To Update What

| Change type | Update |
|---|---|
| New product rule or user-facing invariant | `docs/PLAN.md` and, if durable, `docs/strategy/DECISIONS.md` |
| Architecture decision | `docs/strategy/DECISIONS.md`; later also an ADR under `docs/architecture/adr/` |
| Bootstrap or next-step implementation detail | `docs/plan-bootstrap-mobile-first.md` while bootstrap is active |
| Commands, quality gates, or contributor rules | `AGENTS.md` and `README.md` when useful |
| Brand token change | `src/styles/tokens.css` and `docs/strategy/DECISIONS.md` if material |
| Logo or brand asset change | `public/brand/logo/`, `docs/design/README.md`, and `docs/strategy/DECISIONS.md` if material |
| Schema change | `supabase/migrations/`, `docs/PLAN.md` while pre-bootstrap, and decision log if strategic |
| Environment variable change | `.env.local.example`, `README.md`, and `AGENTS.md` if it affects setup |

## Future Architecture Split

For now, `docs/PLAN.md` is allowed to be the master product and architecture
source because the app is not bootstrapped yet.

After bootstrap, split long-lived technical architecture into:

```text
docs/
  architecture/
    README.md
    adr/
      0001-use-nextjs-supabase.md
      0002-admin-managed-pricing.md
  operations/
    RUNBOOK.md
```

At that point:

- `docs/PLAN.md` becomes product/master planning.
- `docs/architecture/README.md` becomes the technical architecture overview.
- `docs/architecture/adr/` stores one decision per file.
- `docs/operations/RUNBOOK.md` stores deploy, incident, backup, and recovery
  procedures.

## Decision Rule

If a choice affects pricing, booking behavior, admin access, data security,
schema, hosting, dependencies, or launch readiness, record it in
`docs/strategy/DECISIONS.md`.

Use this shape:

```md
## YYYY-MM-DD - Decision title

- **Status:** Decided
- **Owner:** Project owner
- **Decision:** What was chosen.
- **Reason:** Why this is the right tradeoff.
- **Impact:** What this changes.
- **Sources of truth:** Files or systems that now own the rule.
- **Review date:** When to revisit.
```

## Cleanup Rule

Temporary documents must say when they stop being authoritative.

`docs/plan-bootstrap-mobile-first.md` is authoritative only until Fase 1, step
1 is implemented. After that, move useful lasting knowledge into
`docs/PLAN.md`, `docs/architecture/README.md`, `AGENTS.md`, or
`docs/strategy/DECISIONS.md`, then archive or delete the bootstrap plan.
