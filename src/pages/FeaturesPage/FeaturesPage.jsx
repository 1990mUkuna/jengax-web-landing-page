import { useState } from 'react'
import kitchenImg from '../../assets/kitchen_img_before_after.png'
import toiletImg from '../../assets/toilet_img_before_after.png'
import gardenImg from '../../assets/garden_img_before_after.png'
import Footer from '../../components/Footer/Footer'
import styles from './FeaturesPage.module.css'

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

const PROJECTS = [
  {
    img: kitchenImg,
    title: 'Culinary Craft',
    feature: 'Material Cart',
    description:
      'Using our Material Cart, this emerald kitchen was outfitted with premium fixtures delivered direct-to-site, saving 15% on logistics.',
  },
  {
    img: toiletImg,
    title: 'Sanctuary Built',
    feature: 'AI Site Analyser',
    description:
      'AI Site Analyser identified structural plumbing risks early, ensuring this marble finish stands on a foundation of technical perfection.',
  },
  {
    img: gardenImg,
    title: 'Heritage Haven',
    feature: 'AI Design Preview',
    description:
      'Prototyped via AI Design Preview, this garden blends tropical lushness with modern entertainment spaces seamlessly.',
  },
]

function TransformationSuite() {
  const [mode, setMode] = useState('after')

  return (
    <section className={styles.suite}>
      <div className={styles.container}>
        <div className={styles.suiteHeader}>
          <div>
            <h2 className={styles.sectionTitle}>The Transformation Suite</h2>
            <p className={styles.sectionSub}>
              Witness how our precision tools turn ambitious visions into breathtaking
              realities. From site analysis to material delivery, Jenga‑X is your digital
              bridge to construction excellence.
            </p>
          </div>
          <div className={styles.toggle}>
            <button
              className={`${styles.toggleBtn} ${mode === 'before' ? styles.toggleActive : ''}`}
              onClick={() => setMode('before')}
            >
              Before
            </button>
            <button
              className={`${styles.toggleBtn} ${mode === 'after' ? styles.toggleActive : ''}`}
              onClick={() => setMode('after')}
            >
              After
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
                <span className={styles.imgLabel}>{mode === 'before' ? 'BEFORE' : 'AFTER'}</span>
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
  return (
    <section className={styles.precision}>
      <div className={styles.container}>
        <div className={styles.precisionHeader}>
          <h2 className={styles.sectionTitleCenter}>Precision Engineering for Every Milestone</h2>
          <p className={styles.sectionSubCenter}>
            Five core modules designed to eliminate uncertainty and empower your build journey from afar.
          </p>
        </div>

        <div className={styles.bentoGrid}>
          {/* AI Site Analyser — spans 2 rows */}
          <div className={`${styles.bentoCard} ${styles.aiSite}`}>
            <div className={styles.bentoTag}>ANALYSIS</div>
            <div className={styles.bentoIcon}><IconCamera /></div>
            <h3 className={styles.bentoTitle}>AI Site Analyser</h3>
            <p className={styles.bentoDesc}>
              Real-time flaw detection via high-fidelity video feeds. Our neural engine spots structural inconsistencies before they become costly errors.
            </p>
            <a href="#" className={styles.bentoCta}>Learn More →</a>
          </div>

          {/* Collaborative Material Cart — dark, spans 3 cols */}
          <div className={`${styles.bentoCard} ${styles.materialCart} ${styles.bentoDark}`}>
            <div className={styles.bentoIconDark}><IconCart /></div>
            <h3 className={styles.bentoTitleLight}>Collaborative Material Cart</h3>
            <p className={styles.bentoDescLight}>
              Access wholesale pricing and transparent supply chains. Direct-to-site delivery with GPS tracking and automated inventory updates.
            </p>
            <a href="#" className={styles.bentoCtaLight}>Explore Marketplace →</a>
          </div>

          {/* Milestone Escrow */}
          <div className={`${styles.bentoCard} ${styles.escrow}`}>
            <div className={styles.bentoTag}>SECURITY</div>
            <div className={styles.bentoIcon}><IconLock /></div>
            <h3 className={styles.bentoTitle}>Milestone Escrow</h3>
            <p className={styles.bentoDesc}>
              Funds are held in secure escrow and only released after site inspections verify milestone completion.
            </p>
          </div>

          {/* AI Design Preview */}
          <div className={`${styles.bentoCard} ${styles.aiDesign}`}>
            <div className={styles.bentoTag}>VISUALIZATION</div>
            <div className={styles.bentoIcon}><IconPen /></div>
            <h3 className={styles.bentoTitle}>AI Design Preview</h3>
            <p className={styles.bentoDesc}>
              Map high-end interior changes onto your real site using augmented reality before buying a single tile.
            </p>
          </div>

          {/* Jenga Collective — red */}
          <div className={`${styles.bentoCard} ${styles.collective} ${styles.bentoRed}`}>
            <div className={styles.bentoTag} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>COMMUNITY</div>
            <div className={styles.bentoIconDark}><IconUsers /></div>
            <h3 className={styles.bentoTitleLight}>Jenga Collective</h3>
            <p className={styles.bentoDescLight}>
              Pooled investments for the diaspora. Join forces with others to develop premium projects and share in the equity.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Features CTA ─────────────────────────────────────────────────────────────

function FeaturesCTA() {
  return (
    <section className={styles.featuresCta}>
      <div className={styles.container}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Start your transformation.</h2>
          <p className={styles.ctaSub}>
            Download the Jenga‑X app today and take the first step toward building your legacy with confidence.
          </p>
          <div className={styles.ctaActions}>
            <a href="#" className={styles.ctaBtn}>
              <span className={styles.ctaBtnLabel}>
                <small>Download on the</small>
                App Store
              </span>
            </a>
            <a href="#" className={styles.ctaBtnOutline}>
              <span className={styles.ctaBtnLabel}>
                <small>Get it on</small>
                Google Play
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
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.pill}>Built for the Diaspora</span>
          <h1 className={styles.heroTitle}>
            Tools for a <em>New Legacy.</em>
          </h1>
          <p className={styles.heroSub}>
            Bridging global professional standards with local craftsmanship. Build with
            precision, trust, and cultural warmth from anywhere in the world.
          </p>
          <div className={styles.heroActions}>
            <a href="#" className={styles.heroBtnPrimary}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 6 }}>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              Get Started
            </a>
            <a href="#" className={styles.heroBtnSecondary}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 6 }}>
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10 8 16 12 10 16 10 8"/>
              </svg>
              Watch Story
            </a>
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
