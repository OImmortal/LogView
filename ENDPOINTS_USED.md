# Endpoints Used — LogView Frontend

Base URL: `REACT_APP_API_URL` (default: `http://localhost:8080`)

## Log Files

### POST /api/log-files/upload

Upload a `.log` file.

**Request:** `multipart/form-data` with field `file`

**Response:**
```json
{
  "id": "uuid",
  "fileName": "app.log",
  "uploadedAt": "2026-06-12T10:00:00Z",
  "status": "UPLOADED"
}
```

### POST /api/log-files/{id}/process

Start log scan/processing.

**Response:**
```json
{
  "id": "uuid",
  "status": "PROCESSING"
}
```

### GET /api/log-files

List all uploaded log files.

**Response:**
```json
[
  {
    "id": "uuid",
    "fileName": "app.log",
    "uploadedAt": "2026-06-12T10:00:00Z",
    "status": "PROCESSED"
  }
]
```

### GET /api/log-files/{id}

Get file details and scan results.

**Response:**
```json
{
  "id": "uuid",
  "fileName": "app.log",
  "status": "PROCESSED",
  "summary": {
    "critical": 5,
    "warning": 10,
    "info": 35
  },
  "entries": [
    {
      "line": 42,
      "severity": "CRITICAL",
      "message": "Connection timeout"
    }
  ]
}
```

## Notifications

### GET /api/notifications

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Arquivo processado com sucesso",
    "message": "5 erros críticos encontrados. 10 alertas encontrados.",
    "read": false,
    "createdAt": "2026-06-12T10:05:00Z"
  }
]
```

**Polling:** every 15 seconds via React Query `refetchInterval: 15000`

## Legacy (TR-40)

### GET /api/errors
### GET /api/errors/{id}
### POST /api/error/{id}/close
### POST /api/error/{id}/archive

Used by Diagnostic Report page.

## Future Transports (prepared, not implemented)

- **SSE:** `EventSource` on `/api/notifications/stream`
- **WebSocket:** STOMP over SockJS on `/ws`
