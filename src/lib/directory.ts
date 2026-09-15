export type DirectoryCategory = "food" | "wellness" | "essential";

export type TrustStatus = "vetted" | "checking" | "flagged";

export interface Venue {
  id: string;
  name: string;
  neighborhood: string;
  category: DirectoryCategory;
  vibe: string;
  tags: string[];
  trustScore: number;
  status: TrustStatus;
  priceLevel: number;
  priceNote: string;
  openHours: string;
  lastPriceChecked: string;
  bookingUrl?: string;
}

export interface Popup {
  id: string;
  venueId: string;
  title: string;
  neighborhood: string;
  bucket: "live" | "today" | "weekend";
  timeLabel: string;
  note: string;
}

export const DIRECTORY_CATEGORIES: {
  key: "all" | DirectoryCategory;
  label: string;
}[] = [
  { key: "all", label: "All" },
  { key: "food", label: "Food" },
  { key: "wellness", label: "Wellness" },
  { key: "essential", label: "Essential services" },
];

const CATEGORY_LABEL: Record<DirectoryCategory, string> = {
  food: "Food",
  wellness: "Wellness",
  essential: "Essential",
};

export function categoryLabel(category: DirectoryCategory): string {
  return CATEGORY_LABEL[category];
}

export const TRUST_STATUS_LABEL: Record<TrustStatus, string> = {
  vetted: "Vetted",
  checking: "Checking",
  flagged: "Flagged",
};

