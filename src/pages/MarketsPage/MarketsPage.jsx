import { useState } from 'react'
import styles from './MarketsPage.module.css'
import { useI18n } from '../../i18n/I18nProvider'

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

export default function MarketsPage() {
  const { t } = useI18n()

  const CORRIDORS = [
    {
      flag: '🇨🇩',
      country: t('markets.corridors.0.country'),
      title: t('markets.corridors.0.title'),
      subtitle: t('markets.corridors.0.subtitle'),
      stats: [
        { label: t('markets.corridors.stats.topMaterials'), value: t('markets.corridors.0.stats.0') },
        { label: t('markets.corridors.stats.avgLeadTime'), value: t('markets.corridors.0.stats.1') },
        { label: t('markets.corridors.stats.trustScore'), value: t('markets.corridors.0.stats.2') },
      ],
      activeProjects: t('markets.corridors.0.activeProjects'),
      cta: t('markets.corridors.0.cta'),
      accent: '#0033A0',
    },
    {
      flag: '🇦🇴',
      country: t('markets.corridors.1.country'),
      title: t('markets.corridors.1.title'),
      subtitle: t('markets.corridors.1.subtitle'),
      stats: [
        { label: t('markets.corridors.stats.topMaterials'), value: t('markets.corridors.1.stats.0') },
        { label: t('markets.corridors.stats.avgLeadTime'), value: t('markets.corridors.1.stats.1') },
        { label: t('markets.corridors.stats.trustScore'), value: t('markets.corridors.1.stats.2') },
      ],
      activeProjects: t('markets.corridors.1.activeProjects'),
      cta: t('markets.corridors.1.cta'),
      accent: '#CC0000',
    },
  ]

  const HUBS = [
    { city: t('markets.hubs.0.city'), desc: t('markets.hubs.0.desc'), flag: '🇧🇪' },
    { city: t('markets.hubs.1.city'), desc: t('markets.hubs.1.desc'), flag: '🇫🇷' },
    { city: t('markets.hubs.2.city'), desc: t('markets.hubs.2.desc'), flag: '🇬🇧' },
    { city: t('markets.hubs.3.city'), desc: t('markets.hubs.3.desc'), flag: '🇨🇦' },
    { city: t('markets.hubs.4.city'), desc: t('markets.hubs.4.desc'), flag: '🇺🇸' },
    { city: t('markets.hubs.5.city'), desc: t('markets.hubs.5.desc'), flag: '🇿🇦' },
  ]

  const VETTING_POINTS = [
    { icon: <IconShield />, title: t('markets.vetting.0.title'), desc: t('markets.vetting.0.desc') },
    { icon: <IconBox />, title: t('markets.vetting.1.title'), desc: t('markets.vetting.1.desc') },
    { icon: <IconFile />, title: t('markets.vetting.2.title'), desc: t('markets.vetting.2.desc') },
  ]

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.pill}>
            <IconPin />
            {t('markets.hero.pill')}
          </span>
          <h1 className={styles.heroTitle}>{t('markets.hero.title')}</h1>
          <p className={styles.heroSub}>{t('markets.hero.subtitle')}</p>
          <div className={styles.heroActions}>
            <a href="#" className={styles.heroBtnPrimary}>{t('markets.hero.actions.explore')}</a>
            <a href="#" className={styles.heroBtnSecondary}>{t('markets.hero.actions.watch')}</a>
          </div>
        </div>
      </section>

      <section className={styles.corridors}>
        <div className={styles.container}>
          <div className={styles.corridorsHeader}>
            <div>
              <h2 className={styles.sectionTitle}>{t('markets.corridors.header.title')}</h2>
              <p className={styles.sectionSub}>{t('markets.corridors.header.sub')}</p>
            </div>
            <div className={styles.arrows}>
              <button className={styles.arrowBtn} aria-label="Previous"><IconArrow dir="left" /></button>
              <button className={styles.arrowBtn} aria-label="Next"><IconArrow dir="right" /></button>
            </div>
          </div>

          <div className={styles.corridorsGrid}>
            {CORRIDORS.map(({ flag, country, title, subtitle, stats, activeProjects, cta, accent }, i) => (
              <div key={title} className={`${styles.corridorCard} ${i === 0 ? styles.corridorActive : ''}`}>
                <div className={styles.corridorImgArea} style={{ background: `linear-gradient(135deg, ${accent}22 0%, ${accent}44 100%)` }}>
                  <div className={styles.corridorFlag}>
                    <span>{flag}</span>
                    <span className={styles.corridorCountry}>{country}</span>
                  </div>
                  <div className={styles.corridorActiveProjects}>
                    <span className={styles.corridorCount}>{activeProjects}</span>
                    <span className={styles.corridorCountLabel}>{t('markets.corridors.activeProjectsLabel')}</span>
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

      <section className={styles.network}>
        <div className={styles.container}>
          <div className={styles.networkHeader}>
            <h2 className={styles.sectionTitleLight}>{t('markets.network.title')}</h2>
            <p className={styles.sectionSubLight}>{t('markets.network.subtitle')}</p>
          </div>
          <div className={styles.hubsGrid}>
            {HUBS.map(({ city, desc, flag }) => (
              <div key={city} className={styles.hubCard}>
                <div className={styles.hubTop}>
                  <div className={styles.hubIconWrap}><IconHub /></div>
                  <span className={styles.hubBadge}>{t('markets.network.activeHubLabel')}</span>
                </div>
                <div className={styles.hubFlag}>{flag}</div>
                <h3 className={styles.hubCity}>{city}</h3>
                <p className={styles.hubDesc}>{desc}</p>
                <a href="#" className={styles.hubLink}>{t('markets.network.connectCta')}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.masters}>
        <div className={styles.container}>
          <div className={styles.mastersGrid}>
            <div className={styles.mastersContent}>
              <p className={styles.mastersTag}>{t('markets.masters.tag')}</p>
              <h2 className={styles.mastersTitle}>{t('markets.masters.title')}</h2>
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
                  <p className={styles.mastersImgText}>{t('markets.masters.visualText')}</p>
                </div>
              </div>
              <div className={styles.mastersWorkerCard}>
                <div className={styles.workerAvatar}>JM</div>
                <div className={styles.workerInfo}>
                  <span className={styles.workerName}>{t('markets.masters.exampleName')}</span>
                  <span className={styles.workerRole}>{t('markets.masters.exampleRole')}</span>
                </div>
                <div className={styles.verifiedBadge}><IconVerified /> {t('markets.masters.verified')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.marketsCta}>
        <div className={styles.container}>
          <h2 className={styles.marketsCtaTitle} dangerouslySetInnerHTML={{ __html: t('markets.cta.title') }} />
          <p className={styles.marketsCtaSub}>{t('markets.cta.subtitle')}</p>
          <div className={styles.marketsCtaActions}>
            <a href="#" className={styles.marketsCtaBtnPrimary}>{t('markets.cta.actions.getStarted')}</a>
            <a href="#" className={styles.marketsCtaBtnOutline}>{t('markets.cta.actions.schedule')}</a>
          </div>
        </div>
      </section>

      <footer className={styles.mFooter}>
        <div className={styles.container}>
          <div className={styles.mFooterTop}>
            <div className={styles.mFooterBrand}>
              <span className={styles.mFooterLogo}>Jenga‑X</span>
              <p className={styles.mFooterTagline}>{t('markets.footer.tagline')}</p>
              <div className={styles.mFooterSocials}>
                <a href="#" aria-label="Share" className={styles.socialBtn}>{/* svg */}</a>
                <a href="#" aria-label="Instagram" className={styles.socialBtn}>{/* svg */}</a>
              </div>
            </div>

            <div className={styles.mFooterColumns}>
              <div className={styles.mFooterCol}>
                <h4 className={styles.mColTitle}>{t('markets.footer.marketsTitle')}</h4>
                <ul className={styles.mColLinks}>
                  {t('markets.footer.marketsList').map(l => <li key={l}><a href="#">{l}</a></li>)}
                </ul>
              </div>
              <div className={styles.mFooterCol}>
                <h4 className={styles.mColTitle}>{t('markets.footer.companyTitle')}</h4>
                <ul className={styles.mColLinks}>
                  {t('markets.footer.companyList').map(l => <li key={l}><a href="#">{l}</a></li>)}
                </ul>
              </div>
              <div className={styles.mFooterCol}>
                <h4 className={styles.mColTitle}>{t('markets.footer.supportTitle')}</h4>
                <ul className={styles.mColLinks}>
                  {t('markets.footer.supportList').map(l => <li key={l}><a href="#">{l}</a></li>)}
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.mFooterBottom}>
            <p className={styles.mFooterCopy}>{t('markets.footer.copy')}</p>
            <div className={styles.mFooterLocale}><span>{t('markets.footer.locale')}</span></div>
          </div>
        </div>
      </footer>
    </>
  )
}
