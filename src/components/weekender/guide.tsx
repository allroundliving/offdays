import type { WeekenderPersona, WeekenderStop, BudgetSplit } from "@/lib/weekender";
import {
  formatMoney,
  formatDwell,
  totalDwell,
  groupStops,
  getDropWeek,
} from "@/lib/weekender";
import { PersonaSwitcher } from "./persona-switcher";
import { ShareButton } from "./share-button";

const SPLIT_META: { key: keyof BudgetSplit; label: string; className: string }[] = [
  { key: "stop", label: "Stops & entry", className: "bg-accent" },
  { key: "food", label: "Food", className: "bg-ink" },
  { key: "transport", label: "Transport", className: "bg-accent/60" },
  { key: "buffer", label: "Buffer", className: "bg-muted/40" },
];

function BudgetBand({ persona }: { persona: WeekenderPersona }) {
  const splitTotal =
    persona.split.stop + persona.split.food + persona.split.transport + persona.split.buffer;
  return (
    <section className="border-y-2 border-ink bg-paper py-8" aria-label="Stated budget range">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Stated budget — all-in
          </p>
          <p className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            {formatMoney(persona.budgetMin, persona.currency)}
            <span className="mx-2 text-muted">–</span>
            {formatMoney(persona.budgetMax, persona.currency)}
          </p>
          <p className="mt-2 text-sm text-muted">
            {persona.label} lens · 2 days · {persona.stops.length} vetted stops
          </p>
        </div>
        <p className="max-w-xs text-sm leading-6 text-muted">
          The breakdown assumes the top of the range. Anything left over becomes tomorrow&apos;s
          dinner — that&apos;s the point.
        </p>
      </div>
      <div className="mt-6">
        <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted/20">
          {SPLIT_META.map((row) => {
            const width = persona.split[row.key] / splitTotal;
            return width > 0 ? (
              <div key={row.key} className={row.className} style={{ width: `${width * 100}%` }} />
            ) : null;
          })}
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
          {SPLIT_META.map((row) => (
            <li key={row.key} className="flex items-center gap-2 text-xs text-muted">
              <span className={`inline-block h-2 w-2 rounded-full ${row.className}`} />
              {row.label}{" "}
              <span className="font-medium text-ink">
                {formatMoney(persona.split[row.key], persona.currency)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StopCard({ stop, index }: { stop: WeekenderStop; index: number }) {
  return (
    <li className="group flex gap-4 md:gap-6">
      <div className="flex w-10 shrink-0 flex-col items-center">
        <span className="font-display text-2xl font-bold leading-none text-ink/70 md:text-3xl">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="mt-3 h-full w-px bg-ink/15" aria-hidden="true" />
      </div>
      <article className="mb-8 flex-1 rounded-xl border border-ink/10 bg-foreground/5 p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {stop.category} · {stop.neighborhood}
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold leading-tight text-ink">
              {stop.venue}
            </h3>
          </div>
          <p className="rounded-full border border-ink/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
            Vetted · {stop.trustScore}
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink">
          <p>
            <span className="mr-1.5 text-muted">Dwell</span>
            {formatDwell(stop.dwellMinutes)}
          </p>
          <p>
            <span className="mr-1.5 text-muted">Price</span>
            {stop.priceNote}
          </p>
        </div>
        <p className="mt-3 text-[15px] leading-6 text-ink/90">{stop.why}</p>
        <p className="mt-2 text-sm leading-6 text-muted">
          <span className="mr-1.5 font-semibold uppercase tracking-wider text-accent">Tip</span>
          {stop.tip}
        </p>
      </article>
    </li>
  );
}

function SharePoster({ persona }: { persona: WeekenderPersona }) {
  const { expiresLabel } = getDropWeek();
  const budget = `${formatMoney(persona.budgetMin, persona.currency)}–${formatMoney(
    persona.budgetMax,
    persona.currency,
  )}`;
  return (
    <section
      aria-label="Share this drop"
      className="mt-4 grid gap-6 md:grid-cols-[1fr_auto] md:items-center"
    >
      <div className="rounded-xl border-2 border-dashed border-ink/25 bg-foreground/5 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          OffDays Weekender · This week&apos;s drop
        </p>
        <p className="mt-2 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          {persona.title}
        </p>
        <p className="mt-2 text-sm text-muted">
          {budget} · {persona.stops.length} stops · expires Sunday {expiresLabel} · budget first,
          always.
        </p>
      </div>
      <ShareButton
        title={persona.title}
        profile={persona.profile}
        budget={budget}
        stopsCount={persona.stops.length}
        slug={persona.slug}
      />
    </section>
  );
}

export function WeekenderGuide({ persona }: { persona: WeekenderPersona }) {
  const days = groupStops(persona.stops);
  const mins = totalDwell(persona.stops);
  const { expiresLabel } = getDropWeek();

  return (
    <article className="flex flex-col gap-10">
      <section className="flex flex-col gap-10 border-b-2 border-ink pb-10 pt-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            OffDays Weekender · Lagos
          </p>
          <p className="rounded-full border border-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
            Expires Sun {expiresLabel}
          </p>
        </div>
        <header className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {persona.profile}
          </p>
          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-ink md:text-7xl">
            {persona.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{persona.tagline}</p>
        </header>
        <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
          <p className="text-sm text-muted">
            <span className="mr-2 font-semibold text-ink">{persona.stops.length}</span>
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
        <PersonaSwitcher active={persona.slug} />
      </section>

      <BudgetBand persona={persona} />

      <section aria-label="Itinerary">
        {days.map((day) => (
          <div key={day.day} className="mb-10">
            <h2 className="mb-6 flex items-center gap-4">
              <span className="font-display text-3xl font-bold tracking-tight text-ink">
                {day.day}
              </span>
              <span className="h-px flex-1 bg-ink/15" aria-hidden="true" />
            </h2>
            <ol>
              {day.slots.flatMap((slot) =>
                slot.stops.map((stop) => (
                  <StopCard
                    key={stop.venue}
                    stop={stop}
                    index={persona.stops.indexOf(stop)}
                  />
                )),
              )}
            </ol>
          </div>
        ))}
      </section>

      <SharePoster persona={persona} />
    </article>
  );
}