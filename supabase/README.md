# Waiting list notifications (Supabase)

Project: **JengaX-Engineering** (`udxpyuqcwvsqvdxfbiki`).

| When | WhatsApp (free) | Email (free, Resend) |
|---|---|---|
| Someone joins | Success screen → "Rejoindre le groupe WhatsApp" (group invite link) | `waitlist-welcome` sends automatically (also links the group) |
| App is ready | Post the store links in the group | `waitlist-launch` emails everyone |

The group link lives in `src/config/links.js` (website) and `functions/_shared/waitlist.ts` (emails).
WhatsApp groups hold up to 1,024 members; beyond that, use a WhatsApp Community or broadcast
lists (`admin/launch_broadcast.sql`).

Later, paid WhatsApp Cloud API can reuse the same columns (no schema change).

## One-time setup

1. **Resend** — create an account at resend.com, add the domain `jengax.co`, add the DNS
   records Resend shows at your domain registrar, wait until it says *Verified*, then create
   an API key. Free tier: 100 emails/day, 3,000/month.

2. **Database** — Supabase dashboard → SQL Editor → run
   `migrations/20261024120000_waitlist_whatsapp.sql`.

3. **Vault secrets** — generate a random secret (`openssl rand -hex 32`), then in SQL Editor:
   ```sql
   select vault.create_secret('https://udxpyuqcwvsqvdxfbiki.supabase.co/functions/v1', 'waitlist_functions_url');
   select vault.create_secret('<your-random-secret>', 'waitlist_webhook_secret');
   ```

4. **Edge Function secrets** — dashboard → Edge Functions → Secrets:
   - `WEBHOOK_SECRET` = the same random secret as step 3
   - `RESEND_API_KEY` = from Resend
   - `EMAIL_FROM` = `JengaX <bienvenue@jengax.co>`
   - `APP_STORE_URL`, `PLAY_STORE_URL` = store links (needed on launch day only)

5. **Deploy the functions** (from this repo folder):
   ```bash
   npx supabase login
   npx supabase functions deploy waitlist-welcome --no-verify-jwt --project-ref udxpyuqcwvsqvdxfbiki
   npx supabase functions deploy waitlist-launch  --no-verify-jwt --project-ref udxpyuqcwvsqvdxfbiki
   ```


## Launch day

**Email** — preview, then send in runs of 90 (repeat daily until `remaining` is 0):
```bash
curl -X POST https://udxpyuqcwvsqvdxfbiki.supabase.co/functions/v1/waitlist-launch \
  -H "x-webhook-secret: <WEBHOOK_SECRET>" -H "Content-Type: application/json" \
  -d '{"limit": 90, "dryRun": true}'
```
Remove `"dryRun": true` to send.

**WhatsApp** — post the store links in the JengaX group. For people not in the group,
`admin/launch_broadcast.sql` exports opted-in numbers for broadcast lists (256 per list).

## Checks

```sql
select created_at, email, welcome_email_sent_at from public.waiting_list order by created_at desc limit 10;
select id, status_code, content from net._http_response order by created desc limit 10;  -- trigger calls
```
Function logs: dashboard → Edge Functions → waitlist-welcome → Logs.
