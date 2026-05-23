import type { VoiceConfig } from "../types";

export const voiceConfig: VoiceConfig = {
  provider: "mock",
  endpoint: "/api/voice-session"
};

export async function startVoiceSession(config = voiceConfig) {
  if (config.provider === "mock") {
    return {
      sessionId: `mock-${Date.now()}`,
      provider: config.provider
    };
  }

  const response = await fetch(config.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      provider: config.provider
    })
  });

  return response.json();
}
