import type { Metadata } from "next";
import Link from "next/link";
import { getPersona, formatMoney } from "@/lib/weekender";
import { WeekenderGuide } from "@/components/weekender/guide";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const { persona } = await searchParams;
  const slug = typeof persona === "string" ? persona : undefined;
  const p = getPersona(slug);
  return {
    title: p.title,
    description: `${p.title} — ${p.tagline} Stated budget ${formatMoney(
      p.budgetMin,
      p.currency,
    )} to ${formatMoney(p.budgetMax, p.currency)}, ${p.stops.length} vetted stops.`,
    openGraph: {
      title: p.title,
      description: `${p.profile} · budget ${formatMoney(p.budgetMin, p.currency)}–${formatMoney(
        p.budgetMax,
        p.currency,
      )} · ${p.stops.length} vetted stops.`,
    },
  };
}

export default async function WeekenderPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { persona } = await searchParams;
  const slug = typeof persona === "string" ? persona : undefined;
  const active = getPersona(slug);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-20 pt-6 md:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
      >
        <span aria-hidden="true">←</span> OffDays home
      </Link>
      <WeekenderGuide persona={active} />
    </main>
  );
}