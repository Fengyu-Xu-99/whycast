import type { EpisodeStatus } from "@/lib/types";

const labels: Record<EpisodeStatus, string> = {
  seed: "Seed",
  tree: "Tree",
  "path-selected": "Path",
  "script-draft": "Script",
  "tts-ready": "TTS Ready",
  "audio-draft": "Audio Draft",
  reviewed: "Reviewed",
  final: "Final"
};

export function StatusPill({ status }: { status: EpisodeStatus }) {
  return (
    <span className="inline-flex rounded-full border border-clay/25 bg-clay/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-clay">
      {labels[status]}
    </span>
  );
}
