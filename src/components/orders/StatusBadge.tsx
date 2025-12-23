import styles from './StatusBadge.module.css'
import { ORDER_STATUS_LABELS } from '../../constants/status'

const StatusBadge = ({ status }: { status: string }) => {
  return <span className={`${styles.badge} ${styles[status]}`}>{ORDER_STATUS_LABELS[status] ?? status}</span>
}

export default StatusBadge
