// Phone helpers for the waiting list: country dial codes + E.164 normalisation.
// `digits` = allowed lengths of the national number (without trunk 0).

export const PHONE_COUNTRIES = [
  { code: 'CD', dial: '243', flag: '🇨🇩', name: 'RDC',            digits: [9] },
  { code: 'AO', dial: '244', flag: '🇦🇴', name: 'Angola',         digits: [9] },
  { code: 'ZA', dial: '27',  flag: '🇿🇦', name: 'South Africa',   digits: [9] },
  { code: 'BE', dial: '32',  flag: '🇧🇪', name: 'Belgique',       digits: [8, 9] },
  { code: 'FR', dial: '33',  flag: '🇫🇷', name: 'France',         digits: [9] },
  { code: 'GB', dial: '44',  flag: '🇬🇧', name: 'United Kingdom', digits: [10] },
  { code: 'US', dial: '1',   flag: '🇺🇸', name: 'USA / Canada',   digits: [10] },
]

export const OTHER_COUNTRY = 'OTHER'
export const DEFAULT_PHONE_COUNTRY = 'CD'

// Returns '+<digits>' or null when the number is not valid.
export function toE164(countryCode, national, customDial = '') {
  let nat = String(national || '').replace(/\D/g, '')
  if (!nat) return null

  if (countryCode === OTHER_COUNTRY) {
    const dial = String(customDial).replace(/\D/g, '')
    if (!/^[1-9]\d{0,2}$/.test(dial)) return null
    nat = nat.replace(/^0+/, '')
    const full = dial + nat
    return nat.length >= 4 && full.length >= 8 && full.length <= 15 ? `+${full}` : null
  }

  const country = PHONE_COUNTRIES.find(c => c.code === countryCode)
  if (!country) return null
  // Accept numbers typed with the dial code or the national trunk 0.
  if (nat.startsWith(country.dial) && country.digits.includes(nat.length - country.dial.length)) {
    nat = nat.slice(country.dial.length)
  }
  nat = nat.replace(/^0/, '')
  return country.digits.includes(nat.length) ? `+${country.dial}${nat}` : null
}
