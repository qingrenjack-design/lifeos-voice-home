import { CalendarDays, FileText, FolderOpen, Image, MessageCircle, PanelsTopLeft, X } from "lucide-react";
import { useMemo, useState } from "react";
import { knowledgeSources } from "../lib/lifeosCapabilities";
import type { KnowledgePermissionState, KnowledgeSourceId, MemoryEntry, MemoryEntryType } from "../types";

interface MemoryLayerProps {
  open: boolean;
  entries: MemoryEntry[];
  permissionStates: KnowledgePermissionState[];
  onClose: () => void;
  onAuthorize: (id: KnowledgeSourceId) => void;
}

const entryIconMap: Record<MemoryEntryType, typeof Image> = {
  photo: Image,
  work: PanelsTopLeft,
  chat: MessageCircle,
  file: FileText,
  calendar: CalendarDays
};

const entryLabelMap: Record<MemoryEntryType, string> = {
  photo: "图片",
  work: "工作",
  chat: "聊天",
  file: "文件",
  calendar: "日程"
};

const statusText: Record<KnowledgePermissionState["status"], string> = {
  idle: "连接",
  requesting: "连接中",
  authorized: "已连接",
  unavailable: "需接入",
  denied: "未允许"
};

export function MemoryLayer({ open, entries, permissionStates, onClose, onAuthorize }: MemoryLayerProps) {
  const [selectedDate, setSelectedDate] = useState("2026-05-23");

  const monthDays = useMemo(() => buildMonthDays(2026, 4), []);
  const entriesByDate = useMemo(() => groupEntriesByDate(entries), [entries]);
  const selectedEntries = entriesByDate.get(selectedDate) ?? [];

  if (!open) return null;

  return (
    <section className="memory-layer" aria-label="LifeOS 记忆层">
      <div className="memory-topbar">
        <div>
          <p>统一记忆数据库</p>
          <h2>2026 年 5 月</h2>
        </div>
        <button className="memory-close" type="button" aria-label="关闭记忆层" onClick={onClose}>
          <X size={20} strokeWidth={2.6} />
        </button>
      </div>

      <div className="memory-calendar" aria-label="记忆日历">
        {["日", "一", "二", "三", "四", "五", "六"].map((day) => (
          <span className="weekday" key={day}>
            {day}
          </span>
        ))}
        {monthDays.map((date) => {
          const dayEntries = entriesByDate.get(date.iso) ?? [];
          return (
            <button className={`memory-day ${selectedDate === date.iso ? "memory-day--selected" : ""}`} key={date.iso} type="button" onClick={() => setSelectedDate(date.iso)}>
              <span>{date.day}</span>
              {dayEntries.length ? <i>{dayEntries.length}</i> : null}
            </button>
          );
        })}
      </div>

      <div className="memory-section">
        <div className="memory-section-title">
          <h3>{formatDateLabel(selectedDate)}</h3>
          <span>{selectedEntries.length} 条记忆</span>
        </div>
        <div className="memory-entry-list">
          {selectedEntries.length ? (
            selectedEntries.map((entry) => <MemoryEntryCard entry={entry} key={entry.id} />)
          ) : (
            <div className="empty-memory">这一天还没有同步内容。</div>
          )}
        </div>
      </div>

      <div className="memory-source-strip" aria-label="数据源">
        {knowledgeSources.map((source) => {
          const Icon = source.icon;
          const state = permissionStates.find((item) => item.id === source.id);
          const status = state?.status ?? "idle";
          return (
            <button className={`memory-source memory-source--${status}`} key={source.id} type="button" onClick={() => onAuthorize(source.id)}>
              <Icon size={17} strokeWidth={2.4} />
              <span>{source.label}</span>
              <small>{statusText[status]}</small>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function MemoryEntryCard({ entry }: { entry: MemoryEntry }) {
  const Icon = entryIconMap[entry.type];
  return (
    <article className="memory-entry-card">
      <span className={`memory-entry-icon memory-entry-icon--${entry.type}`}>
        <Icon size={18} strokeWidth={2.5} />
      </span>
      <div>
        <div className="memory-entry-heading">
          <h4>{entry.title}</h4>
          <span>{entryLabelMap[entry.type]}</span>
        </div>
        <p>{entry.summary}</p>
      </div>
    </article>
  );
}

function buildMonthDays(year: number, monthIndex: number) {
  const firstDay = new Date(year, monthIndex, 1);
  const start = new Date(year, monthIndex, 1 - firstDay.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const iso = toLocalIso(date);
    return {
      iso,
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === monthIndex
    };
  }).filter((day) => day.isCurrentMonth || day.iso >= "2026-04-26");
}

function groupEntriesByDate(entries: MemoryEntry[]) {
  return entries.reduce((map, entry) => {
    const dayEntries = map.get(entry.date) ?? [];
    dayEntries.push(entry);
    map.set(entry.date, dayEntries);
    return map;
  }, new Map<string, MemoryEntry[]>());
}

function formatDateLabel(date: string) {
  const [, month, day] = date.split("-");
  return `${Number(month)} 月 ${Number(day)} 日`;
}

function toLocalIso(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}
