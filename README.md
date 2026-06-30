# WhyCast

WhyCast is a curiosity exploration tool.

Instead of answering the first question a person asks, WhyCast helps them map the landscape around that question first. The goal is to turn a random spark of curiosity into a structured set of possible directions, then let the user choose where to explore.

## Core Idea

Curiosity becomes more valuable when it is structured before it is answered.

WhyCast starts with a seed question like:

> Why are Bloodhounds so good at tracking?

Then it helps reveal deeper and adjacent questions:

- Why do Bloodhounds physically look like that?
- What makes scent hounds different from sight hounds?
- How does smell work?
- Why do humans rely on dogs instead of machines?
- Could technology replicate animal scent tracking?

The MVP is not a generic chatbot. It is a thinking partner for organizing curiosity.

## Repository Map

- [VISION.md](./VISION.md) - North Star for the project.
- [PROJECT_SPEC.md](./PROJECT_SPEC.md) - MVP scope, backlog, and acceptance criteria.
- [APP_ARCHITECTURE.md](./APP_ARCHITECTURE.md) - App/platform direction and architecture plan.
- [WHYCAST_STUDIO_V0_SPEC.md](./WHYCAST_STUDIO_V0_SPEC.md) - Local Studio v0 execution spec.
- [ROADMAP.md](./ROADMAP.md) - Development phases.
- [SPRINT_PLAN.md](./SPRINT_PLAN.md) - Near-term sprint plan.
- [CHANGELOG.md](./CHANGELOG.md) - Change history and decision log.
- [AGENTS.md](./AGENTS.md) - Codex guidance for this repo.

## Current Status

Planning stage.

The first build should prove one behavior:

1. User enters a curiosity seed.
2. The app generates a structured curiosity map.
3. The user can choose a branch to explore.
4. The app keeps the broader landscape visible.

## MVP Principle

Build the smallest useful version that proves the thinking workflow.

No accounts, no community, no podcast generation, no heavy knowledge graph infrastructure until the core exploration loop feels valuable.
