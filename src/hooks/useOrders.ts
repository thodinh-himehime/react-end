import type { DependencyList } from 'react'
import { getOrders } from '../api/ordersApi'
import type { OrdersQuery, Order } from '../api/ordersApi'
import { useFetch } from './useFetch'

export const useOrders = (params: OrdersQuery, deps: DependencyList = []) => {
  return useFetch<Order[]>(() => getOrders(params), deps)
}
