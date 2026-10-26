import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './AppAccessModal.module.css'
import { useI18n } from '../../i18n/I18nProvider'
import logoImg from '../../assets/jengaXLogo.png'

// The app is in private beta (internal testers + first 200 founding members).
// Every "download" button opens this modal instead of a store link.

const AppAccessContext = createContext(() => {})

// Returns an onClick handler for download buttons: <a href="/waiting-list" onClick={openAppAccess}>
export function useAppAccess() {
  return useContext(AppAccessContext)
}

export function AppAccessProvider({ children }) {
  const [open, setOpen] = useState(false)
  const openAppAccess = useCallback((e) => {
    e?.preventDefault()
    setOpen(true)
  }, [])
  const close = useCallback(() => setOpen(false), [])

  return (
    <AppAccessContext.Provider value={openAppAccess}>
      {children}
      {open && <AppAccessModal onClose={close} />}
    </AppAccessContext.Provider>
  )
}

function AppAccessModal({ onClose }) {
  const { t } = useI18n()
  const navigate = useNavigate()
  const primaryRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    primaryRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
      previousFocus?.focus?.()
    }
  }, [onClose])

  const requestAccess = () => {
    onClose()
    navigate('/waiting-list')
    window.scrollTo(0, 0)
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="app-access-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.close} aria-label={t('appAccess.close')} onClick={onClose}>×</button>

        <img src={logoImg} alt="" className={styles.logo} />
        <span className={styles.badge}>{t('appAccess.badge')}</span>
        <h2 id="app-access-title" className={styles.title}>{t('appAccess.title')}</h2>
        <p className={styles.text}>{t('appAccess.text')}</p>
        <p className={styles.subtext}>{t('appAccess.subtext')}</p>

        <div className={styles.actions}>
          <button ref={primaryRef} className={styles.primary} onClick={requestAccess}>
            {t('appAccess.request')}
          </button>
          <button className={styles.secondary} onClick={onClose}>
            {t('appAccess.later')}
          </button>
        </div>
      </div>
    </div>
  )
}
