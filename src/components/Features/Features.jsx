import styles from './Features.module.css'
import { useI18n } from '../../i18n/I18nProvider'

const IconCart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
)

const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const IconLock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

const IconCamera = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
)

const IconPen = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
)

const IconUsers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

export default function Features() {
  const { t } = useI18n()

  const FEATURES = [
    {
      icon: <IconCart />,
      tag: t('features.items.collaborative.tag'),
      title: t('features.items.collaborative.title'),
      description: t('features.items.collaborative.description'),
      cta: t('features.items.collaborative.cta'),
      featured: true,
      span: 'wide',
    },
    {
      icon: <IconShield />,
      title: t('features.items.verified.title'),
      description: t('features.items.verified.description'),
      featured: false,
    },
    {
      icon: <IconLock />,
      title: t('features.items.escrow.title'),
      description: t('features.items.escrow.description'),
      featured: false,
    },
    {
      icon: <IconCamera />,
      title: t('features.items.siteAnalyzer.title'),
      description: t('features.items.siteAnalyzer.description'),
      featured: false,
    },
    {
      icon: <IconPen />,
      title: t('features.items.designPreview.title'),
      description: t('features.items.designPreview.description'),
      featured: false,
    },
  ]

  const COLLECTIVE = {
    icon: <IconUsers />,
    title: t('features.collective.title'),
    description: t('features.collective.description'),
    cta: t('features.collective.cta'),
  }

  return (
    <section className={styles.section} id="features">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t('features.header.title')}</h2>
          <p className={styles.subtitle}>{t('features.header.subtitle')}</p>
        </div>

        <div className={styles.grid}>
          {FEATURES.map(({ icon, tag, title, description, cta, featured, span }) => (
            <div
              key={title}
              className={`${styles.card} ${featured ? styles.featured : ''} ${span === 'wide' ? styles.wide : ''}`}
            >
              <div className={styles.cardTop}>
                {tag && <span className={styles.tag}>{tag}</span>}
                <div className={styles.icon}>{icon}</div>
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{description}</p>
              {cta && <a href="#" className={styles.cardCta}>{cta}</a>}
            </div>
          ))}
        </div>

        <div className={styles.collective}>
          <div className={styles.collectiveLeft}>
            <div className={styles.collectiveIcon}>{COLLECTIVE.icon}</div>
            <div>
              <h3 className={styles.collectiveTitle}>{COLLECTIVE.title}</h3>
              <p className={styles.collectiveDesc}>{COLLECTIVE.description}</p>
            </div>
          </div>
          <a href="#" className={styles.collectiveBtn}>{COLLECTIVE.cta}</a>
        </div>
      </div>
    </section>
  )
}
