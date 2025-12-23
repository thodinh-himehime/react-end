import type { AxiosResponse } from 'axios'
import { PAGE_SIZE } from '../constants/pagination'
import { mockProducts } from './mockData'

export interface Product {
  id?: number
  name: string
  description: string
  price: number
  stock: number
  imageUrl: string
  status: 'active' | 'inactive'
  createdAt: string
}

export interface ProductsQuery {
  q?: string
  status?: string
  _page?: number
  _limit?: number
  _sort?: string
  _order?: 'asc' | 'desc'
}

export const getProducts = async (params: ProductsQuery = {}) => {
  const filtered = mockProducts.filter((product) => {
    const matchesStatus = params.status ? product.status === params.status : true
    const matchesQuery = params.q
      ? product.name.toLowerCase().includes(String(params.q).toLowerCase())
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
  } as AxiosResponse<Product[]>
}

export const getProductById = async (id: string | number) => {
  const found = mockProducts.find((product) => product.id === Number(id))
  if (!found) {
    throw new Error('Product not found')
  }
  return {
    data: found,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  } as AxiosResponse<Product>
}

export const createProduct = async (payload: Product) => {
  const nextId = Math.max(...mockProducts.map((product) => product.id ?? 0)) + 1
  const created = { ...payload, id: nextId }
  mockProducts.unshift(created)
  return {
    data: created,
    status: 201,
    statusText: 'Created',
    headers: {},
    config: {},
  } as AxiosResponse<Product>
}

export const updateProduct = async (id: string | number, payload: Product) => {
  const index = mockProducts.findIndex((product) => product.id === Number(id))
  if (index === -1) throw new Error('Product not found')
  mockProducts[index] = { ...payload, id: Number(id) }
  return {
    data: mockProducts[index],
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  } as AxiosResponse<Product>
}

export const deleteProduct = async (id: string | number) => {
  const index = mockProducts.findIndex((product) => product.id === Number(id))
  if (index === -1) throw new Error('Product not found')
  mockProducts.splice(index, 1)
  return {
    data: {},
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  } as AxiosResponse
}
