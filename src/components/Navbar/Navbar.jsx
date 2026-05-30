import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useI18n } from '../../i18n/I18nProvider'

export default function Navbar() {
  const { t, locale, showLocaleModal } = useI18n()
  const [menuOpen, setMenuOpen] = useState(false)

  const NAV_LINKS = [
    { label: t('nav.howItWorks'), href: '/#how-it-works' },
    { label: t('nav.features'), to: '/features' },
    { label: t('nav.markets'), to: '/markets' },
  ]

  const FLAGS = { en: '🇬🇧', fr: '🇫🇷', pt: '🇵🇹' }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.logo}>
          Jenga<span>-X</span>
        </NavLink>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {NAV_LINKS.map(({ label, to, href }) => (
            <li key={label}>
              {to ? (
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ''}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
              ) : (
                <a href={href} className={styles.link} onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <NavLink to="/features" className={styles.cta}>
            {t('nav.downloadApp')}
          </NavLink>

          <button className={styles.langBtn} aria-label="Change language" onClick={() => showLocaleModal()}>
            {FLAGS[locale] || '🌐'}
          </button>
        </div>

        <button
          className={styles.hamburger}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(v => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </header>
  )
}
