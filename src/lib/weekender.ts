export type VenueCategory =
  | "food"
  | "drinks"
  | "culture"
  | "nightlife"
  | "outdoor"
  | "retail"
  | "wellbeing";

export type BudgetTier = "thrifty" | "midrange" | "splurge";

export type WeekenderDay = 5 | 6 | 7; // Friday, Saturday, Sunday

export interface WeekenderStop {
  venue: string;
  neighborhood: string;
  category: VenueCategory;
  budgetTier: BudgetTier;
  trustScore: number;
  dwellMinutes: number;
  day: WeekenderDay;
  startTime: string; // "18:00"
  endTime: string; // "20:30"
  why: string;
  fits: string;
  tip: string;
  venueSpend: number; // actual on-site expense, ₦
  transportSpend: number; // estimated Bolt / transport, ₦
  priceNote: string;
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
  stops: WeekenderStop[];
}

export const PERSONAS: WeekenderPersona[] = [
  {
    slug: "budget",
    label: "Budget",
    title: "The Abuja Weekend Without the Hype",
    profile: "Solo or two-up — moving fast, money spent on the right things",
    tagline:
      "Six stops, ₦-honest: free art, cheap suya, a picnic on city grass — and a schedule that reads like a receipt.",
    currency: "NGN",
    budgetMin: 25000,
    budgetMax: 45000,
    stops: [
      {
        venue: "Point & Kill Suya",
        neighborhood: "Wuse Market",
        category: "food",
        budgetTier: "thrifty",
        trustScore: 89,
        dwellMinutes: 90,
        day: 5,
        startTime: "18:00",
        endTime: "20:00",
        why: "Abuja announces itself best in smoke and yaji. Point & Kill hands over skewers of peppered suya wrapped in newspaper, and the queue beside you carries the whole evening's gossip. It is the cheapest proper introduction to the city there is.",
        fits: "This is the opening handshake both for a solo traveller and for two — one bundle feeds you, two bundles could feed a small wedding party.",
        tip: "Bring cash, ask for the mixed bag (dipped, extra yaji), and eat standing beside the stand before it cools.",
        venueSpend: 2500,
        transportSpend: 1500,
        priceNote: "₦1,000–₦2,500 a bundle",
      },
      {
        venue: "Thought Pyramid Art Centre",
        neighborhood: "Wuse 2",
        category: "culture",
        budgetTier: "thrifty",
        trustScore: 90,
        dwellMinutes: 90,
        day: 6,
        startTime: "10:00",
        endTime: "11:30",
        why: "A working gallery where the art changes the way a week in Abuja looks: three floors of Nigerian contemporary work, and the artists are sometimes still in the room. Entry is free — the best cultural ticket in the capital is no ticket.",
        fits: "Heritage belongs in every lens, and this is the budget-proof way in — zero spend, real stakes, no museum fatigue.",
        tip: "If it is quiet, ask whether the artists' corner is taking visitors; the studio stories are half the exhibition.",
        venueSpend: 0,
        transportSpend: 1200,
        priceNote: "Free entry",
      },
      {
        venue: "Millennium Park picnic",
        neighborhood: "Maitama",
        category: "outdoor",
        budgetTier: "thrifty",
        trustScore: 93,
        dwellMinutes: 150,
        day: 6,
        startTime: "12:30",
        endTime: "15:00",
        why: "The city's green lungs on Mamman Vatsa Way: rolled lawns, shaded paths and the Katsina-Ala river at the edge. Instead of paying restaurant margins for lunch, you build it from the morning's suya run and eat it on grass that belongs to everyone.",
        fits: "The picnic is the trick that makes a thrifty weekend feel generous — solo, it is a book-and-beans afternoon; as a pair, it is the cheapest good date in Abuja.",
        tip: "Rope in a bench under a flame tree by 12:30; the school lunch crowd claims the riverside lawn first.",
        venueSpend: 1500,
        transportSpend: 1500,
        priceNote: "Free entry · ₦1,500 picnic bits",
      },
      {
        venue: "National Mosque grounds",
        neighborhood: "Central District",
        category: "culture",
        budgetTier: "thrifty",
        trustScore: 91,
        dwellMinutes: 90,
        day: 6,
        startTime: "19:30",
        endTime: "21:00",
        why: "After dark the mosque's gold dome and four minarets become the neighbourhood's quiet landmark. You walk the outer circuit as the city lights come up — a stretch of Abuja that costs nothing and photographs like it owns the postcards.",
        fits: "A free, calm night cap that keeps the lens cultural without a single naira changing hands — perfect for a solo wander or a slow walk for two.",
        tip: "Stay on the outer grounds and keep the dress code easy; the view from the north gate is the one the locals use.",
        venueSpend: 0,
        transportSpend: 2000,
        priceNote: "Free · outer grounds",
      },
      {
        venue: "Bukka Hut breakfast",
        neighborhood: "Wuse",
        category: "food",
        budgetTier: "thrifty",
        trustScore: 88,
        dwellMinutes: 60,
        day: 7,
        startTime: "08:30",
        endTime: "10:30",
        why: "Bukka-style Nigerian breakfast at plate prices that have not ambushed anyone: moin-moin, akara, yam, proper tea. It is the city's most reliable first meal — the kitchen opens when the early flights land, not when the brunch crowd gathers.",
        fits: "A calm start to leaving-day — light on the wallet for a solo traveller, and an easy table for two without the weekend brunch circus.",
        tip: "The specials board moves first; ask what came off the pot this morning before you order.",
        venueSpend: 3500,
        transportSpend: 1500,
        priceNote: "₦2,500–₦4,500 a plate",
      },
      {
        venue: "Jabi Lake boat",
        neighborhood: "Jabi",
        category: "outdoor",
        budgetTier: "thrifty",
        trustScore: 87,
        dwellMinutes: 120,
        day: 7,
        startTime: "12:00",
        endTime: "14:00",
        why: "A slow lap of Jabi Lake in a shared boat is the cheapest water in West Africa's skylines. The paddlers know the deep spots and the quiet coves, and the shore recedes into a proper Sunday afternoon on purpose.",
        fits: "Solo it is peaceful, two-up it is borderline romantic — both for under a movie ticket.",
        tip: "Share a boat with a pair of paddlers and split the fee; late-morning slots are the calmest.",
        venueSpend: 1500,
        transportSpend: 2000,
        priceNote: "₦1,000–₦1,500 shared boat",
      },
    ],
  },
  {
    slug: "couples",
    label: "Couples",
    title: "The Honest Couples' Weekend",
    profile: "Two of you, slower pace, date money that knows its limits",
    tagline:
      "Not a luxury brochure — a weekend with a real tab: jazz, Calabar plates, a famous rock, and zero surprises at the bill.",
    currency: "NGN",
    budgetMin: 55000,
    budgetMax: 95000,
    stops: [
      {
        venue: "Dixon Brown",
        neighborhood: "Maitama",
        category: "drinks",
        budgetTier: "midrange",
        trustScore: 90,
        dwellMinutes: 120,
        day: 5,
        startTime: "18:00",
        endTime: "20:30",
        why: "The listening room of Abuja: slow jazz, low lamps and a wine list that does not need translating. The crowd is grown, the volume is human, and the weekend starts on a low simmer instead of a shout.",
        fits: "The first date-night slot works because it commits you to nothing but a well-poured glass — romance as a line item, not a performance.",
        tip: "Graze the small plates instead of dinner here; the tab stays sane and the music is the main course.",
        venueSpend: 16000,
        transportSpend: 2500,
        priceNote: "₦8k–₦16k for two with drinks",
      },
      {
        venue: "Nkoyo",
        neighborhood: "Maitama",
        category: "food",
        budgetTier: "midrange",
        trustScore: 92,
        dwellMinutes: 120,
        day: 6,
        startTime: "12:00",
        endTime: "14:30",
        why: "Calabar cooking with its sleeves rolled up: efik classics, real pepper, and a room quiet enough to actually talk. This is the meal the weekend's budget was built for — bright plates, unhurried service, no cover-charge theatre.",
        fits: "Status-y enough to feel like a date, cheap enough to feel sane — the anti-fine-dining romance the couples lens promises.",
        tip: "Order one dish each and swap halfway; the ukodo is the quiet champion of the menu.",
        venueSpend: 18000,
        transportSpend: 2000,
        priceNote: "₦8k–₦15k mains",
      },
      {
        venue: "Aso Rock viewpoint",
        neighborhood: "Asokoro",
        category: "outdoor",
        budgetTier: "thrifty",
        trustScore: 89,
        dwellMinutes: 90,
        day: 6,
        startTime: "16:30",
        endTime: "18:00",
        why: "The iconic slab of Abuja's skyline from the Gana Street overlook: a guide's kiosk, a short sanctioned walk, and the city's geology doing the heavy lifting. It is the picture postcard, and unlike most postcards it is real.",
        fits: "The couples-friendly version of a big sight — half an hour, a small entry ticket, and the best couple-crop in the capital.",
        tip: "Go late afternoon for the warm light on the rock face; the morning tours crowd the overlook.",
        venueSpend: 2000,
        transportSpend: 1500,
        priceNote: "₦1,000 per person entry",
      },
      {
        venue: "Jabi Lake boardwalk",
        neighborhood: "Jabi",
        category: "outdoor",
        budgetTier: "thrifty",
        trustScore: 85,
        dwellMinutes: 120,
        day: 6,
        startTime: "19:00",
        endTime: "21:00",
        why: "Sunset on the Jabi Lake boardwalk, then street suya from the lakeside stalls and the week's loudest laugh sitting on a rail. No reservation, no dress code, no part of the evening that costs like a show.",
        fits: "The unglamorous, un-luxury hour that keeps the couples lens honest — walking, snacking, talking.",
        tip: "The stalls run out of the good skewers by 8pm; buy early and walk.",
        venueSpend: 3000,
        transportSpend: 1500,
        priceNote: "₦1,000–₦3,000 lakeside snacks",
      },
      {
        venue: "Millennium Park morning",
        neighborhood: "Maitama",
        category: "outdoor",
        budgetTier: "thrifty",
        trustScore: 93,
        dwellMinutes: 120,
        day: 7,
        startTime: "08:30",
        endTime: "10:30",
        why: "The park before the world wakes up: empty lawns, birds doing the soundtrack, and coffee from the cart by the east gate. This is the slowest two hours of the weekend and the ones you will actually remember.",
        fits: "A free reset that proves the couples lens runs on walking shoes, not gold cards.",
        tip: "The east-gate coffee cart opens with the park; take two cups and the bench under the flame tree.",
        venueSpend: 2000,
        transportSpend: 0,
        priceNote: "Free entry · ₦2,000 coffee",
      },
      {
        venue: "Bukka Hut sunday lunch",
        neighborhood: "Wuse",
        category: "food",
        budgetTier: "thrifty",
        trustScore: 88,
        dwellMinutes: 75,
        day: 7,
        startTime: "12:00",
        endTime: "14:00",
        why: "One last easy sit-down before the week claims the roads: Nigerian plates, honest portions, and a weekend-ending forkful that does not demand a recount of the weekend budget.",
        fits: "The closing meal that refuses to skew luxury — the couples tab closes in single-digit thousands, on purpose.",
        tip: "The Sunday crowd is post-service quiet; ask for the window seats by the street.",
        venueSpend: 7000,
        transportSpend: 1500,
        priceNote: "₦2,500–₦4,500 a plate",
      },
    ],
  },
  {
    slug: "group",
    label: "Group",
    title: "The Big-Table Abuja Weekend",
    profile: "Four to eight of you, one shared tab, zero consensus drama",
    tagline:
      "A weekend that runs on round tables, shared plates, a famous rock — and a budget agreed up front so nobody sulks at the bill.",
    currency: "NGN",
    budgetMin: 90000,
    budgetMax: 150000,
    stops: [
      {
        venue: "Bukka Hut big table",
        neighborhood: "Wuse",
        category: "food",
        budgetTier: "midrange",
        trustScore: 88,
        dwellMinutes: 180,
        day: 5,
        startTime: "19:00",
        endTime: "22:00",
        why: "The group trip starts where every Nigerian group trip does: a long table and shared plates. Bukka Hut stacks the table and the kitchen keeps pace with the loudest table in the room — the big ordering move spreads the bill thin.",
        fits: "Eight people sharing four mains each is a tasting menu that costs a fraction of a chef's table — the group lens savings move.",
        tip: "Split into two ordering pairs and cross-taste; the kitchen handles volume better than deliberating.",
        venueSpend: 25000,
        transportSpend: 4000,
        priceNote: "Flat-table ₦18k–₦28k for four to six",
      },
      {
        venue: "Thought Pyramid + Wuse Market run",
        neighborhood: "Wuse 2",
        category: "culture",
        budgetTier: "thrifty",
        trustScore: 90,
        dwellMinutes: 160,
        day: 6,
        startTime: "10:00",
        endTime: "13:00",
        why: "The gallery is the cultural anchor and the market is the reality check: forty minutes of contemporary Nigerian art, then thirty minutes of bargaining for keepsakes that actually mean something. Heritage is woven into the group loop, not bolted on as a museum trip.",
        fits: "This is where 'what shal we even do' dies — one stop, two rooms, something for everyone to claim.",
        tip: "Agree walk-away prices in the gallery before you hit the market; the haggling is the sport.",
        venueSpend: 6000,
        transportSpend: 2000,
        priceNote: "Free gallery · ₦6k keepsakes budget",
      },
      {
        venue: "Zuma Rock",
        neighborhood: "Madalla",
        category: "outdoor",
        budgetTier: "midrange",
        trustScore: 92,
        dwellMinutes: 240,
        day: 6,
        startTime: "14:00",
        endTime: "18:00",
        why: "An hour out of the city, the rock the guides call the giant sentinel of Abuja: 725 metres of sheer face that shows up uninvited in every landscape photo. The climb-worthy drama is overrated but the viewpoint is not — take the sanctioned lookout, not the summit.",
        fits: "The one splurge the group budget exists for — a shared bolt there and back splits cheaply across eight people for a once-in-a-trip landmark.",
        tip: "Book the lookout entry before you leave Wuse; weekend slots at the gate get sold out politely.",
        venueSpend: 4000,
        transportSpend: 12000,
        priceNote: "₦500 per head · shared transport",
      },
      {
        venue: "Basalt Lounge",
        neighborhood: "Wuye",
        category: "nightlife",
        budgetTier: "midrange",
        trustScore: 84,
        dwellMinutes: 180,
        day: 6,
        startTime: "21:00",
        endTime: "00:00",
        why: "The group-night out in Wuye: a lounge long enough for the whole crew, a table price that includes the covers, and music loud enough to travel but not so loud you lose the weekend's best recap.",
        fits: "The designated 'let somebody else carry the plan' hour — a table for the squad, nobody stranded at the bar tab.",
        tip: "Locker your bags at the front desk, order the bottle-for-the-table once, and the barman holds your tab.",
        venueSpend: 18000,
        transportSpend: 3000,
        priceNote: "₦12k–₦18k table for six",
      },
      {
        venue: "National Ecumenical Centre gardens",
        neighborhood: "Central District",
        category: "culture",
        budgetTier: "thrifty",
        trustScore: 90,
        dwellMinutes: 90,
        day: 7,
        startTime: "09:30",
        endTime: "11:00",
        why: "The hikers' church, the locals call it: the National Christian Centre's domed roof is a landmark you can walk right up against on a quiet Sunday morning. The gardens frame the city's most photographed silhouette without a ticket booth in sight.",
        fits: "A heritage pause that costs the group nothing and photographs like the closing credits.",
        tip: "Sunday 9am–11am is the calmest window before services swell the grounds.",
        venueSpend: 0,
        transportSpend: 2000,
        priceNote: "Free · outer grounds",
      },
      {
        venue: "Bole & fish by the lake",
        neighborhood: "Jabi",
        category: "food",
        budgetTier: "thrifty",
        trustScore: 86,
        dwellMinutes: 150,
        day: 7,
        startTime: "12:30",
        endTime: "15:00",
        why: "The send-off: roasted plantain, smoky whole fish and a dozen hands over a long table by Jabi's north shore. It is street food with a waterfront address, and the group splits the bill the way the group has survived all weekend — politely, down the middle.",
        fits: "The final big table onto the mini-bus home; the deluxe fish for the table is the group's last great value move.",
        tip: "Order fish 'soft' (slow-roasted) for the table before the 2pm rush; cash only.",
        venueSpend: 16000,
        transportSpend: 3000,
        priceNote: "₦1,500–₦2,500 per head",
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

export function totalVenueSpend(stops: WeekenderStop[]): number {
  return stops.reduce((sum, s) => sum + s.venueSpend, 0);
}

export function totalTransportSpend(stops: WeekenderStop[]): number {
  return stops.reduce((sum, s) => sum + s.transportSpend, 0);
}

export interface DayGroup {
  day: WeekenderDay;
  label: string;
  stops: WeekenderStop[];
}

const DAY_LABEL: Record<WeekenderDay, string> = {
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

export function groupStops(stops: WeekenderStop[]): DayGroup[] {
  return ([5, 6, 7] as WeekenderDay[])
    .map((day) => ({
      day,
      label: DAY_LABEL[day],
      stops: stops
        .filter((s) => s.day === day)
        .sort((a, b) => a.startTime.localeCompare(b.startTime)),
    }))
    .filter((g) => g.stops.length > 0);
}

export interface DropWeek {
  friday: Date;
  saturday: Date;
  sunday: Date;
  fridayLabel: string;
  sundayLabel: string;
}

export function getDropWeek(): DropWeek {
  const now = new Date();
  const daysUntilFriday = ((5 - now.getDay()) + 7) % 7;
  const friday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilFriday);
  const saturday = new Date(friday);
  saturday.setDate(saturday.getDate() + 1);
  const sunday = new Date(friday);
  sunday.setDate(sunday.getDate() + 2);
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" });
  return {
    friday,
    saturday,
    sunday,
    fridayLabel: fmt(friday),
    sundayLabel: fmt(sunday),
  };
}

// The Weekender is open for planning from Wednesday evening through Sunday
// night (local time). Monday/Tuesday it quietly shows the upcoming window.
export function isWeekenderOpen(now: Date): boolean {
  const day = now.getDay();
  return day >= 3 || day === 0;
}

export function slotLabel(stop: WeekenderStop, week: DropWeek): string {
  const dates: Record<WeekenderDay, Date> = {
    5: week.friday,
    6: week.saturday,
    7: week.sunday,
  };
  const d = dates[stop.day];
  const formatTime = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m).toLocaleTimeString(
      "en-US",
      { hour: "numeric", minute: "2-digit" },
    );
  };
  const weekday = d.toLocaleDateString("en-GB", { weekday: "long" });
  return `${weekday}, ${formatTime(stop.startTime)} – ${formatTime(stop.endTime)}`;
}