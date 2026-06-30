import { promises as fs } from "fs";
import path from "path";
import { spawn } from "child_process";
import type { EpisodeAudio, EpisodeConfig, EpisodeFileKey, EpisodeSummary, Stage } from "./types";

export const repoRoot = process.cwd();
export const episodesDir = path.join(repoRoot, "episodes");

const fileLabels: Record<EpisodeFileKey, string> = {
  seed: "Seed / Brief",
  curiosityTree: "Curiosity Tree",
  selectedPath: "Selected Path",
  script: "Script",
  ttsInput: "TTS Text",
  reviewNotes: "Review",
  decisionLog: "Decisions"
};

export function episodeDir(id: string) {
  return path.join(episodesDir, id);
}

export function configPath(id: string) {
  return path.join(episodeDir(id), "episode.json");
}

export async function pathExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export function resolveEpisodePath(id: string, relativePath: string) {
  const resolved = path.resolve(episodeDir(id), relativePath);
  if (!resolved.startsWith(repoRoot)) {
    throw new Error("Path escapes repository root.");
  }
  return resolved;
}

export async function readEpisodeConfig(id: string): Promise<EpisodeConfig> {
  const raw = await fs.readFile(configPath(id), "utf8");
  return JSON.parse(raw) as EpisodeConfig;
}

export async function writeEpisodeConfig(config: EpisodeConfig) {
  await fs.writeFile(configPath(config.id), JSON.stringify(config, null, 2) + "\n");
}

export async function listEpisodes(): Promise<EpisodeSummary[]> {
  const entries = await fs.readdir(episodesDir, { withFileTypes: true });
  const configs = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const id = entry.name;
        if (!(await pathExists(configPath(id)))) return null;
        const config = await readEpisodeConfig(id);
        const stages = await getStages(config);
        return {
          ...config,
          artifactCount: stages.filter((stage) => stage.exists).length + config.audio.length,
          missingCount: stages.filter((stage) => !stage.exists).length,
          lastUpdated: await getEpisodeUpdatedAt(config)
        };
      })
  );
  return configs.filter((item): item is EpisodeSummary => item !== null);
}

export async function getEpisodeUpdatedAt(config: EpisodeConfig) {
  const candidates = [
    ...Object.values(config.files).filter(Boolean).map((file) => resolveEpisodePath(config.id, file)),
    ...config.audio.map((audio) => resolveEpisodePath(config.id, audio.path))
  ];
  const times = await Promise.all(
    candidates.map(async (file) => {
      try {
        return (await fs.stat(file)).mtimeMs;
      } catch {
        return 0;
      }
    })
  );
  const latest = Math.max(0, ...times);
  return latest ? new Date(latest).toISOString() : null;
}

export async function getStages(config: EpisodeConfig): Promise<Stage[]> {
  const fileStages = await Promise.all(
    (Object.keys(fileLabels) as EpisodeFileKey[]).map(async (key) => {
      const filePath = config.files[key];
      const exists = filePath ? await pathExists(resolveEpisodePath(config.id, filePath)) : false;
      return {
        key,
        label: fileLabels[key],
        path: filePath,
        exists
      };
    })
  );
  const audioExists = (
    await Promise.all(config.audio.map((audio) => pathExists(resolveEpisodePath(config.id, audio.path))))
  ).some(Boolean);
  return [
    ...fileStages,
    {
      key: "audio",
      label: "Audio",
      exists: audioExists,
      path: config.audio[0]?.path
    }
  ];
}

export async function readArtifact(config: EpisodeConfig, key: EpisodeFileKey) {
  const filePath = config.files[key];
  if (!filePath) return null;
  const resolved = resolveEpisodePath(config.id, filePath);
  if (!(await pathExists(resolved))) return null;
  return fs.readFile(resolved, "utf8");
}

export function nextAudioTarget(config: EpisodeConfig) {
  const versions = config.audio
    .map((audio) => audio.path.match(/audio-v(\d+)\.mp3$/)?.[1])
    .filter((value): value is string => Boolean(value))
    .map(Number);
  const nextVersion = Math.max(0, ...versions) + 1;
  return {
    path: `audio/audio-v${nextVersion}.mp3`,
    version: nextVersion
  };
}

export async function generateAudio(config: EpisodeConfig) {
  const sourceText = config.files.ttsInput;
  if (!sourceText) throw new Error("No TTS input configured.");
  const sourcePath = resolveEpisodePath(config.id, sourceText);
  if (!(await pathExists(sourcePath))) throw new Error(`Missing TTS input: ${sourceText}`);

  const output = nextAudioTarget(config);
  const outputPath = output.path;
  const resolvedOutput = resolveEpisodePath(config.id, outputPath);
  await fs.mkdir(path.dirname(resolvedOutput), { recursive: true });

  const edgeTts = process.env.EDGE_TTS_BIN || "/private/tmp/edge-tts-venv/bin/edge-tts";
  await run(edgeTts, [
    "--voice",
    config.tts.voice,
    "--rate",
    config.tts.rate,
    "--file",
    sourcePath,
    "--write-media",
    resolvedOutput
  ]);

  const audio: EpisodeAudio = {
    label: `Audio v${output.version}`,
    path: outputPath,
    sourceText,
    createdAt: new Date().toISOString().slice(0, 10)
  };
  const updated = {
    ...config,
    status: "audio-draft" as const,
    currentStep: "Review audio draft",
    audio: [...config.audio, audio]
  };
  await writeEpisodeConfig(updated);
  return audio;
}

function run(command: string, args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, { cwd: repoRoot });
    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(stderr || `${command} exited with code ${code}`));
    });
  });
}
