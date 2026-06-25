# Bloodhound Audio Notes

Status: ready for first audio sample.

## Goal

Generate a short AI-narrated sample before producing the full episode.

The first sample should test:

- Mandarin naturalness
- pacing
- English breed-name pronunciation
- whether mixed Chinese and English sounds distracting
- whether the voice feels like a calm knowledge explainer

## Recommended Voice Setup

- Model: `gpt-4o-mini-tts-2025-12-15`
- Voice: `cedar`
- Format: `mp3`
- Speed: `1.0`

Instructions:

```text
Voice Affect: Warm, composed, and curious.
Tone: Natural Mandarin explainer, friendly but knowledge-first.
Pacing: Steady and moderate, not dramatic.
Emotion: Quiet fascination, like explaining something genuinely interesting.
Pronunciation: Keep English breed names clear and slightly slower the first time.
Pauses: Brief pause after section headings and important questions.
Delivery: Conversational, not like reading a school essay.
```

## First Sample Text

Use the opening plus the beginning of section 1 from `script-audio-v1.md`.

Target length:

- 1-2 minutes
- enough to test Chinese pacing and English breed names
- not the full episode yet

Suggested output:

```text
output/speech/bloodhound-sample-v1.mp3
```

Sample input files:

```text
episodes/bloodhound-test/audio-sample-v1.txt
episodes/bloodhound-test/tts-instructions-v1.txt
```

Command:

```bash
mkdir -p output/speech
python3 /Users/fengyu/.codex/skills/speech/scripts/text_to_speech.py speak \
  --input-file episodes/bloodhound-test/audio-sample-v1.txt \
  --instructions-file episodes/bloodhound-test/tts-instructions-v1.txt \
  --voice cedar \
  --response-format mp3 \
  --out output/speech/bloodhound-sample-v1.mp3
```

Environment note:

- `OPENAI_API_KEY` must be set before running the live command.
- This workspace uses `python3`, not `python`.

## Full Episode Plan

The full script is longer than the single-request TTS limit, so full audio should be generated in chunks.

Recommended chunking:

- `chunk-01-opening-and-body.mp3`
- `chunk-02-smell-world.mp3`
- `chunk-03-nose-and-tracking.mp3`
- `chunk-04-bloodhound-ranking.mp3`
- `chunk-05-scent-hounds.mp3`
- `chunk-06-sight-hounds.mp3`
- `chunk-07-ending.mp3`

Later, decide whether to stitch the chunks into one file or keep them separate for review.

## Review Checklist

After the sample, listen for:

- Does the Mandarin sound natural?
- Are English breed names understandable?
- Is the pacing too slow or too fast?
- Does it sound too dramatic?
- Does it sound like a real explainer rather than a robot reading Markdown?
- Should the script use fewer English names in the spoken version?

## Disclosure

Final audio should be labeled:

> This narration was generated with AI text-to-speech.
