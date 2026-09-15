"use client";

import { useMemo, useState } from "react";
import type { Popup, Venue } from "@/lib/directory";

const BUCKETS: { key: "all" | Popup["bucket"]; label: string }[] = [
  { key: "all", label: "Everything" },
  { key: "live", label: "Live now" },
  { key: "today", label: "Today" },
  { key: "weekend", label: "This weekend" },
];

const BUCKET_PRIORITY: Record<Popup["bucket"], number> = {
  live: 0,
  today: 1,
  weekend: 2,
};

export function HappeningNow({
  popups,
  venues,
}: {
  popups: Popup[];
  venues: Venue[];
}) {
  const [bucket, setBucket] = useState<"all" | Popup["bucket"]>("all");
  const [neighborhood, setNeighborhood] = useState<string>("all");

  const venueById = useMemo(() => new Map(venues.map((v) => [v.id, v])), [venues]);
  const neighborhoods = useMemo(
    () => [...new Set(popups.map((p) => p.neighborhood))].sort(),
    [popups],
  );

  const filtered = useMemo(() => {
    const shown = popups.filter(
      (p) =>
        (bucket === "all" || p.bucket === bucket) &&
        (neighborhood === "all" || p.neighborhood === neighborhood),
    );
    return [...shown].sort(
      (a, b) =>
        BUCKET_PRIORITY[a.bucket] - BUCKET_PRIORITY[b.bucket] ||
        a.neighborhood.localeCompare(b.neighborhood),
    );
  }, [popups, bucket, neighborhood]);

  const grouped = useMemo(() => {
    const groups = new Map<string, Popup[]>();
    for (const p of filtered) {
      const list = groups.get(p.neighborhood) ?? [];
      list.push(p);
      groups.set(p.neighborhood, list);
    }
    return [...groups.entries()];
  }, [filtered]);

  return (
    <section aria-label="Happening now" className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {BUCKETS.map((b) => {
          const active = b.key === bucket;
          return (
            <button
              key={b.key}
              type="button"
              aria-pressed={active}
              onClick={() => setBucket(b.key)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/15 text-ink hover:border-ink/40"
              }`}
            >
              {b.label}
            </button>
          );
        })}
        <span className="hidden w-px bg-ink/15 sm:block" aria-hidden="true" />
        {["all", ...neighborhoods].map((n) => {
          const active = n === neighborhood;
          return (
            <button
              key={n}
              type="button"
              aria-pressed={active}
              onClick={() => setNeighborhood(n)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                active
                  ? "border-accent bg-accent-soft text-ink"
                  : "border-ink/15 text-muted hover:border-ink/40"
              }`}
            >
              {n === "all" ? "All neighborhoods" : n}
            </button>
          );
        })}
      </div>

      {grouped.length === 0 ? (
        <p className="text-sm text-muted">
          Nothing time-boxed in this view right now — the feed fills back up over the weekend.
        </p>
      ) : (
        <ul className="flex flex-col gap-6">
          {grouped.map(([hood, rows]) => (
            <li key={hood}>
              <h3 className="mb-3 flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  {hood}
                </span>
                <span className="h-px flex-1 bg-ink/10" aria-hidden="true" />
              </h3>
              <ol className="flex flex-col gap-3">
                {rows.map((p) => {
                  const venue = venueById.get(p.venueId);
                  return (
                    <li
                      key={p.id}
                      className="flex flex-col gap-2 rounded-xl border border-ink/10 bg-foreground/5 px-4 py-3 sm:flex-row sm:items-center sm:gap-5"
                    >
                      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                        {p.bucket === "live" && (
                          <span
                            className="relative flex h-2 w-2"
                            aria-hidden="true"
                          >
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                          </span>
                        )}
                        {p.timeLabel}
                      </p>
                      <div className="flex-1">
                        <p className="text-[15px] font-medium leading-snug text-ink">{p.title}</p>
                        <p className="mt-0.5 text-xs text-muted">
                          {venue ? venue.name : "Venue"} · {p.note}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}