import { BarChart3, Image, LayoutGrid, Rocket } from "lucide-react";
import type { QuickAction } from "../types";

const iconMap = {
  image: Image,
  chart: BarChart3,
  calendar: LayoutGrid,
  project: Rocket
};

interface QuickActionChipsProps {
  actions: QuickAction[];
  onSelect: (actionId: string) => void;
  disabled?: boolean;
}

export function QuickActionChips({ actions, onSelect, disabled }: QuickActionChipsProps) {
  return (
    <div className="quick-actions" aria-label="快捷问题">
      {actions.map((action) => {
        const Icon = iconMap[action.icon];
        return (
          <button
            className="quick-chip"
            key={action.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(action.id)}
          >
            <span className={`quick-chip-icon quick-chip-icon--${action.icon}`}>
              <Icon size={19} strokeWidth={2.8} />
            </span>
            <span>{action.label}</span>
          </button>
        );
      })}
    </div>
  );
}
