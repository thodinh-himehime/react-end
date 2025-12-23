import { Link } from 'react-router-dom'
import Card from '../common/Card'
import type { Order } from '../../api/ordersApi'
import { formatDate } from '../../utils/formatDate'
import { formatCurrency } from '../../utils/formatCurrency'
import { ROUTES } from '../../constants/routes'
import StatusBadge from '../orders/StatusBadge'
import styles from './RecentOrders.module.css'

interface RecentOrdersProps {
  orders: Order[]
}

const RecentOrders = ({ orders }: RecentOrdersProps) => {
  if (!orders.length) {
    return <Card>No recent orders.</Card>
  }

  return (
    <Card>
      <div className={styles.header}>
        <h3>Recent Orders</h3>
        <Link to={ROUTES.orders}>View All Orders</Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
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
              </tr>
            )
          })}
        </tbody>
      </table>
    </Card>
  )
}

export default RecentOrders
