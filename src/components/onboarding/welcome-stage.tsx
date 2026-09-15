import Link from "next/link";
import type { PersonaId } from "@/lib/onboarding";
import { CITY, WELCOME_MESSAGES } from "@/lib/onboarding";

export function WelcomeStage({ persona }: { persona: { id: PersonaId; label: string } }) {
  return (
    <section className="mt-6 flex flex-col gap-6" aria-live="polite">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Step 2 of 2 · Your welcome
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
          Nice to meet you, {persona.label.toLowerCase()}.
        </h1>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-foreground/5 p-6 md:p-8">
        <p className="font-display text-2xl italic leading-snug text-ink md:text-3xl">
          {WELCOME_MESSAGES[persona.id]}
        </p>
        <p className="mt-4 text-sm leading-6 text-muted">
          All of {CITY.label} is queued up behind you — the directory, this week&apos;s drop,
          and the prices that were checked this morning.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href="/city"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.01] active:scale-95"
        >
          Enter the {CITY.label} directory →
        </Link>
        <Link
          href="/weekender?persona=budget"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink"
        >
          Plan this week&apos;s drop
        </Link>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
      >
        ← Pick a different lens
      </Link>
    </section>
  );
}