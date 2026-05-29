import styles from './PhoneMockup.module.css'

function Stars({ count = 5 }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24"
          fill={i < count ? '#F59E0B' : '#e5e7eb'}>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ))}
    </div>
  )
}

function WorkerRow({ initials, name, stars, gradient }) {
  return (
    <div className={styles.workerRow}>
      <div className={styles.avatar} style={{ background: gradient }}>
        {initials}
      </div>
      <div className={styles.workerInfo}>
        <span className={styles.workerName}>{name}</span>
        <Stars count={stars} />
      </div>
      <div className={styles.verifiedChip}>
        <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        Verified
      </div>
    </div>
  )
}

function NavIcon({ children, active }) {
  return (
    <div className={`${styles.navIcon} ${active ? styles.navActive : ''}`}>
      <svg viewBox="0 0 24 24" width="18" height="18">{children}</svg>
    </div>
  )
}

export default function PhoneMockup() {
  return (
    <div className={styles.wrapper}>
      {/* Hardware buttons */}
      <div className={styles.btnVolUp} />
      <div className={styles.btnVolDown} />
      <div className={styles.btnPower} />

      {/* Phone frame */}
      <div className={styles.frame}>
        <div className={styles.screen}>
          {/* Notch */}
          <div className={styles.notch} />

          {/* App header */}
          <div className={styles.appHeader}>
            <div className={styles.appIconBadge}>J</div>
            <div className={styles.greeting}>
              <span className={styles.greetingHi}>Good morning,</span>
              <strong className={styles.greetingName}>Mukuna</strong>
            </div>
          </div>

          {/* Escrow balance card */}
          <div className={styles.escrowCard}>
            <span className={styles.escrowLabel}>Escrow Balance</span>
            <span className={styles.escrowAmount}>$3,200</span>
          </div>

          {/* Worker list */}
          <div className={styles.workerList}>
            <WorkerRow
              initials="JK"
              name="John K."
              stars={5}
              gradient="linear-gradient(135deg,#667eea 0%,#764ba2 100%)"
            />
            <WorkerRow
              initials="SM"
              name="Sarah M."
              stars={5}
              gradient="linear-gradient(135deg,#f093fb 0%,#c1396b 100%)"
            />
          </div>

          {/* Recent projects */}
          <div className={styles.recentLabel}>Recent Projects</div>

          {/* Bottom navigation */}
          <div className={styles.bottomNav}>
            <NavIcon active>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor"/>
            </NavIcon>
            <NavIcon>
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="7" r="4" stroke="currentColor" fill="none" strokeWidth="2"/>
            </NavIcon>
            <NavIcon>
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" fill="none" strokeWidth="2"/>
            </NavIcon>
            <NavIcon>
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="13" r="4" stroke="currentColor" fill="none" strokeWidth="2"/>
            </NavIcon>
          </div>
        </div>
      </div>
    </div>
  )
}
