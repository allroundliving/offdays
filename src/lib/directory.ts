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
  // Encyclopedia-style editorial fields.
  notable: string;
  history: string;
  practical: string;
  insider: string;
  // Action triggers. `bookingUrl` only ever ships a verified link; `phone`
  // only ships a desk number we can actually ring. Rows without either stay
  // in-app (the request/desk flow) instead of inventing a dead link.
  bookingUrl?: string;
  phone?: string;
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

// Seed rows for the living city directory (Abuja launch lock). In production
// these are `public.venues` rows — price-checked, de-duplicated, flagged when
// stale. Fields mirror the editorial card: what makes it notable, the
// backstory, getting-there practicalities, and an insider note.
export const CITY_VENUES: Venue[] = [
  // ---- Food ----
  {
    id: "v-001",
    name: "Bukka Hut",
    neighborhood: "Wuse",
    category: "food",
    vibe: "Bukka-style Nigerian plates, fast and friendly",
    tags: ["nigerian", "jollof", "breakfast"],
    trustScore: 88,
    status: "vetted",
    priceLevel: 2,
    priceNote: "₦2,500–₦4,500 mains",
    openHours: "Daily 8am–10pm",
    lastPriceChecked: "2026-09-05",
    notable:
      "The chain that taught quick Nigerian food to taste like home — the lunch jollof line forms by 1pm on purpose.",
    history:
      "Started as a single shop serving home-style staples to office crowds, it grew into Abuja's most trusted quick-Nigerian kitchen — a reliability story in a city that moves food fast.",
    practical:
      "On Aminu Kano Crescent, Wuse. Ten minutes from the Wuse hotels; Bolt ₦1,200–₦2,000 from central Wuse, walkable from the market.",
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
    status: "vetted",
    priceLevel: 3,
    priceNote: "₦8k–₦15k mains",
    openHours: "Daily 11am–10pm",
    lastPriceChecked: "2026-09-06",
    notable:
      "The capital's calmest Calabar table — Efik classics done with restraint, and a room quiet enough to actually talk.",
    history:
      "Nkoyo earned its name feeding the civil-service crowd on weekdays before the weekend dinner reservations found it; the kitchen never chased the noise.",
    practical:
      "Off Blantyre Street, Maitama. Roughly 15 minutes from the Central District; Bolt ₦1,500–₦2,500. Reserve for weekend evenings.",
    insider: "Order the ukodo before anything else — the unglamorous champion of the menu.",
  },
  {
    id: "v-003",
    name: "Point & Kill Suya",
    neighborhood: "Wuse Market",
    category: "food",
    vibe: "Suya by skewer, wrapped in yesterday's news",
    tags: ["suya", "street", "cash"],
    trustScore: 89,
    status: "vetted",
    priceLevel: 1,
    priceNote: "₦1,000–₦2,500 a bundle",
    openHours: "Daily 4pm–11pm",
    lastPriceChecked: "2026-09-05",
    notable:
      "The suya stand locals locate by smell before deciding by name — nothing über here but the pepper.",
    history:
      "Suya is the north's great street argument, and this stand has held one side of it on Wuse Market's edge for years.",
    practical:
      "Inside Wuse Market, Gaza-road gate. Bring cash; the queue peaks 6–8pm. Bolt to the market gate ₦1,000–₦1,800.",
    insider: "Ask for the mixed bag — dipped suya with extra yaji and onions, wrapped to go.",
  },
  {
    id: "v-004",
    name: "Yellow Chilli Maitama",
    neighborhood: "Maitama",
    category: "food",
    vibe: "Nigerian fine-dining for nights that matter",
    tags: ["nigerian", "fine-dining", "reservations"],
    trustScore: 91,
    status: "vetted",
    priceLevel: 3,
    priceNote: "₦8k–₦18k mains",
    openHours: "Mon–Sun 11am–10pm",
    lastPriceChecked: "2026-09-06",
    notable:
      "Where the city dresses up for Nigerian food instead of the other way round — plates you photograph and then actually finish.",
    history:
      "The Abuja outpost of the Lagos institution, settled into Maitama to own the capital's date-night calendar.",
    practical:
      "On Gana Street, Maitama. About ten minutes from Asokoro; Bolt ₦1,200–₦2,000. Weekend dinners need a reservation.",
    insider: "The weekday set menu quietly beats the a-la-carte on value — ask, it isn't advertised.",
  },
  {
    id: "v-005",
    name: "Chubby's Chicken",
    neighborhood: "Garki II",
    category: "food",
    vibe: "Fried chicken that made fast food respectable",
    tags: ["fast-food", "fried-chicken", "family"],
    trustScore: 85,
    status: "vetted",
    priceLevel: 1,
    priceNote: "₦1,500–₦3,000 platters",
    openHours: "Daily 9am–10pm",
    lastPriceChecked: "2026-09-04",
    notable:
      "The Abuja-born chicken chain — chunks of fried chicken that landed like a homegrown answer to the imported giants.",
    history:
      "Born in Abuja and grown branch by neighbourhood branch, Chubby's is the local success story against the franchise logos.",
    practical:
      "On Aminu Kano Way, Garki II, minutes off the main roundabout; Bolt ₦800–₦1,400.",
    insider: "The midday chicken+side combo is the regulars' pick; ask before you read the board.",
  },
  {
    id: "v-006",
    name: "Bole Spot Central",
    neighborhood: "Jabi",
    category: "food",
    vibe: "Roasted plantain and smoky fish by the water",
    tags: ["street", "bole", "lakeside"],
    trustScore: 86,
    status: "vetted",
    priceLevel: 1,
    priceNote: "₦1,500–₦2,500 per plate",
    openHours: "Daily 3pm–9pm",
    lastPriceChecked: "2026-09-06",
    notable:
      "Bole and fish under a canopy on Jabi's north shore — the sound of Abuja relaxing on a Friday.",
    history:
      "Street bole made the long journey from roadside to lakeside and landed on the Jabi shore, feeding the weekend crowd before the malls ever did.",
    practical:
      "Jabi Lake north shore, near the boat ramp; Bolt from Wuse ₦1,200–₦1,800. Cash only.",
    insider: "Order the fish 'soft' — slow-roasted rather than flash-grilled — and accept the extra ten minutes.",
  },
  {
    id: "v-007",
    name: "The Creamhouse",
    neighborhood: "Wuse 2",
    category: "food",
    vibe: "Coffee, cakes, and quiet corners",
    tags: ["coffee", "dessert", "meetings"],
    trustScore: 84,
    status: "checking",
    priceLevel: 2,
    priceNote: "₦2,500–₦5,500",
    openHours: "Mon–Sun 8am–9pm",
    lastPriceChecked: "2026-08-27",
    notable:
      "The dessert counter people cross town for; the coffee is the bonus it built the queue around.",
    history:
      "A hobby bakery that outgrew its kitchen and settled into Wuse 2 — now the caffeine stop between meetings.",
    practical:
      "On Ademola Adetokunbo Street, Wuse 2; easy Bolt drop-off at ₦1,200–₦1,800 from central Wuse.",
    insider: "The weekend cake slice is a different list from the weekday one — always ask.",
  },
  {
    id: "v-008",
    name: "Pistis Place",
    neighborhood: "Garki",
    category: "food",
    vibe: "Generous Nigerian mains at civil-servant prices",
    tags: ["nigerian", "lunch", "oxtail"],
    trustScore: 87,
    status: "vetted",
    priceLevel: 2,
    priceNote: "₦3k–₦6k per head",
    openHours: "Daily 11am–9pm",
    lastPriceChecked: "2026-09-03",
    notable:
      "The Garki eatery where the portions have not shrunk since 2019 — a rare pact in a shrinking-plate town.",
    history:
      "Built on the lunch rush of government workers who wanted a reliable plate, not a performance.",
    practical:
      "Near Aminu Kano Way, Garki, two minutes off the roundabout; Bolt ₦800–₦1,300.",
    insider: "The oxtail is pre-booked by 1pm on Fridays — order at midday.",
  },

  // ---- Wellness ----
  {
    id: "v-101",
    name: "Serene Spa & Steam",
    neighborhood: "Garki II",
    category: "wellness",
    vibe: "Steam, cold towels, and a strict no-phone zone",
    tags: ["spa", "sauna", "treatment"],
    trustScore: 85,
    status: "vetted",
    priceLevel: 3,
    priceNote: "₦12k–₦25k treatments",
    openHours: "Daily 9am–9pm",
    lastPriceChecked: "2026-09-05",
    notable:
      "Abuja's most unpretentious steam room — twenty minutes in and the week's losses stop mattering.",
    history:
      "What began as a private club's steam room opened its doors to the public and kept all of the discretion.",
    practical:
      "Off Kano Avenue, Garki II; Bolt ₦1,000–₦1,600 from the Garki roundabout.",
    insider: "Book the 7am slot — you get the steam room to yourself before the rush.",
  },
  {
    id: "v-102",
    name: "The Yoga Loft",
    neighborhood: "Maitama",
    category: "wellness",
    vibe: "Morning shalas facing the skyline",
    tags: ["yoga", "morning", "mats-rental"],
    trustScore: 83,
    status: "vetted",
    priceLevel: 2,
    priceNote: "₦4k a class · ₦15k weekly",
    openHours: "Mon–Sat 6am–8pm",
    lastPriceChecked: "2026-09-04",
    notable:
      "The studio where the capital's early risers do their deep work on a mat before the meetings start.",
    history:
      "Opened by two teachers who wanted a 6am option in a district of late nights; the sunrise class has never lost its waitlist.",
    practical:
      "Off Blantyre Street, Maitama, above a quiet plaza; Bolt ₦1,200–₦1,800. Mats available to rent.",
    insider: "The 6am flow, not the evening one, is the Loft's true class — arrive five minutes early.",
  },
  {
    id: "v-103",
    name: "Crown Barber Co",
    neighborhood: "Wuse",
    category: "wellness",
    vibe: "Fades with a cooler by the mirror",
    tags: ["barber", "fade", "walk-in"],
    trustScore: 78,
    status: "checking",
    priceLevel: 1,
    priceNote: "₦1,500–₦3,000 cut",
    openHours: "Daily 10am–10pm",
    lastPriceChecked: "2026-08-29",
    notable:
      "The Wuse barber with a queue worth joining — clean lines and a drinks cooler nobody argues with.",
    history:
      "A two-chair shop that outlasted three neighbouring salons by showing up early and closing late.",
    practical:
      "Inside Wuse's old market perimeter; easy walk from the main gate. Bolt ₦900–₦1,500.",
    insider: "Friday evenings are a queue; Tuesday lunchtime is your shave-and-go window.",
  },
  {
    id: "v-104",
    name: "Divas Beauty Room",
    neighborhood: "Gwarinpa",
    category: "wellness",
    vibe: "Braids, lashes, and straight talk",
    tags: ["salon", "braids", "appointments"],
    trustScore: 81,
    status: "vetted",
    priceLevel: 2,
    priceNote: "₦6k braids up",
    openHours: "Tue–Sun 9am–7pm",
    lastPriceChecked: "2026-09-02",
    notable:
      "Gwarinpa's busiest mirror — crowded Saturday appointments and opinions you actually want.",
    history:
      "Grew with the neighbourhood's single-and-relocating crowd, earning loyalty one straight-talk visit at a time.",
    practical:
      "Off 3rd Avenue, Gwarinpa; Bolt from central Abuja ₦3,000–₦4,500. Braids need an appointment, trims walk in.",
    insider: "Book the 9am slot on Saturday; every hour after fills the chair twice over.",
  },
  {
    id: "v-105",
    name: "Fitline Gym & Recovery",
    neighborhood: "Wuse 2",
    category: "wellness",
    vibe: "Iron, ice baths, and day passes that mean it",
    tags: ["gym", "recovery", "day-pass"],
    trustScore: 82,
    status: "vetted",
    priceLevel: 2,
    priceNote: "₦5k day pass",
    openHours: "Mon–Sat 6am–10pm",
    lastPriceChecked: "2026-09-05",
    notable:
      "A real training floor with a recovery corner — cold plunge and all — not a boutique with kettlebells.",
    history:
      "Opened by two competitive lifters who were tired of hotel gyms; the day pass policy has stayed honest since.",
    practical:
      "On Ademola Adetokunbo Street, Wuse 2; Bolt ₦1,200–₦1,800. Day pass includes the recovery room.",
    insider: "The 6–8am block is locals-only quiet; the 6pm block is the social hour.",
  },
  {
    id: "v-106",
    name: "Solemate Foot Studio",
    neighborhood: "Central District",
    category: "wellness",
    vibe: "The pedicure that resets the whole week",
    tags: ["spa", "feet", "walk-in"],
    trustScore: 79,
    status: "checking",
    priceLevel: 1,
    priceNote: "₦2k–₦5k per session",
    openHours: "Daily 10am–8pm",
    lastPriceChecked: "2026-08-25",
    notable:
      "The foot studio tour guides and diplomats quietly visit — walk-in friendly and surprisingly fast.",
    history:
      "A single-chair idea from a hotel spa therapist who went independent in the Central District.",
    practical:
      "Near the National Hospital approach road; Bolt ₦900–₦1,400 from Central District hotels.",
    insider: "The 10-minute express exists; ask for it instead of waiting for the full-hour slot.",
  },

  // ---- Essential services ----
  {
    id: "v-201",
    name: "National Hospital Abuja",
    neighborhood: "Central District",
    category: "essential",
    vibe: "24-hour walk-in care, no health-ministry theatre",
    tags: ["clinic", "24h", "emergency"],
    trustScore: 94,
    status: "vetted",
    priceLevel: 3,
    priceNote: "Consult ₦8k · basic lab ₦12k",
    openHours: "Open 24 hours",
    lastPriceChecked: "2026-09-06",
    notable:
      "The capital's reference hospital — the department that handles what a pharmacy cannot, around the clock.",
    history:
      "Founded as the apex national hospital, it is where emergency care in Abuja most often lands; its walk-in clinic has served the city for decades.",
    practical:
      "On Plot 425, Aguiyi Ironsi Street, Central District. Bolt ₦1,200–₦2,000 from anywhere central; 24-hour pharmacy at the entrance.",
    insider: "The walk-in clinic is fastest 6am–8am; after 10am the queue finds its own rhythm.",
  },
  {
    id: "v-202",
    name: "SureCare Pharmacy",
    neighborhood: "Wuse",
    category: "essential",
    vibe: "A 24-hour chemist that never shrugs at 2am",
    tags: ["pharmacy", "24h", "refills"],
    trustScore: 90,
    status: "vetted",
    priceLevel: 2,
    priceNote: "Over-the-counter · quotes for chronic lists",
    openHours: "Open 24 hours",
    lastPriceChecked: "2026-09-06",
    notable:
      "Wuse's dependable mid-market chemist — chronic prescriptions quoted in writing, not guessed at the till.",
    history:
      "A family-run chemist that extended to 24 hours after the nearest late-night options kept closing; the neighbourhood never went back.",
    practical:
      "On Aminu Kano Crescent, Wuse, near the market; Bolt ₦900–₦1,500. Bring your prescription list for a written quote.",
    insider: "Call the desk number for a refill quote before the drive — they price over the phone happily.",
  },
  {
    id: "v-203",
    name: "GIGL Courier",
    neighborhood: "Wuse",
    category: "essential",
    vibe: "Same-day parcels, tracking that actually updates",
    tags: ["courier", "logistics", "same-day"],
    trustScore: 90,
    status: "vetted",
    priceLevel: 1,
    priceNote: "From ₦2,500 same-day Abuja",
    openHours: "Mon–Sat 8am–7pm",
    lastPriceChecked: "2026-09-05",
    notable:
      "The national courier with Abuja reliability — same-day drops that update on a map instead of disappearing.",
    history:
      "Built its reputation moving documents around the capital before expanding nationwide; the Wuse branch is its busiest desk.",
    practical:
      "On Ademola Adetokunbo Street, Wuse 2; easiest to book by phone or the app, then drop at the desk.",
    insider: "Book before 11am for genuine same-day; lunchtime drops slip to tomorrow.",
  },
  {
    id: "v-204",
    name: "FixFox Repairs",
    neighborhood: "Garki",
    category: "essential",
    vibe: "Phone surgery done between two sockets and a prayer",
    tags: ["repair", "phone", "data-recovery"],
    trustScore: 76,
    status: "checking",
    priceLevel: 2,
    priceNote: "Screen from ₦18k · quote first",
    openHours: "Mon–Sat 9am–8pm",
    lastPriceChecked: "2026-08-28",
    notable:
      "Garki's fastest screen-and-battery bench — quotes before labour, and honest 'repairable for real' verdicts.",
    history:
      "Grew out of a market stall as parts suppliers got better at the capital's most common repairs.",
    practical:
      "Off Kano Avenue, Garki; the desk is in the second courtyard — follow the phone bits on the windowsill.",
    insider: "Data-recovery sits on a different bench; ask for the specialist, not the screen tech.",
  },
  {
    id: "v-205",
    name: "FreshFold Laundry",
    neighborhood: "Maitama",
    category: "essential",
    vibe: "White shirts back Friday, folded like a gift",
    tags: ["laundry", "dry-cleaning", "pickup"],
    trustScore: 83,
    status: "vetted",
    priceLevel: 1,
    priceNote: "Pickup + fold ₦3k a bag",
    openHours: "Mon–Sat 8am–7pm",
    lastPriceChecked: "2026-09-06",
    notable:
      "Maitama's pickup-and-fold favourite — same-day turnaround on the express list, never a lost sock.",
    history:
      "Started as one machine in a staff quarter and turned into the district's most trusted bag-in-bag-out laundry.",
    practical:
      "Off Blantyre Street, Maitama; they pick up from the hotel desk if you call by 9am.",
    insider: "The express list (shirts, trousers) beats the standard bag when you are leaving Friday.",
  },
  {
    id: "v-206",
    name: "PowerPlus Solutions",
    neighborhood: "Utako",
    category: "essential",
    vibe: "Inverters, power banks, and honest battery advice",
    tags: ["power", "inverter", "rentals"],
    trustScore: 71,
    status: "flagged",
    priceLevel: 2,
    priceNote: "Power-bank rent ₦1k a day",
    openHours: "Mon–Sat 9am–7pm",
    lastPriceChecked: "2026-07-30",
    notable:
      "Utako's power corner — rentals that save an evening and advice that spares you a bad inverter.",
    history:
      "Answered the neighbourhood's eternal 'lights are gone again' question one battery at a time.",
    practical:
      "On the Utako–Jabi link road, near the filling station; Bolt ₦1,000–₦1,600.",
    insider: "Test-run any rental battery at the counter first — the 2am version costs more than the deposit.",
  },
  {
    id: "v-207",
    name: "AutoCare Central",
    neighborhood: "Utako",
    category: "essential",
    vibe: "A mechanic that hands you the old part, not excuses",
    tags: ["mechanic", "inspection", "tyres"],
    trustScore: 67,
    status: "flagged",
    priceLevel: 2,
    priceNote: "Inspection ₦5k · labour quoted",
    openHours: "Mon–Sat 8am–6pm",
    lastPriceChecked: "2026-07-22",
    notable:
      "The Utako workshop that hands you the removed part so you can see what you paid for.",
    history:
      "A three-bay garage that survived the district's boom because it quotes straight and keeps the old part as evidence.",
    practical:
      "Off Obafemi Awolowo Way, Utako industrial strip; Bolt ₦1,000–₦1,600.",
    insider: "Pre-purchase inspections are the specialty — book by morning for a same-day verdict.",
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
      venueId: "v-005",
      title: "Chicken + side combo drop at midday",
      neighborhood: "Garki II",
      timeLabel: `11am–2pm · ${at(today, 11).toLocaleDateString("en-GB", { weekday: "short" })}`,
      note: "The regulars' pick, priced below the board.",
    },
    {
      id: "p-4",
      venueId: "v-202",
      title: "Free blood-pressure checks at the counter",
      neighborhood: "Wuse",
      timeLabel: `10am–3pm · ${at(today, 10).toLocaleDateString("en-GB", { weekday: "short" })}`,
      note: "No appointment, no script needed.",
    },
    {
      id: "p-5",
      venueId: "v-101",
      title: "Steam + cold towels, early-bird rate",
      neighborhood: "Garki II",
      timeLabel: `8am–11am · ${at(saturday, 8).toLocaleDateString("en-GB", { weekday: "short" })}`,
      note: "Weekend morning slot at half the weekday rate.",
    },
    {
      id: "p-6",
      venueId: "v-006",
      title: "Bole & fish by the lake — Saturday side",
      neighborhood: "Jabi",
      timeLabel: `3pm–7pm · ${at(sunday, 15).toLocaleDateString("en-GB", { weekday: "short" })}`,
      note: "Sunday lakeside plates before the road takes the week.",
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
      v.notable.toLowerCase().includes(q) ||
      v.history.toLowerCase().includes(q) ||
      v.tags.some((t) => t.toLowerCase().includes(q)),
  );
}