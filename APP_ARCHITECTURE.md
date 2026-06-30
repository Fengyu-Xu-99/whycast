# App Architecture Plan

## Current Decision

Start as a local web app, not a native mobile app.

The first software version should run on the owner's Mac, work with local project files, and support the personal episode workflow that is already emerging in this repository.

## Why Local Web First

- The workflow is file-heavy: briefs, research notes, script drafts, source notes, audio chunks, and review notes.
- Most creation work happens on desktop, not phone.
- The owner is already using Codex and local repo files as the working environment.
- A local web app can become a hosted web app later without forcing an early iOS or Android decision.
- Mobile is useful mainly for listening and timestamped review, not for deep writing or research.

## Not Starting With

- Native iOS app.
- Native Android app.
- Public hosted product.
- User accounts.
- Cloud sync.
- Subscription or payment system.
- Complex graph database.

These may become useful later, but they should wait until the personal workflow is repeatable.

## Phase 1 - Local Web App

Goal: make the manual episode workflow easier to see, navigate, and repeat.

Runs locally on the owner's Mac.

Core areas:

- Episode dashboard.
- Curiosity seed and brief.
- Research/source workspace.
- Script draft workspace.
- Audio draft manager.
- Review notes.
- Export/open local files.

Likely user flow:

1. Open an episode.
2. See current status, next step, and artifacts.
3. Move between brief, research, script, audio, and review.
4. Generate or update files through assisted actions.
5. Keep the project folder as the source of truth.

## Phase 2 - Hosted Web App

Goal: make the same workflow accessible away from the local machine if the local version proves useful.

Adds:

- Hosted storage or sync.
- Access from laptop and phone.
- Saved episode library.
- More polished review flow.

Still avoid public/community features until the personal workflow is strong.

## Phase 3 - Mobile Companion

Goal: make listening and review easier on iPhone.

This should be a companion, not the primary creation surface.

Possible features:

- Listen to draft audio chunks.
- Add timestamped notes.
- Mark issues: pacing, pronunciation, wording, boring section, factual doubt.
- Sync notes back to the episode workspace.

## Core Data Objects

- Episode.
- Curiosity seed.
- Episode brief.
- Source note.
- Research note.
- Script draft.
- Audio draft.
- Audio chunk.
- Review note.
- Decision log entry.

## Source Of Truth

For now, the repository remains the source of truth.

The app should read and write ordinary project files where possible:

- Markdown for planning, notes, scripts, and reviews.
- Text files for TTS inputs.
- MP3 files for audio drafts.
- Changelog entries for decisions.

Avoid hidden app-only state until there is a clear need.

## Open Questions

- Should the first local app be a small Next.js app, a plain static web UI, or a Python-backed local tool?
- Should audio generation be triggered from the app or remain a command-line/Codex action?
- How much should the app edit files directly versus opening them in the editor?
- What is the smallest useful episode dashboard?
- Which repeated steps from 2-3 episodes deserve UI controls?
