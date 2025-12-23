import { renderHook, act, waitFor } from '@testing-library/react'
import { useDebounce } from '../hooks/useDebounce'
import { usePagination } from '../hooks/usePagination'
import { useFetch } from '../hooks/useFetch'

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('debounces value updates', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'a' },
    })

    expect(result.current.debouncedValue).toBe('a')

    rerender({ value: 'ab' })

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(result.current.debouncedValue).toBe('ab')
  })
})

describe('usePagination', () => {
  it('calculates total pages and range', () => {
    const { result } = renderHook(() => usePagination(25, 2))

    expect(result.current.totalPages).toBe(3)
    expect(result.current.canPrevious).toBe(true)
    expect(result.current.canNext).toBe(true)
    expect(result.current.showingRange).toBe('Showing 11-20 of 25')
  })
})

describe('useFetch', () => {
  it('returns data and total count', async () => {
    const fetcher = jest.fn().mockResolvedValue({
      data: [{ id: 1 }],
      headers: { 'x-total-count': '1' },
    })

    const { result } = renderHook(() => useFetch(fetcher, []))

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.data).toEqual([{ id: 1 }])
    expect(result.current.totalCount).toBe(1)
  })
})
