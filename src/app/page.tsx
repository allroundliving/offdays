import Link from "next/link";
import { ProgressSteps } from "@/components/onboarding/progress";
import { QuestionStage } from "@/components/onboarding/question-stage";
import { StarterMap } from "@/components/starter-map/starter-map";
import { CITY_VENUES } from "@/lib/directory";
import { BUDGET_TIERS, CITIES, MODE_COPY, PERSONAS } from "@/lib/onboarding";
import { buildPins, MAP_ZONES } from "@/lib/starter-map";

function first(
  value: string | string[] | undefined,
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { city: cityParam, persona, budget } = await searchParams;

  const cityOk = first(cityParam) === "lagos";
  const personaData = PERSONAS.find((p) => p.id === first(persona));
  const budgetData = BUDGET_TIERS.find((b) => b.id === first(budget));

  const stage = !cityOk ? "city" : !personaData ? "persona" : !budgetData ? "budget" : "map";
  const stepIndex = stage === "map" ? 3 : stage === "budget" ? 2 : stage === "persona" ? 1 : 0;

  const city = CITIES[0];
  const baseHref = `/?city=${city.id}`;

  return (
    <main
      className={`mx-auto w-full flex-1 px-6 pb-20 pt-6 md:px-8 ${
        stage === "map" ? "max-w-4xl" : "max-w-2xl"
      }`}
    >
      <header className="flex items-center justify-between gap-4">
        <Link href="/" className="flex flex-col">
          <span className="font-display text-xl font-bold tracking-tight text-ink">
            OffDays.
          </span>
          <span className="text-[11px] text-muted">budget-first city guides</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted">
          <Link href="/weekender?persona=budget" className="transition-colors hover:text-ink">
            This week&apos;s drop
          </Link>
          <Link href="/city" className="transition-colors hover:text-ink">
            Directory
          </Link>
        </nav>
      </header>

      <div className="mt-10">
        <ProgressSteps current={stepIndex} />
      </div>

      {stage === "city" && (
        <QuestionStage
          step={1}
          kicker="Where are you headed?"
          title="Start with the city"
          body="Your starter map is built from the living directory of that city — prices checked, flags kept in."
          options={CITIES.map((c) => ({
            value: c.id,
            label: c.label,
            desc: `${c.country} — ${c.note.toLowerCase()}.`,
            extra: "Recommended",
            href: baseHref,
          }))}
          skipHref="/city"
          skipLabel="Skip — browse the directory instead"
        />
      )}

      {stage === "persona" && (
        <QuestionStage
          step={2}
          kicker="Who is the map for?"
          title="Pick your lens"
          body="The pins stay the same either way — ordering and emphasis change, nothing gets hidden."
          options={PERSONAS.map((p) => ({
            value: p.id,
            label: p.label,
            desc: p.tagline,
            href: `${baseHref}&persona=${p.id}`,
          }))}
          skipHref="/city"
          skipLabel="Skip — browse the directory instead"
        />
      )}

      {stage === "budget" && personaData && (
        <QuestionStage
          step={3}
          kicker="What feels comfortable?"
          title="Set your budget range"
          body="The map filters pins to venues that fit the range. The range is a guide, not a ceiling."
          options={BUDGET_TIERS.map((b) => ({
            value: b.id,
            label: b.label,
            desc: "Pins that fit the band — the map never slips splurge-only spots into a thrifty view.",
            extra: b.range,
            href: `${baseHref}&persona=${personaData.id}&budget=${b.id}`,
            active: budgetData?.id === b.id,
          }))}
          skipHref="/city"
          skipLabel="Skip — browse the directory instead"
        />
      )}

      {stage === "map" && personaData && budgetData && (
        <section className="mt-10 flex flex-col gap-6" aria-live="polite">
          <header className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              New-to-the-City mode
            </p>
            <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-ink md:text-6xl">
              Your {city.label} starter map
            </h1>
            <p className="max-w-xl text-lg leading-8 text-muted">{MODE_COPY[personaData.id]}</p>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={baseHref}
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-1.5 text-sm text-ink transition-colors hover:border-ink"
              >
                {personaData.label}
                <span className="text-muted">change</span>
              </Link>
              <Link
                href={`${baseHref}&persona=${personaData.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-1.5 text-sm text-ink transition-colors hover:border-ink"
              >
                {budgetData.range}
                <span className="text-muted">change</span>
              </Link>
              <Link href="/" className="ml-1 text-xs text-muted transition-colors hover:text-ink">
                start over
              </Link>
            </div>
          </header>

          <StarterMap
            zones={MAP_ZONES}
            pins={buildPins(CITY_VENUES.filter((v) => v.priceLevel <= budgetData.maxPriceLevel))}
            venues={CITY_VENUES.filter((v) => v.priceLevel <= budgetData.maxPriceLevel)}
            personaId={personaData.id}
            personaLabel={personaData.label}
            budgetLabel={budgetData.label}
            cityLabel={city.label}
          />

          <footer className="mt-4 border-t border-ink/10 pt-6 text-sm text-muted">
            Built from the living directory. Pins sit in each venue&apos;s home
            neighborhood; flagged entries are honest omissions, not hidden ones.{" "}
            <Link href="/city" className="font-medium text-ink hover:underline">
              Open the full directory →
            </Link>
          </footer>
        </section>
      )}
    </main>
  );
}