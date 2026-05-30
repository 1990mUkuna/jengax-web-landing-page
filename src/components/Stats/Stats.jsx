import styles from './Stats.module.css'
import { useI18n } from '../../i18n/I18nProvider'

export default function Stats() {
  const { t } = useI18n()
  const STATS = [
    { value: '9M+', label: t('stats.diaspora') },
    { value: '$1.4B', label: t('stats.remittances') },
    { value: '50+', label: t('stats.verifiedWorkers') },
    { value: '2', label: t('stats.countries') },
  ]

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {STATS.map(({ value, label }) => (
          <div key={label} className={styles.stat}>
            <span className={styles.value}>{value}</span>
            <span className={styles.label}>{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
