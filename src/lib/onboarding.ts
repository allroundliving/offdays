import type { DirectoryCategory } from "./directory";

// Single-city launch lock. The city-selector step is bypassed until more
// directories go live; everything renders against Abuja internally.
export const CITY = {
  id: "abuja",
  label: "Abuja",
  country: "Nigeria",
  note: "Live directory · 21 venues · weekly price checks",
} as const;

export type CityId = typeof CITY["id"];

export const PERSONAS = [
  {
    id: "visitor",
    label: "Visitor / Tourist",
    shortLabel: "Visitor",
    tagline: "Here for a few days — the smart version of the city, fast.",
  },
  {
    id: "resident",
    label: "New Resident",
    shortLabel: "New resident",
    tagline: "Just moved in — get settled without the trial-and-error.",
  },
  {
    id: "local",
    label: "Local",
    shortLabel: "Local",
    tagline: "You know the city — the hunt for the next favourite spot.",
  },
] as const;

export type PersonaId = (typeof PERSONAS)[number]["id"];

// Persona-tailored welcome copy, shown right after the lens is picked.
export const WELCOME_MESSAGES: Record<PersonaId, string> = {
  visitor:
    "Here's Abuja in a nutshell — wide roads, green hills, hidden spots, and zero fluff. Let's show you around.",
  resident:
    "Welcome to your new base. We'll help you skip the trial-and-error and get settled fast.",
  local:
    "You know the city, but you don't know everything yet. Let's find your next favorite spot.",
};

// Which categories lead the starter list, per persona. Personalization is
// ordering and emphasis, never hiding a venue.
export const PERSONA_PRIORITY: Record<PersonaId, DirectoryCategory[]> = {
  visitor: ["food", "wellness", "essential"],
  resident: ["essential", "wellness", "food"],
  local: ["wellness", "essential", "food"],
};