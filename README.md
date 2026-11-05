# UnReal Auto Center — Service Estimator

Customer-facing preventive-maintenance estimator. A customer picks a vehicle category and
service interval, reviews an itemized peso estimate, then enters a short booking request.

**Stack:** React 19, Vite, Tailwind v4, Framer Motion, Lucide. Plain JavaScript, static hosting (Vercel).

## Flow

1. **Vehicle** — Sedan / Hatchback or SUV / Pickup Truck
2. **Mileage** — 10,000 / 20,000 / 40,000 / 60,000 KM
3. **Estimate** — itemized parts, inspections, labor and shop fee; total shown immediately
4. **Booking** — name, mobile number, preferred date (validated inline)
5. **Thank you** — selection, requested date and total; restart clears everything

## Booking is frontend-only

The booking form never transmits, logs or stores anything. Submitting only advances local
state; reloading clears it. There is no backend, no appointment confirmation and no callback.
Real delivery and scheduling are deferred (roadmap F1).

## Structure

- `src/data/serviceCatalog.js` — pricing catalog, labor rates, shop fee, vehicle metadata (source of truth)
- `src/lib/estimate.js` — pure estimate/grouping/peso formatting helpers
- `src/lib/bookingValidation.js` — pure draft validation and local-date handling
- `src/features/estimator/` — `Estimator` (workflow + draft state) and one file per step
- `src/components/` — hero, progress, selection bar, estimate summary, responsive artwork
- `src/assets/vehicles/`, `src/assets/environment/` — optimized WebP imagery (desktop + mobile)
- `src/index.css` — theme tokens and shared styling
- `tests/` — Node test runner checks for estimates and booking validation

## Development

```bash
npm ci
npm run dev
npm run lint
npm test        # estimate + booking validation tests
npm run build   # production build → dist/
```
