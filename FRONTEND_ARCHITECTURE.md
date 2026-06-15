# Frontend Architecture — LogView

## Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + TypeScript |
| Routing | React Router v7 |
| Styling | Tailwind CSS 3 + design tokens |
| UI Primitives | Headless UI, custom `components/ui/` |
| HTTP | Axios |
| Server State | TanStack React Query |
| Global State | Context API (notifications) |

## Directory Structure

```
src/
├── components/
│   ├── navbar/          # Global navigation
│   ├── sidebar/         # Placeholder
│   ├── notifications/   # Bell, center, toast
│   └── ui/              # Button, Card, Input, Badge, Table, Modal
├── contexts/
│   └── NotificationContext.tsx
├── hooks/
│   └── useNotifications.ts
├── pages/
│   ├── dashboard/       # TR-45
│   ├── planos/          # TR-38
│   ├── diagnostic/      # TR-40
│   ├── contexto/        # TR-42
│   ├── usuarios/        # TR-44
│   ├── logs/            # MVP list + detail
│   ├── login/           # Placeholder
│   ├── historico/       # Placeholder
│   ├── monitoramento/   # Placeholder
│   └── configuracoes/   # Placeholder
├── routes/
│   ├── App.tsx
│   └── index.tsx
├── services/
│   ├── api/             # Axios clients
│   └── error.service.ts # TR-40 legacy
└── styles/
    └── tokens.ts
```

## Data Flow

```
Page → React Query hook → services/api → Axios → Backend REST
                ↓
         NotificationContext ← polling GET /api/notifications (15s)
                ↓
         Navbar badge + Toast + NotificationCenter
```

## Routing

All routes defined in `src/routes/index.tsx`. Root `/` redirects to `/dashboard`.

## Design Principles

1. Do not alter existing page layouts during integration
2. Extract shared UI gradually into `components/ui/`
3. Single source of truth for colors: `src/styles/tokens.ts` → `tailwind.config.js`
4. Mock layer available via `REACT_APP_USE_MOCK=true`
