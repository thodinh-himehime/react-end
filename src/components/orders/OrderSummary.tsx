import { formatCurrency } from '../../utils/formatCurrency'
import styles from './OrderSummary.module.css'

interface OrderSummaryProps {
  subtotal: number
  shipping: number
  total: number
}

const OrderSummary = ({ subtotal, shipping, total }: OrderSummaryProps) => {
  return (
    <div className={styles.summary}>
      <div>
        <span>Subtotal</span>
        <strong>{formatCurrency(subtotal)}</strong>
      </div>
      <div>
        <span>Shipping</span>
        <strong>{formatCurrency(shipping)}</strong>
      </div>
      <div className={styles.total}>
        <span>Total</span>
        <strong>{formatCurrency(total)}</strong>
      </div>
    </div>
  )
}

export default OrderSummary
