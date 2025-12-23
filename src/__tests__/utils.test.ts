import { formatCurrency } from '../utils/formatCurrency'
import { formatDate } from '../utils/formatDate'
import { validateEmail, validatePrice } from '../utils/validators'

describe('utils', () => {
  it('formats currency', () => {
    expect(formatCurrency(1234.5)).toBe('$1,234.50')
  })

  it('formats date', () => {
    expect(formatDate('2024-12-16T09:00:00.000Z', 'dd/MM/yyyy')).toBe('16/12/2024')
  })

  it('validates email', () => {
    expect(validateEmail('test@example.com')).toBe(true)
    expect(validateEmail('bad-email')).toBe(false)
  })

  it('validates price', () => {
    expect(validatePrice(10)).toBe(true)
    expect(validatePrice(0)).toBe(false)
  })
})
