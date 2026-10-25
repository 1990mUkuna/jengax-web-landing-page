// Called by the waiting_list INSERT trigger (pg_net). Sends the welcome email via Resend.
// Secrets: WEBHOOK_SECRET, RESEND_API_KEY, EMAIL_FROM (e.g. "JengaX <bienvenue@jengax.co>").
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided by Supabase automatically.
// Deploy with JWT verification OFF; requests are checked with the x-webhook-secret header.

import { createClient } from 'npm:@supabase/supabase-js@2.45.4'
import { json, lang, secretMatches, welcomeEmail } from '../_shared/waitlist.ts'

Deno.serve(async (req) => {
  if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405)
  if (!secretMatches(req.headers.get('x-webhook-secret'), Deno.env.get('WEBHOOK_SECRET'))) {
    return json({ error: 'unauthorized' }, 401)
  }

  const { record } = await req.json().catch(() => ({ record: null }))
  if (!record?.id || !record?.email) return json({ skipped: 'no email' })

  const { subject, text, html } = welcomeEmail(lang(record.preferred_language), record.category === 'soloBuilder')
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: Deno.env.get('EMAIL_FROM'), to: [record.email], subject, text, html }),
  })

  if (!res.ok) {
    // Logged only: the signup itself has already succeeded.
    console.error('waitlist-welcome: Resend error', res.status, await res.text())
    return json({ error: 'email failed' }, 502)
  }

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  const { error } = await supabase
    .from('waiting_list')
    .update({ welcome_email_sent_at: new Date().toISOString() })
    .eq('id', record.id)
  if (error) console.error('waitlist-welcome: could not mark sent', error.message)

  return json({ sent: true })
})
