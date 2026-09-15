const STEPS = ["City", "Persona", "Budget", "Map"];

export function ProgressSteps({ current }: { current: number }) {
  return (
    <ol aria-label="Onboarding progress" className="flex items-center gap-2">
      {STEPS.map((label, i) => {
        const done = current > i;
        const active = current === i;
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
                done
                  ? "bg-ink text-paper"
                  : active
                    ? "border-2 border-ink bg-paper text-ink"
                    : "border border-ink/20 text-muted"
              }`}
              aria-current={active ? "step" : undefined}
            >
              {i + 1}
            </span>
            <span
              className={`text-xs font-medium ${
                done || active ? "text-ink" : "text-muted"
              }`}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <span className="mx-1 h-px w-4 bg-ink/20" aria-hidden="true" />
            )}
          </li>
        );
      })}
    </ol>
  );
}