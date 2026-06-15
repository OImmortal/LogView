# Integration Guide — LogView Frontend

## Prerequisites

1. Base branch: `front-end` synced with `origin/front-end`
2. TR-38 already merged — do not re-merge
3. Node.js 18+ and npm installed

## Safe Merge Strategy

**Do NOT merge branches directly into each other.**

Use file copy + manual route integration:

```bash
# Example: extract file from branch without checkout
git show origin/TR-45-JoaoPedro:src/pages/DashBoard/dashboard.jsx > src/pages/dashboard/Dashboard.tsx
```

## Integration Checklist (per branch)

- [ ] Copy page files to new folder structure
- [ ] Convert `.jsx` → `.tsx` with minimal typing
- [ ] Add route in `src/routes/index.tsx`
- [ ] Add nav item in `src/components/navbar/Navbar.tsx`
- [ ] Install new dependencies
- [ ] Run `npm run build`
- [ ] Visual smoke test

## Order of Integration

1. **TR-45** — tailwind.config.js tokens + Dashboard at `/dashboard`
2. **TR-40** — Diagnostic at `/diagnostic` + services
3. **TR-42** — Fix conflict markers first; Contexto at `/contexto`
4. **TR-44** — Usuarios at `/usuarios`

## Conflict Resolution Rules

| Conflict | Resolution |
|----------|------------|
| Route `/` | Redirect to `/dashboard` |
| App.js/router | Use unified `src/routes/` — never merge App.js from branches |
| package.json | Union all deps; remove invalid `"dependencies": "^0.0.1"` |
| Heroicons | Standardize on v2 (`@heroicons/react/24/outline`) |
| tailwind.config.js | Use TR-45 tokens as base |

## Post-Integration

1. Create design tokens (`src/styles/tokens.ts`)
2. Add API layer (Axios + React Query)
3. Implement MVP routes `/logs` and `/logs/:id`
4. Enable notification polling (15s)
5. Update documentation

## Build Verification

```bash
npm install
npm run build
npm start
```

Expected: zero TypeScript errors, all routes accessible via navbar.
