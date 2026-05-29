import { useState } from 'react'
import styles from './MarketsPage.module.css'

// ─── Icons ───────────────────────────────────────────────────────────────────

const IconHub = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
  </svg>
)

const IconArrow = ({ dir }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {dir === 'left'
      ? <><polyline points="15 18 9 12 15 6"/></>
      : <><polyline points="9 18 15 12 9 6"/></>
    }
  </svg>
)

const IconPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const IconBox = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
  </svg>
)

const IconFile = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
)

const IconVerified = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z"/>
  </svg>
)

// ─── Featured Corridors ───────────────────────────────────────────────────────

const CORRIDORS = [
  {
    flag: '🇨🇩',
    country: 'Democratic Republic of Congo',
    title: 'The Kinshasa–Goma Corridor',
    subtitle: 'Serving over 1.5m diaspora members across Europe and North America.',
    stats: [
      { label: 'Top Materials', value: 'Concrete, Timber' },
      { label: 'Avg. Lead Time', value: '14 Weeks' },
      { label: 'Trust Score', value: '4.9 ⭐' },
    ],
    activeProjects: '456+',
    cta: 'View DRC Build Catalog',
    accent: '#0033A0',
  },
  {
    flag: '🇦🇴',
    country: 'Angola',
    title: 'The Luanda Metropolitan',
    subtitle: 'A rapidly expanding market with high demand from the Lusophone diaspora.',
    stats: [
      { label: 'Top Materials', value: 'Steel, Glass' },
      { label: 'Avg. Lead Time', value: '12 Weeks' },
      { label: 'Trust Score', value: '4.8 ⭐' },
    ],
    activeProjects: '280+',
    cta: 'Explore Luanda Opportunities',
    accent: '#CC0000',
  },
]

