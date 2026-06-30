import Link from "next/link";
import { listEpisodes } from "@/lib/episodes";
import { StatusPill } from "@/components/StatusPill";

export default async function HomePage() {
  const episodes = await listEpisodes();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-10">
      <header className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay">Local Studio</p>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <h1 className="text-4xl font-semibold text-ink">WhyCast Studio</h1>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-ink/70">
              Question → Branches → Path → Story → Voice → Review
            </p>
          </div>
          <div className="rounded-md border border-ink/10 bg-linen px-4 py-3 text-sm text-ink/65 shadow-soft">
            {episodes.length} episode{episodes.length === 1 ? "" : "s"}
          </div>
        </div>
      </header>

      <section className="grid gap-5 md:grid-cols-2">
        {episodes.map((episode) => (
          <Link
            key={episode.id}
            href={`/episodes/${episode.id}`}
            className="rounded-lg border border-ink/10 bg-linen p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-clay/45"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold leading-8 text-ink">{episode.title}</h2>
                <p className="mt-2 text-sm text-ink/60">{episode.currentStep}</p>
              </div>
              <StatusPill status={episode.status} />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 text-sm">
              <Metric label="Artifacts" value={episode.artifactCount} />
              <Metric label="Missing" value={episode.missingCount} />
              <Metric label="Audio" value={episode.audio.length} />
            </div>

            <p className="mt-6 text-xs uppercase tracking-[0.16em] text-ink/45">
              Last updated {episode.lastUpdated ? new Date(episode.lastUpdated).toLocaleDateString() : "unknown"}
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-ink/10 bg-paper px-3 py-3">
      <div className="text-xl font-semibold text-ink">{value}</div>
      <div className="text-xs uppercase tracking-wide text-ink/50">{label}</div>
    </div>
  );
}
