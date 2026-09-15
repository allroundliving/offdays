"use client";

import { useState } from "react";
import type { DirectoryCategory, TrustStatus, Venue } from "@/lib/directory";
import { categoryLabel, TRUST_STATUS_LABEL } from "@/lib/directory";

const TRUST_TONE: Record<TrustStatus, string> = {
  vetted: "bg-ink text-paper",
  checking: "bg-accent-soft text-ink",
  flagged: "border border-ink/15 bg-ink/5 text-muted",
};

const CATEGORY_ACCENT: Record<DirectoryCategory, string> = {
  food: "food",
  wellness: "wellness",
  essential: "essential",
};

const ACTION_LABEL: Record<DirectoryCategory, string> = {
  food: "Reserve Table",
  wellness: "Book Guide / Slot",
  essential: "Book Guide / Slot",
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

function mapsUrl(name: string, neighborhood: string): string {
  const query = encodeURIComponent(`${name}, ${neighborhood}, Abuja, Nigeria`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function RequestAction({ label, storageKey }: { label: string; storageKey: string }) {
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
      {requested ? "Requested ✓" : label}
    </button>
  );
}

function DeskAction({ venue }: { venue: Venue }) {
  if (venue.phone) {
    const digits = venue.phone.replace(/\D/g, "");
    const wa = `https://wa.me/${digits}`;
    const tel = `tel:${venue.phone}`;
    return (
      <div className="flex items-center gap-2">
        <a
          href={tel}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-ink/20 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink/50"
        >
          Call desk
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-accent/50 px-4 py-2 text-sm font-medium text-accent transition-colors hover:border-accent"
        >
          WhatsApp desk
        </a>
      </div>
    );
  }
  return (
    <RequestAction
      label="Call / WhatsApp Desk"
      storageKey={`offdays:desk:${venue.id}`}
    />
  );
}

function PhotoPlate({ venue }: { venue: Venue }) {
  const accent = CATEGORY_ACCENT[venue.category];
  return (
    <svg
      viewBox="0 0 320 120"
      role="img"
      aria-label={`${venue.name}, ${venue.neighborhood}`}
      className="h-28 w-full rounded-xl border border-ink/10"
    >
      <defs>
        <linearGradient id={`card-${venue.id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={`var(--${accent})`} stopOpacity="0.5" />
          <stop offset="1" stopColor={`var(--${accent})`} stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <rect width="320" height="120" fill={`url(#card-${venue.id})`} />
      <circle cx="284" cy="24" r="20" className="fill-paper/25" aria-hidden="true" />
      <text
        x="18"
        y="94"
        fontSize="64"
        fontFamily="Georgia, serif"
        fontWeight="bold"
        className="fill-paper/80"
        aria-hidden="true"
      >
        {venue.name.charAt(0)}
      </text>
      <text x="92" y="58" fontSize="19" fontWeight="bold" fontFamily="Georgia, serif" fill="currentColor">
        {venue.name}
      </text>
      <text x="92" y="80" fontSize="12" className="fill-muted">
        {venue.neighborhood} · {categoryLabel(venue.category)}
      </text>
    </svg>
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

      <PhotoPlate venue={venue} />

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold leading-tight text-ink">{venue.name}</h3>
        <p className="font-display text-[15px] italic leading-snug text-ink/75">{venue.vibe}</p>
      </div>

      <div className="flex items-center gap-3 text-sm text-ink">
        <PriceIndicator level={venue.priceLevel} />
        <span className="text-muted">{venue.priceNote}</span>
      </div>
      <p className="text-xs text-muted">{venue.openHours}</p>

      <div className="flex flex-col gap-3 border-t border-ink/10 pt-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            What makes it notable
          </p>
          <p className="mt-1 text-[15px] leading-6 text-ink/90">{venue.notable}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            The backstory
          </p>
          <p className="mt-1 text-sm leading-6 text-ink/80">{venue.history}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Getting there
          </p>
          <p className="mt-1 text-sm leading-6 text-ink/80">{venue.practical}</p>
        </div>
        <div className="rounded-xl border border-accent/30 bg-accent-soft px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            Insider note
          </p>
          <p className="mt-1 text-sm leading-6 text-ink/90">{venue.insider}</p>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-3 border-t border-ink/10 pt-4">
        <p
          className={`text-xs ${
            venue.status === "flagged" ? "font-medium text-accent" : "text-muted"
          }`}
        >
          {venue.status === "flagged"
            ? `Price check overdue · last ${shortDate(venue.lastPriceChecked)}`
            : `Prices checked ${shortDate(venue.lastPriceChecked)}`}
        </p>
        <div className="flex flex-wrap gap-2">
          {venue.bookingUrl ? (
            <a
              href={venue.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:scale-[1.01] active:scale-95"
            >
              {ACTION_LABEL[venue.category]}
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
            <RequestAction
              label={ACTION_LABEL[venue.category]}
              storageKey={`offdays:request:${venue.id}`}
            />
          )}
          <a
            href={mapsUrl(venue.name, venue.neighborhood)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-ink/20 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/50"
          >
            Open in Maps
          </a>
          <DeskAction venue={venue} />
        </div>
      </div>
    </article>
  );
}