function FeaturedCorridors() {
  const [idx, setIdx] = useState(0)
  const total = CORRIDORS.length

  return (
    <section className={styles.corridors}>
      <div className={styles.container}>
        <div className={styles.corridorsHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Featured Corridors</h2>
            <p className={styles.sectionSub}>Our deepest networks, curated for your peace of mind.</p>
          </div>
          <div className={styles.arrows}>
            <button className={styles.arrowBtn} onClick={() => setIdx(i => (i - 1 + total) % total)} aria-label="Previous">
              <IconArrow dir="left" />
            </button>
            <button className={styles.arrowBtn} onClick={() => setIdx(i => (i + 1) % total)} aria-label="Next">
              <IconArrow dir="right" />
            </button>
          </div>
        </div>

        <div className={styles.corridorsGrid}>
          {CORRIDORS.map(({ flag, country, title, subtitle, stats, activeProjects, cta, accent }, i) => (
            <div
              key={title}
              className={`${styles.corridorCard} ${i === idx ? styles.corridorActive : ''}`}
            >
              <div className={styles.corridorImgArea} style={{ background: `linear-gradient(135deg, ${accent}22 0%, ${accent}44 100%)` }}>
                <div className={styles.corridorFlag}>
                  <span>{flag}</span>
                  <span className={styles.corridorCountry}>{country}</span>
                </div>
                <div className={styles.corridorActiveProjects}>
                  <span className={styles.corridorCount}>{activeProjects}</span>
                  <span className={styles.corridorCountLabel}>Active Projects</span>
                </div>
              </div>
              <div className={styles.corridorBody}>
                <h3 className={styles.corridorTitle}>{title}</h3>
                <p className={styles.corridorSub}>{subtitle}</p>
                <div className={styles.corridorStats}>
                  {stats.map(({ label, value }) => (
                    <div key={label} className={styles.corridorStat}>
                      <span className={styles.corridorStatLabel}>{label}</span>
                      <span className={styles.corridorStatValue}>{value}</span>
                    </div>
                  ))}
                </div>
                <a href="#" className={styles.corridorCta}>{cta}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Global Support Network ───────────────────────────────────────────────────

const HUBS = [
  {
    city: 'Brussels, Belgium',
    desc: 'Central hub for our Western European diaspora community and financial processing.',
    flag: '🇧🇪',
  },
  {
    city: 'Paris, France',
    desc: 'Serving the Francophone African diaspora with financial support and investment advisory.',
    flag: '🇫🇷',
  },
  {
    city: 'London, UK',
    desc: 'Strategic operations for our Anglophone markets and global compliance standards.',
    flag: '🇬🇧',
  },
  {
    city: 'Toronto, Canada',
    desc: 'Direct channel for North American diaspora building in Central and West Africa.',
    flag: '🇨🇦',
  },
  {
    city: 'Atlanta, USA',
    desc: 'Our US headquarters managing technology partnerships and investor relations.',
    flag: '🇺🇸',
  },
  {
    city: 'Johannesburg, SA',
    desc: 'Regional logistics and procurement hub for materials across Southern and Central Africa.',
    flag: '🇿🇦',
  },
]

function GlobalSupportNetwork() {
  return (
    <section className={styles.network}>
      <div className={styles.container}>
        <div className={styles.networkHeader}>
          <h2 className={styles.sectionTitleLight}>Our Global Support Network</h2>
          <p className={styles.sectionSubLight}>
            We meet you where you are. Our operational hubs in major diaspora centers ensure smooth
            communication and financial security for your projects back home.
          </p>
        </div>
        <div className={styles.hubsGrid}>
          {HUBS.map(({ city, desc, flag }) => (
            <div key={city} className={styles.hubCard}>
              <div className={styles.hubTop}>
                <div className={styles.hubIconWrap}>
                  <IconHub />
                </div>
                <span className={styles.hubBadge}>Active Hub</span>
              </div>
              <div className={styles.hubFlag}>{flag}</div>
              <h3 className={styles.hubCity}>{city}</h3>
              <p className={styles.hubDesc}>{desc}</p>
              <a href="#" className={styles.hubLink}>Connect with Local Office →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Building with Local Masters ──────────────────────────────────────────────

const VETTING_POINTS = [
  {
    icon: <IconShield />,
    title: 'Strict Vetting Process',
    desc: 'Every builder undergoes a 45-point inspection, including financial solvency, past project quality, and regulatory compliance.',
  },
  {
    icon: <IconBox />,
    title: 'Material Procurement',
    desc: 'We source bulk materials directly from verified suppliers to ensure availability and price stability in volatile markets.',
  },
  {
    icon: <IconFile />,
    title: 'Legal Compliance',
    desc: 'Our local legal teams manage land titles and building permits so you don\'t have to navigate the bureaucracy alone.',
  },
]

function BuildingWithMasters() {
  return (
    <section className={styles.masters}>
      <div className={styles.container}>
        <div className={styles.mastersGrid}>
          <div className={styles.mastersContent}>
            <p className={styles.mastersTag}>VERIFIED EXCELLENCE</p>
            <h2 className={styles.mastersTitle}>Building with Local Masters</h2>
            <div className={styles.mastersList}>
              {VETTING_POINTS.map(({ icon, title, desc }) => (
                <div key={title} className={styles.masterItem}>
                  <div className={styles.masterItemIcon}>{icon}</div>
                  <div>
                    <h4 className={styles.masterItemTitle}>{title}</h4>
                    <p className={styles.masterItemDesc}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.mastersVisual}>
            <div className={styles.mastersImgPlaceholder}>
              <div className={styles.mastersImgInner}>
                <div className={styles.hardHatIcon}>🦺</div>
                <p className={styles.mastersImgText}>Verified builders on site</p>
              </div>
            </div>
            <div className={styles.mastersWorkerCard}>
              <div className={styles.workerAvatar}>JM</div>
              <div className={styles.workerInfo}>
                <span className={styles.workerName}>Jean-Pierre M.</span>
                <span className={styles.workerRole}>Verified Builder · Kinshasa</span>
              </div>
              <div className={styles.verifiedBadge}>
                <IconVerified /> Verified
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Markets CTA ──────────────────────────────────────────────────────────────

function MarketsCTA() {
  return (
    <section className={styles.marketsCta}>
      <div className={styles.container}>
        <h2 className={styles.marketsCtaTitle}>
          Build your legacy in <span>Kinshasa.</span>
        </h2>
        <p className={styles.marketsCtaSub}>
          Take the first step towards your homeland project today. Join 5,000+ diaspora members who trust Jenga‑X.
        </p>
        <div className={styles.marketsCtaActions}>
          <a href="#" className={styles.marketsCtaBtnPrimary}>Get Started Now</a>
          <a href="#" className={styles.marketsCtaBtnOutline}>Schedule a Consultation</a>
        </div>
      </div>
    </section>
  )
}

// ─── Markets Footer ───────────────────────────────────────────────────────────

function MarketsFooter() {
  return (
    <footer className={styles.mFooter}>
      <div className={styles.container}>
        <div className={styles.mFooterTop}>
          <div className={styles.mFooterBrand}>
            <span className={styles.mFooterLogo}>Jenga‑X</span>
            <p className={styles.mFooterTagline}>The modern hearth for the global diaspora building back home.</p>
            <div className={styles.mFooterSocials}>
              <a href="#" aria-label="Share" className={styles.socialBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className={styles.socialBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          <div className={styles.mFooterColumns}>
            <div className={styles.mFooterCol}>
              <h4 className={styles.mColTitle}>Markets</h4>
              <ul className={styles.mColLinks}>
                {['DRC Congo', 'Angola', 'Nigeria', 'Kenya'].map(l => <li key={l}><a href="#">{l}</a></li>)}
              </ul>
            </div>
            <div className={styles.mFooterCol}>
              <h4 className={styles.mColTitle}>Company</h4>
              <ul className={styles.mColLinks}>
                {['About Us', 'Careers', 'Contact Us', 'Privacy Policy'].map(l => <li key={l}><a href="#">{l}</a></li>)}
              </ul>
            </div>
            <div className={styles.mFooterCol}>
              <h4 className={styles.mColTitle}>Support</h4>
              <ul className={styles.mColLinks}>
                {['Help Center', 'Terms of Service', 'Safety Center', 'Builder Portal'].map(l => <li key={l}><a href="#">{l}</a></li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.mFooterBottom}>
          <p className={styles.mFooterCopy}>&copy; 2024 Jenga‑X. Build it. From anywhere.</p>
          <div className={styles.mFooterLocale}>
            <span>🌐 English</span>
            <span>|</span>
            <span>💵 USD</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MarketsPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.pill}>
            <IconPin />
            Global Reach
          </span>
          <h1 className={styles.heroTitle}>
            Connecting the Diaspora<br />to the Homeland.
          </h1>
          <p className={styles.heroSub}>
            We bridge the distance between your dreams and your legacy. Secure, transparent, and
            verified construction management across the most dynamic African corridors.
          </p>
          <div className={styles.heroActions}>
            <a href="#" className={styles.heroBtnPrimary}>Explore Markets</a>
            <a href="#" className={styles.heroBtnSecondary}>Watch Corridor Story</a>
          </div>
        </div>
      </section>

      <FeaturedCorridors />
      <GlobalSupportNetwork />
      <BuildingWithMasters />
      <MarketsCTA />
      <MarketsFooter />
    </>
  )
}
