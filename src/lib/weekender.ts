export type VenueCategory =
  | "food"
  | "drinks"
  | "culture"
  | "nightlife"
  | "outdoor"
  | "retail"
  | "wellbeing";

export type BudgetTier = "thrifty" | "midrange" | "splurge";

export type SlotId = "fri-pm" | "sat-am" | "sat-pm" | "sat-night" | "sun-am" | "sun-pm";

export interface WeekenderStop {
  venue: string;
  neighborhood: string;
  category: VenueCategory;
  budgetTier: BudgetTier;
  trustScore: number;
  dwellMinutes: number;
  slot: SlotId;
  why: string;
  tip: string;
  priceNote: string;
}

export interface BudgetSplit {
  stop: number;
  food: number;
  transport: number;
  buffer: number;
}

export interface WeekenderPersona {
  slug: string;
  label: string;
  title: string;
  profile: string;
  tagline: string;
  currency: string;
  budgetMin: number;
  budgetMax: number;
  split: BudgetSplit;
  stops: WeekenderStop[];
}

export const PERSONAS: WeekenderPersona[] = [
  {
    slug: "budget",
    label: "Budget",
    title: "The Thrifty Lagos Weekend",
    profile: "Solo, moving fast, backpack stays on",
    tagline:
      "Six stops, zero fluff, and a weekend that reads like a receipt — every entry free or under ₦3,000.",
    currency: "NGN",
    budgetMin: 25000,
    budgetMax: 45000,
    split: { stop: 12000, food: 16000, transport: 5000, buffer: 2000 },
    stops: [
      {
        venue: "Nike Art Gallery",
        neighborhood: "Lekki",
        category: "culture",
        budgetTier: "thrifty",
        trustScore: 92,
        dwellMinutes: 45,
        slot: "fri-pm",
        why: "Three floors of contemporary African art, and the artists are sometimes in the room. Entry is free — the best art ticket in Lagos is no ticket.",
        tip: "If it's quiet, ask for a free guided walk-through; the collecting story is half the show.",
        priceNote: "Free entry",
      },
      {
        venue: "Lekki Conservation Centre",
        neighborhood: "Lekki",
        category: "outdoor",
        budgetTier: "midrange",
        trustScore: 95,
        dwellMinutes: 90,
        slot: "sat-am",
        why: "The canopy walkway over the rainforest — the one splurge that buys a proper view, not a hype video.",
        tip: "Arrive at 9am to beat the school bus rush and the heat.",
        priceNote: "₦2,000 entry",
      },
      {
        venue: "Tarkwa Bay",
        neighborhood: "Tarkwa Bay",
        category: "outdoor",
        budgetTier: "thrifty",
        trustScore: 88,
        dwellMinutes: 150,
        slot: "sat-pm",
        why: "A beach you can actually afford: ₦500 boat ride, then hours of sand that belongs to nobody rich.",
        tip: "Take the last boat back before sundown — it waits for no one.",
        priceNote: "₦500 shared boat",
      },
      {
        venue: "New Afrika Shrine",
        neighborhood: "Agege",
        category: "nightlife",
        budgetTier: "midrange",
        trustScore: 90,
        dwellMinutes: 120,
        slot: "sat-night",
        why: "The loudest, proudest live-music night in Lagos, and the entry fee stays small even on band nights.",
        tip: "Cover is cheaper before 9pm; bring cash for the gate.",
        priceNote: "₦3,000 on band nights",
      },
      {
        venue: "Freedom Park",
        neighborhood: "Lagos Island",
        category: "culture",
        budgetTier: "thrifty",
        trustScore: 93,
        dwellMinutes: 90,
        slot: "sun-am",
        why: "A colonial prison turned public square — heritage you can wander through for pocket change.",
        tip: "Go before noon while the columns are still in shade.",
        priceNote: "₦500 entry",
      },
      {
        venue: "Mama Cass",
        neighborhood: "Lekki",
        category: "food",
        budgetTier: "thrifty",
        trustScore: 87,
        dwellMinutes: 45,
        slot: "sun-pm",
        why: "A plates-and-chops ritual to close the weekend: big portions, honest prices, no eco-cover.",
        tip: "Share two mains between three people and it's a tasting menu.",
        priceNote: "₦1,500–₦2,500 mains",
      },
    ],
  },
  {
    slug: "couples",
    label: "Couples",
    title: "The Couples' Lagos Weekend",
    profile: "Two of you, slower pace, date-night money set aside",
    tagline:
      "A weekend that treats romance like a line item — budgeted, bookable, and zero surprises at the bill.",
    currency: "NGN",
    budgetMin: 85000,
    budgetMax: 135000,
    split: { stop: 60000, food: 45000, transport: 8000, buffer: 12000 },
    stops: [
      {
        venue: "Jara",
        neighborhood: "Ikoyi",
        category: "drinks",
        budgetTier: "midrange",
        trustScore: 90,
        dwellMinutes: 90,
        slot: "fri-pm",
        why: "A bookstore that loosens its collar after dark — start the weekend slow, with jazz and a well-poured glass.",
        tip: "Book the courtyard seats; the indoor bar crowd forms fast.",
        priceNote: "₦35k–₦55k for two with drinks",
      },
      {
        venue: "Lekki Arts & Crafts Market",
        neighborhood: "Lekki",
        category: "retail",
        budgetTier: "thrifty",
        trustScore: 85,
        dwellMinutes: 75,
        slot: "sat-am",
        why: "The only souvenir stop worth a couples budget: haggle together, win together, carry home something real.",
        tip: "Decide your walk-away price before you start — the fun is the haggling.",
        priceNote: "Budget ₦10k for keepsakes",
      },
      {
        venue: "LaSoufiane",
        neighborhood: "Victoria Island",
        category: "food",
        budgetTier: "splurge",
        trustScore: 92,
        dwellMinutes: 120,
        slot: "sat-pm",
        why: "The long-lunch splurge the budget exists for: bright plates, calm room, and time to actually talk.",
        tip: "Reserve ahead; Saturday walk-ins wait.",
        priceNote: "₦45k–₦65k for two",
      },
      {
        venue: "Bar Times",
        neighborhood: "Victoria Island",
        category: "drinks",
        budgetTier: "midrange",
        trustScore: 86,
        dwellMinutes: 90,
        slot: "sat-night",
        why: "Fresh seafood and loud laughter two minutes from your hotel — end Saturday on a high, not a hunt.",
        tip: "Order the grilled prawns for the table; split everything.",
        priceNote: "₦18k–₦28k for two",
      },
      {
        venue: "Tarkwa Bay",
        neighborhood: "Tarkwa Bay",
        category: "outdoor",
        budgetTier: "thrifty",
        trustScore: 88,
        dwellMinutes: 180,
        slot: "sun-am",
        why: "A lazy beach morning that costs less than a room-service coffee: boat out, blanket down, phone away.",
        tip: "Pack breakfast and water — the vendors arrive late on Sundays.",
        priceNote: "₦500 boat each",
      },
      {
        venue: "Cafe Neo",
        neighborhood: "VGC",
        category: "food",
        budgetTier: "midrange",
        trustScore: 84,
        dwellMinutes: 60,
        slot: "sun-pm",
        why: "One last quiet sit-down before the traffic claims the road — easy food, easy goodbye.",
        tip: "Order the weekend-only cake slice; you earned it.",
        priceNote: "₦15k–₦25k for two",
      },
    ],
  },
  {
    slug: "culture",
    label: "Culture",
    title: "The Culture Lagos Weekend",
    profile: "Gallery walls, live stages, and the stories behind them",
    tagline:
      "Museums, shrines, and jazz rooms — a weekend of evidence that Lagos argues with everyone and loses to no one.",
    currency: "NGN",
    budgetMin: 40000,
    budgetMax: 65000,
    split: { stop: 14000, food: 30000, transport: 7000, buffer: 4000 },
    stops: [
      {
        venue: "Freedom Park",
        neighborhood: "Lagos Island",
        category: "culture",
        budgetTier: "thrifty",
        trustScore: 93,
        dwellMinutes: 90,
        slot: "fri-pm",
        why: "Friday-night heritage with live acts in the old prison yard — the city's memory, out loud.",
        tip: "Check the Friday lineup on their page before heading over.",
        priceNote: "₦500 entry; live acts on Fridays",
      },
      {
        venue: "Nike Art Gallery",
        neighborhood: "Lekki",
        category: "culture",
        budgetTier: "thrifty",
        trustScore: 92,
        dwellMinutes: 60,
        slot: "sat-am",
        why: "The biggest solo gallery in West Africa lets you wander for free — a masterclass in Nigerian colour and scale.",
        tip: "Buy a small print direct from the artists' corner; prices start low.",
        priceNote: "Free entry",
      },
      {
        venue: "Terra Kulture",
        neighborhood: "Victoria Island",
        category: "culture",
        budgetTier: "midrange",
        trustScore: 91,
        dwellMinutes: 90,
        slot: "sat-pm",
        why: "The cultural living room of Lagos: art, books, and a theatre that keeps the Saturday matinee calendar busy.",
        tip: "Book matinee seats a day ahead; they sell out quietly.",
        priceNote: "₦5,000+ for shows",
      },
      {
        venue: "New Afrika Shrine",
        neighborhood: "Agege",
        category: "nightlife",
        budgetTier: "midrange",
        trustScore: 90,
        dwellMinutes: 150,
        slot: "sat-night",
        why: "Two hours of the weekend's loudest sermon on why Nigeria survives its own noise — the shrine is non-negotiable.",
        tip: "Get there before 10pm for the band's opening set.",
        priceNote: "₦3,000 entry on band nights",
      },
      {
        venue: "National Museum Lagos",
        neighborhood: "Onikan",
        category: "culture",
        budgetTier: "midrange",
        trustScore: 89,
        dwellMinutes: 90,
        slot: "sun-am",
        why: "Sober proof of the city's long story, from bronzes to colonial rooms — quiet when everyone else is in church.",
        tip: "Ask the attendants for the Benin bronzes; they're the crown.",
        priceNote: "₦2,000 entry",
      },
      {
        venue: "Kalabash",
        neighborhood: "Surulere",
        category: "food",
        budgetTier: "midrange",
        trustScore: 87,
        dwellMinutes: 60,
        slot: "sun-pm",
        why: "A proper Nigerian send-off plate before the flights and the week — food that tastes like a conversation.",
        tip: "Order the ogbono; it's the quiet champion of the menu.",
        priceNote: "₦8k–₦12k",
      },
    ],
  },
];

