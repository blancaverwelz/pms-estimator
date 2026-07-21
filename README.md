# Rapide — Automotive PMS Cost Estimator

Live preventive-maintenance cost estimator for UnReal Auto Center. A 4-step wizard
walks a customer from vehicle type to a final itemized quote and booking confirmation.

**Stack:** React 19 + Vite, Tailwind v4, Framer Motion, vanilla Three.js (hero only).
Dark theme — slate-950 background, emerald-400 accent.

## Flow

1. **Vehicle** — select vehicle category
2. **Mileage** — select service interval
3. **Review / Estimate** — itemized checklist + calculated invoice total
4. **Booking Confirmation** — quote ID, summary, copy-to-clipboard

All logic lives in `src/App.jsx` (single-file, ~550 lines). Pricing data (`DB`),
`LABOR_RATES`, `SHOP_FEE`, and the `fmt` / `quoteId` helpers are the source of truth
for the estimate math — treat these as protected when making styling/motion changes.

## Features

- Animated step progress indicator
- Micro-interactions (hover/tap) on all interactive elements via Framer Motion
- "Calculating…" reveal sequence before the invoice total appears (Step 3)
- Staggered entrance for checklist line items
- SVG draw-in checkmark animation for "Replace" items
- Animated count-up for the total estimate
- Isolated hero section: a rotating low-poly wireframe car built from Three.js
  primitives, code-split via `React.lazy`/`Suspense` (`src/Hero3D.jsx`) so it never
  blocks or delays the wizard. Respects `prefers-reduced-motion`.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build     # production build → dist/
npm run lint      # oxlint
npm run preview   # preview production build
```

## Deployment

Hosted on Vercel, auto-deploys on push to `main`.

## Notes

- No TypeScript — plain JavaScript throughout.
- No backend — fully client-side, static hosting.
- Three.js hero model is procedurally built (box + cylinder primitives), not an
  imported/sourced asset — kept dependency-free and avoids the Blender pipeline
  entirely for this decorative element.
