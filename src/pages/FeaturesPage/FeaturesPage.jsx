import { useState } from 'react'
import kitchenImg from '../../assets/kitchen_img_before_after.png'
import toiletImg from '../../assets/toilet_img_before_after.png'
import gardenImg from '../../assets/garden_img_before_after.png'
import Footer from '../../components/Footer/Footer'
import styles from './FeaturesPage.module.css'
import { useI18n } from '../../i18n/I18nProvider'

// ─── Icons ───────────────────────────────────────────────────────────────────

const IconCamera = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
)

const IconCart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
)

const IconLock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

const IconPen = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
)

const IconUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

// ─── Transformation Suite ─────────────────────────────────────────────────────

const PROJECTS_RAW = [
  {
    img: kitchenImg,
    key: 'features.projects.culinaryCraft',
    featureKey: 'features.projects.culinaryCraft.feature',
    descKey: 'features.projects.culinaryCraft.description',
  },
  {
    img: toiletImg,
    key: 'features.projects.sanctuaryBuilt',
    featureKey: 'features.projects.sanctuaryBuilt.feature',
    descKey: 'features.projects.sanctuaryBuilt.description',
  },
  {
    img: gardenImg,
    key: 'features.projects.heritageHaven',
    featureKey: 'features.projects.heritageHaven.feature',
    descKey: 'features.projects.heritageHaven.description',
  },
]

