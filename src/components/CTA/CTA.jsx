import styles from './CTA.module.css'
import { useI18n } from '../../i18n/I18nProvider'

export default function CTA() {
  const { t } = useI18n()
  return (
    <section className={styles.section} id="cta">
      <div className={styles.container}>
        <h2 className={styles.title}>{t('cta.title')}</h2>
        <p className={styles.subtitle}>
          {t('cta.subtitle')}
        </p>
        <div className={styles.actions}>
          <a href="#" className={styles.btnDark}>
            <span className={styles.storeLabel}>
              <small>{t('cta.appStoreSmall')}</small>
              {t('cta.downloadNow')}
            </span>
          </a>
          <a href="#" className={styles.btnLight}>
            <span className={styles.storeLabel}>
              <small>{t('cta.getItOn')}</small>
              {t('cta.googlePlay')}
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
