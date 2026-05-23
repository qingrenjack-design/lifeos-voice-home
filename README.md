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
- Future voice API config lives in `src/lib/voiceApi.ts`.
- Current mascot is an inline SVG fallback. To use a real render, place `mascot.png` under `src/assets` and replace the fallback source in `src/components/MascotStage.tsx`.
