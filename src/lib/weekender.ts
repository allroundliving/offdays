export type VenueCategory =
  | "food"
  | "drinks"
  | "culture"
  | "nightlife"
  | "outdoor"
  | "retail"
  | "wellbeing";

export type BudgetTier = "thrifty" | "midrange" | "splurge";
export type BudgetTierId = "thrifty" | "moderate" | "comfortable";

export interface BudgetTierMeta {
  id: BudgetTierId;
  label: string;
  rangeLabel: string;
}

export const BUDGET_TIERS: BudgetTierMeta[] = [
  { id: "thrifty", label: "Thrifty", rangeLabel: "≈ ₦25k–₦45k" },
  { id: "moderate", label: "Moderate", rangeLabel: "≈ ₦45k–₦85k" },
  { id: "comfortable", label: "Comfortable", rangeLabel: "≈ ₦90k–₦140k" },
];

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
  transportSpend: number; // estimated Bolt / inDrive, ₦
  priceNote: string;
  // Executive Assistant narrative fields
  prepTime: string;
  transitMode: string; // e.g. "Bolt" or "inDrive"
  fareEstimate: string; // e.g. "₦1,500 – ₦3,000"
  hydrationPrompt: string;
}

export interface TierPlan {
  id: BudgetTierId;
  label: string;
  rangeLabel: string;
  budgetMin: number;
  budgetMax: number;
  stops: WeekenderStop[];
}

export interface WeekenderPersona {
  slug: string;
  label: string;
  title: string;
  profile: string;
  tagline: string;
  currency: string;
  hasTiers: boolean;
  defaultTier: BudgetTierId;
  tiers: Record<BudgetTierId, TierPlan>;
}

