import type { AxiosResponse } from 'axios'
import { PAGE_SIZE } from '../constants/pagination'
import { mockOrders } from './mockData'

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled'

export interface OrderItem {
  productId: number
  productName: string
  imageUrl: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  createdAt: string
  updatedAt: string
  status: OrderStatus
  items: OrderItem[]
  shippingFee: number
}

export interface OrdersQuery {
  q?: string
  status?: string
  _page?: number
  _limit?: number
  _sort?: string
  _order?: 'asc' | 'desc'
}

export const getOrders = async (params: OrdersQuery = {}) => {
  const filtered = mockOrders.filter((order) => {
    const matchesStatus = params.status ? order.status === params.status : true
    const query = params.q ? String(params.q).toLowerCase() : ''
    const matchesQuery = query
      ? order.id.toLowerCase().includes(query) || order.customerName.toLowerCase().includes(query)
      : true
    return matchesStatus && matchesQuery
  })
  const page = Number(params._page ?? 1)
  const limit = Number(params._limit ?? PAGE_SIZE)
  const sorted = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  const paged = sorted.slice((page - 1) * limit, page * limit)
  return {
    data: paged,
    status: 200,
    statusText: 'OK',
    headers: { 'x-total-count': String(filtered.length) },
    config: {},
  } as AxiosResponse<Order[]>
}

export const getOrderById = async (id: string | number) => {
  const found = mockOrders.find((order) => order.id === String(id))
  if (!found) throw new Error('Order not found')
  return {
    data: found,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  } as AxiosResponse<Order>
}

export const updateOrder = async (id: string | number, payload: Order) => {
  const index = mockOrders.findIndex((order) => order.id === String(id))
  if (index === -1) throw new Error('Order not found')
  mockOrders[index] = { ...payload, id: String(id) }
  return {
    data: mockOrders[index],
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  } as AxiosResponse<Order>
}

export const patchOrder = async (id: string | number, payload: Partial<Order>) => {
  const index = mockOrders.findIndex((order) => order.id === String(id))
  if (index === -1) throw new Error('Order not found')
  mockOrders[index] = { ...mockOrders[index], ...payload }
  return {
    data: mockOrders[index],
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  } as AxiosResponse<Order>
}
