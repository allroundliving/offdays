# AGENTS.md — OffDays

Guidance for AI coding agents (opencode, Codex, Claude) working in this project.

## Identity — non-negotiable

OffDays is a **standalone lifestyle discovery app**. It is NOT the WCIADH product in the parent
repository, and it is NOT the `next-app/` experiment at the repo root. It is an independent product
with no shared data, pricing models, branding, or API contracts.

The product is defined by exactly two pillars:

1. **Budget-first curated weekend guides** — every guide is opinionated, edited, and leads with
   real prices. Cost is the headline, never the fine print. Guides pick the few spots worth the
   traveler's time and money — quality over volume, never a generic listicle.
2. **A living city directory** — a mutable, growing dataset of real venues/spots (not static
   marketing copy). Directory entries exist to be verified, updated, price-checked, and
   de-duplicated over time; stale or unverified entries must be flagged or removed, not kept.

Rules that follow from this identity:

- **Never** import from, copy, or depend on the parent WCIADH app: no `src/lib/*`, `server/*`,
  Supabase schema, pricing engine, or rate cards. No "streetwise", "deep vault", or WCIADH
  branding, taglines, or pillar structure.
- Features and copy must strengthen budget-first curation and/or the living directory. Default
  rejection: generic travel filler, hidden fees, uncosted recommendations, static lists dressed as
  data, and content that treats "budget" as an afterthought.
- Route shape (`app/<city>`, `app/guides`, `app/directory`, `app/venues/[...]`) is deliberately
  open — follow App Router conventions and prefer server components.

## Commands

```bash
npm run dev     # next dev (Turbopack, http://localhost:3000)
npm run build   # next build — the main gate; run before calling a change done
npm run start   # next start (production build)
npm run lint    # eslint (next core-web-vitals + typescript configs)
```

There is no test suite yet. `build` + `lint` are the only checks.

## Stack & conventions

- Next 16 App Router, React 19, TypeScript, Tailwind CSS v4.
- Tailwind v4 is **CSS-first**: the only config is `src/app/globals.css`'s `@theme inline` block
  plus the `@tailwindcss/postcss` plugin in `postcss.config.mjs`. There is no `tailwind.config.*`.
  Theme tokens map to utilities (`bg-paper`, `text-ink`, `text-muted`, `bg-accent`,
  `bg-accent-soft`, `bg-foreground`); change the palette in that `@theme inline` block, never by
  slapping raw hex values in JSX. Tokens flip with `prefers-color-scheme`, so avoid hardcoded dark
  variants.
- Import alias `@/*` → project root; App Router root is `src/app/` (`layout.tsx`, `page.tsx`,
  `globals.css`). Export `Metadata` from layouts/pages and keep the OffDays name + budget-first
  positioning in `src/app/layout.tsx`.

## Managed block

The block below is auto-generated and re-added by `next dev`
(`node_modules/next/dist/server/lib/generate-agent-files.js`). Do not delete or edit it — doing so
only re-creates it as an uncommitted change. Note: Next is evolving fast; if an API or convention
feels off, read the docs in `node_modules/next/dist/docs/` before writing code.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->