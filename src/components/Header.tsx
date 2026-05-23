import { Asterisk } from "lucide-react";

export function Header() {
  return (
    <header className="header-bar" aria-label="EAZO LifeOS">
      <div className="brand-mark" aria-hidden="true">
        <Asterisk size={24} strokeWidth={3.3} />
      </div>
      <div className="brand-title">
        <strong>EAZO</strong>
        <span>LifeOS</span>
      </div>
      <button className="text-mode-button" type="button" aria-label="文字模式">
        字
      </button>
    </header>
  );
}
