-- Launch day: WhatsApp broadcast in batches of 256 (WhatsApp Business App limit).
-- Run in the Supabase dashboard → SQL Editor (runs as admin; not exposed to the website).
-- Only people who saved the JengaX number receive broadcasts, so ask them to save it.

-- ── 0. Overview: how many people are waiting, per batch ─────────────────────
select batch, count(*) as people
from public.waitlist_whatsapp_export
group by batch
order by batch;

-- ── 1. Export the next batch (256 rows) ────────────────────────────────────
-- Click "Download CSV" on the result, then add these numbers to a new
-- broadcast list in the WhatsApp Business App.
select name, phone_e164
from public.waitlist_whatsapp_export
where batch = 1          -- always 1: the view only lists people not yet notified
order by created_at, id;

-- ── 2. After sending the broadcast: mark that batch as notified ────────────
-- Replace 1 in launch_batch = 1 with the broadcast list number (1, 2, 3…).
-- Run it right after the export so the same 256 people are marked.
update public.waiting_list
set launch_notified_at = now(),
    launch_batch       = 1  -- ← broadcast list number N
where id in (
  select id from public.waitlist_whatsapp_export where batch = 1
);

-- ── 3. Optional: record that someone messaged us on WhatsApp ───────────────
-- update public.waiting_list
-- set whatsapp_confirmed_at = now()
-- where phone_e164 = '+243812345678';

-- ── 4. Check: who has been notified, per batch ─────────────────────────────
select launch_batch, count(*) as people, min(launch_notified_at) as sent_at
from public.waiting_list
where launch_notified_at is not null
group by launch_batch
order by launch_batch;
