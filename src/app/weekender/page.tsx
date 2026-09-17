import type { Metadata } from "next";
import Link from "next/link";
import { getPersona, getTierPlan, formatMoney, getPhase, getNextDropDeadline, type BudgetTierId } from "@/lib/weekender";
import { WeekenderGuide } from "@/components/weekender/guide";
import { WeekenderLock } from "@/components/weekender/lock";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const { persona, tier } = await searchParams;
  const slug = typeof persona === "string" ? persona : undefined;
  const tierId = typeof tier === "string" ? tier : undefined;
  const p = getPersona(slug);
  const plan = getTierPlan(p, tierId);

  return {
    title: p.title,
    description: `Your City Figured Out — ${p.title}. ${p.tagline} Stated budget (${plan.label}) ${formatMoney(
      plan.budgetMin,
      p.currency,
    )} to ${formatMoney(plan.budgetMax, p.currency)}, ${plan.stops.length} vetted stops.`,
    openGraph: {
      title: p.title,
      description: `${p.profile} · budget (${plan.label}) ${formatMoney(plan.budgetMin, p.currency)}–${formatMoney(
        plan.budgetMax,
        p.currency,
      )} · ${plan.stops.length} vetted stops.`,
    },
  };
}

export default async function WeekenderPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const personaSlug = typeof resolvedParams.persona === "string" ? resolvedParams.persona : "budget";
  const tierParam = typeof resolvedParams.tier === "string" ? resolvedParams.tier : undefined;
  const previewParam = typeof resolvedParams.preview === "string" ? resolvedParams.preview : undefined;

  const activePersona = getPersona(personaSlug);
  const phase = getPhase(new Date());
  const deadline = getNextDropDeadline(new Date());
  const isUnlocked = phase === "open" || previewParam === "1";

  const previewUrl = `/weekender?persona=${personaSlug}${tierParam ? `&tier=${tierParam}` : ""}&preview=1`;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-20 pt-6 md:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink mb-6"
      >
        <span aria-hidden="true">←</span> OffDays home
      </Link>

      {!isUnlocked ? (
        <WeekenderLock
          deadlineMs={deadline.getTime()}
          personaSlug={personaSlug}
          initialTier={tierParam || activePersona.defaultTier}
          previewUrl={previewUrl}
        />
      ) : (
        <WeekenderGuide
          persona={activePersona}
          tierId={tierParam as BudgetTierId}
        />
      )}
    </main>
  );
}
