# AGENTS.md

## Project Identity

WhyCast is a curiosity exploration tool.

The product principle is:

> Map first, answer second.

Do not turn WhyCast into a generic chatbot. The core experience should help the user turn one curiosity seed into a structured landscape of connected questions before choosing a branch to explore.

## Product Guardrails

- Preserve the North Star in `VISION.md`.
- Use `PROJECT_SPEC.md` as the working product spec.
- Use `ROADMAP.md` for phased planning.
- Use `CHANGELOG.md` as the single table-based change and decision log.
- Keep the MVP narrow until the core exploration loop works.
- Prefer a useful prototype over speculative platform features.

## MVP Priority

The first product loop is:

1. User enters a curiosity seed.
2. App generates a structured curiosity map.
3. User selects one branch.
4. App explains that branch.
5. User can return to the broader map.

Avoid adding accounts, community, podcast generation, complex graph infrastructure, subscriptions, or native mobile work before this loop is proven.

## Working Style

The project owner wants to learn modern software building through this project.

When working in this repo:

- Explain important engineering choices briefly.
- Suggest best practices the owner may not know to ask for.
- Call out missing project steps when they would prevent confusion later.
- Keep suggestions practical and scoped to the current stage.
- Avoid overwhelming the owner with enterprise-level process too early.

Examples of useful proactive suggestions:

- "This repo should have an `AGENTS.md` so Codex remembers project rules."
- "Before coding the AI flow, define the prompt output shape."
- "Before adding auth, prove local session value first."
- "Before picking a graph database, test whether a simple JSON structure is enough."

## Engineering Defaults

- Keep changes small and easy to review.
- Reuse existing repo patterns before adding new ones.
- Prefer standard platform features before new dependencies.
- Add dependencies only when they clearly reduce complexity.
- Add tests or runnable checks for non-trivial behavior.
- Update `CHANGELOG.md` when a meaningful project decision or structure change is made.

## Documentation Rules

- `CHANGELOG.md` stays table-based.
- `PROJECT_SPEC.md` should be readable prose with backlog-style sections, not a table-first document.
- Keep `VISION.md` inspirational and stable.
- Keep implementation details out of `VISION.md`; put them in `PROJECT_SPEC.md`, `ROADMAP.md`, or future technical docs.

## Definition Of Done

A task is done when:

- the requested change is implemented,
- related docs are updated when needed,
- the smallest useful verification has been run or the limitation is stated,
- any important follow-up decision is captured in `CHANGELOG.md` or called out to the owner.
