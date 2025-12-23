import { useEffect, useState } from 'react'

export const useDebounce = <T,>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const [isDebouncing, setIsDebouncing] = useState(false)

  useEffect(() => {
    setIsDebouncing(true)
    const timer = window.setTimeout(() => {
      setDebouncedValue(value)
      setIsDebouncing(false)
    }, delay)

    return () => {
      window.clearTimeout(timer)
    }
  }, [value, delay])

  return { debouncedValue, isDebouncing }
}
