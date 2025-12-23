import type { OrderItem } from '../../api/ordersApi'
import { formatCurrency } from '../../utils/formatCurrency'
import styles from './OrderItems.module.css'

const OrderItems = ({ items }: { items: OrderItem[] }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Item</th>
          <th>Qty</th>
          <th>Unit Price</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={`${item.productId}-${item.productName}`}>
            <td className={styles.item}>
              <img src={item.imageUrl} alt={item.productName} />
              <span>{item.productName}</span>
            </td>
            <td>{item.quantity}</td>
            <td>{formatCurrency(item.price)}</td>
            <td>{formatCurrency(item.price * item.quantity)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default OrderItems
