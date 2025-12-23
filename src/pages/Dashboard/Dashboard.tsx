import { useMemo } from 'react'
import StatsCard from '../../components/dashboard/StatsCard'
import RecentOrders from '../../components/dashboard/RecentOrders'
import LowStockAlert from '../../components/dashboard/LowStockAlert'
import { useFetch } from '../../hooks/useFetch'
import { getProducts } from '../../api/productsApi'
import type { Product } from '../../api/productsApi'
import { getOrders } from '../../api/ordersApi'
import type { Order } from '../../api/ordersApi'
import { formatCurrency } from '../../utils/formatCurrency'
import styles from './Dashboard.module.css'

const DashboardPage = () => {
  const productsResult = useFetch<Product[]>(() => getProducts({ _limit: 1000 }), [])
  const ordersResult = useFetch<Order[]>(() => getOrders({ _limit: 1000 }), [])

  const totalProducts = productsResult.totalCount
  const totalOrders = ordersResult.totalCount

  const pendingOrders = useMemo(() => {
    if (!ordersResult.data) return 0
    return ordersResult.data.filter((order) => order.status === 'pending').length
  }, [ordersResult.data])

  const revenue = useMemo(() => {
    if (!ordersResult.data) return 0
    return ordersResult.data.reduce((sum, order) => {
      const orderTotal = order.items.reduce((sub, item) => sub + item.price * item.quantity, 0) + order.shippingFee
      return sum + orderTotal
    }, 0)
  }, [ordersResult.data])

  const recentOrders = useMemo(() => {
    if (!ordersResult.data) return []
    return [...ordersResult.data]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  }, [ordersResult.data])

  const lowStock = useMemo(() => {
    if (!productsResult.data) return []
    return productsResult.data.filter((product) => product.stock < 10)
  }, [productsResult.data])

  if (productsResult.isLoading || ordersResult.isLoading) {
    return <div>Loading dashboard...</div>
  }

  if (productsResult.error || ordersResult.error) {
    return <div>Unable to load dashboard data.</div>
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.stats}>
        <StatsCard title="Total Products" value={String(totalProducts)} />
        <StatsCard title="Total Orders" value={String(totalOrders)} />
        <StatsCard title="Pending Orders" value={String(pendingOrders)} />
        <StatsCard title="Revenue" value={formatCurrency(revenue)} />
      </div>
      <div className={styles.grid}>
        <RecentOrders orders={recentOrders} />
        <LowStockAlert products={lowStock} />
      </div>
    </div>
  )
}

export default DashboardPage
