import { X } from "lucide-react";
import { knowledgeSources } from "../lib/lifeosCapabilities";
import type { KnowledgePermissionState, KnowledgeSourceId } from "../types";

interface KnowledgeAccessSheetProps {
  open: boolean;
  states: KnowledgePermissionState[];
  onClose: () => void;
  onAuthorize: (id: KnowledgeSourceId) => void;
}

const statusText: Record<KnowledgePermissionState["status"], string> = {
  idle: "未授权",
  requesting: "授权中",
  authorized: "已授权",
  unavailable: "需接入",
  denied: "未允许"
};

export function KnowledgeAccessSheet({ open, states, onClose, onAuthorize }: KnowledgeAccessSheetProps) {
  if (!open) return null;

  return (
    <div className="knowledge-layer" role="dialog" aria-modal="true" aria-label="LifeOS 授权中心">
      <div className="knowledge-sheet">
        <div className="knowledge-sheet-header">
          <div>
            <h2>LifeOS 记忆权限</h2>
            <p>授权后，语音 Agent 才能查找照片、文件、日程和项目。</p>
          </div>
          <button className="sheet-close" type="button" aria-label="关闭授权中心" onClick={onClose}>
            <X size={18} strokeWidth={2.6} />
          </button>
        </div>

        <div className="knowledge-list">
          {knowledgeSources.map((source) => {
            const Icon = source.icon;
            const state = states.find((item) => item.id === source.id);
            const status = state?.status ?? "idle";
            return (
              <button className={`knowledge-item knowledge-item--${status}`} key={source.id} type="button" onClick={() => onAuthorize(source.id)}>
                <span className="knowledge-icon">
                  <Icon size={20} strokeWidth={2.6} />
                </span>
                <span className="knowledge-copy">
                  <strong>{source.label}</strong>
                  <small>{state?.detail ?? source.description}</small>
                </span>
                <span className="knowledge-status">{statusText[status]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
