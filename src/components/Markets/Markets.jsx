import styles from './Markets.module.css'
import { useI18n } from '../../i18n/I18nProvider'

export default function Markets() {
  const { t } = useI18n()
  const MARKETS = [
    { flag: '🇨🇩', key: 'markets.list.drc' },
    { flag: '🇦🇴', key: 'markets.list.angola' },
    { flag: '🇧🇪', key: 'markets.list.belgium' },
    { flag: '🇫🇷', key: 'markets.list.france' },
    { flag: '🇬🇧', key: 'markets.list.uk' },
    { flag: '🇨🇦', key: 'markets.list.canada' },
    { flag: '🇺🇸', key: 'markets.list.usa' },
    { flag: '🇿🇦', key: 'markets.list.southAfrica' },
  ]

  return (
    <section className={styles.section} id="markets">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t('markets.title')}</h2>
          <p className={styles.subtitle}>{t('markets.subtitle')}</p>
        </div>

        <div className={styles.grid}>
          {MARKETS.map(({ flag, key }) => (
            <div key={key} className={styles.market}>
              <span className={styles.flag} role="img" aria-label={t(key)}>{flag}</span>
              <span className={styles.name}>{t(key)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
