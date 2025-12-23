import { Link } from 'react-router-dom'
import type { Order } from '../../api/ordersApi'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'
import { ROUTES } from '../../constants/routes'
import StatusBadge from './StatusBadge'
import styles from './OrderTable.module.css'

const OrderTable = ({ orders }: { orders: Order[] }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Date</th>
          <th>Total</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0) + order.shippingFee
          return (
            <tr key={order.id}>
              <td>
                <Link to={`${ROUTES.orders}/${order.id}`}>{order.id}</Link>
              </td>
              <td>{order.customerName}</td>
              <td>{formatDate(order.createdAt)}</td>
              <td>{formatCurrency(total)}</td>
              <td>
                <StatusBadge status={order.status} />
              </td>
              <td>
                <Link to={`${ROUTES.orders}/${order.id}`}>View</Link>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default OrderTable
