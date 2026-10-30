-- Waiting list: which phone(s) the person uses, so launch links go to the right store.
-- Idempotent: safe to run more than once.

alter table public.waiting_list
  add column if not exists phone_platforms text[] not null default '{}';

alter table public.waiting_list drop constraint if exists waiting_list_phone_platforms_check;
alter table public.waiting_list
  add constraint waiting_list_phone_platforms_check
  check (phone_platforms <@ array['ios', 'android']::text[]);

grant insert (phone_platforms) on public.waiting_list to anon;
