import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './WaitingListPage.module.css'
import { useI18n } from '../../i18n/I18nProvider'
import { submitWaitingList, DuplicateSignupError } from '../../services/waitingListService'
import { WHATSAPP_GROUP_URL } from '../../config/links'
import { PHONE_COUNTRIES, OTHER_COUNTRY, DEFAULT_PHONE_COUNTRY, toE164 } from '../../utils/phone'

const FlagDRC = () => (
  <svg viewBox="0 0 4 3" width="32" height="24" role="img" aria-label="DR Congo">
    <rect width="4" height="3" fill="#007fff" />
    <path d="M0 2.55 L3.4 0 H4 V0.45 L0.6 3 H0 Z" fill="#f7d618" />
    <path d="M0 2.775 L3.7 0 H4 V0.225 L0.3 3 H0 Z" fill="#ce1021" />
    <polygon points="0.6,0.15 0.68,0.39 0.93,0.39 0.73,0.54 0.8,0.78 0.6,0.63 0.4,0.78 0.47,0.54 0.27,0.39 0.52,0.39" fill="#f7d618" />
  </svg>
)

const FlagAngola = () => (
  <svg viewBox="0 0 4 3" width="32" height="24" role="img" aria-label="Angola">
    <rect width="4" height="1.5" fill="#cc092f" />
    <rect y="1.5" width="4" height="1.5" fill="#000" />
    <path d="M2.35 0.95 A0.6 0.6 0 1 1 1.6 2.05" fill="none" stroke="#ffcb00" strokeWidth="0.14" />
    <path d="M1.55 1.1 L2.5 2.0" stroke="#ffcb00" strokeWidth="0.14" strokeLinecap="round" />
    <polygon points="1.85,1.1 1.9,1.25 2.05,1.25 1.93,1.34 1.97,1.49 1.85,1.4 1.73,1.49 1.77,1.34 1.65,1.25 1.8,1.25" fill="#ffcb00" />
  </svg>
)


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

const IconWhatsApp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.37 9.37 0 0 1 2.76 6.68c0 5.2-4.24 9.43-9.45 9.43m8.04-17.47A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.7l6.1-1.6a11.33 11.33 0 0 0 5.37 1.37h.01c6.26 0 11.36-5.1 11.37-11.36 0-3.04-1.18-5.89-3.33-8.04"/>
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

// Country choice decides the notification language (welcome + launch messages).
const COUNTRY_CHOICES = {
  DRC:    { language: 'fr', phoneCountry: 'CD', languageName: 'Français' },
  Angola: { language: 'pt', phoneCountry: 'AO', languageName: 'Português' },
  OTHER:  { language: 'en', phoneCountry: null, languageName: 'English' },
}
const LOCALE_TO_COUNTRY = { fr: 'DRC', pt: 'Angola', en: 'OTHER' }

function blankForm(locale) {
  const countryChoice = LOCALE_TO_COUNTRY[locale] || 'DRC'
  return {
    companyName: '', shopName: '', fullName: '', contactPerson: '',
    phoneCountry: COUNTRY_CHOICES[countryChoice].phoneCountry || DEFAULT_PHONE_COUNTRY, phoneDial: '', mobile: '',
    email: '', address: '', countryChoice, country: '', city: '', whatsappOptIn: false,
  }
}

