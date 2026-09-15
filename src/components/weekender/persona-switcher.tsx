"use client";

import { useRouter } from "next/navigation";
import { PERSONAS } from "@/lib/weekender";

export function PersonaSwitcher({ active }: { active: string }) {
  const router = useRouter();

  return (
    <nav aria-label="Choose a weekend persona" className="flex flex-wrap gap-2">
      {PERSONAS.map((persona) => {
        const isActive = persona.slug === active;
        return (
          <button
            key={persona.slug}
            type="button"
            aria-pressed={isActive}
            onClick={() =>
              router.replace(`/weekender?persona=${persona.slug}`, { scroll: false })
            }
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "border-ink bg-ink text-paper"
                : "border-ink/15 bg-transparent text-ink hover:border-ink/40"
            }`}
          >
            {persona.label}
          </button>
        );
      })}
    </nav>
  );
}