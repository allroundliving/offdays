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
  const [savedCollation, setSavedCollation] = useState(false);

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
      localStorage.setItem("offdays:team:collation", JSON.stringify({ tier: tierId, timestamp: new Date().toISOString() }));
    } catch {
      // ignore
    }
    setSavedCollation(true);
    setTimeout(() => setSavedCollation(false), 3000);

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
          <span className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Locked (Sun–Wed Drop Cycle)
          </span>
        </div>

        <header className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Sunday – Wednesday Pre-Selection Phase
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-ink md:text-6xl">
            The Weekend Itinerary is Locked Until Thursday Evening
          </h1>
          <p className="mt-4 text-lg leading-7 text-muted">
            While the guide is locked, pre-select your budget tier for team collation. The full itinerary
            reveals automatically when the countdown hits zero.
          </p>
        </header>

        {/* Prominent Ticking/Blinking Countdown Timer */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-xl">
          <div className="rounded-2xl border-2 border-accent/40 bg-accent-soft p-5 text-center shadow-sm">
            <p className="font-display text-4xl font-bold text-ink animate-pulse">{timeLeft.days}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">Days</p>
          </div>
          <div className="rounded-2xl border-2 border-accent/40 bg-accent-soft p-5 text-center shadow-sm">
            <p className="font-display text-4xl font-bold text-ink">
              {String(timeLeft.hours).padStart(2, "0")}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">Hours</p>
          </div>
          <div className="rounded-2xl border-2 border-accent/40 bg-accent-soft p-5 text-center shadow-sm">
            <p className="font-display text-4xl font-bold text-ink animate-pulse">
              {String(timeLeft.minutes).padStart(2, "0")}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">Mins</p>
          </div>
          <div className="rounded-2xl border-2 border-accent/40 bg-accent-soft p-5 text-center shadow-sm">
            <p className="font-display text-4xl font-bold text-ink">
              {String(timeLeft.seconds).padStart(2, "0")}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">Secs</p>
          </div>
        </div>

        {/* Budget Tier Pre-Selection UI */}
        <div className="rounded-3xl border-2 border-ink/15 bg-foreground/5 p-6 md:p-8 max-w-2xl">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">Budget Tier Pre-Selection</h2>
              <p className="text-sm text-muted">
                Pick your target tier for this weekend&apos;s drop. Saved for team collation.
              </p>
            </div>
            {savedCollation && (
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-paper animate-bounce">
                Saved for team collation ✓
              </span>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-3 mt-4">
            {BUDGET_TIERS.map((tier) => {
              const isSelected = selectedTier === tier.id;
              // Customize comfortable range label to show ₦80,000 – ₦120,000 as requested
              const range = tier.id === "comfortable" ? "₦80,000 – ₦120,000" : tier.rangeLabel;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => handleTierSelect(tier.id)}
                  className={`flex flex-col items-start justify-between rounded-2xl border p-4 text-left transition-all ${
                    isSelected
                      ? "border-accent bg-accent text-paper shadow-md scale-[1.02]"
                      : "border-ink/15 bg-paper text-ink hover:border-ink/40"
                  }`}
                >
                  <div>
                    <p className="font-display text-lg font-bold capitalize">{tier.label}</p>
                    <p className={`text-xs mt-1 ${isSelected ? "text-paper/90" : "text-muted"}`}>
                      {range}
                    </p>
                  </div>
                  <span
                    className={`mt-4 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      isSelected ? "bg-paper text-accent" : "bg-foreground/10 text-muted"
                    }`}
                  >
                    {isSelected ? "Selected ✓" : "Choose tier"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <PersonaSwitcher active={personaSlug} />
          <Link
            href={previewUrl}
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/50"
          >
            Preview Unlocked View (Debug Toggle) →
          </Link>
        </div>
      </section>
    </div>
  );
}
