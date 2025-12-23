import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

interface RenderOptions {
  route?: string
}

export const renderWithProviders = (ui: ReactElement, { route = '/' }: RenderOptions = {}) => {
  window.history.pushState({}, 'Test', route)
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>,
  )
}
