import Link from "next/link";

export interface StageOption {
  value: string;
  label: string;
  desc: string;
  extra?: string;
  href: string;
  active?: boolean;
}

export function QuestionStage({
  step,
  total = 3,
  title,
  kicker,
  body,
  options,
  skipHref,
  skipLabel,
}: {
  step: number;
  total?: number;
  title: string;
  kicker: string;
  body?: string;
  options: StageOption[];
  skipHref: string;
  skipLabel: string;
}) {
  return (
    <section className="mt-6 flex flex-col gap-4" aria-live="polite">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Step {step} of {total} · {kicker}
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
          {title}
        </h1>
        {body && <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{body}</p>}
      </div>

      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <Link
            key={option.value}
            href={option.href}
            aria-current={option.active ? "true" : undefined}
            className={`group rounded-2xl border p-5 transition-colors ${
              option.active
                ? "border-ink bg-ink text-paper"
                : "border-ink/15 bg-foreground/5 hover:border-ink/40"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className={`text-lg font-semibold ${
                    option.active ? "text-paper" : "text-ink"
                  }`}
                >
                  {option.label}
                </p>
                <p
                  className={`mt-1 text-sm leading-6 ${
                    option.active ? "text-paper/70" : "text-muted"
                  }`}
                >
                  {option.desc}
                </p>
              </div>
              {option.extra && (
                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${
                    option.active
                      ? "border-paper/30 text-paper/80"
                      : "border-accent/40 text-accent"
                  }`}
                >
                  {option.extra}
                </span>
              )}
            </div>
            <p
              className={`mt-3 text-xs font-semibold uppercase tracking-wider ${
                option.active ? "text-paper/60" : "text-accent"
              }`}
            >
              {option.active ? "Selected" : "Choose"} →
            </p>
          </Link>
        ))}
      </div>

      <Link
        href={skipHref}
        className="mt-1 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
      >
        {skipLabel}
      </Link>
    </section>
  );
}