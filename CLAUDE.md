# Claude Code Instructions

Read `AGENTS.md` first. It is the canonical working contract for this project
and applies to Claude Code, ChatGPT/Codex, and any other AI coding assistant.

Important entry points:

- `AGENTS.md` - project-specific rules, non-negotiables, commands, sources of
  truth, and definition of done.
- `docs/PLAN.md` - master product and architecture plan.
- `docs/plan-bootstrap-mobile-first.md` - concrete bootstrap plan for the
  first implementation step.
- `docs/strategy/DECISIONS.md` - durable decisions.
- `docs/strategy/DOCUMENTATION_SYSTEM.md` - where project knowledge belongs.
- `docs/design/README.md` - design handoff and brand asset guidance.

Do not treat `docs/design/` as production code. Use `src/styles/tokens.css` for
tokens and `public/brand/logo/` for shipping logo assets.

If instructions conflict, stop and reconcile the sources before implementing.
