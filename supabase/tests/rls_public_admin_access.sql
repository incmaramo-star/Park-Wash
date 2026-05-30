begin;

create extension if not exists pgtap with schema extensions;

select plan(32);

insert into public.services (
  type,
  name_nl,
  name_fr,
  name_en,
  description_nl,
  description_fr,
  description_en,
  price_min,
  price_max,
  price_type,
  duration_minutes,
  visibility_status,
  sort_order
)
values (
  'particular',
  'RLS draft service',
  'RLS draft service',
  'RLS draft service',
  'Draft service hidden from public RLS tests.',
  'Draft service hidden from public RLS tests.',
  'Draft service hidden from public RLS tests.',
  99,
  null,
  'from',
  60,
  'draft',
  999
);

reset role;
select set_config('request.jwt.claims', '{}', true);
set local role anon;

select is(
  (select count(*) from public.services),
  5::bigint,
  'anon can read only the published seed services'
);

select is(
  (select count(*) from public.services where visibility_status <> 'published'),
  0::bigint,
  'anon cannot read draft, archived, or otherwise unpublished services'
);

select is(
  (select count(*) from public.admin_users),
  0::bigint,
  'anon cannot read admin allowlist rows'
);

select is(
  (select count(*) from public.availability_rules),
  0::bigint,
  'anon cannot read availability rules'
);

select is(
  (select count(*) from public.blocked_slots),
  0::bigint,
  'anon cannot read blocked slots'
);

select is(
  (select count(*) from public.bookings),
  0::bigint,
  'anon cannot read bookings'
);

select is(
  (select count(*) from public.leads),
  0::bigint,
  'anon cannot read leads'
);

select lives_ok(
  $$
    insert into public.leads (
      name,
      email,
      customer_type,
      message,
      source,
      status,
      privacy_consent_at
    )
    values (
      'Anonymous Visitor',
      'visitor@example.com',
      'particular',
      'Public contact form RLS verification lead.',
      'contact_form',
      'new',
      now()
    )
  $$,
  'anon can insert a consented contact form lead'
);

select is(
  (select count(*) from public.leads),
  0::bigint,
  'anon still cannot read leads after public contact insert'
);

reset role;

select is(
  (select count(*) from public.leads where email = 'visitor@example.com'),
  1::bigint,
  'public contact lead insert is persisted for admin follow-up'
);

reset role;
select set_config('request.jwt.claims', '{}', true);
set local role anon;

select throws_ok(
  $$
    insert into public.leads (
      name,
      email,
      customer_type,
      message,
      source,
      status,
      privacy_consent_at
    )
    values (
      'Anonymous Quote',
      'quote@example.com',
      'particular',
      'Public insert must stay limited to contact form leads.',
      'quote_request',
      'new',
      now()
    )
  $$,
  '42501',
  'new row violates row-level security policy for table "leads"',
  'anon cannot insert leads with a non-contact source'
);

select throws_ok(
  $$
    insert into public.leads (
      name,
      email,
      customer_type,
      message,
      source,
      status,
      privacy_consent_at
    )
    values (
      'Anonymous Status',
      'status@example.com',
      'particular',
      'Public insert must not set a workflow status.',
      'contact_form',
      'contacted',
      now()
    )
  $$,
  '42501',
  'new row violates row-level security policy for table "leads"',
  'anon cannot insert leads with an admin workflow status'
);

reset role;
select set_config(
  'request.jwt.claims',
  '{"email":"not-admin@example.com","sub":"00000000-0000-0000-0000-000000000001"}',
  true
);
set local role authenticated;

select ok(
  public.is_admin() is false,
  'authenticated non-admin is not treated as an admin'
);

select is(
  (select count(*) from public.services),
  5::bigint,
  'authenticated non-admin can read only published services'
);

select is(
  (select count(*) from public.admin_users),
  0::bigint,
  'authenticated non-admin cannot read admin allowlist rows'
);

select is(
  (select count(*) from public.bookings),
  0::bigint,
  'authenticated non-admin cannot read bookings'
);

