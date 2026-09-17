"use client";

export function initAnalytics() {
  if (typeof window === "undefined") return;
  try {
    if (!sessionStorage.getItem("offdays:start_time")) {
      sessionStorage.setItem("offdays:start_time", performance.now().toString());
    }
  } catch {
    // ignore
  }
}

export function trackFirstAction(actionName: string) {
  if (typeof window === "undefined") return;
  try {
    const startStr = sessionStorage.getItem("offdays:start_time");
    const tracked = sessionStorage.getItem("offdays:action_tracked");
    if (startStr && !tracked) {
      const start = Number(startStr);
      const elapsed = Math.round(performance.now() - start);
      console.info(
        `%c[OffDays Telemetry] Time-to-first-meaningful-action [${actionName}]: ${elapsed}ms`,
        "background: #ff6b35; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold;"
      );
      sessionStorage.setItem("offdays:action_tracked", "1");
    }
  } catch {
    // ignore
  }
}
