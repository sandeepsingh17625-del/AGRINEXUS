# AGRINEXUS — E-Mandi Mitra
**Direct Markets. Smarter Decisions. Better Returns.**

Smart India Hackathon 2026 prototype. This environment did not reliably allow npm dependency installation, so the runnable prototype uses a dependency-free browser frontend + Node.js service layer. The service boundaries and mock data are deliberately structured so React/TypeScript, PostgreSQL and real APIs can replace individual layers later without rewriting the product story.

## Run
```bash
npm install
npm run dev
```
Open `http://localhost:4173`.

## Build
```bash
npm run build
```

## Demo
Click **START DEMO** and progress through the 10-step connected journey: list 1,500 kg tomatoes → AI price ₹27/kg → 96% match → order → route optimization → transit → delivery → simulated settlement ₹11,600 → impact → AI feedback.

## Demo roles
Demo Farmer, Demo FPO, Demo Buyer, Demo Consumer, Demo Logistics, Demo Admin. No passwords.

## Architecture
Browser UI → service functions → mock REST boundary → future controllers/services → repositories → PostgreSQL.
AI boundary: `AIService` conceptually exposes price recommendation, demand forecast, smart match, route optimization and explanation. Current calculations are deterministic prototype simulations.

## Production migration
- Replace browser state/service store with REST/JSON API.
- Implement PostgreSQL repositories and migrations for users, farmers, FPOs, buyers, inventory, requirements, orders, shipments, payments, forecasts, notifications and transactions.
- Add real auth/RBAC, payment provider, market data, maps/GPS, notifications and ML services.
- Set environment variables from `.env.example`; never expose secrets in client code.
- Deploy static frontend to Vercel/Netlify and Node API to Render/Railway, or use one suitable cloud host.

## Prototype limitations
No real payments, live market feeds, GPS, ML model or authentication. All numbers tagged DEMO/PROTOTYPE/ILLUSTRATIVE.
