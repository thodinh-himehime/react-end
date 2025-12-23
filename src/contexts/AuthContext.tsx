import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { AUTH_STORAGE_KEY } from '../constants/auth'

export interface AuthUser {
  email: string
}

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  login: (user: AuthUser, remember: boolean) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AuthUser
        setUser(parsed)
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = useCallback((nextUser: AuthUser, remember: boolean) => {
    setUser(nextUser)
    if (remember) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }, [])

  const value = useMemo(() => ({ user, isLoading, login, logout }), [user, isLoading, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
