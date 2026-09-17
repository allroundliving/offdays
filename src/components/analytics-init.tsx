"use client";

import { useEffect } from "react";
import { initAnalytics, trackFirstAction } from "@/lib/analytics";

export function AnalyticsInit() {
  useEffect(() => {
    initAnalytics();

    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (target && target.href) {
        if (target.href.includes("/weekender")) {
          trackFirstAction("click_weekender");
        } else if (target.href.includes("/city")) {
          trackFirstAction("click_city_directory");
        }
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  return null;
}
