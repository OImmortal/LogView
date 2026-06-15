# Components Map — LogView

## Pages → Components → Origin

| Page | Route | Key Components | Branch |
|------|-------|----------------|--------|
| Dashboard | `/dashboard` | Inline metrics, chart, incidents table | TR-45 |
| Planos | `/planos` | Subscription cards, billing history | TR-38 |
| Diagnostic | `/diagnostic` | Chat panel, error log, AI reasoning | TR-40 |
| Contexto | `/contexto` | Header, ContextForm (CNPJ mask) | TR-42 |
| Usuarios | `/usuarios` | User list, invite form | TR-44 |
| Logs | `/logs` | File table, upload card | MVP |
| Log Detail | `/logs/:id` | Summary cards, entries table | MVP |

## Global Components

| Component | Path | Origin |
|-----------|------|--------|
| Navbar | `components/navbar/Navbar.tsx` | Extracted from App.js |
| NotificationBell | `components/notifications/NotificationBell.tsx` | MVP |
| NotificationCenter | `components/notifications/NotificationCenter.tsx` | MVP |
| Toast | `components/notifications/Toast.tsx` | MVP |

## UI Primitives (`components/ui/`)

| Component | Used By | Visual Reference |
|-----------|---------|------------------|
| Button | All pages | TR-45/TR-38 buttons |
| Card | Dashboard, Logs | TR-45 metric cards |
| Input | Contexto, Logs | TR-42 CNPJ field |
| Badge | Dashboard, Logs | Criticality badges |
| Table | Dashboard, Usuarios, Logs | TR-45/TR-44 tables |
| Modal | — | Reserved |

## Icon Libraries

| Library | Used By |
|---------|---------|
| @heroicons/react v2 | Navbar |
| lucide-react | Usuarios |
| Material Symbols | Dashboard, Planos |

## Services

| Service | Path | Branch |
|---------|------|--------|
| API Client | `services/api/client.ts` | MVP |
| Log Files | `services/api/logFiles.ts` | MVP |
| Notifications | `services/api/notifications.ts` | MVP |
| Error Service | `services/error.service.ts` | TR-40 |
