import type { DependencyList } from 'react'
import { getProducts } from '../api/productsApi'
import type { ProductsQuery, Product } from '../api/productsApi'
import { useFetch } from './useFetch'

export const useProducts = (params: ProductsQuery, deps: DependencyList = []) => {
  return useFetch<Product[]>(() => getProducts(params), deps)
}
