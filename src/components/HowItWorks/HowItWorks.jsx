import styles from './HowItWorks.module.css'

const STEPS = [
  {
    number: '01',
    title: 'Plan & Design',
    description:
      'Upload your architectural drawings or use our AI to generate a blueprint from your vision.',
  },
  {
    number: '02',
    title: 'Hire Verified',
    description:
      'Browse pre-vetted contractors with ratings from other diaspora builders. No more ghosting.',
  },
  {
    number: '03',
    title: 'Fund Escrow',
    description:
      'Your money is safe. We only release funds when milestones are inspected and approved.',
  },
  {
    number: '04',
    title: 'Remote Inspection',
    description:
      'Get weekly HD video updates and AI-driven quality reports delivered to your dashboard.',
  },
]

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Building should feel like progress, not stress.
          </h2>
          <p className={styles.subtitle}>Four simple steps to your dream project.</p>
        </div>

        <div className={styles.grid}>
          {STEPS.map(({ number, title, description }) => (
            <div key={number} className={styles.step}>
              <span className={styles.number}>{number}</span>
              <h3 className={styles.stepTitle}>{title}</h3>
              <p className={styles.stepDesc}>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
