import { useEffect, useState } from 'react'
import styles from './LocaleModal.module.css'
import { useI18n } from '../../i18n/I18nProvider'

export default function LocaleModal() {
  const { setLocale } = useI18n()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('jengax_locale')
    if (!stored) setVisible(true)
  }, [])

  const choose = (loc) => {
    setLocale(loc)
    localStorage.setItem('jengax_locale', loc)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        <h3>Choose your country</h3>
        <p>Select a country to set the website language.</p>
        <div className={styles.options}>
          <button onClick={() => choose('fr')}>RDCongo</button>
          <button onClick={() => choose('pt')}>Angola</button>
          <button onClick={() => choose('en')}>Others</button>
        </div>
      </div>
    </div>
  )
}