// Seed rows for the living city directory. In production these are
// `public.venues` rows — price-checked, de-duplicated, flagged when stale.
// `bookingUrl` only ever ships a verified `actionableBookingURL`; rows without
// one fall back to the in-app "Request" action.
export const CITY_VENUES: Venue[] = [
  // ---- Food ----
  {
    id: "v-001",
    name: "Mama Cass",
    neighborhood: "Lekki",
    category: "food",
    vibe: "Plates-and-chops ritual, big portions, no performance",
    tags: ["nigerian", "chops", "lunch"],
    trustScore: 87,
    status: "vetted",
    priceLevel: 2,
    priceNote: "₦1,500–₦2,500 mains",
    openHours: "Daily 9am–9pm",
    lastPriceChecked: "2026-09-05",
  },
  {
    id: "v-002",
    name: "The Yellow Chilli",
    neighborhood: "Victoria Island",
    category: "food",
    vibe: "Nigerian fine-dining, dressed for a date",
    tags: ["nigerian", "fine-dining", "reservations"],
    trustScore: 91,
    status: "vetted",
    priceLevel: 3,
    priceNote: "₦8k–₦18k mains",
    openHours: "Mon–Sun 11am–10pm",
    lastPriceChecked: "2026-09-06",
  },
  {
    id: "v-003",
    name: "Jara",
    neighborhood: "Ikoyi",
    category: "food",
    vibe: "A bookstore that loosens its collar after dark",
    tags: ["books", "wine", "jazz"],
    trustScore: 90,
    status: "vetted",
    priceLevel: 3,
    priceNote: "₦2k–₦5k small plates",
    openHours: "Tue–Sun 10am–late",
    lastPriceChecked: "2026-09-04",
  },
  {
    id: "v-004",
    name: "Kalabash",
    neighborhood: "Surulere",
    category: "food",
    vibe: "Ogbono you will tell your friends about",
    tags: ["nigerian", "soups", "family"],
    trustScore: 87,
    status: "vetted",
    priceLevel: 2,
    priceNote: "₦8k–₦12k per head",
    openHours: "Daily 12pm–10pm",
    lastPriceChecked: "2026-09-06",
  },
  {
    id: "v-005",
    name: "Bature Brewery",
    neighborhood: "Yaba",
    category: "food",
    vibe: "Industrial-chic taps on Yaba Main Street",
    tags: ["craft-beer", "snacks", "tasting"],
    trustScore: 88,
    status: "vetted",
    priceLevel: 2,
    priceNote: "₦2k–₦4k a pint",
    openHours: "Mon–Sun 4pm–late",
    lastPriceChecked: "2026-09-03",
  },
  {
    id: "v-006",
    name: "Kilimanjaro",
    neighborhood: "Ikeja",
    category: "food",
    vibe: "Garden pizzas, loud Saturday crowd",
    tags: ["pizza", "outdoor", "groups"],
    trustScore: 84,
    status: "vetted",
    priceLevel: 2,
    priceNote: "₦4k–₦9k pizzas",
    openHours: "Tue–Sun 12pm–11pm",
    lastPriceChecked: "2026-09-02",
  },
  {
    id: "v-007",
    name: "Shiroki",
    neighborhood: "Yaba",
    category: "food",
    vibe: "Tiny Edomae counter, chef-curated, zero theatre",
    tags: ["japanese", "omakase", "counter"],
    trustScore: 82,
    status: "checking",
    priceLevel: 3,
    priceNote: "₦12k–₦16k omakase",
    openHours: "Tue–Sun 6pm–10pm",
    lastPriceChecked: "2026-08-21",
  },
  {
    id: "v-008",
    name: "Calabar Kitchen",
    neighborhood: "Victoria Island",
    category: "food",
    vibe: "Pounded yam that arrives like a finale",
    tags: ["nigerian", "calabar", "rice"],
    trustScore: 79,
    status: "checking",
    priceLevel: 2,
    priceNote: "₦3k–₦6k platters",
    openHours: "Daily 10am–9pm",
    lastPriceChecked: "2026-08-14",
  },

  // ---- Wellness ----
  {
    id: "v-101",
    name: "Green Palm Wellness",
    neighborhood: "Lekki",
    category: "wellness",
    vibe: "Steam, cold towels and a quiet that lasts an hour",
    tags: ["spa", "sauna", "massage"],
    trustScore: 85,
    status: "vetted",
    priceLevel: 3,
    priceNote: "₦12k–₦25k treatments",
    openHours: "Daily 9am–9pm",
    lastPriceChecked: "2026-09-05",
  },
  {
    id: "v-102",
    name: "The Ikoyi Yoga Room",
    neighborhood: "Ikoyi",
    category: "wellness",
    vibe: "Headstands facing the morning skyline",
    tags: ["yoga", "morning", "mats-rental"],
    trustScore: 83,
    status: "vetted",
    priceLevel: 2,
    priceNote: "₦4k a class · ₦15k weekly",
    openHours: "Mon–Sat 6am–8pm",
    lastPriceChecked: "2026-09-04",
  },
  {
    id: "v-103",
    name: "Sirocco Foot Spa",
    neighborhood: "Surulere",
    category: "wellness",
    vibe: "The pedicure that resets the whole week",
    tags: ["spa", "feet", "walk-in"],
    trustScore: 81,
    status: "vetted",
    priceLevel: 1,
    priceNote: "₦2k–₦5k per session",
    openHours: "Daily 10am–8pm",
    lastPriceChecked: "2026-09-06",
  },
  {
    id: "v-104",
    name: "Bella Beauty & Hair",
    neighborhood: "Lagos Island",
    category: "wellness",
    vibe: "Crowded Saturday mirror, straight talk, clean lines",
    tags: ["salon", "braids", "appointments"],
    trustScore: 78,
    status: "checking",
    priceLevel: 2,
    priceNote: "₦6k braids up",
    openHours: "Tue–Sun 9am–7pm",
    lastPriceChecked: "2026-08-29",
  },
  {
    id: "v-105",
    name: "Royal Barber HQ",
    neighborhood: "Ikeja",
    category: "wellness",
    vibe: "Fades with a queue and a cooler of drinks",
    tags: ["barber", "fade", "walk-in"],
    trustScore: 74,
    status: "checking",
    priceLevel: 1,
    priceNote: "₦1,500–₦3,000 cut",
    openHours: "Daily 10am–10pm",
    lastPriceChecked: "2026-08-19",
  },
  {
    id: "v-106",
    name: "Zeno Strength & Recovery",
    neighborhood: "Yaba",
    category: "wellness",
    vibe: "Iron, ice baths and a rowing machine that means it",
    tags: ["gym", "recovery", "day-pass"],
    trustScore: 64,
    status: "flagged",
    priceLevel: 3,
    priceNote: "₦5k day pass",
    openHours: "Mon–Sat 6am–10pm",
    lastPriceChecked: "2026-07-28",
  },

  // ---- Essential services ----
  {
    id: "v-201",
    name: "TrustBridge Pharmacy",
    neighborhood: "Surulere",
    category: "essential",
    vibe: "A 24-hour chemist that never shrugs at 2am",
    tags: ["pharmacy", "24h", "refills"],
    trustScore: 94,
    status: "vetted",
    priceLevel: 2,
    priceNote: "Over-the-counter · quotes for chronic lists",
    openHours: "Open 24 hours",
    lastPriceChecked: "2026-09-06",
  },
  {
    id: "v-202",
    name: "Optimal Care Clinic",
    neighborhood: "Ikeja",
    category: "essential",
    vibe: "Walk-in doctor, no health-ministry theatre",
    tags: ["clinic", "walk-in", "lab"],
    trustScore: 88,
    status: "vetted",
    priceLevel: 3,
    priceNote: "Consult ₦8k · basic lab ₦12k",
    openHours: "Mon–Sat 8am–6pm",
    lastPriceChecked: "2026-09-03",
  },
  {
    id: "v-203",
    name: "GIGL Courier",
    neighborhood: "Ikeja",
    category: "essential",
    vibe: "Same-day parcels, tracking that actually updates",
    tags: ["courier", "logistics", "same-day"],
    trustScore: 90,
    status: "vetted",
    priceLevel: 1,
    priceNote: "From ₦2,500 same-day Lagos",
    openHours: "Mon–Sat 8am–7pm",
    lastPriceChecked: "2026-09-05",
  },
  {
    id: "v-204",
    name: "Wi-Fi & Fix",
    neighborhood: "Yaba",
    category: "essential",
    vibe: "iPhone surgery done between two sockets and a prayer",
    tags: ["repair", "phone", "data-recovery"],
    trustScore: 76,
    status: "checking",
    priceLevel: 2,
    priceNote: "Screen from ₦18k · quote first",
    openHours: "Mon–Sat 9am–8pm",
    lastPriceChecked: "2026-08-25",
  },
  {
    id: "v-205",
    name: "CleanPal Laundry",
    neighborhood: "Lekki",
    category: "essential",
    vibe: "White shirts back Friday, folded like a gift",
    tags: ["laundry", "dry-cleaning", "pickup"],
    trustScore: 83,
    status: "vetted",
    priceLevel: 1,
    priceNote: "Pickup + fold ₦3k a bag",
    openHours: "Mon–Sat 8am–7pm",
    lastPriceChecked: "2026-09-06",
  },
  {
    id: "v-206",
    name: "PowerBank Lagos",
    neighborhood: "Lagos Island",
    category: "essential",
    vibe: "Inverters, power banks and honest battery advice",
    tags: ["power", "inverter", "rentals"],
    trustScore: 71,
    status: "flagged",
    priceLevel: 2,
    priceNote: "Power-bank rent ₦1k a day",
    openHours: "Mon–Sat 9am–7pm",
    lastPriceChecked: "2026-07-30",
  },
  {
    id: "v-207",
    name: "Midtown Auto Clinic",
    neighborhood: "Ikeja",
    category: "essential",
    vibe: "A mechanic that hands you the old part, not excuses",
    tags: ["mechanic", "inspection", "tyres"],
    trustScore: 67,
    status: "flagged",
    priceLevel: 2,
    priceNote: "Inspection ₦5k · labour quoted",
    openHours: "Mon–Sat 8am–6pm",
    lastPriceChecked: "2026-07-22",
  },
];