export const PERSONAS: WeekenderPersona[] = [
  {
    slug: "budget",
    label: "Budget",
    title: "The Abuja Weekend Without the Hype",
    profile: "Solo or two-up — moving fast, money spent on the right things",
    tagline:
      "Six stops, ₦-honest: free art, cheap suya, a picnic on city grass — inherently the most affordable option by default.",
    currency: "NGN",
    hasTiers: false,
    defaultTier: "thrifty",
    tiers: {
      thrifty: {
        id: "thrifty",
        label: "Thrifty",
        rangeLabel: "≈ ₦22k–₦38k",
        budgetMin: 22000,
        budgetMax: 38000,
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
            why: "Abuja announces itself best in smoke and yaji. Point & Kill hands over skewers of peppered suya wrapped in newspaper.",
            fits: "Why it fits this weekend: Unbeatable baseline entry for explorers looking for honest local flavor without markup.",
            tip: "Bring cash, ask for mixed meat with extra yaji.",
            venueSpend: 2000,
            transportSpend: 1200,
            priceNote: "₦1,000–₦2,000 a bundle",
            prepTime: "5:15 PM: Close laptop, hydrate with 500ml water, and step out.",
            transitMode: "Bolt",
            fareEstimate: "₦1,200 – ₦2,000",
            hydrationPrompt: "Drink 500ml of water before your first suya skewer.",
          },
          {
            venue: "Keza Lounge (Nightcap & Wind Down)",
            neighborhood: "Wuse 2",
            category: "nightlife",
            budgetTier: "thrifty",
            trustScore: 91,
            dwellMinutes: 90,
            day: 5,
            startTime: "20:30",
            endTime: "22:00",
            why: "Lively yet relaxed Wuse 2 lounge setting to wind down Friday night with good ambient music.",
            fits: "Why it fits this weekend: The ideal Friday night lounge stop to transition from the work week.",
            tip: "Grab a chilled malt or local cider and enjoy the open-air seating.",
            venueSpend: 3000,
            transportSpend: 1000,
            priceNote: "₦2k–₦4k drinks",
            prepTime: "8:15 PM: Short transit across Wuse 2. Breathe in the evening air.",
            transitMode: "inDrive",
            fareEstimate: "₦1,000 – ₦1,800",
            hydrationPrompt: "Alternate every drink with a glass of water to stay fresh for Saturday morning.",
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
            why: "Contemporary Nigerian works across three airy floors with rotating local exhibits.",
            fits: "Why it fits this weekend: Zero-cost cultural anchor that sets a thoughtful tone for Saturday morning.",
            tip: "Check out the back studio if artists are installing new pieces.",
            venueSpend: 0,
            transportSpend: 1000,
            priceNote: "Free entry",
            prepTime: "9:30 AM: Handle Saturday morning chores/errands early, then head out refreshed.",
            transitMode: "Bolt",
            fareEstimate: "₦1,000 – ₦1,500",
            hydrationPrompt: "Morning hydration: 400ml water with lemon before gallery walk.",
          },
          {
            venue: "Millennium Park Picnic",
            neighborhood: "Maitama",
            category: "outdoor",
            budgetTier: "thrifty",
            trustScore: 93,
            dwellMinutes: 120,
            day: 6,
            startTime: "12:30",
            endTime: "14:30",
            why: "Manicured lawns and river walkways right in the diplomatic heart.",
            fits: "Why it fits this weekend: Maximum green space for minimal pocket money.",
            tip: "Pack a mat or large scarf to sit on.",
            venueSpend: 1000,
            transportSpend: 1000,
            priceNote: "Gate free · snacks extra",
            prepTime: "12:00 PM: Short hop to Maitama lawns. Grab light park snacks on arrival.",
            transitMode: "inDrive",
            fareEstimate: "₦1,200 – ₦2,000",
            hydrationPrompt: "Keep sipping water under the Maitama shade trees.",
          },
          {
            venue: "Bukka Hut Sunrise Spread",
            neighborhood: "Wuse",
            category: "food",
            budgetTier: "thrifty",
            trustScore: 88,
            dwellMinutes: 75,
            day: 7,
            startTime: "09:00",
            endTime: "10:15",
            why: "Reliable Nigerian breakfast staples served hot and fast.",
            fits: "Why it fits this weekend: Clean, dependable start to Sunday with zero culinary fuss.",
            tip: "Try the yam pottage or classic tea and moi-moi.",
            venueSpend: 2500,
            transportSpend: 1000,
            priceNote: "₦1,500–₦3,000 per plate",
            prepTime: "8:30 AM: Sunday prep for Monday — review week ahead while enjoying breakfast.",
            transitMode: "Bolt",
            fareEstimate: "₦1,000 – ₦1,500",
            hydrationPrompt: "Start Sunday with a large glass of warm water.",
          },
          {
            venue: "Jabi Lake Boardwalk Stroll",
            neighborhood: "Jabi",
            category: "outdoor",
            budgetTier: "thrifty",
            trustScore: 91,
            dwellMinutes: 90,
            day: 7,
            startTime: "11:30",
            endTime: "13:00",
            why: "Breezy lakeside walkways watching local boaters and weekend strollers.",
            fits: "Why it fits this weekend: Perfect low-cost decompression before the week resets.",
            tip: "Grab roasted plantain (boli) by the vendor strip near the park gate.",
            venueSpend: 1000,
            transportSpend: 1500,
            priceNote: "Free walk · snacks ₦1k",
            prepTime: "11:00 AM: Stroll along the water, complete weekly reflection, and prep mindset for Monday.",
            transitMode: "inDrive",
            fareEstimate: "₦1,500 – ₦2,500",
            hydrationPrompt: "Final hydration stop before heading home to prep for the new week.",
          },
        ],
      },
      moderate: { id: "moderate", label: "Thrifty", rangeLabel: "≈ ₦22k–₦38k", budgetMin: 22000, budgetMax: 38000, stops: [] },
      comfortable: { id: "comfortable", label: "Thrifty", rangeLabel: "≈ ₦22k–₦38k", budgetMin: 22000, budgetMax: 38000, stops: [] },
    },
  },
  {
    slug: "couples",
    label: "Couples",
    title: "Quiet Corners, Good Lighting, No Rush",
    profile: "Moderate-to-comfortable options without excessive luxury",
    tagline:
      "For two who want Abuja without the traffic headache: intimate tables, gallery courtyards, and sunset views.",
    currency: "NGN",
    hasTiers: true,
    defaultTier: "moderate",
    tiers: {
      thrifty: {
        id: "thrifty",
        label: "Thrifty",
        rangeLabel: "≈ ₦30k–₦50k",
        budgetMin: 30000,
        budgetMax: 50000,
        stops: [
          {
            venue: "Jabi Lake Sunset Boardwalk",
            neighborhood: "Jabi",
            category: "outdoor",
            budgetTier: "thrifty",
            trustScore: 91,
            dwellMinutes: 90,
            day: 5,
            startTime: "18:00",
            endTime: "19:30",
            why: "Golden hour over the water with fresh roasted corn and quiet benches.",
            fits: "Why it fits this weekend: Zero-cost romantic sunset stroll to start the weekend right.",
            tip: "Bring a light jacket for the lake breeze.",
            venueSpend: 1500,
            transportSpend: 1500,
            priceNote: "Free walk · snacks ₦1.5k",
            prepTime: "5:30 PM: Close laptops together, freshen up, and head to Jabi Lake.",
            transitMode: "Bolt",
            fareEstimate: "₦1,500 – ₦2,500",
            hydrationPrompt: "Hydrate together before heading out into the evening.",
          },
          {
            venue: "Keza Lounge (Romantic Friday Night)",
            neighborhood: "Wuse 2",
            category: "nightlife",
            budgetTier: "thrifty",
            trustScore: 91,
            dwellMinutes: 90,
            day: 5,
            startTime: "20:00",
            endTime: "21:30",
            why: "Intimate lounge seating with warm lighting and smooth Afrobeats backdrop.",
            fits: "Why it fits this weekend: A cozy Friday night lounge experience for two.",
            tip: "Share a cocktail and unwind after a busy week.",
            venueSpend: 5000,
            transportSpend: 1500,
            priceNote: "₦4k–₦6k drinks",
            prepTime: "7:45 PM: Transition to Wuse 2 for a calm evening lounge session.",
            transitMode: "inDrive",
            fareEstimate: "₦1,200 – ₦2,000",
            hydrationPrompt: "Keep water flowing between lounge cocktails.",
          },
          {
            venue: "Thought Pyramid Art Courtyard",
            neighborhood: "Wuse 2",
            category: "culture",
            budgetTier: "thrifty",
            trustScore: 90,
            dwellMinutes: 90,
            day: 6,
            startTime: "11:00",
            endTime: "12:30",
            why: "Quiet gallery strolls through contemporary Nigerian sculpture and canvas.",
            fits: "Why it fits this weekend: Inspiring shared conversations in a calm indoor space.",
            tip: "The garden courtyard is exceptionally peaceful at midday.",
            venueSpend: 0,
            transportSpend: 1200,
            priceNote: "Free entry",
            prepTime: "10:15 AM: Saturday morning chores sorted early; head out hand in hand.",
            transitMode: "Bolt",
            fareEstimate: "₦1,000 – ₦1,800",
            hydrationPrompt: "Drink water before your gallery walkthrough.",
          },
          {
            venue: "Millennium Park Shade Trees",
            neighborhood: "Maitama",
            category: "outdoor",
            budgetTier: "thrifty",
            trustScore: 93,
            dwellMinutes: 120,
            day: 6,
            startTime: "13:30",
            endTime: "15:30",
            why: "Peaceful picnic spots beneath large acacia trees away from crowds.",
            fits: "Why it fits this weekend: Intimate outdoor downtime for two.",
            tip: "Bring a flask of iced hibiscus tea (zobo).",
            venueSpend: 2000,
            transportSpend: 1200,
            priceNote: "Park entry free",
            prepTime: "1:00 PM: Short scenic drive to Maitama.",
            transitMode: "inDrive",
            fareEstimate: "₦1,200 – ₦2,000",
            hydrationPrompt: "Sip zobo and stay hydrated under the trees.",
          },
          {
            venue: "Central Park Morning Walk",
            neighborhood: "Central Business District",
            category: "wellbeing",
            budgetTier: "thrifty",
            trustScore: 90,
            dwellMinutes: 90,
            day: 7,
            startTime: "09:00",
            endTime: "10:30",
            why: "Green pathways and gentle fountains for a quiet Sunday morning stroll.",
            fits: "Why it fits this weekend: Fresh air and unhurried couple time.",
            tip: "Wear comfortable walking shoes.",
            venueSpend: 1000,
            transportSpend: 1200,
            priceNote: "Nominal park access",
            prepTime: "8:30 AM: Sunday morning calm. Plan the week's meal prep together after the walk.",
            transitMode: "Bolt",
            fareEstimate: "₦1,000 – ₦1,800",
            hydrationPrompt: "Hydrate before morning cardio.",
          },
          {
            venue: "Bole & Fish Corner",
            neighborhood: "Jabi",
            category: "food",
            budgetTier: "thrifty",
            trustScore: 89,
            dwellMinutes: 60,
            day: 7,
            startTime: "12:00",
            endTime: "13:00",
            why: "Warm roasted plantain paired with spiced palm oil fish sauce.",
            fits: "Why it fits this weekend: Quintessential weekend street bite.",
            tip: "Ask for extra pepper sauce if you like heat.",
            venueSpend: 3500,
            transportSpend: 1500,
            priceNote: "₦3k–₦4k for two",
            prepTime: "11:30 AM: Casual lunch stop before Sunday evening prep for Monday.",
            transitMode: "inDrive",
            fareEstimate: "₦1,500 – ₦2,500",
            hydrationPrompt: "Water check before heading home to prep work clothes for Monday.",
          },
        ],
      },
      moderate: {
        id: "moderate",
        label: "Moderate",
        rangeLabel: "≈ ₦55k–₦95k",
        budgetMin: 55000,
        budgetMax: 95000,
        stops: [
          {
            venue: "Dixon Brown Lounge",
            neighborhood: "Maitama",
            category: "drinks",
            budgetTier: "midrange",
            trustScore: 92,
            dwellMinutes: 90,
            day: 5,
            startTime: "18:00",
            endTime: "19:30",
            why: "Intimate corner booths and well-crafted drinks to ease into the weekend.",
            fits: "Why it fits this weekend: Sophisticated lighting and calm conversation without nightclub volume.",
            tip: "Arrive right at 6 PM to secure the leather booth by the window.",
            venueSpend: 14000,
            transportSpend: 2000,
            priceNote: "₦6k–₦8k per cocktail",
            prepTime: "5:30 PM: Dress up, hydrate, and prepare for a sophisticated Friday evening.",
            transitMode: "Bolt",
            fareEstimate: "₦1,800 – ₦3,000",
            hydrationPrompt: "Drink 500ml water before cocktail hour.",
          },
          {
            venue: "Keza Lounge (Nightlife & Music)",
            neighborhood: "Wuse 2",
            category: "nightlife",
            budgetTier: "midrange",
            trustScore: 91,
            dwellMinutes: 90,
            day: 5,
            startTime: "20:00",
            endTime: "21:30",
            why: "Upbeat Wuse 2 lounge with excellent music curation and cozy seating for couples.",
            fits: "Why it fits this weekend: Perfect romantic lounge stop to cap off Friday night.",
            tip: "Enjoy the signature lounge cocktails.",
            venueSpend: 12000,
            transportSpend: 1500,
            priceNote: "₦5k–₦8k drinks",
            prepTime: "7:45 PM: Smooth transit from Maitama to Wuse 2.",
            transitMode: "inDrive",
            fareEstimate: "₦1,200 – ₦2,200",
            hydrationPrompt: "Alternate lounge drinks with mineral water.",
          },
          {
            venue: "Thought Pyramid Art Centre",
            neighborhood: "Wuse 2",
            category: "culture",
            budgetTier: "thrifty",
            trustScore: 90,
            dwellMinutes: 90,
            day: 6,
            startTime: "10:30",
            endTime: "12:00",
            why: "Contemporary Nigerian art across tranquil rooms.",
            fits: "Why it fits this weekend: Shared cultural immersion that sparks great conversation.",
            tip: "Take your time on the upper floor exhibition.",
            venueSpend: 0,
            transportSpend: 1500,
            priceNote: "Free entry",
            prepTime: "10:00 AM: Saturday morning chores completed; ready for gallery date.",
            transitMode: "Bolt",
            fareEstimate: "₦1,200 – ₦2,000",
            hydrationPrompt: "Stay hydrated during gallery walkthrough.",
          },
          {
            venue: "Nkoyo Restaurant",
            neighborhood: "Maitama",
            category: "food",
            budgetTier: "midrange",
            trustScore: 95,
            dwellMinutes: 120,
            day: 6,
            startTime: "13:00",
            endTime: "15:00",
            why: "The gold standard for upscale Nigerian comfort food in a warmly lit, artefact-rich dining room.",
            fits: "Why it fits this weekend: Unmatched ambiance for a leisurely Saturday lunch.",
            tip: "Order the yam pottage with gizdodo to share.",
            venueSpend: 18000,
            transportSpend: 1500,
            priceNote: "₦8k–₦15k per head",
            prepTime: "12:45 PM: Short hop to Maitama dining room.",
            transitMode: "inDrive",
            fareEstimate: "₦1,000 – ₦1,800",
            hydrationPrompt: "Sip water with your Saturday lunch spread.",
          },
          {
            venue: "Yoga Loft Sunrise Session",
            neighborhood: "Maitama",
            category: "wellbeing",
            budgetTier: "midrange",
            trustScore: 91,
            dwellMinutes: 75,
            day: 7,
            startTime: "09:00",
            endTime: "10:15",
            why: "Calm, instructor-led morning practice in a sunlit studio.",
            fits: "Why it fits this weekend: Grounding start to Sunday together.",
            tip: "Mats provided; bring water.",
            venueSpend: 8000,
            transportSpend: 1500,
            priceNote: "₦4k per person drop-in",
            prepTime: "8:30 AM: Sunday morning prep. Set intentions for the upcoming week together.",
            transitMode: "Bolt",
            fareEstimate: "₦1,200 – ₦2,000",
            hydrationPrompt: "Hydrate thoroughly post-yoga session.",
          },
          {
            venue: "Jabi Lake Lakeside Lunch",
            neighborhood: "Jabi",
            category: "food",
            budgetTier: "midrange",
            trustScore: 91,
            dwellMinutes: 90,
            day: 7,
            startTime: "12:30",
            endTime: "14:00",
            why: "Waterfront dining overlooking boat traffic and gentle fountains.",
            fits: "Why it fits this weekend: Relaxed weekend finale with a breeze.",
            tip: "Request an outdoor terrace table.",
            venueSpend: 14000,
            transportSpend: 2000,
            priceNote: "₦7k–₦10k per head",
            prepTime: "12:00 PM: Waterfront lunch, followed by Sunday evening review and prep for Monday.",
            transitMode: "inDrive",
            fareEstimate: "₦1,800 – ₦2,800",
            hydrationPrompt: "Final hydration before heading home to rest up for Monday.",
          },
        ],
      },
      comfortable: {
        id: "comfortable",
        label: "Comfortable",
        rangeLabel: "≈ ₦100k–₦150k",
        budgetMin: 100000,
        budgetMax: 150000,
        stops: [
          {
            venue: "Dixon Brown Lounge & Bar",
            neighborhood: "Maitama",
            category: "drinks",
            budgetTier: "splurge",
            trustScore: 92,
            dwellMinutes: 100,
            day: 5,
            startTime: "19:00",
            endTime: "20:45",
            why: "Premium cocktails, artisan small plates, and plush leather banquettes.",
            fits: "Why it fits this weekend: Impeccably curated Friday date night start.",
            tip: "Ask the bartender for their off-menu seasonal sour.",
            venueSpend: 24000,
            transportSpend: 2500,
            priceNote: "₦10k–₦15k per head",
            prepTime: "5:30 PM: Executive assistant prep: reservations confirmed, outfit ready, hydrate.",
            transitMode: "Bolt",
            fareEstimate: "₦2,000 – ₦3,500",
            hydrationPrompt: "Hydrate before premium cocktail service.",
          },
          {
            venue: "Keza Lounge (VIP Nightlife Experience)",
            neighborhood: "Wuse 2",
            category: "nightlife",
            budgetTier: "splurge",
            trustScore: 91,
            dwellMinutes: 90,
            day: 5,
            startTime: "21:00",
            endTime: "22:30",
            why: "Exclusive Wuse 2 lounge VIP section with top-tier ambiance and music.",
            fits: "Why it fits this weekend: The ultimate Friday night lounge experience for two.",
            tip: "Reserve a comfortable booth ahead of time.",
            venueSpend: 25000,
            transportSpend: 2000,
            priceNote: "₦10k–₦15k drinks",
            prepTime: "8:45 PM: Seamless transition from Maitama to Wuse 2 VIP booth.",
            transitMode: "inDrive",
            fareEstimate: "₦1,500 – ₦2,500",
            hydrationPrompt: "Alternate champagne/drinks with mineral water.",
          },
          {
            venue: "Thought Pyramid & Private Art Tour",
            neighborhood: "Wuse 2",
            category: "culture",
            budgetTier: "midrange",
            trustScore: 90,
            dwellMinutes: 90,
            day: 6,
            startTime: "11:00",
            endTime: "12:30",
            why: "Curated walkthrough of premier contemporary Nigerian art.",
            fits: "Why it fits this weekend: Sophisticated cultural enrichment.",
            tip: "Enjoy coffee at the garden nook afterwards.",
            venueSpend: 5000,
            transportSpend: 1500,
            priceNote: "Curated entry",
            prepTime: "10:15 AM: Saturday morning relaxation and light chores handled; head out in style.",
            transitMode: "Bolt",
            fareEstimate: "₦1,500 – ₦2,500",
            hydrationPrompt: "Morning water routine before gallery tour.",
          },
          {
            venue: "Nkoyo Fine Dining",
            neighborhood: "Maitama",
            category: "food",
            budgetTier: "splurge",
            trustScore: 95,
            dwellMinutes: 120,
            day: 6,
            startTime: "13:30",
            endTime: "15:30",
            why: "Exquisite Nigerian cuisine served in an opulent, artifact-filled dining room.",
            fits: "Why it fits this weekend: The finest lunch setting in the capital for two.",
            tip: "Order multiple small plates to sample widely.",
            venueSpend: 32000,
            transportSpend: 2000,
            priceNote: "₦15k–₦20k per head",
            prepTime: "1:00 PM: Short transit to Maitama fine dining.",
            transitMode: "inDrive",
            fareEstimate: "₦1,200 – ₦2,200",
            hydrationPrompt: "Sip sparkling water with fine dining meal.",
          },
          {
            venue: "Transcorp Hilton Sunday Brunch for Two",
            neighborhood: "Maitama",
            category: "food",
            budgetTier: "splurge",
            trustScore: 95,
            dwellMinutes: 120,
            day: 7,
            startTime: "10:30",
            endTime: "12:30",
            why: "Extensive garden brunch buffet with live acoustic background music.",
            fits: "Why it fits this weekend: Unrivaled Sunday indulgence.",
            tip: "Reservations essential.",
            venueSpend: 36000,
            transportSpend: 2500,
            priceNote: "Buffet couples rate",
            prepTime: "9:30 AM: Sunday morning calm. Finalize weekly prep for Monday after brunch.",
            transitMode: "Bolt",
            fareEstimate: "₦1,800 – ₦3,000",
            hydrationPrompt: "Hydrate well before Sunday brunch spread.",
          },
          {
            venue: "Jabi Lake Private Pontoon",
            neighborhood: "Jabi",
            category: "outdoor",
            budgetTier: "midrange",
            trustScore: 91,
            dwellMinutes: 90,
            day: 7,
            startTime: "13:30",
            endTime: "15:00",
            why: "Private boat hire on the water with serene views.",
            fits: "Why it fits this weekend: Peaceful water finale before Monday.",
            tip: "Includes shaded canopy seating.",
            venueSpend: 10000,
            transportSpend: 2000,
            priceNote: "Private boat hire",
            prepTime: "1:00 PM: Scenic transition to Jabi Lake private pontoon.",
            transitMode: "inDrive",
            fareEstimate: "₦2,000 – ₦3,000",
            hydrationPrompt: "Final hydration checkpoint before returning home to prep workweek schedules.",
          },
        ],
      },
    },
  },
  {
    slug: "group",
    label: "Group",
    title: "Big Tables, Shared Plates, Zero Logistics Friction",
    profile: "Larger split outings and group celebrations",
    tagline:
      "For crews who want to eat well, move together, and never argue over who booked what — highest overall spend since costs are split.",
    currency: "NGN",
    hasTiers: true,
    defaultTier: "moderate",
    tiers: {
      thrifty: {
        id: "thrifty",
        label: "Thrifty",
        rangeLabel: "≈ ₦45k–₦75k",
        budgetMin: 45000,
        budgetMax: 75000,
        stops: [
          {
            venue: "Bukka Hut Group Table",
            neighborhood: "Wuse",
            category: "food",
            budgetTier: "thrifty",
            trustScore: 88,
            dwellMinutes: 90,
            day: 5,
            startTime: "19:00",
            endTime: "20:30",
            why: "Spacious seating and quick counter service for large hungry crews.",
            fits: "Why it fits this weekend: Fast, affordable Friday night kickoff for the whole squad.",
            tip: "Grab a long table near the back corner.",
            venueSpend: 12000,
            transportSpend: 3500,
            priceNote: "₦3k–₦5k per head",
            prepTime: "5:30 PM: Coordinate squad group chat, confirm rides, and hydrate.",
            transitMode: "Bolt",
            fareEstimate: "₦2,000 – ₦3,500",
            hydrationPrompt: "Drink water before heading to Wuse.",
          },
          {
            venue: "Keza Lounge (Squad Friday Night)",
            neighborhood: "Wuse 2",
            category: "nightlife",
            budgetTier: "thrifty",
            trustScore: 91,
            dwellMinutes: 90,
            day: 5,
            startTime: "21:00",
            endTime: "22:30",
            why: "Energetic Wuse 2 lounge hosting lively weekend crowds with great music.",
            fits: "Why it fits this weekend: High-energy Friday lounge stop to kick off the weekend with friends.",
            tip: "Order a round of shared drinks and secure seating.",
            venueSpend: 10000,
            transportSpend: 3000,
            priceNote: "₦3k–₦5k drinks",
            prepTime: "8:45 PM: Short group transit from Wuse to Wuse 2 lounge.",
            transitMode: "inDrive",
            fareEstimate: "₦1,500 – ₦2,500",
            hydrationPrompt: "Stay hydrated during squad lounge session.",
          },
          {
            venue: "Thought Pyramid & Wuse Market Walk",
            neighborhood: "Wuse 2",
            category: "culture",
            budgetTier: "thrifty",
            trustScore: 90,
            dwellMinutes: 120,
            day: 6,
            startTime: "10:30",
            endTime: "12:30",
            why: "Art gallery wander followed by vibrant market street energy.",
            fits: "Why it fits this weekend: Group culture and exploration without spending a fortune.",
            tip: "Keep groups in loose pairs through busy market aisles.",
            venueSpend: 0,
            transportSpend: 3000,
            priceNote: "Free entry",
            prepTime: "10:00 AM: Saturday morning errands done; assemble crew for gallery walk.",
            transitMode: "Bolt",
            fareEstimate: "₦2,000 – ₦3,000",
            hydrationPrompt: "Hydrate before morning walk.",
          },
          {
            venue: "Millennium Park Group Football & Picnic",
            neighborhood: "Maitama",
            category: "outdoor",
            budgetTier: "thrifty",
            trustScore: 93,
            dwellMinutes: 150,
            day: 6,
            startTime: "13:30",
            endTime: "16:00",
            why: "Expansive lawns ideal for casual kickabouts and group hangouts.",
            fits: "Why it fits this weekend: Ultimate outdoor gathering spot for larger groups.",
            tip: "Bring a football or outdoor board games.",
            venueSpend: 4000,
            transportSpend: 3000,
            priceNote: "Park entry free",
            prepTime: "1:00 PM: Transit to Maitama lawns with snacks.",
            transitMode: "inDrive",
            fareEstimate: "₦2,000 – ₦3,500",
            hydrationPrompt: "Keep water bottles handy during park games.",
          },
          {
            venue: "National Ecumenical Centre Gardens",
            neighborhood: "Central Business District",
            category: "culture",
            budgetTier: "thrifty",
            trustScore: 91,
            dwellMinutes: 60,
            day: 7,
            startTime: "09:30",
            endTime: "10:30",
            why: "Striking neo-Gothic architecture and peaceful surrounding grounds.",
            fits: "Why it fits this weekend: Quiet group sightseeing before lunch.",
            tip: "Respect ongoing services.",
            venueSpend: 0,
            transportSpend: 2500,
            priceNote: "Free grounds access",
            prepTime: "9:00 AM: Sunday morning prep. Plan workweek logistics before meeting crew.",
            transitMode: "Bolt",
            fareEstimate: "₦1,800 – ₦3,000",
            hydrationPrompt: "Morning water routine.",
          },
          {
            venue: "Jabi Lake Bole & Fish",
            neighborhood: "Jabi",
            category: "food",
            budgetTier: "thrifty",
            trustScore: 89,
            dwellMinutes: 90,
            day: 7,
            startTime: "12:00",
            endTime: "13:30",
            why: "Group-friendly roasted plantain and fish by the lakeside breeze.",
            fits: "Why it fits this weekend: Relaxed Sunday afternoon squad meal.",
            tip: "Order several fish platters to share family-style.",
            venueSpend: 10000,
            transportSpend: 3000,
            priceNote: "₦3k–₦5k per head",
            prepTime: "11:30 AM: Lakeside gathering, followed by Sunday evening prep for the new workweek.",
            transitMode: "inDrive",
            fareEstimate: "₦2,000 – ₦3,500",
            hydrationPrompt: "Hydrate before heading home to prep for Monday.",
          },
        ],
      },
      moderate: {
        id: "moderate",
        label: "Moderate",
        rangeLabel: "≈ ₦80k–₦140k",
        budgetMin: 80000,
        budgetMax: 140000,
        stops: [
          {
            venue: "Nkoyo Restaurant Group Table",
            neighborhood: "Maitama",
            category: "food",
            budgetTier: "midrange",
            trustScore: 95,
            dwellMinutes: 120,
            day: 5,
            startTime: "19:00",
            endTime: "21:00",
            why: "Vibrant upscale African dining with large booths perfect for crews.",
            fits: "Why it fits this weekend: The definitive Abuja group dining experience.",
            tip: "Book a large table 48 hours in advance.",
            venueSpend: 28000,
            transportSpend: 4000,
            priceNote: "₦10k–₦15k per head",
            prepTime: "5:30 PM: Coordinate group rides, confirm table booking, and hydrate.",
            transitMode: "Bolt",
            fareEstimate: "₦2,500 – ₦4,500",
            hydrationPrompt: "Drink water before Friday dinner feast.",
          },
          {
            venue: "Basalt Lounge (Squad Nightlife)",
            neighborhood: "Wuye",
            category: "nightlife",
            budgetTier: "splurge",
            trustScore: 93,
            dwellMinutes: 150,
            day: 5,
            startTime: "21:30",
            endTime: "24:00",
            why: "High-energy Wuye lounge and grill with top-tier music and ample space for squads.",
            fits: "Why it fits this weekend: Epic Friday night lounge and music experience for the crew.",
            tip: "Reserve a booth for bottle service in advance.",
            venueSpend: 35000,
            transportSpend: 4500,
            priceNote: "₦12k–₦18k per head",
            prepTime: "9:00 PM: Transition from Maitama dinner to Wuye lounge booth.",
            transitMode: "inDrive",
            fareEstimate: "₦2,000 – ₦3,500",
            hydrationPrompt: "Alternate lounge drinks with mineral water.",
          },
          {
            venue: "Thought Pyramid Art Centre",
            neighborhood: "Wuse 2",
            category: "culture",
            budgetTier: "thrifty",
            trustScore: 90,
            dwellMinutes: 90,
            day: 6,
            startTime: "11:00",
            endTime: "12:30",
            why: "Spacious galleries showcasing prominent Nigerian contemporary artists.",
            fits: "Why it fits this weekend: Culture in a group setting.",
            tip: "Great photo backdrops in the garden.",
            venueSpend: 0,
            transportSpend: 3000,
            priceNote: "Free entry",
            prepTime: "10:30 AM: Saturday morning chores wrapped up; assemble crew.",
            transitMode: "Bolt",
            fareEstimate: "₦2,000 – ₦3,500",
            hydrationPrompt: "Hydrate before gallery visit.",
          },
          {
            venue: "Millennium Park Group Spread",
            neighborhood: "Maitama",
            category: "outdoor",
            budgetTier: "thrifty",
            trustScore: 93,
            dwellMinutes: 150,
            day: 6,
            startTime: "13:30",
            endTime: "16:00",
            why: "Expansive green grounds for group relaxation and games.",
            fits: "Why it fits this weekend: Central gathering place for a Saturday afternoon.",
            tip: "Bring folding chairs if available.",
            venueSpend: 6000,
            transportSpend: 3000,
            priceNote: "Park entry free",
            prepTime: "1:00 PM: Move group to Maitama park lawns.",
            transitMode: "inDrive",
            fareEstimate: "₦2,000 – ₦3,500",
            hydrationPrompt: "Keep water bottles chilled for the group.",
          },
          {
            venue: "Transcorp Hilton Sunday Brunch Crew",
            neighborhood: "Maitama",
            category: "food",
            budgetTier: "splurge",
            trustScore: 95,
            dwellMinutes: 120,
            day: 7,
            startTime: "11:00",
            endTime: "13:00",
            why: "Extensive buffet spread across live cooking stations and gardens.",
            fits: "Why it fits this weekend: The ultimate Sunday gathering for hungry groups.",
            tip: "Book a large table on the terrace.",
            venueSpend: 45000,
            transportSpend: 4000,
            priceNote: "Buffet group rate",
            prepTime: "10:00 AM: Sunday morning prep. Review workweek schedules before brunch.",
            transitMode: "Bolt",
            fareEstimate: "₦2,500 – ₦4,000",
            hydrationPrompt: "Hydrate well before Sunday brunch buffet.",
          },
          {
            venue: "Jabi Lake Boat Group Charter",
            neighborhood: "Jabi",
            category: "outdoor",
            budgetTier: "midrange",
            trustScore: 91,
            dwellMinutes: 90,
            day: 7,
            startTime: "13:30",
            endTime: "15:00",
            why: "Speedboat group rides and lakeside refreshments.",
            fits: "Why it fits this weekend: Action-packed weekend finale.",
            tip: "Negotiate group rates for multiple boats.",
            venueSpend: 15000,
            transportSpend: 3500,
            priceNote: "Group boat hire",
            prepTime: "1:15 PM: Group transfer to Jabi Lake jetty, followed by evening prep for Monday.",
            transitMode: "inDrive",
            fareEstimate: "₦2,000 – ₦3,500",
            hydrationPrompt: "Final hydration checkpoint before returning home to prep workweek.",
          },
        ],
      },
      comfortable: {
        id: "comfortable",
        label: "Comfortable",
        rangeLabel: "≈ ₦150k–₦240k",
        budgetMin: 150000,
        budgetMax: 240000,
        stops: [
          {
            venue: "Nkoyo VIP Group Feast",
            neighborhood: "Maitama",
            category: "food",
            budgetTier: "splurge",
            trustScore: 95,
            dwellMinutes: 130,
            day: 5,
            startTime: "19:00",
            endTime: "21:15",
            why: "Opulent private dining sections with premium Nigerian culinary spreads.",
            fits: "Why it fits this weekend: Uncompromising group gastronomy on Friday night.",
            tip: "Order a wide variety of starters to share.",
            venueSpend: 48000,
            transportSpend: 5000,
            priceNote: "₦18k–₦25k per head",
            prepTime: "5:30 PM: Executive assistant group coordination: bookings locked, rides ready.",
            transitMode: "Bolt",
            fareEstimate: "₦3,000 – ₦5,000",
            hydrationPrompt: "Hydrate before luxury group dinner.",
          },
          {
            venue: "Basalt Lounge VIP Section (Squad Nightlife)",
            neighborhood: "Wuye",
            category: "nightlife",
            budgetTier: "splurge",
            trustScore: 93,
            dwellMinutes: 150,
            day: 5,
            startTime: "21:30",
            endTime: "24:00",
            why: "Exclusive Wuye VIP lounge table service and premier sound system for squads.",
            fits: "Why it fits this weekend: The ultimate high-end Friday night lounge experience.",
            tip: "VIP booth minimum spend applies.",
            venueSpend: 55000,
            transportSpend: 5000,
            priceNote: "VIP table tier",
            prepTime: "9:15 PM: Seamless group transfer from Maitama to Wuye VIP lounge.",
            transitMode: "inDrive",
            fareEstimate: "₦2,500 – ₦4,000",
            hydrationPrompt: "Alternate VIP drinks with mineral water.",
          },
          {
            venue: "Thought Pyramid Private Gallery Tour",
            neighborhood: "Wuse 2",
            category: "culture",
            budgetTier: "midrange",
            trustScore: 90,
            dwellMinutes: 90,
            day: 6,
            startTime: "11:00",
            endTime: "12:30",
            why: "Curated exclusive group walkthrough of prominent collections.",
            fits: "Why it fits this weekend: High-level cultural bonding.",
            tip: "Schedule curator commentary ahead of time.",
            venueSpend: 9000,
            transportSpend: 3500,
            priceNote: "Curated group tier",
            prepTime: "10:30 AM: Saturday morning relaxation; gather crew for private tour.",
            transitMode: "Bolt",
            fareEstimate: "₦2,500 – ₦4,000",
            hydrationPrompt: "Hydrate before private gallery walkthrough.",
          },
          {
            venue: "Zuma Rock Excursion",
            neighborhood: "Madalla (Abuja Outskirts)",
            category: "outdoor",
            budgetTier: "splurge",
            trustScore: 94,
            dwellMinutes: 180,
            day: 6,
            startTime: "13:30",
            endTime: "16:30",
            why: "Iconic monolith road trip with spectacular group photo opportunities.",
            fits: "Why it fits this weekend: Epic Saturday road trip adventure for the crew.",
            tip: "Hire a comfortable private bus or convoy.",
            venueSpend: 15000,
            transportSpend: 14000,
            priceNote: "Excursion transport + entry",
            prepTime: "1:00 PM: Group convoy departure for Zuma Rock.",
            transitMode: "inDrive",
            fareEstimate: "₦8,000 – ₦14,000",
            hydrationPrompt: "Pack mineral water packs for the road trip.",
          },
          {
            venue: "Transcorp Hilton Sunday Luxury Brunch",
            neighborhood: "Maitama",
            category: "food",
            budgetTier: "splurge",
            trustScore: 95,
            dwellMinutes: 120,
            day: 7,
            startTime: "11:00",
            endTime: "13:00",
            why: "The premier buffet experience in the capital with Hilton service.",
            fits: "Why it fits this weekend: Unmatched culinary finale for the whole squad.",
            tip: "Reserve the garden pavilion table.",
            venueSpend: 65000,
            transportSpend: 4500,
            priceNote: "Hilton buffet tier",
            prepTime: "10:00 AM: Sunday morning prep. Finalize weekly work schedules before brunch.",
            transitMode: "Bolt",
            fareEstimate: "₦3,000 – ₦5,000",
            hydrationPrompt: "Hydrate well before Sunday luxury brunch.",
          },
          {
            venue: "Jabi Lake Private Boat Fleet",
            neighborhood: "Jabi",
            category: "outdoor",
            budgetTier: "midrange",
            trustScore: 91,
            dwellMinutes: 90,
            day: 7,
            startTime: "14:00",
            endTime: "15:30",
            why: "Multiple chartered speedboats for a group regatta on the lake.",
            fits: "Why it fits this weekend: Unforgettable group send-off before the week begins.",
            tip: "Lifesaving gear provided by operators.",
            venueSpend: 25000,
            transportSpend: 4000,
            priceNote: "Fleet charter rate",
            prepTime: "1:30 PM: Private fleet charter transfer, followed by evening workweek prep.",
            transitMode: "inDrive",
            fareEstimate: "₦2,500 – ₦4,000",
            hydrationPrompt: "Final hydration checkpoint before returning home to prep for Monday.",
          },
        ],
      },
    },
  },
];

