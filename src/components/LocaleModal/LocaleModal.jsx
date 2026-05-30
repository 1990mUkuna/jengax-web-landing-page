import styles from './LocaleModal.module.css'

export default function LocaleModal({ visible, onClose, onChoose }) {
  if (!visible) return null

  const choose = (loc) => {
    if (onChoose) onChoose(loc)
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        <button className={styles.close} aria-label="Close" onClick={onClose}>×</button>
        <h3>Choose your country</h3>
        <p>Select a country to set the website language.</p>
        <div className={styles.options}>
          <button onClick={() => choose('fr')}>RDCongo</button>
          <button onClick={() => choose('pt')}>Angola</button>
          <button onClick={() => choose('en')}>Others</button>
        </div>
      </div>
    </div>
  )
}
