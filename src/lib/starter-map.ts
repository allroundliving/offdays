import type { Venue } from "./directory";
import { CITY_VENUES } from "./directory";
import { PERSONA_PRIORITY, type PersonaId } from "./onboarding";

/**
 * Schematic city zones on a 100×60 canvas. Arranged for legibility, not
 * geography — the map says "schematic, not to scale" in the UI. A zone is a
 * neighborhood from the live directory.
 */
export interface MapZone {
  id: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const MAP_ZONES: MapZone[] = [
  { id: "ikeja", name: "Ikeja", x: 2, y: 2, w: 30, h: 14 },
  { id: "yaba", name: "Yaba", x: 34, y: 2, w: 32, h: 14 },
  { id: "surulere", name: "Surulere", x: 2, y: 18, w: 30, h: 14 },
  { id: "lekki", name: "Lekki", x: 34, y: 18, w: 32, h: 14 },
  { id: "lagos-island", name: "Lagos Island", x: 6, y: 36, w: 22, h: 14 },
  { id: "ikoyi", name: "Ikoyi", x: 30, y: 36, w: 22, h: 14 },
  { id: "victoria-island", name: "Victoria Island", x: 54, y: 36, w: 24, h: 14 },
];

export interface MapPin {
  zoneId: string;
  venueId: string;
  x: number;
  y: number;
}

const ZONE_BY_NAME = new Set(MAP_ZONES.map((z) => z.name));

export function buildPins(venues: Venue[]): MapPin[] {
  const countByZone = new Map<string, number>();
  const pins: MapPin[] = [];
  for (const venue of venues) {
    const zone = MAP_ZONES.find((z) => z.name === venue.neighborhood);
    if (!zone) continue;
    const i = countByZone.get(zone.id) ?? 0;
    countByZone.set(zone.id, i + 1);
    pins.push({
      zoneId: zone.id,
      venueId: venue.id,
      x: zone.x + 8 + (i % 3) * 7,
      y: zone.y + (i >= 3 ? 12 : 8),
    });
  }
  return pins;
}

export function venuesWithoutZone(venues: Venue[]): Venue[] {
  return venues.filter((v) => !ZONE_BY_NAME.has(v.neighborhood));
}

// Stable-ish starter ordering: persona-priority categories first, then trust
// score, then name. Budget filtering is done by the caller.
export function starterSort(venues: Venue[], persona: PersonaId): Venue[] {
  const priority = PERSONA_PRIORITY[persona];
  return [...venues].sort((a, b) => {
    const pa = priority.indexOf(a.category);
    const pb = priority.indexOf(b.category);
    if (pa !== pb) return (pa === -1 ? priority.length : pa) - (pb === -1 ? priority.length : pb);
    if (b.trustScore !== a.trustScore) return b.trustScore - a.trustScore;
    return a.name.localeCompare(b.name);
  });
}

export const availableVenues = (maxPriceLevel: number) =>
  CITY_VENUES.filter((v) => v.priceLevel <= maxPriceLevel);