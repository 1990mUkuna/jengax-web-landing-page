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
      { label: t('footer.contact'), href: '#' },
      { label: t('footer.help'), href: '#' },
      { label: t('footer.privacy'), href: '#' },
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
              Jenga<span>-X</span>
            </span>
            <p className={styles.tagline}>{t('footer.tagline')}</p>
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
          <p className={styles.copy}>{t('footer.copy')}</p>
          <div className={styles.legal}>
            <a href="#" className={styles.legalLink}>{t('footer.terms')}</a>
            <a href="#" className={styles.legalLink}>{t('footer.privacy')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
