# WhyCast Local Studio v0 Build Spec

## Product Goal

Build a local web app called WhyCast Studio.

It is not the final consumer app yet. It is a creator tool for making WhyCast episodes from local files.

Core workflow:

Seed → Curiosity Tree → Selected Path → Script → TTS Text → Audio → Review

The repository remains the source of truth.

No database. No login. No cloud. No payments.

## MVP Scope

Must have:

- Scan the local `episodes/` folder.
- Show all episodes on a dashboard.
- Open one episode.
- Show episode status by stage.
- Display key local files: seed/brief, curiosity tree, selected path, script draft, TTS text, review notes, and decision log.
- Play local MP3 audio.
- Show current TTS settings: `edge-tts`, `zh-CN-YunyangNeural`, `-4%`.
- Generate audio from configured TTS text using Edge TTS.
- Keep all outputs as normal files.

Not MVP:

- User accounts.
- Database.
- Native mobile app.
- Hosted deployment.
- Subscription.
- Cloud sync.
- Advanced AI generation UI.
- Complex graph view.
- Multi-user sharing.

## Recommended Stack

- Next.js.
- TypeScript.
- Tailwind CSS.
- Node filesystem APIs.
- Node `child_process` for running `edge-tts`.

Optional later:

- `shadcn/ui`.
- `lucide-react`.

No database for v0.

## Episode Config

Each episode has an `episode.json`.

Example:

```json
{
  "id": "bloodhound-test",
  "title": "Why do bloodhounds look like that?",
  "status": "audio-draft",
  "createdAt": "2026-06-29",
  "currentStep": "Review audio draft",
  "tts": {
    "engine": "edge-tts",
    "voice": "zh-CN-YunyangNeural",
    "rate": "-4%"
  },
  "files": {
    "seed": "seed.md",
    "curiosityTree": "curiosity-tree.md",
    "selectedPath": "selected-path.md",
    "script": "script-draft-v1.md",
    "ttsInput": "tts-input-v1.txt",
    "reviewNotes": "review-notes.md",
    "decisionLog": "decision-log.md"
  },
  "audio": [
    {
      "label": "Audio v1",
      "path": "audio/audio-v1.mp3",
      "sourceText": "tts-input-v1.txt",
      "createdAt": "2026-06-29"
    }
  ]
}
```

If configured files are missing, the app shows them as missing instead of crashing.

## Main Pages

Home route: `/`

- Shows WhyCast Studio.
- Lists all configured episodes.
- Shows title, status, current step, artifact count, audio count, last updated, and open action.

Episode route: `/episodes/[id]`

- Left: workflow stages.
- Center: selected artifact content.
- Right: episode actions, audio, and metadata.

Workflow stages:

1. Seed.
2. Curiosity Tree.
3. Selected Path.
4. Script.
5. TTS Text.
6. Audio.
7. Review.
8. Decisions.

## Audio Generation

For v0, generate audio from the configured TTS input file.

Implementation uses Node `child_process` and the episode's `tts` config.

If the output file exists, create the next version:

- `audio/audio-v1.mp3`
- `audio/audio-v2.mp3`
- `audio/audio-v3.mp3`

After generation, update the episode's `episode.json` audio list.

## UI Direction

Style should feel like a documentary notebook and creative studio.

Prefer:

- Warm background.
- Clean cards.
- Soft borders.
- Large readable typography.
- Calm creative workspace.
- Audio-first feeling.

Avoid:

- Cold admin dashboard.
- Too many tables.
- Startup SaaS cliché.
- Dark hacker UI.

## Product Principle

The app should not become just a file browser.

It should organize files around the WhyCast creative journey:

Question → Branches → Path → Story → Voice → Review

That structure is the future product.
