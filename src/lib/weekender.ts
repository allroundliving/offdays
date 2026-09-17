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
  transportSpend: number; // estimated Bolt / transport, ₦
  priceNote: string;
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
          },
          {
            venue: "National Mosque Courtyard",
            neighborhood: "Central Business District",
            category: "culture",
            budgetTier: "thrifty",
            trustScore: 92,
            dwellMinutes: 60,
            day: 6,
            startTime: "16:00",
            endTime: "17:00",
            why: "Golden domes and soaring minarets open to respectful visitors during non-prayer hours.",
            fits: "Why it fits this weekend: Striking architecture and peaceful courtyards right in the city axis.",
            tip: "Dress modestly; robes available at the gate for visitors.",
            venueSpend: 0,
            transportSpend: 1200,
            priceNote: "Free entry",
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
          },
        ],
      },
      moderate: {
        id: "moderate",
        label: "Thrifty",
        rangeLabel: "≈ ₦22k–₦38k",
        budgetMin: 22000,
        budgetMax: 38000,
        stops: [],
      },
      comfortable: {
        id: "comfortable",
        label: "Thrifty",
        rangeLabel: "≈ ₦22k–₦38k",
        budgetMin: 22000,
        budgetMax: 38000,
        stops: [],
      },
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
          },
          {
            venue: "Bukka Hut Date Table",
            neighborhood: "Wuse",
            category: "food",
            budgetTier: "thrifty",
            trustScore: 88,
            dwellMinutes: 75,
            day: 6,
            startTime: "19:00",
            endTime: "20:15",
            why: "Clean, comfortable dining with reliable local classics.",
            fits: "Why it fits this weekend: Easygoing dinner without breaking the bank.",
            tip: "Share a plate of fried plantain and fish stew.",
            venueSpend: 6000,
            transportSpend: 1500,
            priceNote: "₦5k–₦7k shared",
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
          },
          {
            venue: "Aso Rock Viewpoint Drive",
            neighborhood: "Asokoro",
            category: "outdoor",
            budgetTier: "thrifty",
            trustScore: 93,
            dwellMinutes: 60,
            day: 6,
            startTime: "16:30",
            endTime: "17:30",
            why: "Panoramic views of the monolith and government valley during golden hour.",
            fits: "Why it fits this weekend: Breathtaking scenery that reminds you why Abuja feels unique.",
            tip: "Park safely at designated view spots.",
            venueSpend: 0,
            transportSpend: 2000,
            priceNote: "Free viewpoint",
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
          },
          {
            venue: "Yellow Chilli Date Night",
            neighborhood: "Maitama",
            category: "food",
            budgetTier: "splurge",
            trustScore: 94,
            dwellMinutes: 120,
            day: 6,
            startTime: "20:00",
            endTime: "22:00",
            why: "Dimly lit, sophisticated ambiance with exceptional coastal seafood.",
            fits: "Why it fits this weekend: Romantic Saturday dinner with flawless service.",
            tip: "Try the seafood okro pot with pounded yam.",
            venueSpend: 28000,
            transportSpend: 2500,
            priceNote: "₦22k–₦30k shared",
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
          },
          {
            venue: "Wuse Market Suya Strip",
            neighborhood: "Wuse",
            category: "food",
            budgetTier: "thrifty",
            trustScore: 89,
            dwellMinutes: 75,
            day: 6,
            startTime: "20:00",
            endTime: "21:15",
            why: "Legendary nocturnal suya grills with high energy and cold sodas.",
            fits: "Why it fits this weekend: Saturday night street food tradition.",
            tip: "Order in bulk to share across the table.",
            venueSpend: 8000,
            transportSpend: 3500,
            priceNote: "₦2k–₦3k per person",
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
          },
          {
            venue: "Basalt Lounge",
            neighborhood: "Wuye",
            category: "nightlife",
            budgetTier: "splurge",
            trustScore: 93,
            dwellMinutes: 150,
            day: 6,
            startTime: "21:00",
            endTime: "23:30",
            why: "Sleek lounge and grill with great music and ample seating for crews.",
            fits: "Why it fits this weekend: High-energy Saturday night out with excellent sound.",
            tip: "Reserve a booth for bottle service.",
            venueSpend: 35000,
            transportSpend: 4500,
            priceNote: "₦12k–₦18k per head",
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
          },
          {
            venue: "Basalt Lounge VIP Section",
            neighborhood: "Wuye",
            category: "nightlife",
            budgetTier: "splurge",
            trustScore: 93,
            dwellMinutes: 150,
            day: 6,
            startTime: "21:30",
            endTime: "24:00",
            why: "Exclusive VIP table service and prime lounge acoustics.",
            fits: "Why it fits this weekend: High-end Saturday night celebration.",
            tip: "Minimum spend applies for VIP booths.",
            venueSpend: 55000,
            transportSpend: 5000,
            priceNote: "VIP table tier",
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
  const day = now.getDay(); // Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6
  const hour = now.getHours() + now.getMinutes() / 60;
  // Locked: Sunday through Wednesday (and Thu before 18:00)
  // Unlocked: Thursday 18:00 through Sunday? Wait, user specified "While the guide is locked (Sunday through Wednesday)... unlocking automatically on Thursday evening / Friday morning."
  // So Sunday, Monday, Tuesday, Wednesday are locked. Thursday from 18:00, Friday, Saturday are open. What about Sunday? If Sunday is locked, then Sunday is locked.
  if (day === 5 || day === 6) return true; // Fri, Sat
  if (day === 4 && hour >= 18) return true; // Thu evening
  return false; // Sun, Mon, Tue, Wed, Thu morning/afternoon
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
    days = 0; // Today at 18:00
  }
  d.setDate(d.getDate() + days);
  d.setHours(18, 0, 0, 0); // Friday 6 PM drop (or Thursday 6 PM)
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
