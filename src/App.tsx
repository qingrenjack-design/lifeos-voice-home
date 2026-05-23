import { useCallback, useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { AIResultCard } from "./components/AIResultCard";
import { BottomControls } from "./components/BottomControls";
import { Header } from "./components/Header";
import { ListeningStatus } from "./components/ListeningStatus";
import { MemoryLayer } from "./components/MemoryLayer";
import { MascotStage } from "./components/MascotStage";
import { QuickActionChips } from "./components/QuickActionChips";
import { mockMemoryEntries } from "./data/memoryData";
import { mockResponses, quickActions } from "./data/mockResponses";
import { initialKnowledgeStates } from "./lib/lifeosCapabilities";
import { syncKnowledgePermissions } from "./lib/knowledgeBase";
import { requestKnowledgePermission } from "./lib/permissions";
import { startRealtimeAgent } from "./lib/realtimeAgent";
import type { AIResult, KnowledgePermissionState, KnowledgeSourceId, VoiceState } from "./types";

const flowSteps: { state: VoiceState; delay: number }[] = [
  { state: "listening", delay: 800 },
  { state: "thinking", delay: 1000 },
  { state: "speaking", delay: 1200 }
];

export default function App() {
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [activeResult, setActiveResult] = useState<AIResult | null>(null);
  const [memoryOpen, setMemoryOpen] = useState(false);
  const [knowledgeStates, setKnowledgeStates] = useState<KnowledgePermissionState[]>(initialKnowledgeStates);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

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
    clearTimers();
    setActiveResult(null);
    await startRealtimeAgent();
    runMockFlow("work-progress");
  }, [clearTimers, runMockFlow]);

  const handleAuthorize = useCallback(async (id: KnowledgeSourceId) => {
    setKnowledgeStates((states) => states.map((state) => (state.id === id ? { ...state, status: "requesting" } : state)));
    const result = await requestKnowledgePermission(id);

    setKnowledgeStates((states) => {
      const nextStates = states.map((state) => (state.id === id ? result : state));
      syncKnowledgePermissions(nextStates).catch(() => undefined);
      return nextStates;
    });
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const isBusy = voiceState === "listening" || voiceState === "thinking" || voiceState === "speaking";

  return (
    <main className="app-shell">
      <div className={`phone-frame phone-frame--${activeResult ? "result" : "home"}`}>
        <Header onMemory={() => setMemoryOpen(true)} />
        <div className="experience-area">
          <MascotStage voiceState={voiceState} />
          <ListeningStatus voiceState={voiceState} />
          <QuickActionChips actions={quickActions} onSelect={runMockFlow} disabled={isBusy} />
          {activeResult ? <AIResultCard result={activeResult} /> : null}
        </div>
        <BottomControls onMicrophone={handleMicrophone} busy={isBusy} />
        <footer className="ai-footer">
          <ShieldCheck size={15} strokeWidth={2.4} />
          <span>内容由 AI 生成</span>
        </footer>
        <MemoryLayer
          open={memoryOpen}
          entries={mockMemoryEntries}
          permissionStates={knowledgeStates}
          onClose={() => setMemoryOpen(false)}
          onAuthorize={handleAuthorize}
        />
      </div>
    </main>
  );
}
