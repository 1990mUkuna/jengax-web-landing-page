import styles from './CTA.module.css'

export default function CTA() {
  return (
    <section className={styles.section} id="cta">
      <div className={styles.container}>
        <h2 className={styles.title}>Ready to break ground?</h2>
        <p className={styles.subtitle}>
          Join 5,000+ diaspora members building their legacy with Jenga&#8209;X.
          Start your first project milestone today.
        </p>
        <div className={styles.actions}>
          <a href="#" className={styles.btnDark}>
            <span className={styles.storeLabel}>
              <small>App Store</small>
              Download Now
            </span>
          </a>
          <a href="#" className={styles.btnLight}>
            <span className={styles.storeLabel}>
              <small>Get it On</small>
              Google Play
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
