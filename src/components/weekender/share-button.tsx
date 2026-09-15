"use client";

import { useState } from "react";

export function ShareButton({
  title,
  profile,
  budget,
  stopsCount,
  slug,
}: {
  title: string;
  profile: string;
  budget: string;
  stopsCount: number;
  slug: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}/weekender?persona=${slug}`;
    const text = `${title} — ${profile}. Budget ${budget}, ${stopsCount} vetted stops this week on OffDays.`;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text, url });
      } catch (error) {
        if ((error as Error).name !== "AbortError") await copyFallback(url);
      }
    } else {
      await copyFallback(url);
    }
  }

  async function copyFallback(url: string) {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-paper transition-transform hover:scale-[1.02] active:scale-95"
    >
      {copied ? "Link copied" : "Share this drop"}
    </button>
  );
}