import styles from './Stats.module.css'

const STATS = [
  { value: '9M+', label: 'Diaspora' },
  { value: '$1.4B', label: 'Remittances' },
  { value: '50+', label: 'Verified Workers' },
  { value: '2', label: 'Countries' },
]

export default function Stats() {
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
