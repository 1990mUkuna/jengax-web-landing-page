import styles from './PhoneMockup.module.css'
import appScreen from '../../assets/app-welcome-screen.jpg'

export default function PhoneMockup() {
  return (
    <div className={styles.wrapper}>
      {/* Hardware buttons */}
      <div className={styles.btnVolUp} />
      <div className={styles.btnVolDown} />
      <div className={styles.btnPower} />

      {/* Phone frame */}
      <div className={styles.frame}>
        <div className={styles.screen}>
          <img
            src={appScreen}
            alt="JengaX app welcome screen"
            className={styles.screenImg}
          />
        </div>
      </div>
    </div>
  )
}