export function getPersona(slug?: string): WeekenderPersona {
  if (!slug) return PERSONAS[0];
  const found = PERSONAS.find((p) => p.slug === slug);
  return found || PERSONAS[0];
}

export function getTierPlan(persona: WeekenderPersona, tierId?: string): TierPlan {
  if (!persona.hasTiers) {
    return persona.tiers[persona.defaultTier];
  }
  if (!tierId || !(tierId in persona.tiers)) {
    return persona.tiers[persona.defaultTier];
  }
  return persona.tiers[tierId as BudgetTierId];
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

export function isWeekenderOpen(now: Date): boolean {
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  if (day === 5 || day === 6) return true;
  if (day === 4 && hour >= 18) return true;
  return false;
}

export type WeekenderPhase = "locked" | "open";

export function getPhase(now: Date = new Date()): WeekenderPhase {
  return isWeekenderOpen(now) ? "open" : "locked";
}

export function getNextDropDeadline(now: Date = new Date()): Date {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let days = ((5 - now.getDay()) + 7) % 7;
  if (days === 0 && (now.getDay() !== 4 || now.getHours() >= 18)) {
    days = 7;
  } else if (days === 0) {
    days = 0;
  }
  d.setDate(d.getDate() + days);
  d.setHours(18, 0, 0, 0);
  return d;
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
