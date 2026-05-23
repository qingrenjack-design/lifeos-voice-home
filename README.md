# EAZO LifeOS Voice Home

通话式 AI 生活操作系统首页 MVP。

## Run

```bash
npm install
npm run dev
```

Open:

```txt
http://127.0.0.1:5173
```

## Build

```bash
npm run build
```

## Notes

- Voice flow is mocked: `idle -> listening -> thinking -> speaking -> done`.
- Quick actions and AI result data live in `src/data/mockResponses.ts`.
- Realtime voice agent entry lives in `src/lib/realtimeAgent.ts`.
- Knowledge/permission adapters live in `src/lib/permissions.ts` and `src/lib/knowledgeBase.ts`.
- Current mascot asset lives at `src/assets/mascot.png`. Replace it with a true transparent PNG when available.
- Architecture notes live in `docs/lifeos-agent-architecture.md`.
