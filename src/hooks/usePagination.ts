import { useMemo } from 'react'
import { PAGE_SIZE } from '../constants/pagination'

export const usePagination = (totalItems = 0, page = 1) => {
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalItems / PAGE_SIZE))
  }, [totalItems])

  const canPrevious = page > 1
  const canNext = page < totalPages

  const showingRange = useMemo(() => {
    if (totalItems === 0) return 'Showing 0 of 0'
    const start = (page - 1) * PAGE_SIZE + 1
    const end = Math.min(page * PAGE_SIZE, totalItems)
    return `Showing ${start}-${end} of ${totalItems}`
  }, [page, totalItems])

  return { totalPages, canPrevious, canNext, showingRange }
}
