import type { AIResult, QuickAction } from "../types";

export const quickActions: QuickAction[] = [
  {
    id: "find-image",
    label: "帮我找一下之前的哪张图片",
    icon: "image",
    prompt: "帮我找一下之前的哪张图片"
  },
  {
    id: "work-progress",
    label: "我的工作进度如何",
    icon: "chart",
    prompt: "我的工作进度如何"
  }
];

export const mockResponses: Record<string, AIResult> = {
  "work-progress": {
    title: "今日进度总结",
    summary: "你当前正在推进 EAZO LifeOS 黑客松作品，整体完成度约 65%。",
    sections: [
      {
        title: "已完成",
        items: [
          "明确产品方向：通话式 LifeOS 首页",
          "确认主视觉：橙色海星 AI 伙伴",
          "完成首页视觉草图"
        ]
      },
      {
        title: "下一步",
        items: [
          "做出可点击 Demo",
          "补充 Capture / Projects 页面",
          "准备 60 秒演示话术"
        ]
      }
    ]
  },
  "find-image": {
    title: "找到可能相关的图片",
    summary: "我找到了 3 张可能相关的图片，你可以继续说：打开第一张。",
    sections: [
      {
        title: "候选图片",
        items: [
          "EAZO 黑客松主视觉海报",
          "上海赛区特别奖规则图",
          "LifeOS 首页设计稿"
        ]
      }
    ]
  }
};
