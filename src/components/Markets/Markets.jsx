import styles from './Markets.module.css'

const MARKETS = [
  { flag: '🇨🇩', name: 'DRC' },
  { flag: '🇦🇴', name: 'Angola' },
  { flag: '🇧🇪', name: 'Belgium' },
  { flag: '🇫🇷', name: 'France' },
  { flag: '🇬🇧', name: 'UK' },
  { flag: '🇨🇦', name: 'Canada' },
  { flag: '🇺🇸', name: 'USA' },
  { flag: '🇿🇦', name: 'South Africa' },
]

export default function Markets() {
  return (
    <section className={styles.section} id="markets">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Where we build.</h2>
          <p className={styles.subtitle}>
            Connecting the diaspora with Africa&apos;s fastest-growing corridors.
          </p>
        </div>

        <div className={styles.grid}>
          {MARKETS.map(({ flag, name }) => (
            <div key={name} className={styles.market}>
              <span className={styles.flag} role="img" aria-label={name}>{flag}</span>
              <span className={styles.name}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
