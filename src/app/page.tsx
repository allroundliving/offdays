import Link from "next/link";
import { CITY, PERSONAS, WELCOME_MESSAGES } from "@/lib/onboarding";
import { AnalyticsInit } from "@/components/analytics-init";

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { persona } = await searchParams;
  const selectedPersonaId = first(persona);
  const personaData = PERSONAS.find((p) => p.id === selectedPersonaId);

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 pb-20 pt-6 md:px-8">
      <AnalyticsInit />
      <header className="flex items-center justify-between gap-4">
        <Link href="/" className="flex flex-col">
          <span className="font-display text-xl font-bold tracking-tight text-ink">
            OffDays.
          </span>
          <span className="text-[11px] text-muted">Your City Figured Out</span>
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

      {!personaData ? (
        // Screen 1: Initial Mount — Tagline immediately above 3 persona choice buttons (no Next button gating)
        <section className="mt-8 flex flex-col gap-6" aria-live="polite">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              OffDays: Your City Figured Out · Abuja
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
              Select your persona to begin
            </h1>
            <p className="text-sm leading-6 text-muted">
              Zero friction: pick your lens below to access verified Abuja guides and living directories instantly.
            </p>
          </div>

          <div className="grid gap-3.5 mt-2">
            {PERSONAS.map((p) => (
              <Link
                key={p.id}
                href={`/?persona=${p.id}`}
                className="group rounded-2xl border border-ink/15 bg-foreground/5 p-5 transition-all hover:border-ink hover:bg-accent-soft/30"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-bold text-ink group-hover:text-accent transition-colors">
                    {p.label}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Choose →
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.tagline}</p>
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/city"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
            >
              Skip and browse directory directly →
            </Link>
          </div>
        </section>
      ) : (
        // Screen 2 & 3: Deferred Story & Single Let's Go / Core App Routing
        <section className="mt-8 flex flex-col gap-6" aria-live="polite">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Lens: {personaData.label} · {CITY.label}
            </p>
            <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
              Welcome to OffDays
            </h1>
          </div>

          <div className="rounded-2xl border border-ink/15 bg-foreground/5 p-6 md:p-8">
            <p className="font-display text-2xl italic leading-snug text-ink md:text-3xl">
              &ldquo;{WELCOME_MESSAGES[personaData.id]}&rdquo;
            </p>
            <p className="mt-4 text-sm leading-6 text-muted">
              All of {CITY.label} is queued up behind you — verified directories, price-checked venues, and this week&apos;s drop.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/weekender?persona=budget"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.01] active:scale-95"
            >
              Let&apos;s Go: View This Week&apos;s Drop →
            </Link>
            <Link
              href="/city"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              Explore City Directory
            </Link>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
            >
              ← Choose a different lens
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
