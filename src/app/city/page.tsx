import type { Metadata } from "next";
import Link from "next/link";
import { CITY_VENUES, getVerifiedVenues, NEIGHBORHOODS, getPopups } from "@/lib/directory";
import { HappeningNow } from "@/components/directory/happening-now";
import { SearchableDirectory } from "@/components/directory/searchable-directory";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "City Directory",
  description:
    "Your City Figured Out — Abuja via OffDays: a living directory of food, wellness and essential-service spots, priced, verified and flagged when stale.",
};

export default function CityPage() {
  const popups = getPopups(new Date());
  const verifiedVenues = getVerifiedVenues(CITY_VENUES);
  const pendingCount = CITY_VENUES.filter((v) => v.status === "pending_review").length;

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 pb-20 pt-6 md:px-8">
      <header className="flex flex-col gap-6 border-b-2 border-ink py-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←</span> OffDays home
          </Link>
          <div className="flex items-center gap-4">
            {pendingCount > 0 && (
              <Link
                href="/admin/discovery"
                className="inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-accent-soft px-3.5 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-paper"
              >
                AI Discovery Queue ({pendingCount})
              </Link>
            )}
            <Link
              href="/weekender?persona=budget"
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              This week&apos;s drop →
            </Link>
          </div>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Your City Figured Out · Abuja
        </p>
        <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-ink md:text-6xl">
          The Living City Directory
        </h1>
        <p className="max-w-xl text-sm leading-6 text-muted">
          New to the city or recalibrating it — this is the working encyclopedia:
          what makes each spot notable, how to get there, and who to call.
        </p>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <p className="text-sm text-muted">
            <span className="mr-2 font-semibold text-ink">{verifiedVenues.length}</span>
            verified venues
          </p>
          <p className="text-sm text-muted">
            <span className="mr-2 font-semibold text-ink">{NEIGHBORHOODS.length}</span>
            neighborhoods
          </p>
          <p className="text-sm text-muted">
            <span className="mr-2 font-semibold text-ink">Weekly</span>
            price checks
          </p>
        </div>
      </header>

      <div className="mt-8 rounded-2xl border border-accent/30 bg-accent-soft px-5 py-4 text-sm leading-6 text-ink">
        Real spots and checked prices — strictly filtering for verified listings. Submissions go through our AI pipeline and internal admin vetting queue before publishing.
      </div>

      <section className="mt-10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink">
            Happening Now
          </h2>
          <span className="h-px flex-1 bg-ink/10" aria-hidden="true" />
        </div>
        <p className="max-w-xl text-sm leading-6 text-muted">
          Time-boxed pop-ups, markets and clinics — surfaced by date and neighborhood,
          nothing that outlives its window.
        </p>
        <HappeningNow popups={popups} venues={verifiedVenues} />
      </section>

      <section className="mt-14 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink">
            The Directory
          </h2>
          <span className="h-px flex-1 bg-ink/10" aria-hidden="true" />
        </div>
        <SearchableDirectory venues={verifiedVenues} />
      </section>
    </main>
  );
}
