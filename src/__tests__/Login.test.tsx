import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from '../pages/Login/Login'
import { renderWithProviders } from '../test-utils'

describe('LoginPage', () => {
  it('disables submit until form is valid', async () => {
    renderWithProviders(<LoginPage />)

    const submit = screen.getByRole('button', { name: /login/i })
    expect(submit).toBeDisabled()

    await userEvent.type(screen.getByLabelText(/email/i), 'admin@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'admin123')

    expect(submit).toBeEnabled()
  })

  it('shows error on invalid credentials', async () => {
    renderWithProviders(<LoginPage />)

    await userEvent.type(screen.getByLabelText(/email/i), 'wrong@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'wrongpass')

    await userEvent.click(screen.getByRole('button', { name: /login/i }))

    expect(await screen.findByText(/invalid email or password/i)).toBeInTheDocument()
  })
})
