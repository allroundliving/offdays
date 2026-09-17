"use client";

import { useState } from "react";
import type { VenueCategory, WeekenderPersona, WeekenderStop, BudgetTierId } from "@/lib/weekender";
import {
  formatDwell,
  formatMoney,
  getDropWeek,
  getTierPlan,
  groupStops,
  slotLabel,
  totalDwell,
  totalTransportSpend,
  totalVenueSpend,
} from "@/lib/weekender";
import { PersonaSwitcher } from "./persona-switcher";
import { TierSwitcher } from "./tier-switcher";
import { ShareButton } from "./share-button";

const CATEGORY_ACCENT: Record<VenueCategory, string> = {
  food: "food",
  drinks: "accent",
  culture: "essential",
  nightlife: "accent",
  outdoor: "wellness",
  retail: "essential",
  wellbeing: "wellness",
};

function StopPhoto({ stop, photoId }: { stop: WeekenderStop; photoId: string }) {
  const accent = CATEGORY_ACCENT[stop.category];
  return (
    <svg
      viewBox="0 0 320 150"
      role="img"
      aria-label={`${stop.venue}, ${stop.neighborhood}`}
      className="h-36 w-full rounded-xl border border-ink/10"
    >
      <defs>
        <linearGradient id={photoId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={`var(--${accent})`} stopOpacity="0.55" />
          <stop offset="1" stopColor={`var(--${accent})`} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect width="320" height="150" fill={`url(#${photoId})`} />
      <circle cx="282" cy="30" r="26" className="fill-paper/25" aria-hidden="true" />
      <circle cx="38" cy="124" r="14" className="fill-paper/20" aria-hidden="true" />
      <text
        x="22"
        y="118"
        fontSize="88"
        fontFamily="Georgia, serif"
        fontWeight="bold"
        className="fill-paper/80"
        aria-hidden="true"
      >
        {stop.venue.charAt(0)}
      </text>
      <text x="112" y="70" fontSize="22" fontWeight="bold" fontFamily="Georgia, serif" fill="currentColor">
        {stop.venue}
      </text>
      <text x="112" y="94" fontSize="13" className="fill-muted">
        {stop.neighborhood} · {stop.category}
      </text>
      <text x="112" y="118" fontSize="12" className="fill-muted">
        vetted · trust {stop.trustScore}
      </text>
    </svg>
  );
}

function ExecutiveAssistantIntro({ persona }: { persona: WeekenderPersona }) {
  let toneMsg =
    "Practical, chill, and completely ₦-honest. No fluff, just the best spots in Wuse and Maitama mapped out for maximum value and zero guesswork.";
  if (persona.slug === "couples") {
    toneMsg =
      "Warm, romantic, and unhurried. Designed for two with good lighting, intimate corners, and zero traffic headaches across Abuja.";
  } else if (persona.slug === "group") {
    toneMsg =
      "High-energy, seamless, and built for crews. Big tables, shared plates, and nightlife coordination so nobody argues over logistics.";
  }

  return (
    <div className="rounded-2xl border border-accent/30 bg-accent-soft p-5 md:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Executive Assistant Briefing · Abuja Playbook
      </p>
      <p className="mt-2 text-base leading-7 text-ink/90 font-medium">{toneMsg}</p>
    </div>
  );
}

function MoneyBand({
  persona,
  tierPlan,
}: {
  persona: WeekenderPersona;
  tierPlan: ReturnType<typeof getTierPlan>;
}) {
  const venueSpend = totalVenueSpend(tierPlan.stops);
  const transportSpend = totalTransportSpend(tierPlan.stops);
  const currency = persona.currency;
  return (
    <section className="border-y-2 border-ink bg-paper py-8" aria-label="Weekend budget">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Stated budget — {persona.hasTiers ? `${tierPlan.label} tier` : "Inherently affordable"}
          </p>
          <p className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            {formatMoney(tierPlan.budgetMin, currency)}
            <span className="mx-2 text-muted">–</span>
            {formatMoney(tierPlan.budgetMax, currency)}
          </p>
          <p className="mt-2 text-sm text-muted">
            {persona.label} lens {persona.hasTiers ? `(${tierPlan.label})` : ""} · {tierPlan.stops.length} vetted stops
          </p>
        </div>
        <p className="max-w-xs text-sm leading-6 text-muted">
          Every stop below lists its Venue Spend — the actual on-site expense — and a
          separate Bolt / inDrive transit estimate.
        </p>
      </div>
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-stretch md:gap-5">
        <div className="flex flex-1 flex-col justify-between gap-2 rounded-xl border border-ink/10 bg-foreground/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Venue Spend
          </p>
          <div>
            <p className="font-display text-3xl font-bold tracking-tight text-ink">
              {formatMoney(venueSpend, currency)}
            </p>
            <p className="mt-1 text-xs text-muted">actual on-site expense across all stops</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between gap-2 rounded-xl border border-ink/10 bg-foreground/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Transit / Bolt / inDrive
          </p>
          <div>
            <p className="font-display text-3xl font-bold tracking-tight text-ink">
              {formatMoney(transportSpend, currency)}
            </p>
            <p className="mt-1 text-xs text-muted">estimated rides between stops</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StopCard({ stop, index }: { stop: WeekenderStop; index: number }) {
  const week = getDropWeek();
  return (
    <li className="flex gap-4 md:gap-6">
      <div className="flex w-10 shrink-0 flex-col items-center">
        <span className="font-display text-2xl font-bold leading-none text-ink/70 md:text-3xl">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="mt-3 h-full w-px bg-ink/15" aria-hidden="true" />
      </div>
      <article className="mb-8 flex-1 rounded-xl border border-ink/10 bg-foreground/5 p-5 md:p-6">
        {/* In-between Narrative Prompt */}
        {stop.prepTime && (
          <div className="mb-4 rounded-lg border border-accent/20 bg-accent-soft/50 px-3.5 py-2.5 text-xs font-medium text-ink">
            <span className="font-semibold text-accent uppercase tracking-wider mr-2">In-Between Briefing:</span>
            {stop.prepTime}
          </div>
        )}

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          {stop.category} · {stop.neighborhood}
        </p>
        <h3 className="mt-1 font-display text-2xl font-bold leading-tight text-ink">
          {stop.venue}
        </h3>
        <p className="mt-1 text-sm font-semibold text-accent">{slotLabel(stop, week)}</p>

        <div className="mt-4">
          <StopPhoto stop={stop} photoId={`photo-${index}`} />
        </div>

        <p className="mt-4 text-[15px] leading-6 text-ink/90">{stop.why}</p>

        <div className="mt-3 rounded-xl border border-accent/30 bg-accent-soft px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Why it fits this weekend
          </p>
          <p className="mt-1 text-sm leading-6 text-ink/90">{stop.fits}</p>
        </div>

        {stop.hydrationPrompt && (
          <p className="mt-3 text-xs font-medium text-wellness">
            💧 <span className="underline">Hydration</span>: {stop.hydrationPrompt}
          </p>
        )}

        <p className="mt-3 text-sm leading-6 text-muted">
          <span className="mr-1.5 font-semibold uppercase tracking-wider text-accent">Tip</span>
          {stop.tip}
        </p>

        <div className="mt-4 grid gap-3 border-t border-ink/10 pt-4 sm:grid-cols-[1fr_1fr_auto] sm:items-center">
          <p className="text-sm text-ink">
            <span className="mr-1.5 text-muted">Dwell</span>
            {formatDwell(stop.dwellMinutes)}
            <span className="mx-1.5 text-muted">·</span>
            {stop.priceNote}
          </p>
          <p className="text-sm text-ink">
            <span className="mr-1.5 text-muted">Venue Spend</span>
            <span className="font-semibold">{formatMoney(stop.venueSpend, "NGN")}</span>
          </p>
          <p className="text-sm text-ink">
            <span className="mr-1.5 text-muted">Transit ({stop.transitMode || "Bolt"})</span>
            <span className="font-semibold">{formatMoney(stop.transportSpend, "NGN")}</span>
            <span className="block text-[11px] text-muted">Est. {stop.fareEstimate || "₦1,500 – ₦3,500"}</span>
          </p>
        </div>
      </article>
    </li>
  );
}

function FeedbackBlock() {
  const [voted, setVoted] = useState<"up" | "down" | null>(null);

  return (
    <section className="mt-12 rounded-2xl border border-ink/15 bg-foreground/5 p-6 md:p-8 text-center">
      <h3 className="font-display text-2xl font-bold text-ink">
        How was your weekend? Did you enjoy this playbook?
      </h3>
      <p className="mt-2 text-sm text-muted">
        Your feedback refines next weekend&apos;s drop and keeps our directory honest.
      </p>
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setVoted("up")}
          className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-transform hover:scale-105 active:scale-95 ${
            voted === "up"
              ? "border-accent bg-accent text-paper shadow-md"
              : "border-ink/20 bg-paper text-ink"
          }`}
        >
          <span>👍</span> Yes, loved it
        </button>
        <button
          type="button"
          onClick={() => setVoted("down")}
          className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-transform hover:scale-105 active:scale-95 ${
            voted === "down"
              ? "border-ink bg-ink text-paper shadow-md"
              : "border-ink/20 bg-paper text-ink"
          }`}
        >
          <span>👎</span> Needs tuning
        </button>
      </div>
      {voted && (
        <p className="mt-4 text-xs font-semibold text-accent animate-fadeIn">
          Thank you! Feedback recorded for team collation.
        </p>
      )}
    </section>
  );
}

function SharePoster({
  persona,
  tierPlan,
}: {
  persona: WeekenderPersona;
  tierPlan: ReturnType<typeof getTierPlan>;
}) {
  const week = getDropWeek();
  const budget = `${formatMoney(tierPlan.budgetMin, persona.currency)}–${formatMoney(
    tierPlan.budgetMax,
    persona.currency,
  )}`;
  const title = persona.hasTiers ? `${tierPlan.label} ${persona.label} Abuja Weekend` : `Thrifty Abuja Weekend`;

  return (
    <section
      aria-label="Share this drop"
      className="mt-4 grid gap-6 md:grid-cols-[1fr_auto] md:items-center"
    >
      <div className="rounded-xl border-2 border-dashed border-ink/25 bg-foreground/5 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          OffDays · The Weekender · Abuja · Executive Assistant Playbook
        </p>
        <p className="mt-2 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          {title}
        </p>
        <p className="mt-2 text-sm text-muted">
          {budget} · {tierPlan.stops.length} stops · planning {week.fridayLabel} →{" "}
          {week.sundayLabel} · your city figured out.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <ShareButton
          title={title}
          profile={persona.profile}
          budget={budget}
          stopsCount={tierPlan.stops.length}
          slug={persona.slug}
          tier={tierPlan.id}
        />
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 bg-paper px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.02] active:scale-95 no-print"
        >
          📥 Download PDF
        </button>
      </div>
    </section>
  );
}

