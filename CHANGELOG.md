# Changelog

This is the single project history log. It combines change history and decision history so the repository has one place to check what changed, what was decided, and why.

| Date | Type | Area | Note | Reason / Decision |
| --- | --- | --- | --- | --- |
| 2026-06-24 | Created | Repository | Created initial WhyCast repository structure. | Start with a clear project home before building app code. |
| 2026-06-24 | Created | Vision | Added `VISION.md` as the project North Star. | The vision should be a living reference, not a one-time handoff document. |
| 2026-06-24 | Created | Spec | Added initial MVP product requirements. | Define the smallest useful product loop before choosing a stack. |
| 2026-06-24 | Created | Roadmap | Added phased project roadmap. | Keep future ideas visible while protecting MVP scope. |
| 2026-06-24 | Decided | MVP Scope | First version focuses on seed input, curiosity map, branch exploration, and session context. | These prove the core idea without accounts, community, podcasts, or graph infrastructure. |
| 2026-06-24 | Decided | Architecture | Deferred app stack choice. | The stack should be chosen after the MVP shape is clear. |
| 2026-06-24 | Changed | Documentation | Replaced separate `DECISIONS.md` with this table-based changelog. | Change history and decisions overlapped too much at this stage. |
| 2026-06-24 | Changed | Spec | Renamed `PRODUCT_REQUIREMENTS.md` to `PROJECT_SPEC.md` and reorganized it into project-management tables. | A table-based project spec is easier to scan and maintain. |
| 2026-06-24 | Changed | Spec | Converted `PROJECT_SPEC.md` back to readable spec format while keeping backlog and acceptance criteria. | Only the changelog should be table-first; the spec should be easier to read and revise. |
| 2026-06-24 | Created | Agent Guidance | Added `AGENTS.md` with WhyCast product guardrails and working style rules. | Codex should remember project identity, MVP scope, and proactively suggest useful best practices. |
| 2026-06-24 | Changed | Roadmap | Moved single episode proof before static UI prototype. | Proving one useful podcast-style learning episode is the fastest way to validate the idea before building an app. |
| 2026-06-24 | Created | Planning | Added `SPRINT_PLAN.md`. | The project needs short validation sprints before implementation work. |
| 2026-06-25 | Created | Episode Proof | Added `episodes/bloodhound-test/episode-brief.md`. | Sprint 1 should capture the user's real curiosity trigger before generating maps, outlines, scripts, or audio. |
| 2026-06-25 | Decided | Episode Proof | First test episode uses a Bloodhound trigger from *The Hunter: Call of the Wild*, casual Simplified Chinese, solo narration, and a 15-20 minute target. | The first proof should preserve the original curiosity path instead of becoming a generic topic summary. |
| 2026-06-25 | Created | Episode Proof | Added `episodes/bloodhound-test/script-draft-v0.md`. | A research-backed overview script helps test whether the first curiosity trail can become a natural Chinese podcast episode before audio generation. |
| 2026-06-25 | Changed | Episode Proof | Added deeper `episodes/bloodhound-test/script-draft-v1.md` after feedback. | The episode should prioritize direct knowledge, deeper explanations, and concrete hunting dog examples over a long opening or meta summary. |
| 2026-06-25 | Decided | Product Direction | Shifted WhyCast from public app planning to a personal episode-making workflow. | The owner needs to read and refine scripts first; repeated personal episodes should define the system before any app is built. |
| 2026-06-25 | Created | Workflow | Added `PERSONAL_STYLE.md` and `episodes/WORKFLOW.md`. | The Bloodhound feedback revealed reusable style and research rules for future episodes. |
| 2026-06-25 | Changed | Planning | Updated `ROADMAP.md` and `SPRINT_PLAN.md` around personal workflow validation. | The next milestone is a repeatable personal script/audio process, not a static prototype for general users. |
| 2026-06-25 | Created | Research | Added `episodes/bloodhound-test/research-notes.md`. | Fact-check notes should live beside the script so the episode can teach accurate knowledge without cluttering the narration. |
| 2026-06-25 | Changed | Spec | Updated `PROJECT_SPEC.md` to make personal episode validation the active scope and app MVP the deferred scope. | The project should not prematurely optimize for a public product before the owner has a repeatable episode workflow. |
| 2026-06-25 | Created | Episode Proof | Added `episodes/bloodhound-test/script-draft-v2.md` and strengthened research notes. | The Bloodhound episode needs an almost audio-ready draft that keeps the owner's preferred direct, deep, knowledge-first style. |
| 2026-06-25 | Created | Audio Prep | Added `episodes/bloodhound-test/script-audio-v1.md` and `audio-notes.md`. | The first audio test should use a clean spoken script and a short sample before generating the full episode. |
| 2026-06-25 | Created | Audio Prep | Added `audio-sample-v1.txt` and `tts-instructions-v1.txt` for the first TTS sample. | Repeatable input files make audio generation easier once `OPENAI_API_KEY` is set. |
| 2026-06-30 | Decided | Audio Prep | Selected Edge TTS `zh-CN-YunyangNeural` at `--rate=-4%` for the Bloodhound sample and updated `audio-notes.md`. | Apple `say` sounded unusably robotic, ElevenLabs sounded worse than expected for this Mandarin sample, and Yunyang was the best free voice test so far. |
| 2026-06-30 | Created | Audio Draft | Generated the Bloodhound full audio draft in seven MP3 chunks under `output/speech/bloodhound-full-v1/`. | A chunked full draft lets the owner review pacing, English breed-name pronunciation, and script naturalness before stitching or revising. |
| 2026-06-30 | Decided | Architecture | Added `APP_ARCHITECTURE.md` and linked it from the README. | WhyCast should start as a local web app around the file-based personal episode workflow, with hosted web and mobile companion options deferred. |
| 2026-06-30 | Created | Studio v0 | Added `WHYCAST_STUDIO_V0_SPEC.md` and scaffolded a Next.js local studio with episode scanning, detail view, file viewer, MP3 playback, and Edge TTS generation route. | The first app build should organize the existing file-based creative journey before adding database, cloud, mobile, or advanced AI UI. |
| 2026-06-30 | Changed | Studio v0 | Added Bloodhound `curiosity-tree.md` and `selected-path.md`, made audio playable from the episode sidebar, and clarified the generate-audio action. | The local studio should expose the creative journey directly and make existing audio drafts reviewable before adding more generation features. |
| 2026-06-30 | Changed | Studio v0 | Rendered Markdown artifacts in the episode detail view instead of showing raw Markdown syntax. | Briefs, scripts, paths, and notes should read like documents inside the studio, not like raw file dumps. |
| 2026-06-30 | Changed | Studio v0 | Renamed Bloodhound audio chunk labels to compact review names and hid raw output paths in the audio cards. | Audio drafts should be reviewed by meaningful chunk names, not filesystem paths. |
