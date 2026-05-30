grant insert on table public.leads to anon;

create policy "Public contact form can create leads"
on public.leads
for insert
to anon
with check (
  source = 'contact_form'
  and status = 'new'
  and privacy_consent_at is not null
  and privacy_consent_at >= now() - interval '10 minutes'
  and privacy_consent_at <= now() + interval '5 minutes'
);
