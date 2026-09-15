# OffDays

A standalone lifestyle discovery app: **budget-first curated weekend guides** and a **living city
directory** of real, verified spots.

## What it is

- Weekend guides that lead with real prices — cost is the headline, not the fine print.
- A living directory of real venues meant to be verified, updated, and de-duplicated over time —
  never static marketing copy.
- Deliberately independent from the WCIADH project in the parent repository: no shared code,
  pricing models, branding, or API contracts.

See `AGENTS.md` for the enforced product rules.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 (CSS-first theme in
`src/app/globals.css`).

## Commands

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run start
npm run lint
```