import type { MemoryEntry } from "../types";

export const mockMemoryEntries: MemoryEntry[] = [
  {
    id: "photo-0523-hero",
    date: "2026-05-23",
    type: "photo",
    title: "EAZO 海星首页主视觉",
    summary: "用于 LifeOS Voice Home 的橙色海星吉祥物和通话式首页效果图。",
    source: "photos"
  },
  {
    id: "work-0523-mvp",
    date: "2026-05-23",
    type: "work",
    title: "LifeOS 语音首页 MVP",
    summary: "重构首页逻辑：语音为入口，记忆层为统一数据源，准备接 OpenAI Realtime API。",
    source: "projects"
  },
  {
    id: "chat-0523-eazo",
    date: "2026-05-23",
    type: "chat",
    title: "Eazo Creator 导入讨论",
    summary: "确定先在 GitHub 做好，再导入 Eazo，一键部署成手机 App。",
    source: "folder"
  },
  {
    id: "file-0522-doc",
    date: "2026-05-22",
    type: "file",
    title: "EAZO LifeOS 开发文档 v1.0",
    summary: "包含产品定位、UI 规范、组件拆解、Mock 数据和演示话术。",
    source: "folder"
  },
  {
    id: "calendar-0521-plan",
    date: "2026-05-21",
    type: "calendar",
    title: "黑客松作品推进",
    summary: "准备 60 秒演示、完善首页交互、整理 Remainal 项目入口。",
    source: "calendar"
  },
  {
    id: "work-0519-research",
    date: "2026-05-19",
    type: "work",
    title: "个人 LifeOS 信息架构",
    summary: "把照片、文件、日程、聊天和项目合并为按时间组织的记忆层。",
    source: "projects"
  }
];
