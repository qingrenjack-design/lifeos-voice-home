import { BookMarked, Mic, PhoneOff } from "lucide-react";
import type { CallControl } from "../types";

const controls: CallControl[] = [
  { id: "microphone", label: "麦克风", icon: Mic, variant: "primary" },
  { id: "memory", label: "记忆", icon: BookMarked },
  { id: "end", label: "结束", icon: PhoneOff, variant: "danger" }
];

interface BottomControlsProps {
  onMicrophone: () => void;
  onMemory: () => void;
  onEnd: () => void;
  busy?: boolean;
}

export function BottomControls({ onMicrophone, onMemory, onEnd, busy }: BottomControlsProps) {
  return (
    <nav className="bottom-controls" aria-label="通话操作">
      {controls.map((control) => {
        const Icon = control.icon;
        const handleClick = control.id === "microphone" ? onMicrophone : control.id === "memory" ? onMemory : onEnd;
        return (
          <button className={`call-control call-control--${control.variant ?? "default"}`} key={control.id} type="button" onClick={handleClick} disabled={busy && control.id !== "end"}>
            <span className="call-control-icon">
              <Icon size={28} strokeWidth={control.id === "end" ? 3.2 : 2.9} />
            </span>
            <span className="call-control-label">{control.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
