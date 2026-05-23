import type { LucideIcon } from "lucide-react";

export type VoiceState = "idle" | "listening" | "thinking" | "speaking" | "done";

export type VoiceApiProvider =
  | "mock"
  | "openai_realtime"
  | "elevenlabs"
  | "hume"
  | "deepgram";

export interface VoiceConfig {
  provider: VoiceApiProvider;
  endpoint: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: "image" | "chart" | "calendar" | "project";
  prompt: string;
}

export interface AIResult {
  title: string;
  summary: string;
  sections: {
    title: string;
    items: string[];
  }[];
}

export interface CallControl {
  id: "microphone" | "memory" | "video" | "end";
  label: string;
  icon: LucideIcon;
  variant?: "danger" | "primary";
}