export const NEIGHBORHOODS: string[] = [
  ...new Set(CITY_VENUES.map((v) => v.neighborhood)),
].sort();

// Time-boxed pop-ups, surfaced by date and neighborhood. Seed rows are built
// relative to "now" so the feed always demonstrates a live, a today, and a
// weekend bucket; production rows read from `public.popups` and filter the
// same way (`starts_at <= now < ends_at`).
export function getPopups(now: Date): Popup[] {
  const day = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const today = day(now);

  const at = (base: Date, hour: number, minute = 0) =>
    new Date(base.getFullYear(), base.getMonth(), base.getDate(), hour, minute);

  const friday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + ((5 - today.getDay() + 7) % 7),
  );
  const saturday = new Date(friday);
  saturday.setDate(saturday.getDate() + 1);
  const sunday = new Date(friday);
  sunday.setDate(sunday.getDate() + 2);

  const time = (d: Date) =>
    d.toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit" });

  const liveEnd = new Date(now.getTime() + 2.5 * 60 * 60 * 1000);

  const rows: Omit<Popup, "bucket">[] = [
    {
      id: "p-1",
      venueId: "v-004",
      title: "Off-menu jollof tasting, live from the pot",
      neighborhood: "Surulere",
      timeLabel: `now until ${time(liveEnd)}`,
      note: "The kitchen's taster flight — three jollof styles, one opinionated server.",
    },
    {
      id: "p-2",
      venueId: "v-105",
      title: "Walk-in fade window (no queue, cold drinks)",
      neighborhood: "Ikeja",
      timeLabel: `now until ${time(liveEnd)}`,
      note: "Barbers clear the chairs: first come, first trimmed.",
    },
    {
      id: "p-3",
      venueId: "v-005",
      title: "Guest tap takeover — three breweries, one bar",
      neighborhood: "Yaba",
      timeLabel: `6pm–11pm · ${at(today, 18).toLocaleDateString("en-GB", { weekday: "short" })}`,
      note: "Flights discounted until the tills close.",
    },
    {
      id: "p-4",
      venueId: "v-201",
      title: "Free blood-pressure checks at the counter",
      neighborhood: "Surulere",
      timeLabel: `10am–3pm · ${at(today, 10).toLocaleDateString("en-GB", { weekday: "short" })}`,
      note: "No appointment, no script needed.",
    },
    {
      id: "p-5",
      venueId: "v-101",
      title: "Sauna session + cold plunge, early-bird rate",
      neighborhood: "Lekki",
      timeLabel: `8am–11am · ${at(saturday, 8).toLocaleDateString("en-GB", { weekday: "short" })}`,
      note: "Weekend morning slot at half the weekday rate.",
    },
    {
      id: "p-6",
      venueId: "v-001",
      title: "Chops market — six kitchens in one courtyard",
      neighborhood: "Lekki",
      timeLabel: `12pm–6pm · ${at(sunday, 12).toLocaleDateString("en-GB", { weekday: "short" })}`,
      note: "The Sunday send-off, priced per plate.",
    },
  ];

  return rows.map((row) => {
    let bucket: Popup["bucket"];
    if (row.id === "p-1" || row.id === "p-2") bucket = "live";
    else if (row.id === "p-3" || row.id === "p-4") bucket = "today";
    else bucket = "weekend";
    return { ...row, bucket };
  });
}

export function searchVenues(query: string, venues: Venue[]): Venue[] {
  const q = query.trim().toLowerCase();
  if (!q) return venues;
  return venues.filter(
    (v) =>
      v.name.toLowerCase().includes(q) ||
      v.neighborhood.toLowerCase().includes(q) ||
      v.vibe.toLowerCase().includes(q) ||
      v.tags.some((t) => t.toLowerCase().includes(q)),
  );
}