import blueprintImg from '../../assets/construction_flow_plan.png'
import engineerImg from '../../assets/engineer_standing.png'
import paymentImg from '../../assets/phone_payment-confirmed.png'
import inspectionImg from '../../assets/man_holding_phone.png'
import supplierImg from '../../assets/supplier_shop.png'
import styles from './HowItWorks.module.css'
import { useI18n } from '../../i18n/I18nProvider'

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
