import styles from './Footer.module.css'

const LINKS = {
  Company: [
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Partners', href: '#' },
  ],
  Support: [
    { label: 'Contact Us', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
  Connect: [
    { label: 'LinkedIn', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Twitter', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>
              Jenga<span>-X</span>
            </span>
            <p className={styles.tagline}>Build it. From anywhere.</p>
          </div>

          <div className={styles.columns}>
            {Object.entries(LINKS).map(([group, items]) => (
              <div key={group} className={styles.column}>
                <h4 className={styles.groupTitle}>{group}</h4>
                <ul className={styles.linkList}>
                  {items.map(({ label, href }) => (
                    <li key={label}>
                      <a href={href} className={styles.link}>{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>&copy; 2024 Jenga-X. All rights reserved.</p>
          <div className={styles.legal}>
            <a href="#" className={styles.legalLink}>Terms of Service</a>
            <a href="#" className={styles.legalLink}>Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
