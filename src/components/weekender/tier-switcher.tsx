"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BUDGET_TIERS, type BudgetTierId, type WeekenderPersona } from "@/lib/weekender";

interface TierSwitcherProps {
  activeTier: BudgetTierId;
  persona: WeekenderPersona;
}

export function TierSwitcher({ activeTier, persona }: TierSwitcherProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!persona.hasTiers) {
    return null; // Budget category hides the tier selector entirely
  }

  const handleSelect = (tierId: BudgetTierId) => {
    try {
      localStorage.setItem("offdays:weekend:tier", tierId);
    } catch {
      // ignore
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set("persona", persona.slug);
    params.set("tier", tierId);
    router.replace(`/weekender?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted mr-2">
        Budget Tier:
      </span>
      {BUDGET_TIERS.map((tier) => {
        const isActive = activeTier === tier.id;
        return (
          <button
            key={tier.id}
            type="button"
            onClick={() => handleSelect(tier.id)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
              isActive
                ? "border border-accent bg-accent text-paper shadow-sm"
                : "border border-ink/15 bg-foreground/5 text-ink hover:border-ink/40"
            }`}
          >
            {tier.label} <span className="opacity-75 font-normal">({tier.rangeLabel})</span>
          </button>
        );
      })}
    </div>
  );
}
