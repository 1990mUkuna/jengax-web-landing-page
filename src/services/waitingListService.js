const API_BASE = import.meta.env.VITE_API_URL || 'https://api.jengax.co'

export async function submitWaitingList(data) {
  const response = await fetch(`${API_BASE}/v1/waiting-list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.message || 'Submission failed')
  }

  return response.json()
}
