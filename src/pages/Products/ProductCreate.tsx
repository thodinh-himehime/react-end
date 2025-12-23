import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductForm, { type ProductFormValues } from '../../components/products/ProductForm'
import { createProduct } from '../../api/productsApi'
import type { Product } from '../../api/productsApi'
import { ROUTES } from '../../constants/routes'

const ProductCreate = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true)
    setError('')
    try {
      const response = await createProduct({
        ...data,
        createdAt: new Date().toISOString(),
      } as Product)
      navigate(`${ROUTES.products}/${response.data.id}`)
    } catch {
      setError('Failed to create product. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h2>New Product</h2>
      {error ? <p>{error}</p> : null}
      <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}

export default ProductCreate
