import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './WaitingListPage.module.css'
import { useI18n } from '../../i18n/I18nProvider'
import { submitWaitingList } from '../../services/waitingListService'

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconHardHat = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/>
    <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/>
    <path d="M4 15v-3a8 8 0 0 1 16 0v3"/>
  </svg>
)

const IconBuilding = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    <line x1="9" y1="11" x2="9" y2="11.01"/>
    <line x1="15" y1="11" x2="15" y2="11.01"/>
    <line x1="9" y1="16" x2="9" y2="16.01"/>
    <line x1="15" y1="16" x2="15" y2="16.01"/>
  </svg>
)

const IconHome = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)

const IconStore = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
)

const IconCheck = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const IconRocket = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
)

const IconGift = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12"/>
    <rect x="2" y="7" width="20" height="5"/>
    <line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
  </svg>
)

const IconStar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { key: 'soloBuilder',        Icon: IconHardHat  },
  { key: 'constructionCompany', Icon: IconBuilding },
  { key: 'homeOwner',           Icon: IconHome     },
  { key: 'supplierShop',        Icon: IconStore    },
]

const BENEFIT_ICONS = [IconRocket, IconGift, IconStar]

function blankForm() {
  return { companyName: '', shopName: '', fullName: '', contactPerson: '', mobile: '', email: '', address: '', country: '', city: '' }
}

