// Launch day: emails "the app is ready" to everyone on the waiting list with an email
// who has not received it yet. Each run sends at most `limit` emails (default 90, to stay
// under the Resend free tier of 100 emails/day); run it again until `remaining` is 0.
//
// Call (admin only):
//   curl -X POST https://<project-ref>.supabase.co/functions/v1/waitlist-launch \
//     -H "x-webhook-secret: <WEBHOOK_SECRET>" -H "Content-Type: application/json" \
//     -d '{"limit": 90, "dryRun": true}'
//
// Secrets: WEBHOOK_SECRET, RESEND_API_KEY, EMAIL_FROM, APP_STORE_URL, PLAY_STORE_URL.
// Deploy with JWT verification OFF; requests are checked with the x-webhook-secret header.

import { createClient } from 'npm:@supabase/supabase-js@2.45.4'
import { json, lang, launchEmail, secretMatches } from '../_shared/waitlist.ts'

const RESEND_BATCH_MAX = 100

Deno.serve(async (req) => {
  if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405)
  if (!secretMatches(req.headers.get('x-webhook-secret'), Deno.env.get('WEBHOOK_SECRET'))) {
    return json({ error: 'unauthorized' }, 401)
  }

  const body = await req.json().catch(() => ({}))
  const limit = Math.min(Math.max(Number(body.limit) || 90, 1), RESEND_BATCH_MAX)
  const dryRun = body.dryRun === true

  const iosUrl = Deno.env.get('APP_STORE_URL') ?? ''
  const androidUrl = Deno.env.get('PLAY_STORE_URL') ?? ''
  if (!iosUrl && !androidUrl) return json({ error: 'set APP_STORE_URL and/or PLAY_STORE_URL first' }, 400)

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const pending = () => supabase
    .from('waiting_list')
    .select('id, email, preferred_language', { count: 'exact' })
    .not('email', 'is', null)
    .is('launch_email_sent_at', null)

  const { data: rows, count, error } = await pending().order('created_at').limit(limit)
  if (error) return json({ error: error.message }, 500)
  if (!rows?.length) return json({ sent: 0, remaining: 0 })
  if (dryRun) return json({ dryRun: true, wouldSend: rows.length, remaining: count })

  const res = await fetch('https://api.resend.com/emails/batch', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rows.map((r) => {
      const { subject, text, html } = launchEmail(lang(r.preferred_language), iosUrl, androidUrl)
      return { from: Deno.env.get('EMAIL_FROM'), to: [r.email], subject, text, html }
    })),
  })
  if (!res.ok) {
    const detail = await res.text()
    console.error('waitlist-launch: Resend error', res.status, detail)
    return json({ error: 'email batch failed', status: res.status, detail }, 502)
  }

  const { error: markError } = await supabase
    .from('waiting_list')
    .update({ launch_email_sent_at: new Date().toISOString() })
    .in('id', rows.map((r) => r.id))
  if (markError) console.error('waitlist-launch: could not mark sent', markError.message)

  return json({ sent: rows.length, remaining: Math.max((count ?? rows.length) - rows.length, 0) })
})
