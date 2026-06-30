import Link from "next/link";
import { notFound } from "next/navigation";
import { GenerateAudioButton } from "@/components/GenerateAudioButton";
import { MarkdownView } from "@/components/MarkdownView";
import { StatusPill } from "@/components/StatusPill";
import { getStages, readArtifact, readEpisodeConfig } from "@/lib/episodes";
import type { EpisodeFileKey } from "@/lib/types";

type ArtifactKey = EpisodeFileKey | "audio";

const defaultArtifact: EpisodeFileKey = "seed";

export default async function EpisodePage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ artifact?: ArtifactKey }>;
}) {
  const { id } = await params;
  const { artifact } = await searchParams;
  let episode;
  try {
    episode = await readEpisodeConfig(id);
  } catch {
    notFound();
  }

  const stages = await getStages(episode);
  const selectedKey: ArtifactKey = artifact || defaultArtifact;
  const selected = stages.find((stage) => stage.key === selectedKey);
  const content =
    selectedKey !== "audio" && selectedKey in episode.files
      ? await readArtifact(episode, selectedKey as EpisodeFileKey)
      : null;

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[260px_minmax(0,1fr)_320px]">
      <aside className="space-y-5">
        <Link href="/" className="text-sm font-semibold text-clay">
          Back to episodes
        </Link>
        <div className="rounded-lg border border-ink/10 bg-linen p-5 shadow-soft">
          <StatusPill status={episode.status} />
          <h1 className="mt-4 text-2xl font-semibold leading-8">{episode.title}</h1>
          <p className="mt-3 text-sm leading-6 text-ink/65">{episode.currentStep}</p>
        </div>
        <nav className="space-y-2">
          {stages.map((stage) => (
            <Link
              key={stage.key}
              href={`/episodes/${episode.id}?artifact=${stage.key}`}
              className={`block rounded-md border px-4 py-3 text-sm transition ${
                selectedKey === stage.key
                  ? "border-clay/50 bg-clay/10 text-ink"
                  : "border-ink/10 bg-linen/75 text-ink/70 hover:border-clay/30"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold">{stage.label}</span>
                <span className={stage.exists ? "text-moss" : "text-red-700"}>
                  {stage.exists ? "exists" : "missing"}
                </span>
              </div>
              <div className="mt-1 truncate text-xs text-ink/45">{stage.path || "not configured"}</div>
            </Link>
          ))}
        </nav>
      </aside>

      <section className="min-w-0 rounded-lg border border-ink/10 bg-linen shadow-soft">
        <div className="border-b border-ink/10 px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">{selected?.label || "Artifact"}</p>
          <h2 className="mt-2 truncate text-xl font-semibold">{selected?.path || "Missing file"}</h2>
        </div>
        <div className="max-h-[calc(100vh-170px)] overflow-auto p-6">
          {selectedKey === "audio" ? (
            <AudioList episodeId={episode.id} audio={episode.audio} />
          ) : content ? (
            <MarkdownView content={content} />
          ) : (
            <div className="rounded-md border border-dashed border-ink/20 bg-paper p-8 text-ink/60">
              This artifact is missing or not configured yet.
            </div>
          )}
        </div>
      </section>

      <aside className="space-y-5">
        <div className="rounded-lg border border-ink/10 bg-linen p-5 shadow-soft">
          <h2 className="text-lg font-semibold">Voice Draft</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <Meta label="Engine" value={episode.tts.engine} />
            <Meta label="Voice" value={episode.tts.voice} />
            <Meta label="Rate" value={episode.tts.rate} />
          </dl>
          <div className="mt-5">
            <GenerateAudioButton episodeId={episode.id} sourceText={episode.files.ttsInput || "missing TTS input"} />
          </div>
        </div>

        <div className="rounded-lg border border-ink/10 bg-linen p-5 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Audio</h2>
            <Link href={`/episodes/${episode.id}?artifact=audio`} className="text-xs font-semibold text-clay">
              Open all
            </Link>
          </div>
          <AudioList compact episodeId={episode.id} audio={episode.audio} />
        </div>
      </aside>
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-ink/10 pb-2">
      <dt className="text-ink/50">{label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}

function AudioList({
  episodeId,
  audio,
  compact = false
}: {
  episodeId: string;
  audio: { label: string; path: string }[];
  compact?: boolean;
}) {
  if (!audio.length) {
    return <div className="rounded-md border border-dashed border-ink/20 bg-paper p-8 text-ink/60">No audio yet.</div>;
  }
  return (
    <div className={compact ? "mt-4 space-y-3" : "space-y-5"}>
      {audio.map((item) => (
        <div key={item.path} className="rounded-md border border-ink/10 bg-paper p-4">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h3 className="font-semibold">{item.label}</h3>
          </div>
          <audio
            className="w-full"
            controls
            src={`/api/episodes/${episodeId}/audio?path=${encodeURIComponent(item.path)}`}
          />
        </div>
      ))}
    </div>
  );
}
