import styles from './PhoneMockup.module.css'
import { useI18n } from '../../i18n/I18nProvider'
import screenFr from '../../assets/app-welcome-screen-fr.jpg'
import screenEn from '../../assets/app-welcome-screen-en.jpg'

// App welcome screen in the site's language (Portuguese falls back to French until a PT screenshot exists).
const SCREENS = { fr: screenFr, en: screenEn, pt: screenFr }

export default function PhoneMockup() {
  const { locale, t } = useI18n()
  return (
    <div className={styles.wrapper}>
      {/* Hardware buttons */}
      <div className={styles.btnVolUp} />
      <div className={styles.btnVolDown} />
      <div className={styles.btnPower} />

      {/* Phone frame */}
      <div className={styles.frame}>
        <div className={styles.screen}>
          <img
            src={SCREENS[locale] || screenFr}
            alt={t('hero.phoneAlt')}
            className={styles.screenImg}
          />
        </div>
      </div>
    </div>
  )
}
