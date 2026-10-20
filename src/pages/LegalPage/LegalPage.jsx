import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './LegalPage.module.css'
import { useI18n } from '../../i18n/I18nProvider'
import Footer from '../../components/Footer/Footer'

const FALLBACK_NOTE = {
  fr: 'Ce document est actuellement disponible en français uniquement.',
  en: 'This document is currently available in French only.',
  pt: 'Este documento está atualmente disponível apenas em francês.',
}
const ENGLISH_NOTE = {
  pt: 'Este documento está atualmente disponível em inglês e francês.',
}

// Turn the contact email and jengax.co/privacy into links.
function linkify(text) {
  return text.split(/(jengax-admin@jengax\.co|jengax\.co\/privacy)/).map((part, i) => {
    if (part === 'jengax-admin@jengax.co') return <a key={i} href={`mailto:${part}`}>{part}</a>
    if (part === 'jengax.co/privacy') return <Link key={i} to="/privacy">{part}</Link>
    return part
  })
}

export default function LegalPage({ doc }) {
  const { locale } = useI18n()
  const lang = doc[locale] ? locale : doc.en ? 'en' : 'fr'
  const content = doc[lang]
  const note = lang === locale ? null : lang === 'fr' ? FALLBACK_NOTE[locale] : ENGLISH_NOTE[locale]

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `${content.title} — JengaX`
  }, [content.title])

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.meta}>{content.meta}</p>
        </div>
      </section>

      <article className={styles.body} lang={lang}>
        <div className={styles.container}>
          {note && <p className={styles.note}>{note}</p>}
          {content.intro && <p className={styles.intro}>{linkify(content.intro)}</p>}

          {content.sections.map((section) => (
            <section key={section.title} className={styles.section}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              {section.body.map((block, i) => {
                if (typeof block === 'string') return <p key={i}>{linkify(block)}</p>
                if (block.heading) {
                  const Tag = block.minor ? 'h4' : 'h3'
                  return <Tag key={i}>{block.heading}</Tag>
                }
                return (
                  <ul key={i}>
                    {block.list.map((item) => <li key={item}>{linkify(item)}</li>)}
                  </ul>
                )
              })}
            </section>
          ))}

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{content.contact.title}</h2>
            <address className={styles.contact}>
              {content.contact.lines.map((line) => <span key={line}>{linkify(line)}</span>)}
            </address>
          </section>
        </div>
      </article>

      <Footer />
    </>
  )
}