select is(
  (select count(*) from public.leads),
  0::bigint,
  'authenticated non-admin cannot read leads'
);

select results_eq(
  $$
    update public.services
    set sort_order = sort_order + 1
    where name_en = 'Basic detail'
    returning id
  $$,
  $$select null::uuid where false$$,
  'authenticated non-admin cannot update services'
);

select is(
  (
    select sort_order
    from public.services
    where name_en = 'Basic detail'
  ),
  10,
  'authenticated non-admin update leaves service data unchanged'
);

select throws_ok(
  $$
    insert into public.leads (
      name,
      email,
      customer_type,
      message,
      privacy_consent_at
    )
    values (
      'Non Admin Lead',
      'non-admin-lead@example.com',
      'particular',
      'Non-admin lead insert must stay blocked.',
      now()
    )
  $$,
  '42501',
  'new row violates row-level security policy for table "leads"',
  'authenticated non-admin cannot insert leads'
);

reset role;
select set_config(
  'request.jwt.claims',
  '{"email":"lahdhirilouay21@gmail.com","sub":"00000000-0000-0000-0000-000000000002"}',
  true
);
set local role authenticated;

select ok(
  public.is_admin() is true,
  'allowlisted authenticated user is treated as an admin'
);

select is(
  (select count(*) from public.services),
  6::bigint,
  'admin can read published and draft services'
);

select isnt_empty(
  $$select id from public.admin_users where email = 'lahdhirilouay21@gmail.com'$$,
  'admin can read admin allowlist rows'
);

select lives_ok(
  $$
    update public.services
    set sort_order = sort_order + 1
    where name_en = 'Basic detail'
  $$,
  'admin can update services'
);

select lives_ok(
  $$
    insert into public.availability_rules (
      day_of_week,
      start_time,
      end_time
    )
    values (1, '09:00', '17:00')
  $$,
  'admin can insert availability rules'
);

select lives_ok(
  $$
    insert into public.blocked_slots (
      starts_at,
      ends_at,
      reason
    )
    values (
      '2026-06-01 09:00:00+02',
      '2026-06-01 10:00:00+02',
      'RLS verification'
    )
  $$,
  'admin can insert blocked slots'
);

select lives_ok(
  $$
    insert into public.leads (
      name,
      email,
      customer_type,
      message,
      privacy_consent_at
    )
    values (
      'Admin Lead',
      'admin-lead@example.com',
      'particular',
      'Admin-created RLS verification lead.',
      now()
    )
  $$,
  'admin can insert leads'
);

select lives_ok(
  $$
    insert into public.bookings (
      service_id,
      customer_name,
      customer_email,
      customer_phone,
      customer_type,
      address,
      city,
      postal_code,
      slot_start,
      slot_end,
      service_name_snapshot,
      service_price_min_snapshot,
      service_price_max_snapshot,
      service_price_type_snapshot
    )
    select
      id,
      'Admin Booking',
      'admin-booking@example.com',
      '+32000000000',
      'particular',
      'Teststraat 1',
      'Brussel',
      '1000',
      '2026-06-02 09:00:00+02',
      '2026-06-02 11:00:00+02',
      name_en,
      price_min,
      price_max,
      price_type
    from public.services
    where name_en = 'Basic detail'
    limit 1
  $$,
  'admin can insert bookings'
);

select is(
  (select count(*) from public.bookings where customer_email = 'admin-booking@example.com'),
  1::bigint,
  'admin can read inserted bookings'
);

select is(
  (select count(*) from public.leads where email = 'admin-lead@example.com'),
  1::bigint,
  'admin can read inserted leads'
);

select lives_ok(
  $$
    delete from public.leads
    where email = 'admin-lead@example.com'
  $$,
  'admin can delete leads'
);

select lives_ok(
  $$
    delete from public.bookings
    where customer_email = 'admin-booking@example.com'
  $$,
  'admin can delete bookings'
);

select * from finish();

rollback;
