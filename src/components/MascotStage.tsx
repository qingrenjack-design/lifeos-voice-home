import { useState } from "react";
import mascotImage from "../assets/mascot.png";
import type { VoiceState } from "../types";

interface MascotStageProps {
  voiceState: VoiceState;
}

export function MascotStage({ voiceState }: MascotStageProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const canTryImage = !imageFailed;

  return (
    <section className={`mascot-stage mascot-stage--${voiceState}`} aria-label="EAZO 海星 AI 伙伴">
      <div className="mascot-aura" />
      <div className="sparkle sparkle-one" />
      <div className="sparkle sparkle-two" />
      <div className="sparkle sparkle-three" />
      <div className="mascot-shadow" />
      <div className="mascot-float">
        {canTryImage ? (
          <img
            className="mascot-image"
            src={mascotImage}
            alt="橙色 EAZO 海星 AI 伙伴"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <MascotSvg />
        )}
      </div>
    </section>
  );
}

function MascotSvg() {
  return (
    <svg className="mascot-svg" viewBox="0 0 320 320" role="img" aria-label="橙色海星吉祥物">
      <defs>
        <radialGradient id="starfishFill" cx="38%" cy="26%" r="78%">
          <stop offset="0%" stopColor="#FFB13B" />
          <stop offset="48%" stopColor="#FF8A17" />
          <stop offset="100%" stopColor="#FF6A00" />
        </radialGradient>
        <linearGradient id="lensFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2B2F36" />
          <stop offset="100%" stopColor="#06070A" />
        </linearGradient>
        <filter id="mascotDrop" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="18" floodColor="#FF6A00" floodOpacity="0.22" stdDeviation="18" />
        </filter>
      </defs>
      <path
        className="starfish-body"
        d="M166.6 25.4c35.7 3.9 38.8 62.2 45.9 86.2 21.7-9.8 73.4-30.2 89.6 2.3 16.9 34-31.4 64.8-48 82.5 16.4 19 46.8 61.5 20.8 88.7-26.9 28.1-75.1-8.8-95.8-20.5-16.8 18.8-49 64.3-82.4 46-34.6-18.9-13.8-73.1-11.3-97.2-24.1-10.4-78.9-24.8-78.1-62.4.8-38.2 58.4-42.1 82.8-48 4.8-24.1 37-81.8 76.5-77.6Z"
        fill="url(#starfishFill)"
        filter="url(#mascotDrop)"
      />
      <path d="M111 133c15-12 31-9 43 2" fill="none" stroke="#111827" strokeLinecap="round" strokeWidth="10" />
      <path d="M184 135c15-10 31-8 42 4" fill="none" stroke="#111827" strokeLinecap="round" strokeWidth="10" />
      <g transform="rotate(4 160 166)">
        <path
          d="M72 146c5-18 74-14 84 3 5 9 3 45-12 57-16 13-55 4-64-12-7-14-12-34-8-48Z"
          fill="#FFFFFF"
        />
        <path
          d="M167 149c11-17 78-10 83 9 4 14-7 40-17 50-15 14-55 7-64-8-8-13-10-39-2-51Z"
          fill="#FFFFFF"
        />
        <rect x="149" y="154" width="22" height="12" rx="6" fill="#FFFFFF" />
        <path
          d="M84 153c16-11 57-7 64 6 4 8 0 34-11 42-12 8-40 3-48-9-7-10-12-31-5-39Z"
          fill="url(#lensFill)"
        />
        <path
          d="M177 159c13-12 55-8 64 6 4 7-5 31-14 38-13 9-40 5-49-8-6-9-8-29-1-36Z"
          fill="url(#lensFill)"
        />
        <circle cx="98" cy="164" r="6" fill="#FFFFFF" opacity="0.34" />
        <circle cx="193" cy="167" r="6" fill="#FFFFFF" opacity="0.3" />
        <path d="M72 146h-8" stroke="#111827" strokeLinecap="round" strokeWidth="5" />
        <path d="M250 158h8" stroke="#111827" strokeLinecap="round" strokeWidth="5" />
      </g>
      <path d="M132 224c12 19 43 23 58 3" fill="none" stroke="#111827" strokeLinecap="round" strokeWidth="8" />
    </svg>
  );
}
