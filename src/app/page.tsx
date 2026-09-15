import Link from "next/link";
import { ProgressSteps } from "@/components/onboarding/progress";
import { QuestionStage } from "@/components/onboarding/question-stage";
import { WelcomeStage } from "@/components/onboarding/welcome-stage";
import { CITY, PERSONAS } from "@/lib/onboarding";

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
  const { persona } = await searchParams;

  const personaData = PERSONAS.find((p) => p.id === first(persona));
  const stage = personaData ? "welcome" : "persona";

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 pb-20 pt-6 md:px-8">
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

      <div className="mt-10">
        <ProgressSteps current={stage === "welcome" ? 1 : 0} />
      </div>

      {stage === "persona" && (
        <QuestionStage
          step={1}
          total={2}
          kicker="Who is this for?"
          title="Pick your lens"
          body={`Everything is ${CITY.label} context — the directory, the drop, the prices. The lens just decides what leads.`}
          options={PERSONAS.map((p) => ({
            value: p.id,
            label: p.label,
            desc: p.tagline,
            href: `/?persona=${p.id}`,
          }))}
          skipHref="/city"
          skipLabel="Skip — browse the directory instead"
        />
      )}

      {stage === "welcome" && personaData && (
        <WelcomeStage persona={{ id: personaData.id, label: personaData.label }} />
      )}
    </main>
  );
}