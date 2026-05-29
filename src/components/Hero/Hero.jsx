import PhoneMockup from './PhoneMockup'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.headline}>
            Your home. Built right.<br />
            From anywhere in<br />
            the world.
          </h1>
          <p className={styles.subtext}>
            The construction marketplace for the African diaspora to
            build with trust. Manage milestones, payments, and site
            progress in real-time.
          </p>
          <div className={styles.actions}>
            <a href="#cta" className={styles.btnPrimary}>
              <span className={styles.storeIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </span>
              App Store
            </a>
            <a href="#cta" className={styles.btnSecondary}>
              <span className={styles.storeIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.28.15.6.2.92.13l12.49-7.02-2.79-2.79-10.62 9.68zM.45 1.46C.17 1.76 0 2.2 0 2.78v18.44c0 .58.17 1.02.46 1.32l.07.07 10.33-10.33v-.24L.52 1.4l-.07.06zM20.13 10.4l-2.9-1.64-3.07 3.07 3.07 3.07 2.91-1.64c.83-.47.83-1.23-.01-1.86zM4.1.24l12.49 7.02-2.79 2.79L3.18.37C3.5.3 3.82.35 4.1.24z"/>
                </svg>
              </span>
              Google Play
            </a>
          </div>
          <p className={styles.freeNote}>Free to download · iOS &amp; Android</p>
        </div>

        <div className={styles.visual}>
          <div className={styles.glow} />
          <PhoneMockup />
        </div>
      </div>
    </section>
  )
}
