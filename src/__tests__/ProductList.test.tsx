import { screen } from '@testing-library/react'
import ProductList from '../pages/Products/ProductList'
import { renderWithProviders } from '../test-utils'

jest.mock('../hooks/useProducts', () => ({
  useProducts: () => ({
    data: [
      {
        id: 1,
        name: 'Sample Product',
        description: 'Short description',
        price: 10,
        stock: 5,
        imageUrl: 'https://example.com/img.png',
        status: 'active',
        createdAt: '2024-12-16T09:00:00.000Z',
      },
    ],
    isLoading: false,
    error: null,
    totalCount: 1,
    refetch: jest.fn(),
  }),
}))

describe('ProductList', () => {
  it('renders product table', () => {
    renderWithProviders(<ProductList />)

    expect(screen.getByText(/products/i)).toBeInTheDocument()
    expect(screen.getByText('Sample Product')).toBeInTheDocument()
  })
})