export function WeekenderGuide({
  persona,
  tierId,
}: {
  persona: WeekenderPersona;
  tierId?: BudgetTierId;
}) {
  const tierPlan = getTierPlan(persona, tierId);
  const days = groupStops(tierPlan.stops);
  const mins = totalDwell(tierPlan.stops);
  const dynamicTitle = persona.hasTiers ? `${tierPlan.label} ${persona.label} Abuja Weekend` : `Thrifty Abuja Weekend`;

  return (
    <article className="flex flex-col gap-10">
      <section className="flex flex-col gap-8 border-b-2 border-ink pb-10 pt-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            OffDays · The Weekender · Abuja
          </p>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
              {persona.label}
            </span>
            {persona.hasTiers && (
              <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-paper">
                {tierPlan.label}
              </span>
            )}
          </div>
        </div>

        <header className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {persona.profile}
          </p>
          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-ink md:text-7xl">
            {dynamicTitle}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{persona.tagline}</p>
        </header>

        <ExecutiveAssistantIntro persona={persona} />

        <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
          <p className="text-sm text-muted">
            <span className="mr-2 font-semibold text-ink">{tierPlan.stops.length}</span>
            vetted stops
          </p>
          <p className="text-sm text-muted">
            <span className="mr-2 font-semibold text-ink">≈ {formatDwell(mins)}</span>
            of ground time
          </p>
          <p className="text-sm text-muted">
            <span className="mr-2 font-semibold text-ink">Fri → Sun</span>
            two nights
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <PersonaSwitcher active={persona.slug} />
          <TierSwitcher activeTier={tierPlan.id} persona={persona} />
        </div>
      </section>

      <MoneyBand persona={persona} tierPlan={tierPlan} />

      <section aria-label="Scheduled itinerary">
        {days.map((day) => (
          <div key={day.day} className="mb-10">
            <h2 className="mb-6 flex items-center gap-4">
              <span className="font-display text-3xl font-bold tracking-tight text-ink">
                {day.label}
              </span>
              <span className="h-px flex-1 bg-ink/15" aria-hidden="true" />
            </h2>
            <ol>
              {day.stops.map((stop) => (
                <StopCard
                  key={`${stop.venue}-${stop.startTime}`}
                  stop={stop}
                  index={tierPlan.stops.indexOf(stop)}
                />
              ))}
            </ol>
          </div>
        ))}
      </section>

      <FeedbackBlock />

      <SharePoster persona={persona} tierPlan={tierPlan} />
    </article>
  );
}
