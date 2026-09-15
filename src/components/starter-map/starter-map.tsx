"use client";

import { useMemo, useState } from "react";
import type { Venue } from "@/lib/directory";
import { categoryLabel } from "@/lib/directory";
import type { PersonaId } from "@/lib/onboarding";
import type { MapPin, MapZone } from "@/lib/starter-map";
import { starterSort } from "@/lib/starter-map";
import { VenueCard } from "@/components/directory/venue-card";

const CATEGORY_FILL: Record<Venue["category"], string> = {
  food: "fill-food",
  wellness: "fill-wellness",
  essential: "fill-essential",
};

const CATEGORY_DOT: Record<Venue["category"], string> = {
  food: "bg-food",
  wellness: "bg-wellness",
  essential: "bg-essential",
};

export function StarterMap({
  zones,
  pins,
  venues,
  personaId,
  personaLabel,
  budgetLabel,
  cityLabel,
}: {
  zones: MapZone[];
  pins: MapPin[];
  venues: Venue[];
  personaId: PersonaId;
  personaLabel: string;
  budgetLabel: string;
  cityLabel: string;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const venueById = useMemo(() => new Map(venues.map((v) => [v.id, v])), [venues]);
  const countByCategory = useMemo(() => {
    const counts: Record<Venue["category"], number> = { food: 0, wellness: 0, essential: 0 };
    for (const v of venues) counts[v.category] += 1;
    return counts;
  }, [venues]);
  const sorted = useMemo(() => starterSort(venues, personaId), [venues, personaId]);
  const selected = selectedId ? venueById.get(selectedId) : undefined;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <p className="text-sm text-muted">
          <span className="font-semibold text-ink">{venues.length}</span> pins on your{" "}
          {budgetLabel} budget · {personaLabel} ordering · {cityLabel}
        </p>
        <p className="text-xs italic text-muted">Schematic, not to scale.</p>
      </div>

      <svg
        viewBox="0 0 100 60"
        role="group"
        aria-label={`Schematic map of ${cityLabel} neighborhoods`}
        className="w-full rounded-2xl border border-ink/15 bg-foreground/5"
      >
        {zones.map((zone) => {
          const count = pins.filter((p) => p.zoneId === zone.id).length;
          return (
            <g key={zone.id} opacity={count === 0 ? 0.45 : 1}>
              <rect
                x={zone.x}
                y={zone.y}
                width={zone.w}
                height={zone.h}
                rx="2"
                className="fill-ink/5 stroke-ink/15"
                strokeWidth="0.6"
              />
              <text
                x={zone.x + 3}
                y={zone.y + zone.h - 3.5}
                className="fill-muted text-[3.4px] font-semibold uppercase"
                style={{ letterSpacing: "0.18em" }}
              >
                {zone.name} {count > 0 ? `· ${count}` : ""}
              </text>
            </g>
          );
        })}

        {pins.map((pin) => {
          const venue = venueById.get(pin.venueId);
          if (!venue) return null;
          const isSelected = selectedId === pin.venueId;
          return (
            <g
              key={pin.venueId}
              role="button"
              tabIndex={0}
              aria-label={`${venue.name}, ${categoryLabel(venue.category)}, ${venue.neighborhood}`}
              onClick={() => setSelectedId(pin.venueId)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedId(pin.venueId);
                }
              }}
              className="cursor-pointer"
            >
              <title>{`${venue.name} · trust ${venue.trustScore}`}</title>
              {isSelected && (
                <circle
                  cx={pin.x}
                  cy={pin.y}
                  r="4"
                  className="stroke-accent"
                  strokeWidth="0.8"
                  fill="none"
                />
              )}
              <circle
                cx={pin.x}
                cy={pin.y}
                r={isSelected ? 2.6 : 2.2}
                className={CATEGORY_FILL[venue.category]}
                stroke="paper"
                strokeWidth="0.5"
              />
            </g>
          );
        })}
      </svg>

      <div className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Map legend">
        {(["food", "wellness", "essential"] as const).map((cat) => (
          <p key={cat} className="flex items-center gap-2 text-xs text-muted">
            <span className={`h-2.5 w-2.5 rounded-full ${CATEGORY_DOT[cat]}`} />
            {categoryLabel(cat)} <span className="font-medium text-ink">{countByCategory[cat]}</span>
          </p>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <ol aria-label="Starter list" className="flex flex-col gap-2">
          {sorted.map((venue, i) => {
            const isSelected = selectedId === venue.id;
            return (
              <li key={venue.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(venue.id)}
                  className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                    isSelected
                      ? "border-ink bg-ink text-paper"
                      : "border-ink/10 bg-foreground/5 hover:border-ink/40"
                  }`}
                >
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                    {isSelected ? (
                      <span className="text-paper">{String(i + 1).padStart(2, "0")}</span>
                    ) : (
                      <span className="text-muted">{String(i + 1).padStart(2, "0")}</span>
                    )}
                    <span className={isSelected ? "text-paper" : "text-ink"}>
                      {venue.name}
                    </span>
                    {venue.status === "flagged" && (
                      <span
                        className={`ml-auto text-[10px] font-semibold uppercase tracking-wider ${
                          isSelected ? "text-paper/70" : "text-accent"
                        }`}
                      >
                        Flagged
                      </span>
                    )}
                  </p>
                  <p
                    className={`mt-0.5 pl-7 text-xs ${
                      isSelected ? "text-paper/70" : "text-muted"
                    }`}
                  >
                    {venue.neighborhood} · {categoryLabel(venue.category)} · {venue.priceNote}
                  </p>
                </button>
              </li>
            );
          })}
        </ol>

        <div>
          {selected ? (
            <VenueCard venue={selected} />
          ) : (
            <div className="flex h-full min-h-40 flex-col items-start justify-center gap-2 rounded-2xl border border-dashed border-ink/20 p-6">
              <p className="font-display text-2xl text-ink">Tap a pin on the map</p>
              <p className="text-sm leading-6 text-muted">
                Or pick from the starter list — the venue card shows vibe, trust score,
                and what to do next.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}