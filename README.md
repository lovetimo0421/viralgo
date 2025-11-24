# Viralgo Frontend (React + Vite)

This repo now hosts only the client interface for the Viralgo dashboards. The PHP API layer lives on a separate server, so this project focuses on rendering CSV-driven insights and calling those PHP endpoints when needed.

## Stack Overview
- [Vite](https://vitejs.dev/) + React 19 + TypeScript.
- Tailwind or other styling libs can be layered on top of `src` as you bring back the design assets.
- External PHP backend handles data ingestion, CSV parsing, and Twitch/Steam API mirroring.

## Getting Started
```bash
npm install        # already run once, repeat after pulling updates
npm run dev        # start Vite dev server on http://localhost:5173
npm run build      # optional production build output into dist/
```

Vite expects Node.js 20.19+ (or current LTS). Install Node globally so you no longer need the portable runtime that was used during setup.

## Folder Structure
```
.
index.html          # Vite entry template
package.json        # npm scripts and deps
src/                # drop the React/Vite layout you exported earlier
assets/         # optional local images/fonts
main.tsx        # Vite entry point (currently boilerplate)
public/             # static assets served as-is (favicons, etc.)
```

Feel free to overwrite the `src` directory with your existing Viralgo UI once you're ready.

## Connecting To PHP Backend
- Configure environment variables (e.g., `VITE_API_BASE_URL`) using a `.env` file for dev endpoints.
- Call PHP routes via `fetch`/`axios` from React components; the PHP server can serve CSV-derived JSON or proxy live Twitch/Steam metrics.
- Because the backend sits elsewhere, deploy this Vite bundle as static files (Netlify, Vercel, S3, etc.) and point it at the PHP domain.

## Next Steps
1. Copy your previous `src` bundle into this repo to restore the UI.
2. Define `.env.development` / `.env.production` variables for the PHP API base URL.
3. Hook up CSV charts and API calls to the PHP services.
