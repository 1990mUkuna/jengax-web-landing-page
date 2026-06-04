const SUPABASE_URL      = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export async function submitWaitingList(data) {
  const payload = {
    category:       data.category,
    full_name:      data.fullName      || null,
    company_name:   data.companyName   || null,
    shop_name:      data.shopName      || null,
    contact_person: data.contactPerson || null,
    mobile:         data.mobile,
    email:          data.email         || null,
    address:        data.address,
    country:        data.country,
    city:           data.city,
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
    throw new Error(err.message || 'Submission failed')
  }
}
