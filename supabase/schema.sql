-- OffDays database schema — the "living city directory" (venues) and the
-- ephemeral, themed weekend guides (weekender_drops + link table).
--
-- Run this once against the OffDays Supabase project (SQL editor or
-- `supabase db push`). It is intentionally independent from the WCIADH
-- product's schema — OffDays owns its own venues and drops, no shared data.
--
-- Access model: anon + authenticated keys can READ published content over
-- PostgREST. There are no client write policies: adding venues, verification
-- updates, and publishing drops go only through the service-role client /
-- admin tooling, so the directory stays editorial-controlled.
--
-- The three strict business fields ship under their exact product names
-- ("budgetTier", "trustScore", "actionableBookingURL") — quoted identifiers,
-- so they are case-sensitive in every query (e.g. select("budgetTier")).

-- -----------------------------------------------------------------------------
-- Shared trigger: keep updated_at honest on the living-directory tables.
-- -----------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := timezone('utc'::text, now());
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- venues — one row per real spot in the living city directory.
-- Entries start untrusted ('pending', trustScore 0) and move up through the
-- verification process; 'removed' hides an entry from public reads (kept in
-- the directory for history, never hard-deleted).
-- -----------------------------------------------------------------------------

create table if not exists public.venues (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  city text not null,
  neighborhood text,
  address text,
  latitude double precision check (latitude between -90 and 90),
  longitude double precision check (longitude between -180 and 180),
  category text not null check (category in ('food', 'drinks', 'culture', 'nightlife', 'outdoor', 'retail', 'wellbeing', 'wellness', 'essential')),
  tags text[] not null default '{}',
  description text,
  -- The one-line "vibe" a traveler will actually feel — used as the card headline.
  vibe text not null default '',
  price_level smallint not null default 1 check (price_level between 0 and 4),
  -- Budget-first positioning: every venue carries an explicit, city-relative
  -- tier enforced at the database — an insert cannot ship a venue that omits it.
  "budgetTier" text not null check ("budgetTier" in ('thrifty', 'midrange', 'splurge')),
  -- 0 = unverified/unknown, 100 = fully verified. Starts at 0; the curation
  -- process raises it, and verified_at records the last confirmation.
  "trustScore" smallint not null default 0 check ("trustScore" between 0 and 100),
  -- A deep link that actually unlocks/books the venue (must be http(s)); null
  -- means no direct booking exists. Never a homepage or promo landing page.
  "actionableBookingURL" text check ("actionableBookingURL" is null or "actionableBookingURL" ~* '^https?://'),
  verified_at timestamp with time zone,
  status text not null default 'pending' check (status in ('pending', 'verified', 'removed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- The living-directory de-dup rule: one venue per (name, city).
create unique index if not exists venues_name_city_unique_idx
  on public.venues (lower(name), lower(city));

create index if not exists venues_city_status_idx
  on public.venues (city, status);
create index if not exists venues_category_idx
  on public.venues (category);

create trigger venues_set_updated_at
  before update on public.venues
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- weekender_drops — the ephemeral, themed weekend guides.
--
-- Ephemerality is enforced, not assumed: starts_on defaults to the upcoming
-- Friday, and expires_on is constrained to the Sunday of that same weekend
-- (expires_on must be a Sunday no more than 6 days after starts_on), so a drop
-- can never linger past its Sunday. A drop is "live" only while
-- status = 'live' AND expires_on >= current_date.
-- -----------------------------------------------------------------------------

create table if not exists public.weekender_drops (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  city text not null,
  theme text not null,
  tagline text,
  curator text,
  cover_image_url text,
  -- The stated budget range shown up front — cost is the headline.
  budget_currency text not null default 'NGN',
  budget_min integer not null check (budget_min >= 0),
  budget_max integer not null check (budget_max >= budget_min),
  starts_on date not null
    default (current_date + (((5 - extract(dow from current_date))::integer + 7) % 7)),
  expires_on date not null,
  status text not null default 'draft' check (status in ('draft', 'live', 'archived')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  check (expires_on >= starts_on),
  check (extract(dow from expires_on) = 0),
  check (expires_on - starts_on between 0 and 6)
);

-- "Which drops are out (or expiring soon) in this city" — the homepage query.
create index if not exists weekender_drops_city_expiry_idx
  on public.weekender_drops (city, expires_on desc);

create trigger weekender_drops_set_updated_at
  before update on public.weekender_drops
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- weekender_drop_venues — which venue rows make up each drop, in order.
-- A venue can appear in many drops (reuse across guides); the PK also stops a
-- venue being listed twice in one drop. hero marks the drop's featured spot.
-- -----------------------------------------------------------------------------

create table if not exists public.weekender_drop_venues (
  weekender_drop_id uuid not null references public.weekender_drops(id) on delete cascade,
  venue_id uuid not null references public.venues(id) on delete cascade,
  position smallint not null default 0 check (position >= 0),
  hero boolean not null default false,
  -- How long a traveler will realistically spend here (the itinerary's dwell).
  dwell_minutes smallint not null default 90 check (dwell_minutes > 0 and dwell_minutes <= 1440),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (weekender_drop_id, venue_id)
);

create index if not exists weekender_drop_venues_drop_idx
  on public.weekender_drop_venues (weekender_drop_id, position);

-- -----------------------------------------------------------------------------
-- popups — time-boxed, neighborhood-anchored happenings (pop-ups, markets,
-- clinics). Surfaced in the "Happening Now" feed by date and neighborhood;
-- the row is only "now" while starts_at <= now() < ends_at.
-- -----------------------------------------------------------------------------

create table if not exists public.popups (
  id uuid default gen_random_uuid() primary key,
  venue_id uuid not null references public.venues(id) on delete cascade,
  title text not null,
  starts_at timestamp with time zone not null,
  ends_at timestamp with time zone not null,
  note text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  check (ends_at > starts_at)
);

create index if not exists popups_window_idx
  on public.popups (starts_at, ends_at);

create trigger popups_set_updated_at
  before update on public.popups
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- Row Level Security
-- -----------------------------------------------------------------------------

alter table public.venues enable row level security;
alter table public.weekender_drops enable row level security;
alter table public.weekender_drop_venues enable row level security;
alter table public.popups enable row level security;

create policy "Anyone can browse live venues"
  on public.venues for select
  using (status <> 'removed');

create policy "Anyone can see published weekend drops"
  on public.weekender_drops for select
  using (status = 'live');

create policy "Anyone can see what a drop includes"
  on public.weekender_drop_venues for select
  using (true);

create policy "Anyone can see upcoming pop-ups"
  on public.popups for select
  using (ends_at > now());