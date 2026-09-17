"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CITY_VENUES, type Venue } from "@/lib/directory";

export default function AdminDiscoveryPage() {
  const [venues, setVenues] = useState<Venue[]>(() => {
    if (typeof window === "undefined") return CITY_VENUES;
    try {
      const stored = localStorage.getItem("offdays:admin:venues");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return CITY_VENUES;
  });

  const [filter, setFilter] = useState<"pending_review" | "verified" | "rejected">("pending_review");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Venue>>({});

  useEffect(() => {
    try {
      localStorage.setItem("offdays:admin:venues", JSON.stringify(venues));
    } catch {
      // ignore
    }
  }, [venues]);

  const updateStatus = (id: string, newStatus: "verified" | "rejected" | "pending_review") => {
    setVenues((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: newStatus } : v))
    );
  };

  const startEdit = (venue: Venue) => {
    setEditingId(venue.id);
    setEditForm({ name: venue.name, neighborhood: venue.neighborhood, priceNote: venue.priceNote, notable: venue.notable });
  };

  const saveEdit = (id: string) => {
    setVenues((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...editForm } : v))
    );
    setEditingId(null);
  };

  const pendingList = venues.filter((v) => v.status === filter);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 pb-20 pt-6 md:px-8">
      <header className="flex flex-col gap-6 border-b-2 border-ink py-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/city"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←</span> Back to City Directory
          </Link>
          <span className="rounded-full border border-accent bg-accent-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            Protected Admin Route
          </span>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          OffDays · AI Discovery Pipeline &amp; Vetting
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
          Internal Admin Vetting Dashboard
        </h1>
        <p className="max-w-xl text-sm leading-6 text-muted">
          Review scraped venues, inspect AI authenticity flags and trust scores, and approve listings into the verified living directory.
        </p>

        {/* Status Tab Filters */}
        <div className="flex flex-wrap gap-2 pt-2">
          {(["pending_review", "verified", "rejected"] as const).map((st) => {
            const count = venues.filter((v) => v.status === st).length;
            const isActive = filter === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setFilter(st)}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold capitalize transition-all ${
                  isActive
                    ? "border border-ink bg-ink text-paper shadow-sm"
                    : "border border-ink/15 bg-foreground/5 text-ink hover:border-ink/40"
                }`}
              >
                {st.replace("_", " ")} ({count})
              </button>
            );
          })}
        </div>
      </header>

      {/* Discovery Queue List */}
      <section className="mt-10 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink capitalize">
            {filter.replace("_", " ")} Queue
          </h2>
          <span className="text-xs font-medium text-muted">
            Showing {pendingList.length} venues
          </span>
        </div>

        {pendingList.length === 0 ? (
          <div className="rounded-2xl border border-ink/15 bg-foreground/5 p-12 text-center">
            <p className="font-display text-lg text-ink">No venues in this queue.</p>
            <p className="mt-1 text-sm text-muted">Trigger the cron pipeline to ingest new AI discovered spots.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {pendingList.map((venue) => (
              <article
                key={venue.id}
                className="flex flex-col gap-4 rounded-2xl border border-ink/15 bg-foreground/5 p-6 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-ink/10">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {venue.neighborhood} · {venue.category}
                    </span>
                    <h3 className="text-2xl font-bold font-display text-ink mt-0.5">{venue.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {venue.ai_trust_score !== undefined && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                        AI Trust Score: {venue.ai_trust_score}/100
                      </span>
                    )}
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                        venue.status === "verified"
                          ? "bg-wellness/20 text-wellness"
                          : venue.status === "rejected"
                          ? "bg-terracotta/20 text-terracotta"
                          : "bg-accent-soft text-accent"
                      }`}
                    >
                      {venue.status.replace("_", " ")}
                    </span>
                  </div>
                </div>

                {venue.authenticity_flags && venue.authenticity_flags.length > 0 && (
                  <div className="rounded-xl border border-accent/30 bg-accent-soft px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                      ⚠️ AI Authenticity Flags
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {venue.authenticity_flags.map((flag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center rounded-full bg-paper px-3 py-1 text-xs font-medium text-ink border border-ink/10"
                        >
                          {flag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {editingId === venue.id ? (
                  <div className="flex flex-col gap-4 rounded-xl border border-ink/20 bg-paper p-4">
                    <h4 className="text-sm font-semibold text-ink">Edit Venue Details</h4>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="text-xs text-muted block mb-1">Name</label>
                        <input
                          type="text"
                          value={editForm.name || ""}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full rounded-lg border border-ink/20 bg-foreground/5 px-3 py-2 text-sm text-ink"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted block mb-1">Neighborhood</label>
                        <input
                          type="text"
                          value={editForm.neighborhood || ""}
                          onChange={(e) => setEditForm({ ...editForm, neighborhood: e.target.value })}
                          className="w-full rounded-lg border border-ink/20 bg-foreground/5 px-3 py-2 text-sm text-ink"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted block mb-1">Notable Description</label>
                      <textarea
                        value={editForm.notable || ""}
                        onChange={(e) => setEditForm({ ...editForm, notable: e.target.value })}
                        className="w-full rounded-lg border border-ink/20 bg-foreground/5 px-3 py-2 text-sm text-ink"
                        rows={2}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="rounded-full px-4 py-2 text-xs font-semibold text-muted hover:text-ink"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => saveEdit(venue.id)}
                        className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-paper"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-2 text-sm text-ink/90">
                    <p><span className="text-muted font-medium">Vibe:</span> {venue.vibe}</p>
                    <p><span className="text-muted font-medium">Notable:</span> {venue.notable}</p>
                    <p><span className="text-muted font-medium">Price:</span> {venue.priceNote}</p>
                    {venue.source_urls && venue.source_urls.length > 0 && (
                      <p className="text-xs text-muted">
                        <span className="font-medium">Sources:</span> {venue.source_urls.join(", ")}
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-4">
                  <div className="flex items-center gap-2">
                    {venue.status !== "verified" && (
                      <button
                        type="button"
                        onClick={() => updateStatus(venue.id, "verified")}
                        className="inline-flex items-center gap-1.5 rounded-full bg-wellness px-5 py-2.5 text-sm font-semibold text-paper transition-transform hover:scale-105 active:scale-95"
                      >
                        Approve &amp; Publish ✓
                      </button>
                    )}
                    {venue.status !== "rejected" && (
                      <button
                        type="button"
                        onClick={() => updateStatus(venue.id, "rejected")}
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-paper px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink/50"
                      >
                        Reject / Trash ✕
                      </button>
                    )}
                    {venue.status === "rejected" && (
                      <button
                        type="button"
                        onClick={() => updateStatus(venue.id, "pending_review")}
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-paper px-4 py-2.5 text-sm font-semibold text-ink transition-colors"
                      >
                        Restore to Queue
                      </button>
                    )}
                  </div>

                  {editingId !== venue.id && (
                    <button
                      type="button"
                      onClick={() => startEdit(venue)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink/50"
                    >
                      Edit Details
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
