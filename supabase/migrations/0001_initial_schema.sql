create extension if not exists "pgcrypto";

create type public.customer_type as enum ('particular', 'business');
create type public.price_type as enum ('fixed', 'from', 'range', 'on_request');
create type public.visibility_status as enum ('draft', 'published', 'archived');
create type public.admin_role as enum ('owner', 'developer');
create type public.booking_status as enum ('confirmed', 'completed', 'cancelled', 'rescheduled');
create type public.lead_source as enum ('contact_form', 'quote_request');
create type public.lead_status as enum ('new', 'contacted', 'converted', 'closed');

create table public.services (
  id uuid primary key default gen_random_uuid(),
  type public.customer_type not null,
  name_nl text not null,
  name_fr text not null,
  name_en text not null,
  description_nl text not null,
  description_fr text not null,
  description_en text not null,
  price_min decimal(10, 2),
  price_max decimal(10, 2),
  price_type public.price_type not null,
  duration_minutes int not null check (duration_minutes > 0),
  buffer_before_minutes int not null default 0 check (buffer_before_minutes >= 0),
  buffer_after_minutes int not null default 0 check (buffer_after_minutes >= 0),
  visibility_status public.visibility_status not null default 'draft',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint services_price_shape check (
    (price_type = 'on_request' and price_min is null and price_max is null)
    or (price_type = 'range' and price_min is not null and price_max is not null and price_max >= price_min)
    or (price_type in ('fixed', 'from') and price_min is not null and price_max is null)
  )
);

create table public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  email text not null unique,
  role public.admin_role not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.availability_rules (
  id uuid primary key default gen_random_uuid(),
  day_of_week int not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint availability_rules_time_order check (end_time > start_time)
);

create table public.blocked_slots (
  id uuid primary key default gen_random_uuid(),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blocked_slots_time_order check (ends_at > starts_at)
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id),
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  customer_type public.customer_type not null,
  company_name text,
  address text not null,
  city text not null,
  postal_code text not null,
  slot_start timestamptz not null,
  slot_end timestamptz not null,
  timezone text not null default 'Europe/Brussels',
  status public.booking_status not null default 'confirmed',
  service_name_snapshot text not null,
  service_price_min_snapshot decimal(10, 2),
  service_price_max_snapshot decimal(10, 2),
  service_price_type_snapshot public.price_type not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint bookings_time_order check (slot_end > slot_start)
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  customer_type public.customer_type not null,
  company_name text,
  message text not null,
  source public.lead_source not null default 'contact_form',
  status public.lead_status not null default 'new',
  privacy_consent_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index services_visibility_sort_idx on public.services (visibility_status, sort_order);
create index bookings_slot_idx on public.bookings (slot_start, slot_end);
create index bookings_status_idx on public.bookings (status);
create index leads_status_idx on public.leads (status, created_at);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger services_set_updated_at
before update on public.services
for each row execute function public.set_updated_at();

create trigger admin_users_set_updated_at
before update on public.admin_users
for each row execute function public.set_updated_at();

create trigger availability_rules_set_updated_at
before update on public.availability_rules
for each row execute function public.set_updated_at();

create trigger blocked_slots_set_updated_at
before update on public.blocked_slots
for each row execute function public.set_updated_at();

create trigger bookings_set_updated_at
before update on public.bookings
for each row execute function public.set_updated_at();

create trigger leads_set_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

alter table public.services enable row level security;
alter table public.admin_users enable row level security;
alter table public.availability_rules enable row level security;
alter table public.blocked_slots enable row level security;
alter table public.bookings enable row level security;
alter table public.leads enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where (
        user_id = auth.uid()
        or lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      )
      and is_active = true
  );
$$;

create policy "Published services are publicly readable"
on public.services
for select
using (visibility_status = 'published');

create policy "Admins can manage services"
on public.services
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can read admin users"
on public.admin_users
for select
using (public.is_admin());

create policy "Admins can update admin users"
on public.admin_users
for update
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can manage availability"
on public.availability_rules
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can manage blocked slots"
on public.blocked_slots
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can manage bookings"
on public.bookings
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can manage leads"
on public.leads
for all
using (public.is_admin())
with check (public.is_admin());
