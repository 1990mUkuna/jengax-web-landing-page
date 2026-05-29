import blueprintImg from '../../assets/construction_flow_plan.png'
import engineerImg from '../../assets/engineer_standing.png'
import paymentImg from '../../assets/phone_payment-confirmed.png'
import inspectionImg from '../../assets/man_holding_phone.png'
import styles from './HowItWorks.module.css'

const STEPS = [
  {
    number: '01',
    title: 'Plan & Design',
    description:
      'Upload architectural drawings or use our AI to generate a blueprint from your vision. Collaborate with designers in real-time to perfect every detail before the first brick is laid.',
    cta: 'Start planning →',
    img: blueprintImg,
    imgAlt: 'Architectural blueprint spread on a desk',
    imgBg: '#f5efe6',
    reverse: false,
  },
  {
    number: '02',
    title: 'Hire Verified',
    description:
      'Browse verified contractors with ratings from other diaspora builders. Eliminate the "markup" middlemen and trust in rigorous background checks and skill assessments. No more ghosting.',
    cta: 'Browse contractors →',
    img: engineerImg,
    imgAlt: 'Verified engineer standing at a construction site',
    imgBg: '#1a2e1a',
    reverse: true,
  },
  {
    number: '03',
    title: 'Fund Escrow',
    description:
      'Your money is safe. We only release funds when milestones are inspected and approved. Our secure escrow system protects your investment in concrete at every stage of construction.',
    cta: 'How we escrow →',
    img: paymentImg,
    imgAlt: 'Phone screen showing payment confirmed in escrow',
    imgBg: '#1a2233',
    reverse: false,
  },
  {
    number: '04',
    title: 'Remote Inspection',
    description:
      'Get weekly HD video updates while AI-driven quality reports are delivered to your dashboard. Monitor progress from anywhere in the world and approve milestones with confidence.',
    cta: 'View sample result →',
    img: inspectionImg,
    imgAlt: 'Hand holding phone to inspect a house remotely',
    imgBg: '#1a2a1a',
    reverse: true,
  },
]

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Building should feel like progress, not stress.
          </h2>
          <p className={styles.subtitle}>
            Four simple steps to your dream project. Manage every step from anywhere in the world.
          </p>
        </div>

        <div className={styles.steps}>
          {STEPS.map(({ number, title, description, cta, img, imgAlt, imgBg, reverse }) => (
            <div key={number} className={`${styles.step} ${reverse ? styles.reverse : ''}`}>
              <div className={styles.content}>
                <span className={styles.stepLabel}>STEP {number}</span>
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
