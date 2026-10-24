-- Waiting list → WhatsApp welcome + launch notification.
-- Idempotent: safe to run more than once.

-- 1. Columns ------------------------------------------------------------------
alter table public.waiting_list
  add column if not exists phone_e164            text,
  add column if not exists whatsapp_opt_in       boolean not null default false,
  add column if not exists whatsapp_opt_in_at    timestamptz,
  add column if not exists whatsapp_confirmed_at timestamptz,  -- set manually when they message us
  add column if not exists launch_notified_at    timestamptz,  -- set when included in a launch broadcast
  add column if not exists launch_batch          int,          -- broadcast list number (1, 2, 3…)
  add column if not exists preferred_language    text default 'fr';

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'waiting_list_phone_e164_format') then
    alter table public.waiting_list
      add constraint waiting_list_phone_e164_format
      check (phone_e164 is null or phone_e164 ~ '^\+[1-9][0-9]{7,14}$');
  end if;
  if not exists (select 1 from pg_constraint where conname = 'waiting_list_preferred_language_check') then
    alter table public.waiting_list
      add constraint waiting_list_preferred_language_check
      check (preferred_language is null or preferred_language in ('fr', 'en', 'pt'));
  end if;
end $$;

-- 2. Backfill phone_e164 ------------------------------------------------------
-- Only numbers already in international format with the right length for their
-- country code. For duplicate numbers, only the earliest signup gets phone_e164;
-- later duplicates stay NULL for manual review. Nothing is guessed or deleted.
with cleaned as (
  select id, created_at,
         regexp_replace(mobile, '[\s\-\.\(\)]', '', 'g') as num
  from public.waiting_list
  where phone_e164 is null
),
valid as (
  select id, num,
         row_number() over (partition by num order by created_at, id) as rn
  from cleaned
  where num ~ '^\+[1-9][0-9]{7,14}$'
    and (num !~ '^\+243' or num ~ '^\+243[0-9]{9}$')
    and (num !~ '^\+244' or num ~ '^\+244[0-9]{9}$')
    and (num !~ '^\+27'  or num ~ '^\+27[0-9]{9}$')
)
update public.waiting_list w
set phone_e164 = v.num
from valid v
where w.id = v.id
  and v.rn = 1
  and not exists (select 1 from public.waiting_list x where x.phone_e164 = v.num);

-- 3. No duplicate phone numbers ----------------------------------------------
create unique index if not exists waiting_list_phone_e164_key
  on public.waiting_list (phone_e164)
  where phone_e164 is not null;

-- 4. Opt-in timestamp is set by the server, never by the browser --------------
create or replace function public.waiting_list_set_opt_in_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.whatsapp_opt_in then
    new.whatsapp_opt_in_at := coalesce(new.whatsapp_opt_in_at, now());
  else
    new.whatsapp_opt_in_at := null;
  end if;
  return new;
end;
$$;

drop trigger if exists waiting_list_set_opt_in_at on public.waiting_list;
create trigger waiting_list_set_opt_in_at
  before insert on public.waiting_list
  for each row execute function public.waiting_list_set_opt_in_at();

-- 5. Access: anon can INSERT only (and only the form's columns) ---------------
alter table public.waiting_list enable row level security;

drop policy if exists admin_select on public.waiting_list;  -- any logged-in app user could read signups
drop policy if exists public_insert on public.waiting_list;
create policy public_insert on public.waiting_list
  for insert to anon
  with check (launch_notified_at is null and launch_batch is null and whatsapp_confirmed_at is null);

revoke all on public.waiting_list from anon, authenticated;
grant insert (category, full_name, company_name, shop_name, contact_person,
              mobile, email, address, country, city,
              phone_e164, whatsapp_opt_in, preferred_language)
  on public.waiting_list to anon;

-- 6. Admin export view (not public) -------------------------------------------
-- security_invoker: the view obeys the table's RLS instead of bypassing it.
create or replace view public.waitlist_whatsapp_export
with (security_invoker = true) as
select id,
       coalesce(full_name, contact_person, company_name, shop_name) as name,
       phone_e164,
       created_at,
       ((row_number() over (order by created_at, id) - 1) / 256) + 1 as batch
from public.waiting_list
where whatsapp_opt_in
  and launch_notified_at is null
  and phone_e164 is not null
order by created_at, id;

revoke all on public.waitlist_whatsapp_export from anon, authenticated;