function requiredFor(category) {
  const base = ['mobile', 'address', 'city']
  if (category === 'constructionCompany') return [...base, 'companyName', 'contactPerson', 'email']
  if (category === 'supplierShop')        return [...base, 'shopName', 'contactPerson']
  return [...base, 'fullName']
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WaitingListPage() {
  const { t, locale } = useI18n()

  const [category, setCategory] = useState('homeOwner')
  const [form, setForm]         = useState(() => blankForm(locale))
  const [errors, setErrors]     = useState({})
  const [status, setStatus]     = useState('idle') // idle | submitting | success | duplicate | error
  const countryTouched          = useRef(false)

  // Follow the country picked in the language popup until the user changes it here.
  useEffect(() => {
    if (countryTouched.current) return
    const countryChoice = LOCALE_TO_COUNTRY[locale]
    if (!countryChoice) return
    setForm(f => ({
      ...f,
      countryChoice,
      phoneCountry: !f.mobile.trim() ? (COUNTRY_CHOICES[countryChoice].phoneCountry || f.phoneCountry) : f.phoneCountry,
    }))
  }, [locale])

  const BENEFITS = BENEFIT_ICONS.map((Icon, i) => ({
    Icon,
    title: t(`waitingList.benefits.${i}.title`),
    desc:  t(`waitingList.benefits.${i}.desc`),
  }))

  const handleCategory = (cat) => {
    setCategory(cat)
    setErrors({})
    if (status === 'error' || status === 'duplicate') setStatus('idle')
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    const errKey = name === 'phoneCountry' || name === 'phoneDial' ? 'mobile' : name
    if (errors[errKey]) setErrors(prev => ({ ...prev, [errKey]: '' }))
    if (status === 'duplicate' && (errKey === 'mobile')) setStatus('idle')
  }

  const handleCountryChoice = (e) => {
    countryTouched.current = true
    const countryChoice = e.target.value
    const phoneCountry  = COUNTRY_CHOICES[countryChoice]?.phoneCountry
    setForm(f => ({
      ...f,
      countryChoice,
      // Follow the country for the phone code until the user has typed a number.
      phoneCountry: phoneCountry && !f.mobile.trim() ? phoneCountry : f.phoneCountry,
    }))
    if (errors.country) setErrors(prev => ({ ...prev, country: '' }))
  }

  const validate = () => {
    const errs = {}
    requiredFor(category).forEach(field => {
      if (!form[field]?.trim()) errs[field] = t('waitingList.form.errorRequired')
    })
    if (form.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = t('waitingList.form.errorEmail')
    }
    if (form.mobile.trim() && !toE164(form.phoneCountry, form.mobile, form.phoneDial)) {
      errs.mobile = t('waitingList.form.errorPhone')
    }
    if (!COUNTRY_CHOICES[form.countryChoice] || (form.countryChoice === 'OTHER' && !form.country.trim())) {
      errs.country = t('waitingList.form.errorRequired')
    }
    if (!form.whatsappOptIn) errs.whatsappOptIn = t('waitingList.form.errorConsent')
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setStatus('submitting')
    try {
      await submitWaitingList({
        category, ...form,
        phoneE164: toE164(form.phoneCountry, form.mobile, form.phoneDial),
        country:   form.countryChoice === 'OTHER' ? form.country.trim() : form.countryChoice,
        language:  COUNTRY_CHOICES[form.countryChoice].language,
      })
      setStatus('success')
    } catch (err) {
      setStatus(err instanceof DuplicateSignupError ? 'duplicate' : 'error')
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
              <strong>1,000+</strong>
              <span>{t('waitingList.hero.stats.workersLabel')}</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <strong>{t('waitingList.hero.stats.suppliersValue')}</strong>
              <span>{t('waitingList.hero.stats.suppliersLabel')}</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <strong className={styles.heroStatFlags}>
                2 <FlagDRC /> <FlagAngola />
              </strong>
              <span>{t('waitingList.hero.stats.countriesLabel')}</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <strong>Q4 2026</strong>
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
                  <a href={WHATSAPP_GROUP_URL} target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn}>
                    <IconWhatsApp />
                    {t('waitingList.form.success.whatsappCta')}
                  </a>
                  <Link to="/" className={styles.successBackLink}>{t('waitingList.form.success.back')}</Link>
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

                      <Field label={t('waitingList.form.fields.mobile')} required error={errors.mobile}>
                        <div className={styles.phoneRow}>
                          <select
                            className={`${styles.input} ${styles.phoneCountry}`}
                            name="phoneCountry" value={form.phoneCountry} onChange={handleChange}
                            aria-label={t('waitingList.form.fields.phoneCountry')}
                          >
                            {PHONE_COUNTRIES.map(c => (
                              <option key={c.code} value={c.code}>{c.flag} +{c.dial} {c.name}</option>
                            ))}
                            <option value={OTHER_COUNTRY}>{t('waitingList.form.phoneOther')}</option>
                          </select>
                          {form.phoneCountry === OTHER_COUNTRY && (
                            <input
                              className={`${styles.input} ${styles.phoneDial} ${errors.mobile ? styles.inputErr : ''}`}
                              name="phoneDial" type="tel" inputMode="numeric" value={form.phoneDial}
                              onChange={handleChange} placeholder="+32"
                              aria-label={t('waitingList.form.fields.phoneDial')}
                            />
                          )}
                          <input className={`${styles.input} ${errors.mobile ? styles.inputErr : ''}`}
                            name="mobile" type="tel" inputMode="tel" autoComplete="tel-national"
                            value={form.mobile} onChange={handleChange}
                            placeholder={t('waitingList.form.placeholders.mobile')} />
                        </div>
                      </Field>

                      <Field
                        label={emailReq ? t('waitingList.form.fields.email') : t('waitingList.form.fields.emailOptional')}
                        required={emailReq}
                        error={errors.email}
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
                        <select
                          className={`${styles.input} ${errors.country && form.countryChoice !== 'OTHER' ? styles.inputErr : ''}`}
                          name="countryChoice" value={form.countryChoice} onChange={handleCountryChoice}
                        >
                          <option value="DRC">🇨🇩 {t('waitingList.form.countryOptions.drc')}</option>
                          <option value="Angola">🇦🇴 {t('waitingList.form.countryOptions.angola')}</option>
                          <option value="OTHER">🌍 {t('waitingList.form.countryOptions.other')}</option>
                        </select>
                        {form.countryChoice === 'OTHER' && (
                          <input className={`${styles.input} ${errors.country ? styles.inputErr : ''}`}
                            name="country" value={form.country} onChange={handleChange}
                            placeholder={t('waitingList.form.placeholders.countryName')}
                            aria-label={t('waitingList.form.fields.countryName')} />
                        )}
                        <span className={styles.fieldHint}>
                          {t('waitingList.form.notificationLanguage')} <strong>{COUNTRY_CHOICES[form.countryChoice]?.languageName}</strong>
                        </span>
                      </Field>

                      <Field label={t('waitingList.form.fields.city')} required error={errors.city} half>
                        <input className={`${styles.input} ${errors.city ? styles.inputErr : ''}`}
                          name="city" value={form.city} onChange={handleChange}
                          placeholder={t('waitingList.form.placeholders.city')} />
                      </Field>

                    </div>

                    <label className={`${styles.consent} ${errors.whatsappOptIn ? styles.consentErr : ''}`}>
                      <input type="checkbox" name="whatsappOptIn" checked={form.whatsappOptIn} onChange={handleChange} />
                      <span>{t('waitingList.form.whatsappConsent')}<span className={styles.req}> *</span></span>
                    </label>
                    {errors.whatsappOptIn && <p className={styles.consentError}>{errors.whatsappOptIn}</p>}

                    {status === 'duplicate' && (
                      <p className={styles.infoBanner}>{t('waitingList.form.alreadyRegistered')}</p>
                    )}
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