export function getPersona(slug?: string): WeekenderPersona {
  return PERSONAS.find((p) => p.slug === slug) ?? PERSONAS[0];
}

export function formatMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}

export function formatDwell(minutes: number): string {
  if (minutes % 60 === 0) return `${minutes / 60} hr${minutes === 60 ? "" : "s"}`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hrs > 0 ? `${hrs} hr ${mins} min` : `${mins} min`;
}

export function totalDwell(stops: WeekenderStop[]): number {
  return stops.reduce((sum, s) => sum + s.dwellMinutes, 0);
}

const SLOT_DAY: Record<SlotId, string> = {
  "fri-pm": "Friday",
  "sat-am": "Saturday",
  "sat-pm": "Saturday",
  "sat-night": "Saturday",
  "sun-am": "Sunday",
  "sun-pm": "Sunday",
};

const SLOT_WHEN: Record<SlotId, string> = {
  "fri-pm": "Evening",
  "sat-am": "Morning",
  "sat-pm": "Afternoon",
  "sat-night": "Night",
  "sun-am": "Morning",
  "sun-pm": "Afternoon",
};

export interface DayGroup {
  day: string;
  slots: { slot: SlotId; when: string; stops: WeekenderStop[] }[];
}

export function groupStops(stops: WeekenderStop[]): DayGroup[] {
  const days = ["Friday", "Saturday", "Sunday"] as const;
  return days
    .map((day) => {
      const slots = (Object.keys(SLOT_WHEN) as SlotId[])
        .filter((slot) => SLOT_DAY[slot] === day)
        .map((slot) => ({
          slot,
          when: SLOT_WHEN[slot],
          stops: stops.filter((s) => s.slot === slot),
        }))
        .filter((g) => g.stops.length > 0);
      return { day, slots };
    })
    .filter((g) => g.slots.length > 0);
}

export function getDropWeek(): { expiresLabel: string } {
  const now = new Date();
  const daysUntilFriday = ((5 - now.getDay()) + 7) % 7;
  const friday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilFriday);
  const sunday = new Date(friday);
  sunday.setDate(sunday.getDate() + 2);
  return { expiresLabel: sunday.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }) };
}