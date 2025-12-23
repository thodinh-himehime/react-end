import styles from './Modal.module.css'

interface ModalProps {
  isOpen: boolean
  title: string
  description?: string
  onConfirm: () => void
  onClose: () => void
}

const Modal = ({ isOpen, title, description, onConfirm, onClose }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
        <div className={styles.actions}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
