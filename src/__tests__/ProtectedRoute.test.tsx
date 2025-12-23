import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../routes/ProtectedRoute'
import LoginPage from '../pages/Login/Login'
import { AuthProvider } from '../contexts/AuthContext'

const ProtectedContent = () => <div>Secret</div>

describe('ProtectedRoute', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('redirects to login when unauthenticated', async () => {
    renderWithProviders()
    await waitFor(() => expect(screen.getByText(/sign in/i)).toBeInTheDocument())
  })
})

const renderWithProviders = () => {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<ProtectedContent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  )
}
