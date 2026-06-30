export type EpisodeStatus =
  | "seed"
  | "tree"
  | "path-selected"
  | "script-draft"
  | "tts-ready"
  | "audio-draft"
  | "reviewed"
  | "final";

export type EpisodeFileKey =
  | "seed"
  | "curiosityTree"
  | "selectedPath"
  | "script"
  | "ttsInput"
  | "reviewNotes"
  | "decisionLog";

export type EpisodeAudio = {
  label: string;
  path: string;
  sourceText: string;
  createdAt: string;
};

export type EpisodeConfig = {
  id: string;
  title: string;
  status: EpisodeStatus;
  createdAt: string;
  currentStep: string;
  tts: {
    engine: "edge-tts";
    voice: string;
    rate: string;
  };
  files: Partial<Record<EpisodeFileKey, string>>;
  audio: EpisodeAudio[];
};

export type EpisodeSummary = EpisodeConfig & {
  artifactCount: number;
  missingCount: number;
  lastUpdated: string | null;
};

export type Stage = {
  key: EpisodeFileKey | "audio";
  label: string;
  path?: string;
  exists: boolean;
};
