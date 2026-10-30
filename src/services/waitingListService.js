const SUPABASE_URL      = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export class DuplicateSignupError extends Error {}

export async function submitWaitingList(data) {
  const payload = {
    category:           data.category,
    full_name:          data.fullName      || null,
    company_name:       data.companyName   || null,
    shop_name:          data.shopName      || null,
    contact_person:     data.contactPerson || null,
    mobile:             data.phoneE164,
    phone_e164:         data.phoneE164,
    email:              data.email         || null,
    address:            data.address,
    country:            data.country,
    city:               data.city,
    whatsapp_opt_in:    data.whatsappOptIn === true,
    phone_platforms:    data.phonePlatforms,
    preferred_language: data.language,
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/waiting_list`, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'apikey':        SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer':        'return=minimal',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    // 23505 = unique violation on phone_e164: this number is already on the list.
    if (response.status === 409 || err.code === '23505') throw new DuplicateSignupError()
    throw new Error(err.message || 'Submission failed')
  }
}
