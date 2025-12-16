
# Viralgo Data Visualization

Viralgo tracks how game popularity shifts across platforms and social channels. All raw CSV datasets (Steam peaks, Twitch/YouTube stats, genre mappings, etc.) live on our cPanel backend and are exposed through lightweight PHP endpoints. The React/Vite front end—deployed via Vercel—pulls those datasets, renders the dashboards, and links to the repos/script references. This repo contains the latest multi-page UI (Home, Insights, Sources, Games) and uses the same asset bundle as the original Figma design.

## Workflow Overview

1. **Data ingestion**: Backend scripts scrape APIs (Steam, Twitch, YouTube, SensorTower) and store CSVs on cPanel.
2. **API layer**: PHP pages on cPanel serve CSV data (or aggregated JSON) to the front end via HTTPS.
3. **Front end (this repo)**: React + Vite app fetches that data, renders dashboards, and drives navigation.
4. **Deployment**: Vercel builds the Vite app (`npm run build`, output to `dist/`) and hosts it on `viralgo.space`.

## Development

```bash
npm install          # restore dependencies
npm run dev          # start Vite dev server
npm run build        # optional: production build
```

For local builds on Windows without global PATH entries, run:

```
"C:\Program Files\nodejs\npm.cmd" install
"C:\Program Files\nodejs\npm.cmd" run dev
```

## Deployment Notes

- `vercel.json` expects the build output in `dist/` (Vite’s `outDir` matches).
- Promote the latest successful Vercel deployment to Production to update `viralgo.space`.
- Backend CSVs/scripts live outside this repo; keep those credentials/configs on cPanel.
  
