import { Mic } from "lucide-react";
import type { CallControl } from "../types";

const controls: CallControl[] = [
  { id: "microphone", label: "开始语音", icon: Mic, variant: "primary" }
];

interface BottomControlsProps {
  onMicrophone: () => void;
  busy?: boolean;
}

export function BottomControls({ onMicrophone, busy }: BottomControlsProps) {
  return (
    <nav className="bottom-controls" aria-label="通话操作">
      {controls.map((control) => {
        const Icon = control.icon;
        return (
          <button className={`call-control call-control--${control.variant ?? "default"}`} key={control.id} type="button" onClick={onMicrophone} disabled={busy}>
            <span className="call-control-icon">
              <Icon size={34} strokeWidth={2.8} />
            </span>
            <span className="call-control-label">{control.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
