# LifeOS Agent Architecture

EAZO LifeOS keeps API keys out of the frontend.

```txt
Voice Home UI
  -> Memory Layer UI
  -> permission adapters / Eazo native bridges
  -> /api/lifeos/permissions
  -> unified memory database
  -> /api/memory/month and /api/memory/query
  -> realtime voice agent
```

## Frontend Permissions

- `photos`: user-selected images through File System Access API or file input fallback.
- `folder`: user-authorized folder through `showDirectoryPicker` or directory input fallback.
- `calendar`: `.ics` / `.csv` import now; later Eazo native calendar bridge or OAuth backend.
- `projects`: project folder authorization through the same folder adapter.

Implementation:

- `src/lib/permissions.ts`
- `src/lib/lifeosCapabilities.ts`
- `src/lib/knowledgeBase.ts`

## Memory Layer

The top-right calendar button opens the memory layer. It is the same data source used by voice.

Required backend endpoints:

```txt
GET /api/memory/month?month=2026-05
POST /api/memory/query
POST /api/memory/ingest
```

Memory rows should include:

```json
{
  "id": "mem_xxx",
  "date": "2026-05-23",
  "type": "photo | work | chat | file | calendar",
  "title": "EAZO 海星首页主视觉",
  "summary": "用于 LifeOS Voice Home 的主视觉图片",
  "source": "photos | folder | calendar | projects"
}
```

## Realtime Voice Agent

The mic button calls `startRealtimeAgent()` in `src/lib/realtimeAgent.ts`.

Default provider is `mock`. To connect a real agent, change `realtimeAgentConfig.provider` to `openai_realtime` and implement:

```txt
POST /api/realtime/call
```

The frontend sends the WebRTC offer SDP to this endpoint. The backend calls OpenAI Realtime with the server-side API key and returns the answer SDP. No OpenAI API key is stored in the app.

## Knowledge Query

Voice agent should call the same memory database:

```txt
POST /api/memory/query
```

Payload:

```json
{
  "prompt": "帮我找一下之前那张图片",
  "date": "2026-05-23",
  "types": ["photo", "work", "chat", "file", "calendar"]
}
```

Response shape matches `AIResult` in `src/types.ts`.