function TransformationSuite() {
  const [mode, setMode] = useState('after')
  const { t } = useI18n()

  const PROJECTS = PROJECTS_RAW.map(p => ({ img: p.img, title: t(`${p.key}.title`), feature: t(p.featureKey), description: t(p.descKey) }))

  return (
    <section className={styles.suite}>
      <div className={styles.container}>
        <div className={styles.suiteHeader}>
          <div>
            <h2 className={styles.sectionTitle}>{t('featuresPage.transformation.title')}</h2>
            <p className={styles.sectionSub}>{t('featuresPage.transformation.subtitle')}</p>
          </div>
          <div className={styles.toggle}>
            <button
              className={`${styles.toggleBtn} ${mode === 'before' ? styles.toggleActive : ''}`}
              onClick={() => setMode('before')}
            >
              {t('featuresPage.toggle.before')}
            </button>
            <button
              className={`${styles.toggleBtn} ${mode === 'after' ? styles.toggleActive : ''}`}
              onClick={() => setMode('after')}
            >
              {t('featuresPage.toggle.after')}
            </button>
          </div>
        </div>

        <div className={styles.projectsGrid}>
          {PROJECTS.map(({ img, title, feature, description }) => (
            <div key={title} className={styles.projectCard}>
              <div className={styles.imgWrap}>
                <img
                  src={img}
                  alt={title}
                  className={styles.projectImg}
                  style={{
                    objectPosition: mode === 'before' ? 'left center' : 'right center',
                  }}
                />
                <span className={styles.imgLabel}>{mode === 'before' ? t('featuresPage.beforeLabel') : t('featuresPage.afterLabel')}</span>
              </div>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>{title}</h3>
                <p className={styles.projectDesc}>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Precision Engineering ────────────────────────────────────────────────────

function PrecisionEngineering() {
  const { t } = useI18n()
  return (
    <section className={styles.precision}>
      <div className={styles.container}>
        <div className={styles.precisionHeader}>
          <h2 className={styles.sectionTitleCenter}>{t('featuresPage.precision.title')}</h2>
          <p className={styles.sectionSubCenter}>{t('featuresPage.precision.subtitle')}</p>
        </div>

        <div className={styles.bentoGrid}>
          {/* AI Site Analyser — spans 2 rows */}
          <div className={`${styles.bentoCard} ${styles.aiSite}`}>
            <div className={styles.bentoTag}>{t('featuresPage.bento.analysisTag')}</div>
            <div className={styles.bentoIcon}><IconCamera /></div>
            <h3 className={styles.bentoTitle}>{t('featuresPage.bento.aiSite.title')}</h3>
            <p className={styles.bentoDesc}>{t('featuresPage.bento.aiSite.desc')}</p>
            <a href="#" className={styles.bentoCta}>{t('featuresPage.bento.aiSite.cta')}</a>
          </div>

          {/* Collaborative Material Cart — dark, spans 3 cols */}
          <div className={`${styles.bentoCard} ${styles.materialCart} ${styles.bentoDark}`}>
            <div className={styles.bentoIconDark}><IconCart /></div>
            <h3 className={styles.bentoTitleLight}>{t('featuresPage.bento.cart.title')}</h3>
            <p className={styles.bentoDescLight}>{t('featuresPage.bento.cart.desc')}</p>
            <a href="#" className={styles.bentoCtaLight}>{t('featuresPage.bento.cart.cta')}</a>
          </div>

          {/* Milestone Escrow */}
          <div className={`${styles.bentoCard} ${styles.escrow}`}>
            <div className={styles.bentoTag}>{t('featuresPage.bento.securityTag')}</div>
            <div className={styles.bentoIcon}><IconLock /></div>
            <h3 className={styles.bentoTitle}>{t('featuresPage.bento.escrow.title')}</h3>
            <p className={styles.bentoDesc}>{t('featuresPage.bento.escrow.desc')}</p>
          </div>

          {/* AI Design Preview */}
          <div className={`${styles.bentoCard} ${styles.aiDesign}`}>
            <div className={styles.bentoTag}>{t('featuresPage.bento.visualTag')}</div>
            <div className={styles.bentoIcon}><IconPen /></div>
            <h3 className={styles.bentoTitle}>{t('featuresPage.bento.design.title')}</h3>
            <p className={styles.bentoDesc}>{t('featuresPage.bento.design.desc')}</p>
          </div>

          {/* Jenga Collective — red */}
          <div className={`${styles.bentoCard} ${styles.collective} ${styles.bentoRed}`}>
            <div className={styles.bentoTag} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>{t('featuresPage.bento.communityTag')}</div>
            <div className={styles.bentoIconDark}><IconUsers /></div>
            <h3 className={styles.bentoTitleLight}>{t('featuresPage.bento.collective.title')}</h3>
            <p className={styles.bentoDescLight}>{t('featuresPage.bento.collective.desc')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Features CTA ─────────────────────────────────────────────────────────────

function FeaturesCTA() {
  const { t } = useI18n()
  return (
    <section className={styles.featuresCta}>
      <div className={styles.container}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>{t('featuresPage.cta.title')}</h2>
          <p className={styles.ctaSub}>{t('featuresPage.cta.subtitle')}</p>
          <div className={styles.ctaActions}>
            <a href="#" className={styles.ctaBtn}>
              <span className={styles.ctaBtnLabel}>
                <small>{t('featuresPage.cta.appStoreSmall')}</small>
                {t('featuresPage.cta.appStore')}
              </span>
            </a>
            <a href="#" className={styles.ctaBtnOutline}>
              <span className={styles.ctaBtnLabel}>
                <small>{t('featuresPage.cta.getItOn')}</small>
                {t('featuresPage.cta.googlePlay')}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FeaturesPage() {
  const { t } = useI18n()
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.pill}>{t('featuresPage.hero.pill')}</span>
          <h1 className={styles.heroTitle}>{t('featuresPage.hero.titleHtml') ? <span dangerouslySetInnerHTML={{ __html: t('featuresPage.hero.titleHtml') }} /> : t('featuresPage.hero.title')}</h1>
          <p className={styles.heroSub}>{t('featuresPage.hero.subtitle')}</p>
          <div className={styles.heroActions}>
            <a href="#" className={styles.heroBtnPrimary}>{t('featuresPage.hero.getStarted')}</a>
            <a href="#" className={styles.heroBtnSecondary}>{t('featuresPage.hero.watchStory')}</a>
          </div>
        </div>
      </section>

      <TransformationSuite />
      <PrecisionEngineering />
      <FeaturesCTA />
      <Footer />
    </>
  )
}
