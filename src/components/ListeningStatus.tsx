import type { VoiceState } from "../types";

const statusCopy: Record<VoiceState, string> = {
  idle: "轻触麦克风开始",
  listening: "正在听...",
  thinking: "正在思考...",
  speaking: "正在回答...",
  done: "已整理完成"
};

interface ListeningStatusProps {
  voiceState: VoiceState;
}

export function ListeningStatus({ voiceState }: ListeningStatusProps) {
  const isActive = voiceState === "listening" || voiceState === "speaking";

  return (
    <section className="listening-status" aria-live="polite">
      <div className={`waveform ${isActive ? "waveform--active" : ""}`} aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((bar) => (
          <span key={bar} style={{ animationDelay: `${bar * 90}ms` }} />
        ))}
      </div>
      <p>{statusCopy[voiceState]}</p>
    </section>
  );
}
