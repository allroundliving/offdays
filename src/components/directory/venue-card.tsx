"use client";

import { useState } from "react";
import type { TrustStatus, Venue } from "@/lib/directory";
import { TRUST_STATUS_LABEL, categoryLabel } from "@/lib/directory";

const TRUST_TONE: Record<TrustStatus, string> = {
  vetted: "bg-ink text-paper",
  checking: "bg-accent-soft text-ink",
  flagged: "border border-ink/15 bg-ink/5 text-muted",
};

function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function PriceIndicator({ level }: { level: number }) {
  return (
    <span className="flex items-center gap-1" aria-label={`₦ price level ${level} of 4`}>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${i < level ? "bg-ink" : "bg-ink/15"}`}
        />
      ))}
    </span>
  );
}

function RequestAction({ venue }: { venue: Venue }) {
  const storageKey = `offdays:request:${venue.id}`;
  const [requested, setRequested] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem(storageKey) === "1";
    } catch {
      return false;
    }
  });

  const toggle = () => {
    const next = !requested;
    try {
      localStorage.setItem(storageKey, next ? "1" : "0");
    } catch {
      /* ignore storage errors */
    }
    setRequested(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      suppressHydrationWarning
      className={`inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
        requested
          ? "border border-ink/30 text-muted"
          : "bg-accent text-paper hover:scale-[1.01] active:scale-95"
      }`}
    >
      {requested ? "Requested ✓" : "Request visit"}
    </button>
  );
}

export function VenueCard({ venue }: { venue: Venue }) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-ink/10 bg-foreground/5 p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          {venue.neighborhood} · {categoryLabel(venue.category)}
        </p>
        <p
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${TRUST_TONE[venue.status]}`}
        >
          <span className="font-display text-sm font-bold">{venue.trustScore}</span>
          trust · {TRUST_STATUS_LABEL[venue.status]}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold leading-tight text-ink">{venue.name}</h3>
        <p className="font-display text-[15px] italic leading-snug text-ink/75">{venue.vibe}</p>
      </div>

      <div className="flex items-center gap-3 text-sm text-ink">
        <PriceIndicator level={venue.priceLevel} />
        <span className="text-muted">{venue.priceNote}</span>
      </div>
      <p className="text-xs text-muted">{venue.openHours}</p>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink/10 pt-4">
        <p
          className={`text-xs ${
            venue.status === "flagged" ? "font-medium text-accent" : "text-muted"
          }`}
        >
          {venue.status === "flagged"
            ? `Price check overdue · last ${shortDate(venue.lastPriceChecked)}`
            : `Prices checked ${shortDate(venue.lastPriceChecked)}`}
        </p>
        {venue.bookingUrl ? (
          <a
            href={venue.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:scale-[1.01] active:scale-95"
          >
            Book
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M7 17 17 7M9 7h8v8"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        ) : (
          <RequestAction venue={venue} />
        )}
      </div>
    </article>
  );
}