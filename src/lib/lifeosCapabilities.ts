import { CalendarDays, FolderOpen, Images, PanelsTopLeft, type LucideIcon } from "lucide-react";
import type { KnowledgePermissionState, KnowledgeSourceId } from "../types";

export const knowledgeSources = [
  {
    id: "photos",
    label: "图库",
    description: "读取用户选择的照片，用于按语义查找图片。",
    icon: Images
  },
  {
    id: "folder",
    label: "文件夹",
    description: "读取用户授权的文件夹，用于翻阅和整理文件。",
    icon: FolderOpen
  },
  {
    id: "calendar",
    label: "日程",
    description: "接入日历或导入日程文件，用于回答今天要做什么。",
    icon: CalendarDays
  },
  {
    id: "projects",
    label: "项目",
    description: "读取项目目录，用于继续工作、查看进度和打开资料。",
    icon: PanelsTopLeft
  }
] satisfies Array<{
  id: KnowledgeSourceId;
  label: string;
  description: string;
  icon: LucideIcon;
}>;

export const initialKnowledgeStates: KnowledgePermissionState[] = knowledgeSources.map((source) => ({
  id: source.id,
  status: "idle"
}));
