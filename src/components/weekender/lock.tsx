"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BUDGET_TIERS, type BudgetTierId } from "@/lib/weekender";
import { PersonaSwitcher } from "./persona-switcher";

interface LockScreenProps {
  deadlineMs: number;
  personaSlug: string;
  initialTier: string;
  previewUrl: string;
}

export function WeekenderLock({
  deadlineMs,
  personaSlug,
  initialTier,
  previewUrl,
}: LockScreenProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [selectedTier, setSelectedTier] = useState<BudgetTierId>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("offdays:weekend:tier");
      if (stored && ["thrifty", "moderate", "comfortable"].includes(stored)) {
        return stored as BudgetTierId;
      }
    }
    return (initialTier as BudgetTierId) || "moderate";
  });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, deadlineMs - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [deadlineMs]);

  const handleTierSelect = (tierId: BudgetTierId) => {
    setSelectedTier(tierId);
    try {
      localStorage.setItem("offdays:weekend:tier", tierId);
    } catch {
      // ignore
    }
    // Update URL param without full reload
    const url = new URL(window.location.href);
    url.searchParams.set("tier", tierId);
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-8 border-b-2 border-ink pb-12 pt-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            OffDays · The Weekender · Abuja
          </p>
          <span className="rounded-full border border-accent bg-accent-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
            Drop Pre-Selection Active
          </span>
        </div>

        <header className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Sunday – Wednesday Countdown &amp; Pre-Selection
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-ink md:text-6xl">
            The Next Weekend Drop Unlocks Thursday Evening
          </h1>
          <p className="mt-4 text-lg leading-7 text-muted">
            Curated, ₦-honest itineraries drop weekly. Choose your budget tier now to pre-configure your
            weekend or preview the guide immediately.
          </p>
        </header>

        {/* Countdown Box */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-xl">
          <div className="rounded-2xl border border-ink/15 bg-foreground/5 p-4 text-center">
            <p className="font-display text-3xl font-bold text-ink">{timeLeft.days}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">Days</p>
          </div>
          <div className="rounded-2xl border border-ink/15 bg-foreground/5 p-4 text-center">
            <p className="font-display text-3xl font-bold text-ink">
              {String(timeLeft.hours).padStart(2, "0")}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">Hours</p>
          </div>
          <div className="rounded-2xl border border-ink/15 bg-foreground/5 p-4 text-center">
            <p className="font-display text-3xl font-bold text-ink">
              {String(timeLeft.minutes).padStart(2, "0")}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">Mins</p>
          </div>
          <div className="rounded-2xl border border-ink/15 bg-foreground/5 p-4 text-center">
            <p className="font-display text-3xl font-bold text-ink">
              {String(timeLeft.seconds).padStart(2, "0")}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">Secs</p>
          </div>
        </div>

        {/* Pre-Selection Banner */}
        <div className="rounded-2xl border border-accent/40 bg-accent-soft p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Budget Tier Pre-Selection
            </p>
            <p className="mt-1 font-display text-xl font-bold text-ink">
              Selected Tier: <span className="capitalize">{selectedTier}</span>
            </p>
            <p className="text-sm text-muted">
              {BUDGET_TIERS.find((t) => t.id === selectedTier)?.rangeLabel}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition-colors hover:scale-[1.01] active:scale-95"
          >
            Change Budget Tier
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <PersonaSwitcher active={personaSlug} />
          <Link
            href={previewUrl}
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/50"
          >
            Preview Unlocked View (Debug) →
          </Link>
        </div>
      </section>

      {/* Modal for Pre-Selection */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-lg rounded-3xl border border-ink/20 bg-paper p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-ink/10">
              <h2 className="font-display text-2xl font-bold text-ink">Select Budget Tier</h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-full p-2 text-muted hover:text-ink"
              >
                ✕
              </button>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">
              Choose your preferred spending tier for this week&apos;s Abuja drop. Your selection configures
              venue spend levels across all categories.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {BUDGET_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => {
                    handleTierSelect(tier.id);
                    setModalOpen(false);
                  }}
                  className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                    selectedTier === tier.id
                      ? "border-accent bg-accent-soft text-ink ring-2 ring-accent/30"
                      : "border-ink/15 bg-foreground/5 text-ink hover:border-ink/40"
                  }`}
                >
                  <div>
                    <p className="font-display text-lg font-bold capitalize">{tier.label}</p>
                    <p className="text-xs text-muted">{tier.rangeLabel}</p>
                  </div>
                  {selectedTier === tier.id && (
                    <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-paper">
                      Selected ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-ink/90"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
