"use client";

import { useMemo, useState } from "react";
import type { DirectoryCategory, Venue } from "@/lib/directory";
import { DIRECTORY_CATEGORIES, searchVenues } from "@/lib/directory";
import { VenueCard } from "./venue-card";

type CategoryKey = "all" | DirectoryCategory;

export function SearchableDirectory({ venues }: { venues: Venue[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryKey>("all");

  const results = useMemo(() => {
    const searched = searchVenues(query, venues);
    return category === "all" ? searched : searched.filter((v) => v.category === category);
  }, [query, category, venues]);

  return (
    <section aria-label="Searchable city directory">
      <div className="sticky top-0 z-10 -mx-6 bg-paper/90 px-6 py-4 backdrop-blur">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search food, wellness, pharmacies… try ‘yoga’ or ‘pharmacy’"
            aria-label="Search venues"
            className="w-full rounded-full border border-ink/15 bg-foreground/5 py-3 pl-11 pr-4 text-sm text-ink placeholder:text-muted focus:border-ink/40 focus:outline-none"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {DIRECTORY_CATEGORIES.map((cat) => {
            const active = cat.key === category;
            return (
              <button
                key={cat.key}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(cat.key)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/15 text-ink hover:border-ink/40"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-muted">
          {results.length} of {venues.length} venues in Abuja
        </p>
      </div>

      {results.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {results.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-ink/20 p-10 text-center">
          <p className="font-display text-2xl text-ink">Nothing matches that</p>
          <p className="mt-1 text-sm text-muted">
            Try another word, or clear the category filter. The directory is still being filled in.
          </p>
        </div>
      )}
    </section>
  );
}