import type { VoiceApiProvider } from "../types";

export interface RealtimeAgentConfig {
  provider: VoiceApiProvider;
  sessionEndpoint: string;
  knowledgeEndpoint: string;
}

export interface RealtimeAgentHandle {
  mode: "mock" | "webrtc";
  sessionId?: string;
  stop: () => void;
}

interface OpenAIRealtimeSession {
  id?: string;
  model: string;
  client_secret: {
    value: string;
  };
}

export const realtimeAgentConfig: RealtimeAgentConfig = {
  provider: "mock",
  sessionEndpoint: "/api/realtime/session",
  knowledgeEndpoint: "/api/lifeos/query"
};

export async function startRealtimeAgent(config = realtimeAgentConfig): Promise<RealtimeAgentHandle> {
  if (config.provider === "mock") {
    return {
      mode: "mock",
      sessionId: `mock-${Date.now()}`,
      stop: () => undefined
    };
  }

  const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const session = await createRealtimeSession(config);

  if (config.provider !== "openai_realtime") {
    return {
      mode: "webrtc",
      sessionId: session.id,
      stop: () => mediaStream.getTracks().forEach((track) => track.stop())
    };
  }

  const peer = new RTCPeerConnection();
  mediaStream.getTracks().forEach((track) => peer.addTrack(track, mediaStream));

  const dataChannel = peer.createDataChannel("lifeos-events");
  dataChannel.addEventListener("open", () => {
    dataChannel.send(
      JSON.stringify({
        type: "session.update",
        session: {
          instructions:
            "You are EAZO LifeOS. Help the user search photos, files, calendar, tasks, projects, and personal memory through voice.",
          modalities: ["text", "audio"]
        }
      })
    );
  });

  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);

  const sdpResponse = await fetch(`https://api.openai.com/v1/realtime?model=${encodeURIComponent(session.model)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.client_secret.value}`,
      "Content-Type": "application/sdp"
    },
    body: offer.sdp
  });

  const answer = await sdpResponse.text();
  await peer.setRemoteDescription({ type: "answer", sdp: answer });

  return {
    mode: "webrtc",
    sessionId: session.id,
    stop: () => {
      dataChannel.close();
      peer.close();
      mediaStream.getTracks().forEach((track) => track.stop());
    }
  };
}

async function createRealtimeSession(config: RealtimeAgentConfig): Promise<OpenAIRealtimeSession> {
  const response = await fetch(config.sessionEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      provider: config.provider,
      knowledgeEndpoint: config.knowledgeEndpoint
    })
  });

  if (!response.ok) {
    throw new Error("实时语音会话创建失败");
  }

  return response.json();
}
