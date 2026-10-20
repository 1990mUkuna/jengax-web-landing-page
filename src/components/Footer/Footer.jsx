import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import { useI18n } from '../../i18n/I18nProvider'
import logoImg from '../../assets/jengaXLogo.png'

export default function Footer() {
  const { t } = useI18n()
  const LINKS = {
    [t('footer.company')]: [
      { label: t('footer.careers'), href: '#' },
      { label: t('footer.press'), href: '#' },
      { label: t('footer.partners'), href: '#' },
    ],
    [t('footer.support')]: [
      { label: t('footer.contact'), href: 'mailto:jengax-admin@jengax.co' },
      { label: t('footer.help'), href: '#' },
      { label: t('footer.privacy'), to: '/privacy' },
    ],
    [t('footer.connect')]: [
      { label: 'LinkedIn', href: '#' },
      { label: 'Instagram', href: '#' },
      { label: 'Twitter', href: '#' },
    ],
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>
              <img src={logoImg} alt="" className={styles.logoImg} />
              <span>Jenga<span className={styles.logoX}>X</span></span>
            </span>
            <p className={styles.tagline}>{t('footer.tagline')}</p>
          </div>

          <div className={styles.columns}>
            {Object.entries(LINKS).map(([group, items]) => (
              <div key={group} className={styles.column}>
                <h4 className={styles.groupTitle}>{group}</h4>
                <ul className={styles.linkList}>
                  {items.map(({ label, href, to }) => (
                    <li key={label}>
                      {to
                        ? <Link to={to} className={styles.link}>{label}</Link>
                        : <a href={href} className={styles.link}>{label}</a>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>{t('footer.copy')}</p>
          <div className={styles.legal}>
            <Link to="/terms" className={styles.legalLink}>{t('footer.terms')}</Link>
            <Link to="/privacy" className={styles.legalLink}>{t('footer.privacy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
