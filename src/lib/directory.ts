export type DirectoryCategory = "food" | "wellness" | "essential";

export type TrustStatus = "vetted" | "checking" | "flagged";
export type VenueStatus = "pending_review" | "verified" | "rejected" | TrustStatus;

export interface Venue {
  id: string;
  name: string;
  neighborhood: string;
  category: DirectoryCategory;
  vibe: string;
  tags: string[];
  trustScore: number;
  status: VenueStatus;
  priceLevel: number;
  priceNote: string;
  openHours: string;
  lastPriceChecked: string;
  // Encyclopedia-style editorial fields.
  notable: string;
  history: string;
  practical: string;
  insider: string;
  bookingUrl?: string;
  phone?: string;
  // AI Pipeline metadata fields
  ai_trust_score?: number;
  authenticity_flags?: string[];
  source_urls?: string[];
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

export const TRUST_STATUS_LABEL: Record<VenueStatus, string> = {
  vetted: "Vetted",
  verified: "Verified",
  checking: "Checking",
  flagged: "Flagged",
  pending_review: "Pending Review",
  rejected: "Rejected",
};

// Seed rows for the living city directory (Abuja launch lock), including pending discovery queue items
export const CITY_VENUES: Venue[] = [
  // ---- Food (Verified) ----
  {
    id: "v-001",
    name: "Bukka Hut",
    neighborhood: "Wuse",
    category: "food",
    vibe: "Bukka-style Nigerian plates, fast and friendly",
    tags: ["nigerian", "jollof", "breakfast"],
    trustScore: 88,
    status: "verified",
    priceLevel: 2,
    priceNote: "₦2,500–₦4,500 mains",
    openHours: "Daily 8am–10pm",
    lastPriceChecked: "2026-09-05",
    notable:
      "The chain that taught quick Nigerian food to taste like home — the lunch jollof line forms by 1pm on purpose.",
    history:
      "Started as a single shop serving home-style staples to office crowds, it grew into Abuja's most trusted quick-Nigerian kitchen.",
    practical:
      "On Aminu Kano Crescent, Wuse. Ten minutes from the Wuse hotels; Bolt ₦1,200–₦2,000 from central Wuse.",
    insider: "Ask what came off the pot this morning — the specials board moves faster than the menu.",
  },
  {
    id: "v-002",
    name: "Nkoyo",
    neighborhood: "Maitama",
    category: "food",
    vibe: "Calabar kitchen, quiet room, real pepper",
    tags: ["nigerian", "calabar", "seafood"],
    trustScore: 92,
    status: "verified",
    priceLevel: 3,
    priceNote: "₦8,000–₦15,000 mains",
    openHours: "Tue–Sun 12pm–10.30pm",
    lastPriceChecked: "2026-09-01",
    notable:
      "White-cloth dining that refuses to apologize for traditional spice levels — the seafood okra is an institution.",
    history:
      "Founded when Maitama dining was mostly continental imports, Nkoyo proved local recipes belong in high rooms.",
    practical:
      "Millennium Park complex, Maitama side entrance. Bolt ₦1,500–₦2,500 from Wuse 2.",
    insider: "Book the terrace tables facing the garden if you want to actually hear your guest.",
  },
  {
    id: "v-003",
    name: "Point & Kill Suya",
    neighborhood: "Wuse Market",
    category: "food",
    vibe: "Smoke, newspaper wrapping, midnight crowd",
    tags: ["suya", "street-food", "late-night"],
    trustScore: 89,
    status: "verified",
    priceLevel: 1,
    priceNote: "₦1,000–₦2,500 a bundle",
    openHours: "Daily 5pm–2am",
    lastPriceChecked: "2026-09-08",
    notable:
      "The open-air grill where the meat is chosen raw from the slab and charred over peanut yaji dust.",
    history:
      "Decades of charcoal smoke have seasoned the concrete posts around the Wuse market edge.",
    practical:
      "Wuse Market livestock / suya gate off Danladi Usman St. Bolt drop at the perimeter gate.",
    insider: "Ask for 'mixed' (liver, kidney, flank) and extra yaji folded into a separate piece of paper.",
  },
  {
    id: "v-004",
    name: "Yellow Chilli",
    neighborhood: "Maitama",
    category: "food",
    vibe: "Refined Nigerian seafood and pepper soup",
    tags: ["seafood", "nigerian", "refined"],
    trustScore: 94,
    status: "verified",
    priceLevel: 3,
    priceNote: "₦12,000–₦22,000 mains",
    openHours: "Daily 12pm–11pm",
    lastPriceChecked: "2026-09-03",
    notable:
      "Known across the capital for seafood okra and coconut rice that balances spice with rich aromatics.",
    history:
      "A Lagos favorite that expanded to Abuja, bringing upscale West African coastal dining to Maitama.",
    practical:
      "Ahmadu Bello Way, Maitama. Ample secure parking and straightforward taxi access.",
    insider: "The seafood pepper soup is unmatched on rainy Abuja evenings.",
  },
  // ---- Wellness (Verified) ----
  {
    id: "v-101",
    name: "Thought Pyramid Art Centre",
    neighborhood: "Wuse 2",
    category: "wellness",
    vibe: "Three floors of contemporary Nigerian canvases and quiet corners",
    tags: ["art", "gallery", "quiet"],
    trustScore: 90,
    status: "verified",
    priceLevel: 1,
    priceNote: "Free entry",
    openHours: "Mon–Sat 9am–6pm",
    lastPriceChecked: "2026-08-30",
    notable:
      "A working gallery where you can sit with emerging Nigerian painters without anyone asking you to buy.",
    history:
      "Built as a sanctuary for contemporary visual artists working outside commercial pressure.",
    practical:
      "18 Libreville St, Wuse 2. Quiet street, easy Bolt turnaround.",
    insider: "The back garden nook has better seating than the indoor benches.",
  },
  {
    id: "v-102",
    name: "Millennium Park",
    neighborhood: "Maitama",
    category: "wellness",
    vibe: "Roll turf, shaded paths, river edge",
    tags: ["park", "nature", "walk"],
    trustScore: 93,
    status: "verified",
    priceLevel: 1,
    priceNote: "Free entry",
    openHours: "Daily 8am–7pm",
    lastPriceChecked: "2026-09-04",
    notable:
      "Queen Elizabeth II commissioned the park; Abuja locals use it to walk off Sunday afternoons.",
    history:
      "The capital's primary green lung, separating the Transcorp side from the diplomatic zone.",
    practical:
      "Main gate off Mamman Vatsa Way, Maitama.",
    insider: "Enter via the side gate near the river bridge to avoid the main weekend football crowds.",
  },
  // ---- Essential Services (Verified) ----
  {
    id: "v-201",
    name: "National Mosque Courtyard",
    neighborhood: "Central Business District",
    category: "essential",
    vibe: "Golden domes, towering minarets, serene sanctuary",
    tags: ["architecture", "landmark", "peace"],
    trustScore: 92,
    status: "verified",
    priceLevel: 1,
    priceNote: "Free entry",
    openHours: "Daily outside prayer hours",
    lastPriceChecked: "2026-08-28",
    notable:
      "An architectural landmark dominating the city axis with magnificent courtyards.",
    history:
      "Completed in the 1980s as the spiritual heart of the new federal capital.",
    practical:
      "Independence Ave, Central Business District.",
    insider: "Respect dress codes; modest robes are available at the welcome desk.",
  },
  // ---- Pending Discovery Queue (AI Pipeline Mocks) ----
  {
    id: "v-pending-1",
    name: "Zuma Rock Viewpoint Cafe",
    neighborhood: "Madalla",
    category: "food",
    vibe: "Open-air monolith viewing spot with local coffee",
    tags: ["cafe", "views", "roadtrip"],
    trustScore: 78,
    status: "pending_review",
    priceLevel: 2,
    priceNote: "₦3,000–₦6,000",
    openHours: "Sat–Sun 10am–6pm",
    lastPriceChecked: "2026-09-15",
    notable: "Newly surfaced pop-up coffee stand right across from Zuma Rock monolith.",
    history: "Scraped from recent Instagram travel reels and local blogger check-ins.",
    practical: "Along the Abuja-Kaduna highway, outside city limits.",
    insider: "AI pipeline flagged low review volume but strong visual sentiment.",
    ai_trust_score: 74,
    authenticity_flags: ["Low review volume", "Out-of-town location"],
    source_urls: ["https://instagram.com/explore/tags/abujacafes", "https://twitter.com/abujaeats"],
  },
  {
    id: "v-pending-2",
    name: "Garki Rooftop Bistro",
    neighborhood: "Garki II",
    category: "food",
    vibe: "Sunset cocktails and small plates over Garki market",
    tags: ["rooftop", "cocktails", "nightlife"],
    trustScore: 82,
    status: "pending_review",
    priceLevel: 3,
    priceNote: "₦10,000–₦18,000",
    openHours: "Thu–Sun 5pm–12am",
    lastPriceChecked: "2026-09-14",
    notable: "Experimental rooftop lounge perched above commercial Garki II blocks.",
    history: "Discovered via automated web scrapers tracking new permits and nightlife chatter.",
    practical: "Sector 2, Garki II. Access via rear commercial elevator.",
    insider: "AI flagged unverified phone number and sketchy operating hours.",
    ai_trust_score: 81,
    authenticity_flags: ["Sketchy hours", "Unverified phone number"],
    source_urls: ["https://instagram.com/p/abujapopups2026"],
  },
  {
    id: "v-pending-3",
    name: "Asokoro Botanical Walkway",
    neighborhood: "Asokoro",
    category: "wellness",
    vibe: "Secluded nature trail behind diplomatic residential zones",
    tags: ["nature", "trail", "wellness"],
    trustScore: 85,
    status: "pending_review",
    priceLevel: 1,
    priceNote: "Free access",
    openHours: "Daily 7am–5pm",
    lastPriceChecked: "2026-09-12",
    notable: "Quiet ravine trail maintained by local environmental volunteers.",
    history: "Cross-referenced from community hiking groups and satellite mapping.",
    practical: "Extension street behind Asokoro rock formations.",
    insider: "High AI trust score due to consistent GPS check-ins from hikers.",
    ai_trust_score: 92,
    authenticity_flags: [],
    source_urls: ["https://strava.com/segments/abuja-trails"],
  },
];

export function getVerifiedVenues(venues: Venue[] = CITY_VENUES): Venue[] {
  return venues.filter((v) => v.status === "verified" || v.status === "vetted");
}

export const NEIGHBORHOODS: string[] = [
  ...new Set(getVerifiedVenues().map((v) => v.neighborhood)),
].sort();

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
      venueId: "v-001",
      title: "Off-menu jollof tasting, live from the pot",
      neighborhood: "Wuse",
      timeLabel: `now until ${time(liveEnd)}`,
      note: "Three jollof styles, one opinionated server.",
    },
    {
      id: "p-2",
      venueId: "v-003",
      title: "Suya busy hour — go now, skip the 8pm queue",
      neighborhood: "Wuse Market",
      timeLabel: `now until ${time(liveEnd)}`,
      note: "Fresh skewers on the stand and the crowd is still thin.",
    },
    {
      id: "p-3",
      venueId: "v-002",
      title: "Seafood okra special paired with palm wine",
      neighborhood: "Maitama",
      timeLabel: `12pm–3pm · ${at(today, 12).toLocaleDateString("en-GB", { weekday: "short" })}`,
      note: "Fresh catch straight from the coastal kitchen.",
    },
    {
      id: "p-4",
      venueId: "v-101",
      title: "Open gallery studio talk with resident artists",
      neighborhood: "Wuse 2",
      timeLabel: `2pm–5pm · ${at(saturday, 14).toLocaleDateString("en-GB", { weekday: "short" })}`,
      note: "Three floors of contemporary canvases and casual conversation.",
    },
  ];

  return rows.map((row) => {
    let bucket: Popup["bucket"];
    if (row.id === "p-1" || row.id === "p-2") bucket = "live";
    else if (row.id === "p-3") bucket = "today";
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
      v.notable.toLowerCase().includes(q) ||
      v.history.toLowerCase().includes(q) ||
      v.tags.some((t) => t.toLowerCase().includes(q)),
  );
}
