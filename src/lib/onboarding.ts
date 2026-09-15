import type { DirectoryCategory } from "./directory";

export const CITIES = [
  {
    id: "lagos",
    label: "Lagos",
    country: "Nigeria",
    note: "Live directory · 21 venues · weekly price checks",
  },
] as const;

export type CityId = (typeof CITIES)[number]["id"];

export const PERSONAS = [
  {
    id: "visitor",
    label: "Visitor",
    tagline: "Passing through for a few days — you want the smart version, fast.",
  },
  {
    id: "resident",
    label: "New resident",
    tagline: "Just moved in — you need the basics and where things actually are.",
  },
  {
    id: "local",
    label: "Long-time local",
    tagline: "You know the city — here is the map anyway, flags and all.",
  },
] as const;

export type PersonaId = (typeof PERSONAS)[number]["id"];

export const BUDGET_TIERS = [
  {
    id: "thrifty",
    label: "Thrifty",
    range: "≈ ₦20k–₦30k a weekend",
    maxPriceLevel: 2,
  },
  {
    id: "moderate",
    label: "Moderate",
    range: "≈ ₦30k–₦60k a weekend",
    maxPriceLevel: 3,
  },
  {
    id: "comfortable",
    label: "Comfortable",
    range: "≈ ₦60k–₦120k a weekend",
    maxPriceLevel: 4,
  },
] as const;

export type BudgetId = (typeof BUDGET_TIERS)[number]["id"];

// Which categories lead the starter list, per persona. The map never hides a
// venue — personalization is ordering and emphasis, not censorship.
export const PERSONA_PRIORITY: Record<PersonaId, DirectoryCategory[]> = {
  visitor: ["food", "wellness", "essential"],
  resident: ["essential", "wellness", "food"],
  local: ["wellness", "essential", "food"],
};

export const MODE_COPY: Record<PersonaId, string> = {
  visitor:
    "New-to-the-City · a 48-hour read on where Lagos works — food first, everything else follows.",
  resident:
    "New-to-the-City · move-in mode: the services that make a new street livable within a week.",
  local:
    "New-to-the-City · for old hands too — the pins are budget-filtered, but the flags are for you.",
};