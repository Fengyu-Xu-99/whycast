"use client";

import { useState } from "react";

export function GenerateAudioButton({
  episodeId,
  sourceText
}: {
  episodeId: string;
  sourceText: string;
}) {
  const [state, setState] = useState<"idle" | "running" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function generate() {
    const confirmed = window.confirm(
      `Generate a new MP3 from ${sourceText}? Existing audio will not be overwritten.`
    );
    if (!confirmed) return;
    setState("running");
    setMessage("");
    try {
      const response = await fetch(`/api/episodes/${episodeId}/generate-audio`, {
        method: "POST"
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Audio generation failed.");
      setState("done");
      setMessage(`Created ${payload.audio.path}`);
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Audio generation failed.");
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={generate}
        disabled={state === "running"}
        className="w-full rounded-md bg-ink px-4 py-3 text-sm font-semibold text-linen transition hover:bg-clay disabled:cursor-wait disabled:opacity-60"
      >
        {state === "running" ? "Generating audio..." : "Generate next MP3"}
      </button>
      <p className="text-xs leading-5 text-ink/55">
        Uses <span className="font-semibold">{sourceText}</span> and creates the next version in the episode audio folder.
      </p>
      {message ? (
        <p className={state === "error" ? "text-sm text-red-700" : "text-sm text-moss"}>{message}</p>
      ) : null}
    </div>
  );
}
