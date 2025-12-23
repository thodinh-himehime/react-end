import type { AxiosResponse } from 'axios'
import type { DependencyList } from 'react'
import { useCallback, useEffect, useState } from 'react'

interface FetchResult<T> {
  data: T | null
  isLoading: boolean
  error: string | null
  totalCount: number
  refetch: () => void
}

export const useFetch = <T,>(
  fetcher: () => Promise<AxiosResponse<T>>,
  deps: DependencyList = [],
): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)
  const [reloadKey, setReloadKey] = useState(0)

  const refetch = useCallback(() => {
    setReloadKey((prev) => prev + 1)
  }, [])

  useEffect(() => {
    let isActive = true
    const run = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetcher()
        if (!isActive) return
        setData(response.data)
        const totalHeader = response.headers?.['x-total-count'] ?? response.headers?.['X-Total-Count']
        if (totalHeader) {
          setTotalCount(Number(totalHeader))
        }
      } catch (err) {
        if (!isActive) return
        setError('Failed to load data. Please try again.')
      } finally {
        if (isActive) setIsLoading(false)
      }
    }
    run()

    return () => {
      isActive = false
    }
  }, [...deps, reloadKey])

  return { data, isLoading, error, totalCount, refetch }
}
