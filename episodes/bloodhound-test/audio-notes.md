# Bloodhound Audio Notes

Status: full audio draft generated.

## Goal

Generate a short AI-narrated sample before producing the full episode.

The first sample should test:

- Mandarin naturalness
- pacing
- English breed-name pronunciation
- whether mixed Chinese and English sounds distracting
- whether the voice feels like a calm knowledge explainer

## Selected Voice Setup

- Tool: `edge-tts`
- Voice: `zh-CN-YunyangNeural`
- Format: `mp3`
- Rate: `-4%`

Selected sample:

```text
output/speech/bloodhound-sample-v1-edge-yunyang-rate-minus4.mp3
```

Notes:

- Apple `say` sounded unusably robotic.
- ElevenLabs was worse than expected for this Mandarin sample.
- Edge `zh-CN-YunyangNeural` was the best free test voice so far.
- `--rate=-8%` was a little too slow; `--rate=-4%` is the current preferred speed.

## First Sample Text

Use the opening plus the beginning of section 1 from `script-audio-v1.md`.

Target length:

- 1-2 minutes
- enough to test Chinese pacing and English breed names
- not the full episode yet

Suggested output:

```text
output/speech/bloodhound-sample-v1-edge-yunyang-rate-minus4.mp3
```

Sample input files:

```text
episodes/bloodhound-test/audio-sample-v1.txt
episodes/bloodhound-test/tts-instructions-v1.txt
```

Command:

```bash
mkdir -p output/speech
/private/tmp/edge-tts-venv/bin/edge-tts \
  --voice zh-CN-YunyangNeural \
  --rate=-4% \
  --file episodes/bloodhound-test/audio-sample-v1.txt \
  --write-media output/speech/bloodhound-sample-v1-edge-yunyang-rate-minus4.mp3
```

Environment note:

- `edge-tts` is installed in `/private/tmp/edge-tts-venv`.
- No API key is required for Edge TTS.

## Full Episode Plan

The full script was generated in chunks with Edge TTS `zh-CN-YunyangNeural` at `--rate=-4%`.

Output directory:

```text
output/speech/bloodhound-full-v1/
```

Generated chunks:

- `chunk-01-opening-and-body.mp3` — about 3:58
- `chunk-02-smell-world.mp3` — about 2:17
- `chunk-03-nose-and-tracking.mp3` — about 2:20
- `chunk-04-bloodhound-ranking.mp3` — about 2:00
- `chunk-05-scent-hounds.mp3` — about 4:01
- `chunk-06-scent-vs-sight-hounds.mp3` — about 4:56
- `chunk-07-ending.mp3` — about 3:17

Total draft length: about 22:50.

Later, decide whether to stitch the chunks into one file or revise the script first.

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
