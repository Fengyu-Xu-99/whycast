# Project Spec

## Project Charter

WhyCast is a curiosity exploration tool. Its purpose is to turn a random spark of curiosity into a structured exploration map before the user receives a direct answer.

The current validation target is personal, not public. Before building an app, WhyCast should prove that one curiosity-driven learner can turn a real-life trigger into a research-backed Chinese podcast script that feels worth reading and eventually listening to.

The later app idea is still possible, but it should come after several personal episodes reveal a repeatable workflow.

The current success signal is simple: the owner reads an episode script and thinks, "this answers what I was actually curious about, and I trust the knowledge enough to learn from it."

## Problem Statement

When a curious person asks an AI assistant a question, the assistant usually answers that question directly. That is useful, but it skips the more important step: helping the user discover the better questions around the first question.

WhyCast should solve this by showing the question landscape first. The product should help users pause, see possible directions, then choose where to go deeper.

## Current Validation Scope

The current validation workflow includes:

- personal curiosity trigger capture
- episode brief
- research notes with real sources
- Chinese podcast script drafts
- owner feedback and revision
- optional audio generation after the script feels right
- notes on repeated workflow patterns

The current validation workflow does not include:

- public app UI
- general audience personalization
- user accounts
- community features
- complex graph database infrastructure
- paid subscriptions
- native mobile app

## Deferred App Scope

The app MVP is deferred until the personal workflow is proven.

The MVP includes:

- curiosity seed input
- AI-generated curiosity map
- grouped follow-up questions
- branch selection
- focused branch explanation
- session-level exploration memory
- return-to-map workflow

The deferred app MVP does not include:

- user accounts
- community features
- podcast generation
- full course generation
- complex graph database infrastructure
- paid subscriptions
- native mobile app

## Current Episode Workflow

1. The owner notices a real curiosity trigger.
2. The trigger becomes an episode brief.
3. Sources are researched and summarized in notes.
4. A Chinese script draft is written.
5. The owner reads the script and gives feedback.
6. The script is revised for depth, accuracy, and personal taste.
7. Audio is generated only after the script feels worth listening to.

## Deferred App User Flow

1. The user enters a curiosity seed.
2. The system accepts a topic, observation, or question.
3. The system generates a grouped curiosity map.
4. The user reviews the map and scans possible directions.
5. The user selects one branch.
6. The system opens a focused explanation without losing the original map.
7. The user can continue deeper or return to the broader map.

## Initial Question Categories

Root Cause: why the thing happens.

Mechanism: how it works.

History: how it developed.

Comparison: what it is similar to or different from.

Human Impact: why it matters to people.

Future / Technology: where it might go next.

Example for the Bloodhound topic:

- Root Cause: Why did this body shape evolve?
- Mechanism: How does scent tracking work biologically?
- History: How were scent hounds bred over time?
- Comparison: How are scent hounds different from sight hounds?
- Human Impact: Why do humans still rely on working dogs?
- Future / Technology: Could machines replicate this ability?

## Product Backlog

The product backlog below is deferred. It should be revisited after 2-3 personal episodes reveal which steps are worth turning into software.

P0 - Seed input

User value: the user can start from any curiosity spark.

Acceptance criteria:

- Text input accepts a question or topic.
- Empty input is handled gracefully.
- Submitted seed becomes the active exploration topic.

P0 - Mock curiosity map

User value: the product shape can be tested before AI integration.

Acceptance criteria:

- Static map shows grouped questions.
- User can understand the app's purpose without reading instructions.
- Map remains visible while exploring a branch.

P0 - Branch selection

User value: the user can choose where to go deeper.

Acceptance criteria:

- Selecting a question updates the detail view.
- Selected branch is visually clear.
- User can return to the full map.

P1 - AI map generation

User value: each curiosity seed produces a relevant exploration map.

Acceptance criteria:

- Model returns grouped questions in a stable structure.
- Map includes at least 20 useful questions.
- Output avoids answering too early.

P1 - AI branch explanation

User value: the user gets useful focused learning after choosing a branch.

Acceptance criteria:

- Explanation includes a direct answer.
- Explanation includes key concepts.
- Explanation includes 2-4 follow-up questions.
- User can return to the original map.

P1 - Session memory

User value: the user can explore without resetting context.

Acceptance criteria:

- Original seed persists during the session.
- Generated map persists during the session.
- Selected branch persists during the session.
- Explored questions are marked or remembered.

P2 - Edit questions

User value: the user can shape the map around what they actually care about.

Acceptance criteria:

- Generated questions can be edited locally.
- Edited questions remain in the current session.

P2 - Export Markdown

User value: the user can save an exploration.

Acceptance criteria:

- Current map exports as Markdown.
- Selected branch notes export with the map.

## Quality Bar

WhyCast should feel clear, calm, exploratory, organized, intellectually playful, and useful quickly.

It should not feel like a generic chatbot, a course builder, a search results page, a dense academic tool, or a productivity dashboard.

The interface should help the user think before it helps the user consume information.

## Open Questions

- What parts of the personal episode workflow repeat across topics?
- Should the first build be a Codex skill, prompt pack, private tool, or app?
- How much source tracing is needed before audio?
- What does a "script worth listening to" checklist look like?
- If an app is built later, should the first UI be a map, outline, script workspace, or hybrid?
