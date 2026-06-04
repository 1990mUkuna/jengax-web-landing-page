import blueprintImg from '../../assets/construction_flow_plan.png'
import engineerImg from '../../assets/engineer_standing.png'
import paymentImg from '../../assets/phone_payment-confirmed.png'
import inspectionImg from '../../assets/man_holding_phone.png'
import supplierImg from '../../assets/supplier_shop.png'
import styles from './HowItWorks.module.css'
import { useI18n } from '../../i18n/I18nProvider'

// ─── Stakeholder icons ────────────────────────────────────────────────────────
const IconHome = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)
const IconWorker = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/>
    <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a8 8 0 0 1 16 0v3"/>
  </svg>
)
const IconBox = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
)
const IconAI = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3"/>
    <circle cx="9" cy="9" r="1.5"/><circle cx="15" cy="9" r="1.5"/>
    <circle cx="9" cy="15" r="1.5"/><circle cx="15" cy="15" r="1.5"/>
    <line x1="9" y1="3" x2="9" y2="6"/><line x1="15" y1="3" x2="15" y2="6"/>
    <line x1="9" y1="18" x2="9" y2="21"/><line x1="15" y1="18" x2="15" y2="21"/>
    <line x1="3" y1="9" x2="6" y2="9"/><line x1="3" y1="15" x2="6" y2="15"/>
    <line x1="18" y1="9" x2="21" y2="9"/><line x1="18" y1="15" x2="21" y2="15"/>
  </svg>
)

const STAKEHOLDER_ICONS = { homeowners: IconHome, workers: IconWorker, suppliers: IconBox, ai: IconAI }
const STAKEHOLDER_KEYS  = ['homeowners', 'workers', 'suppliers', 'ai']

export default function HowItWorks() {
  const { t } = useI18n()
  const STEPS = [
    {
      number: '01',
      title: t('howItWorks.steps.1.title'),
      description: t('howItWorks.steps.1.description'),
      cta: t('howItWorks.steps.1.cta'),
      img: blueprintImg,
      imgAlt: t('howItWorks.steps.1.imgAlt'),
      imgBg: '#f5efe6',
      reverse: false,
    },
    {
      number: '02',
      title: t('howItWorks.steps.2.title'),
      description: t('howItWorks.steps.2.description'),
      cta: t('howItWorks.steps.2.cta'),
      img: engineerImg,
      imgAlt: t('howItWorks.steps.2.imgAlt'),
      imgBg: '#1a2e1a',
      reverse: true,
    },
    {
      number: '03',
      title: t('howItWorks.steps.3.title'),
      description: t('howItWorks.steps.3.description'),
      cta: t('howItWorks.steps.3.cta'),
      img: paymentImg,
      imgAlt: t('howItWorks.steps.3.imgAlt'),
      imgBg: '#1a2233',
      reverse: false,
    },
    {
      number: '04',
      title: t('howItWorks.steps.4.title'),
      description: t('howItWorks.steps.4.description'),
      cta: t('howItWorks.steps.4.cta'),
      img: inspectionImg,
      imgAlt: t('howItWorks.steps.4.imgAlt'),
      imgBg: '#1a2a1a',
      reverse: true,
    },
    {
      number: '05',
      title: t('howItWorks.steps.5.title'),
      description: t('howItWorks.steps.5.description'),
      cta: t('howItWorks.steps.5.cta'),
      img: supplierImg,
      imgAlt: t('howItWorks.steps.5.imgAlt'),
      imgBg: '#f7f3ee',
      reverse: false,
    },
  ]

  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.container}>

        {/* ── Platform overview ── */}
        <div className={styles.about}>
          <div className={styles.aboutLeft}>
            <span className={styles.aboutTag}>{t('howItWorks.about.tag')}</span>
            <h2 className={styles.aboutTitle}>
              {t('howItWorks.about.title').split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h2>
            <p className={styles.aboutBody}>{t('howItWorks.about.body')}</p>
            <div className={styles.problems}>
              {[0, 1, 2].map(i => (
                <span key={i} className={styles.problemPill}>
                  {i === 0 ? '🔍' : i === 1 ? '🛒' : '🔒'} {t(`howItWorks.about.problems.${i}`)}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.aboutRight}>
            <div className={styles.taglineCard}>
              <div className={styles.taglineAccent} />
              <p className={styles.taglineText}>
                {t('howItWorks.about.tagline').split('\n').map((line, i) => (
                  <span key={i} className={i === 0 ? styles.taglineLine1 : styles.taglineLine}>{line}</span>
                ))}
              </p>
              <p className={styles.marketsLabel}>{t('howItWorks.about.markets')}</p>
            </div>
          </div>
        </div>

        {/* ── Stakeholder cards ── */}
        <div className={styles.stakeholders}>
          {STAKEHOLDER_KEYS.map(key => {
            const Icon = STAKEHOLDER_ICONS[key]
            return (
              <div key={key} className={styles.stakeholderCard}>
                <div className={styles.stIconWrap}><Icon /></div>
                <span className={styles.stTag}>{t(`howItWorks.about.stakeholders.${key}.tag`)}</span>
                <h3 className={styles.stTitle}>{t(`howItWorks.about.stakeholders.${key}.title`)}</h3>
                <p className={styles.stDesc}>{t(`howItWorks.about.stakeholders.${key}.desc`)}</p>
              </div>
            )
          })}
        </div>

        {/* ── Process header ── */}
        <div className={styles.header}>
          <h2 className={styles.title}>{t('howItWorks.header.title')}</h2>
          <p className={styles.subtitle}>{t('howItWorks.header.subtitle')}</p>
        </div>

        <div className={styles.steps}>
          {STEPS.map(({ number, title, description, cta, img, imgAlt, imgBg, reverse }) => (
            <div key={number} className={`${styles.step} ${reverse ? styles.reverse : ''}`}>
              <div className={styles.content}>
                <span className={styles.stepLabel}>{t('howItWorks.stepLabel')} {number}</span>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepDesc}>{description}</p>
                <a href="#" className={styles.stepCta}>{cta}</a>
              </div>
              <div className={styles.imgCard} style={{ background: imgBg }}>
                <img src={img} alt={imgAlt} className={styles.img} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
