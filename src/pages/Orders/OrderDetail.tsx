import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs'
import OrderItems from '../../components/orders/OrderItems'
import OrderSummary from '../../components/orders/OrderSummary'
import StatusUpdateDropdown from '../../components/orders/StatusUpdateDropdown'
import { getOrderById, patchOrder } from '../../api/ordersApi'
import type { Order } from '../../api/ordersApi'
import { formatDate } from '../../utils/formatDate'
import { ROUTES } from '../../constants/routes'
import styles from './OrderDetail.module.css'

const OrderDetail = () => {
  const { id } = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await getOrderById(id!)
        setOrder(response.data)
      } catch {
        setError('Order not found.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleStatusUpdate = async (nextStatus: string) => {
    if (!order) return
    const confirmed = window.confirm(`Update status to ${nextStatus}?`)
    if (!confirmed) return
    const updatedAt = new Date().toISOString()
    const response = await patchOrder(order.id, { status: nextStatus as Order['status'], updatedAt })
    setOrder(response.data)
  }

  if (loading) return <div>Loading order...</div>
  if (error) return <div>{error}</div>
  if (!order) return null

  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal + order.shippingFee

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          { label: 'Home', to: ROUTES.dashboard },
          { label: 'Orders', to: ROUTES.orders },
          { label: order.id },
        ]}
      />
      <div className={styles.header}>
        <div>
          <h2>Order {order.id}</h2>
          <p>Created: {formatDate(order.createdAt)}</p>
          <p>Updated: {formatDate(order.updatedAt)}</p>
        </div>
        <StatusUpdateDropdown status={order.status} onUpdate={handleStatusUpdate} />
      </div>

      <div className={styles.info}>
        <div className={styles.card}>
          <h4>Customer</h4>
          <p>{order.customerName}</p>
          <p>{order.customerEmail}</p>
        </div>
        <div className={styles.card}>
          <h4>Status</h4>
          <p>{order.status}</p>
        </div>
      </div>

      <OrderItems items={order.items} />
      <OrderSummary subtotal={subtotal} shipping={order.shippingFee} total={total} />
    </div>
  )
}

export default OrderDetail
