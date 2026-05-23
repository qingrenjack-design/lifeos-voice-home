# LifeOS Agent Architecture

EAZO LifeOS keeps API keys out of the frontend.

```txt
Voice Home UI
  -> permission adapters
  -> local/native file handles or Eazo bridges
  -> /api/lifeos/permissions
  -> knowledge index service
  -> /api/lifeos/query
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

## Realtime Voice Agent

The mic button calls `startRealtimeAgent()` in `src/lib/realtimeAgent.ts`.

Default provider is `mock`. To connect a real agent, change `realtimeAgentConfig.provider` to `openai_realtime` and implement:

```txt
POST /api/realtime/session
```

The backend returns an ephemeral realtime session:

```json
{
  "id": "sess_xxx",
  "model": "gpt-realtime",
  "client_secret": {
    "value": "ephemeral_client_secret"
  }
}
```

The frontend then opens a WebRTC session with microphone audio. No permanent API key is stored in the app.

## Knowledge Query

Voice agent should call:

```txt
POST /api/lifeos/query
```

Payload:

```json
{
  "prompt": "帮我找一下之前那张图片",
  "sources": ["photos", "folder", "calendar", "projects"]
}
```

Response shape matches `AIResult` in `src/types.ts`.
