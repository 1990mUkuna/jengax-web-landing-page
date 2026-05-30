import React, { createContext, useContext, useEffect, useState } from 'react'
import en from './locales/en.json'
import fr from './locales/fr.json'
import pt from './locales/pt.json'
import LocaleModal from '../components/LocaleModal/LocaleModal'

const translations = { en, fr, pt }
const I18nContext = createContext()
export function useI18n() { return useContext(I18nContext) }

export default function I18nProvider({ children }) {
  const [locale, setLocale] = useState(() => localStorage.getItem('jengax_locale') || 'en')

  useEffect(() => {
    localStorage.setItem('jengax_locale', locale)
  }, [locale])

  const t = (path) => {
    const parts = path.split('.')
    let val = translations[locale]
    for (const p of parts) {
      if (!val) return path
      val = val[p]
    }
    return val ?? path
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
      <LocaleModal />
    </I18nContext.Provider>
  )
}
