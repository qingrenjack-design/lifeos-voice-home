import type { VoiceApiProvider } from "../types";

export interface RealtimeAgentConfig {
  provider: VoiceApiProvider;
  callEndpoint: string;
  knowledgeEndpoint: string;
  memoryEndpoint: string;
}

export interface RealtimeAgentHandle {
  mode: "mock" | "webrtc";
  sessionId?: string;
  stop: () => void;
}

export const realtimeAgentConfig: RealtimeAgentConfig = {
  provider: "mock",
  callEndpoint: "/api/realtime/call",
  knowledgeEndpoint: "/api/lifeos/query",
  memoryEndpoint: "/api/memory/query"
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

  const peer = new RTCPeerConnection();
  mediaStream.getTracks().forEach((track) => peer.addTrack(track, mediaStream));

  const dataChannel = peer.createDataChannel("lifeos-events");
  dataChannel.addEventListener("open", () => {
    dataChannel.send(
      JSON.stringify({
        type: "session.update",
        session: {
          instructions:
            "You are EAZO LifeOS. Use the same memory database for direct browsing and voice queries. Search photos, files, calendar, chats, projects, and work records by time.",
          modalities: ["text", "audio"],
          tools: [
            {
              type: "function",
              name: "query_memory",
              description: "Query the LifeOS memory database by natural language, date, and content type.",
              parameters: {
                type: "object",
                properties: {
                  query: { type: "string" },
                  date: { type: "string" },
                  types: {
                    type: "array",
                    items: { type: "string", enum: ["photo", "work", "chat", "file", "calendar"] }
                  }
                },
                required: ["query"]
              }
            }
          ]
        }
      })
    );
  });

  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);

  const sdpResponse = await fetch(config.callEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/sdp"
    },
    body: offer.sdp ?? ""
  });

  const answer = await sdpResponse.text();
  await peer.setRemoteDescription({ type: "answer", sdp: answer });

  return {
    mode: "webrtc",
    sessionId: `webrtc-${Date.now()}`,
    stop: () => {
      dataChannel.close();
      peer.close();
      mediaStream.getTracks().forEach((track) => track.stop());
    }
  };
}