function requiredFor(category) {
  const base = ['mobile', 'address', 'country', 'city']
  if (category === 'constructionCompany') return [...base, 'companyName', 'contactPerson', 'email']
  if (category === 'supplierShop')        return [...base, 'shopName', 'contactPerson']
  return [...base, 'fullName']
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WaitingListPage() {
  const { t } = useI18n()

  const [category, setCategory] = useState('homeOwner')
  const [form, setForm]         = useState(blankForm())
  const [errors, setErrors]     = useState({})
  const [status, setStatus]     = useState('idle') // idle | submitting | success | error

  const BENEFITS = BENEFIT_ICONS.map((Icon, i) => ({
    Icon,
    title: t(`waitingList.benefits.${i}.title`),
    desc:  t(`waitingList.benefits.${i}.desc`),
  }))

  const handleCategory = (cat) => {
    setCategory(cat)
    setErrors({})
    if (status === 'error') setStatus('idle')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    requiredFor(category).forEach(field => {
      if (!form[field]?.trim()) errs[field] = t('waitingList.form.errorRequired')
    })
    if (form.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = t('waitingList.form.errorEmail')
    }
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setStatus('submitting')
    try {
      await submitWaitingList({ category, ...form })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const req    = requiredFor(category)
  const isReq  = (f) => req.includes(f)
  const showCompany  = category === 'constructionCompany'
  const showShop     = category === 'supplierShop'
  const showContact  = category === 'constructionCompany' || category === 'supplierShop'
  const showFullName = category === 'soloBuilder' || category === 'homeOwner'
  const emailReq     = category === 'constructionCompany'

  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.pill}>{t('waitingList.hero.pill')}</span>
          <h1 className={styles.heroTitle} dangerouslySetInnerHTML={{ __html: t('waitingList.hero.title') }} />
          <p className={styles.heroSub}>{t('waitingList.hero.subtitle')}</p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <strong>2,400+</strong>
              <span>{t('waitingList.hero.stats.membersLabel')}</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <strong>12</strong>
              <span>{t('waitingList.hero.stats.countriesLabel')}</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <strong>2025</strong>
              <span>{t('waitingList.hero.stats.launchingLabel')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main ── */}
      <section className={styles.mainSection}>
        <div className={styles.container}>
          <div className={styles.mainGrid}>

            {/* Form card */}
            <div className={styles.formCard}>
              {status === 'success' ? (
                <div className={styles.successState}>
                  <div className={styles.successIconWrap}><IconCheck /></div>
                  <h2 className={styles.successTitle}>{t('waitingList.form.success.title')}</h2>
                  <p className={styles.successSub}>{t('waitingList.form.success.subtitle')}</p>
                  <Link to="/" className={styles.successBtn}>{t('waitingList.form.success.back')}</Link>
                </div>
              ) : (
                <>
                  <div className={styles.formHeader}>
                    <h2 className={styles.formTitle}>{t('waitingList.form.title')}</h2>
                    <p className={styles.formSubtitle}>{t('waitingList.form.subtitle')}</p>
                  </div>

                  {/* Category picker */}
                  <div className={styles.catSection}>
                    <p className={styles.catLabel}>{t('waitingList.form.categoryTitle')}</p>
                    <div className={styles.catGrid}>
                      {CATEGORIES.map(({ key, Icon }) => (
                        <button
                          key={key}
                          type="button"
                          className={`${styles.catCard} ${category === key ? styles.catCardActive : ''}`}
                          onClick={() => handleCategory(key)}
                        >
                          <span className={styles.catIcon}><Icon /></span>
                          <span className={styles.catCardLabel}>{t(`waitingList.form.categories.${key}.label`)}</span>
                          <span className={styles.catCardDesc}>{t(`waitingList.form.categories.${key}.desc`)}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fields */}
                  <form onSubmit={handleSubmit} noValidate>
                    <div className={styles.fieldsGrid}>

                      {showCompany && (
                        <Field label={t('waitingList.form.fields.companyName')} required
                          error={errors.companyName}>
                          <input className={`${styles.input} ${errors.companyName ? styles.inputErr : ''}`}
                            name="companyName" value={form.companyName} onChange={handleChange}
                            placeholder={t('waitingList.form.placeholders.companyName')} />
                        </Field>
                      )}

                      {showShop && (
                        <Field label={t('waitingList.form.fields.shopName')} required
                          error={errors.shopName}>
                          <input className={`${styles.input} ${errors.shopName ? styles.inputErr : ''}`}
                            name="shopName" value={form.shopName} onChange={handleChange}
                            placeholder={t('waitingList.form.placeholders.shopName')} />
                        </Field>
                      )}

                      {showFullName && (
                        <Field label={t('waitingList.form.fields.fullName')} required
                          error={errors.fullName}>
                          <input className={`${styles.input} ${errors.fullName ? styles.inputErr : ''}`}
                            name="fullName" value={form.fullName} onChange={handleChange}
                            placeholder={t('waitingList.form.placeholders.fullName')} />
                        </Field>
                      )}

                      {showContact && (
                        <Field label={t('waitingList.form.fields.contactPerson')} required
                          error={errors.contactPerson}>
                          <input className={`${styles.input} ${errors.contactPerson ? styles.inputErr : ''}`}
                            name="contactPerson" value={form.contactPerson} onChange={handleChange}
                            placeholder={t('waitingList.form.placeholders.contactPerson')} />
                        </Field>
                      )}

                      <Field label={t('waitingList.form.fields.mobile')} required error={errors.mobile} half>
                        <input className={`${styles.input} ${errors.mobile ? styles.inputErr : ''}`}
                          name="mobile" type="tel" value={form.mobile} onChange={handleChange}
                          placeholder={t('waitingList.form.placeholders.mobile')} />
                      </Field>

                      <Field
                        label={emailReq ? t('waitingList.form.fields.email') : t('waitingList.form.fields.emailOptional')}
                        required={emailReq}
                        error={errors.email}
                        half
                      >
                        <input className={`${styles.input} ${errors.email ? styles.inputErr : ''}`}
                          name="email" type="email" value={form.email} onChange={handleChange}
                          placeholder={t('waitingList.form.placeholders.email')} />
                      </Field>

                      <Field label={t('waitingList.form.fields.address')} required error={errors.address}>
                        <input className={`${styles.input} ${errors.address ? styles.inputErr : ''}`}
                          name="address" value={form.address} onChange={handleChange}
                          placeholder={t('waitingList.form.placeholders.address')} />
                      </Field>

                      <Field label={t('waitingList.form.fields.country')} required error={errors.country} half>
                        <input className={`${styles.input} ${errors.country ? styles.inputErr : ''}`}
                          name="country" value={form.country} onChange={handleChange}
                          placeholder={t('waitingList.form.placeholders.country')} />
                      </Field>

                      <Field label={t('waitingList.form.fields.city')} required error={errors.city} half>
                        <input className={`${styles.input} ${errors.city ? styles.inputErr : ''}`}
                          name="city" value={form.city} onChange={handleChange}
                          placeholder={t('waitingList.form.placeholders.city')} />
                      </Field>

                    </div>

                    {status === 'error' && (
                      <p className={styles.errorBanner}>{t('waitingList.form.errorGeneral')}</p>
                    )}

                    <button type="submit" className={styles.submitBtn} disabled={status === 'submitting'}>
                      {status === 'submitting' ? t('waitingList.form.submitting') : t('waitingList.form.submit')}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Benefits sidebar */}
            <aside className={styles.sidebar}>
              <h2 className={styles.sidebarTitle}>{t('waitingList.benefits.title')}</h2>
              <div className={styles.benefitsList}>
                {BENEFITS.map(({ Icon, title, desc }, i) => (
                  <div key={i} className={styles.benefitCard}>
                    <div className={styles.benefitIconWrap}><Icon /></div>
                    <div>
                      <h3 className={styles.benefitTitle}>{title}</h3>
                      <p className={styles.benefitDesc}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social proof strip */}
              <div className={styles.socialProof}>
                <div className={styles.avatarStack}>
                  {['K','M','A','J','L'].map((l, i) => (
                    <div key={i} className={styles.avatar} style={{ zIndex: 5 - i }}>{l}</div>
                  ))}
                </div>
                <p className={styles.socialProofText}>
                  <strong>2,400+</strong> {t('waitingList.hero.stats.membersLabel').toLowerCase()}
                </p>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Field helper ──────────────────────────────────────────────────────────────

function Field({ label, required, error, half, children }) {
  return (
    <div className={`${styles.fieldGroup} ${half ? styles.halfWidth : styles.fullWidth}`}>
      <label className={styles.fieldLabel}>
        {label}{required && <span className={styles.req}> *</span>}
      </label>
      {children}
      {error && <span className={styles.fieldError}>{error}</span>}
    </div>
  )
}
