import { useCallback, useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { AIResultCard } from "./components/AIResultCard";
import { BottomControls } from "./components/BottomControls";
import { Header } from "./components/Header";
import { ListeningStatus } from "./components/ListeningStatus";
import { MascotStage } from "./components/MascotStage";
import { QuickActionChips } from "./components/QuickActionChips";
import { SceneButton } from "./components/SceneButton";
import { mockResponses, quickActions } from "./data/mockResponses";
import { startVoiceSession } from "./lib/voiceApi";
import type { AIResult, VoiceState } from "./types";

const flowSteps: { state: VoiceState; delay: number }[] = [
  { state: "listening", delay: 800 },
  { state: "thinking", delay: 1000 },
  { state: "speaking", delay: 1200 }
];

export default function App() {
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [activeResult, setActiveResult] = useState<AIResult | null>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  const resetCall = useCallback(() => {
    clearTimers();
    setActiveResult(null);
    setVoiceState("idle");
  }, [clearTimers]);

  const runMockFlow = useCallback(
    (actionId = "work-progress") => {
      clearTimers();
      setActiveResult(null);

      let elapsed = 0;
      flowSteps.forEach(({ state, delay }) => {
        const timer = window.setTimeout(() => setVoiceState(state), elapsed);
        timers.current.push(timer);
        elapsed += delay;
      });

      const doneTimer = window.setTimeout(() => {
        setVoiceState("done");
        setActiveResult(mockResponses[actionId]);
      }, elapsed);
      timers.current.push(doneTimer);
    },
    [clearTimers]
  );

  const handleMicrophone = useCallback(async () => {
    await startVoiceSession();
    runMockFlow("work-progress");
  }, [runMockFlow]);

  useEffect(() => clearTimers, [clearTimers]);

  const isBusy = voiceState === "listening" || voiceState === "thinking" || voiceState === "speaking";

  return (
    <main className="app-shell">
      <div className={`phone-frame phone-frame--${activeResult ? "result" : "home"}`}>
        <Header />
        <SceneButton />
        <div className="experience-area">
          <MascotStage voiceState={voiceState} />
          <ListeningStatus voiceState={voiceState} />
          <QuickActionChips actions={quickActions} onSelect={runMockFlow} disabled={isBusy} />
          {activeResult ? <AIResultCard result={activeResult} /> : null}
        </div>
        <BottomControls onMicrophone={handleMicrophone} onEnd={resetCall} busy={isBusy} />
        <footer className="ai-footer">
          <ShieldCheck size={15} strokeWidth={2.4} />
          <span>内容由 AI 生成</span>
        </footer>
      </div>
    </main>
  );
}
