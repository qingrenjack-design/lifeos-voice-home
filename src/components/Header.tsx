import { Asterisk, CalendarDays } from "lucide-react";

interface HeaderProps {
  onMemory: () => void;
}

export function Header({ onMemory }: HeaderProps) {
  return (
    <header className="header-bar" aria-label="EAZO LifeOS">
      <div className="brand-mark" aria-hidden="true">
        <Asterisk size={24} strokeWidth={3.3} />
      </div>
      <div className="brand-title">
        <strong>EAZO</strong>
        <span>LifeOS</span>
      </div>
      <button className="memory-entry-button" type="button" aria-label="打开记忆层" onClick={onMemory}>
        <CalendarDays size={21} strokeWidth={2.6} />
      </button>
    </header>
  );
}
