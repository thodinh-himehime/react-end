import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductForm, { type ProductFormValues } from '../../components/products/ProductForm'
import { getProductById, updateProduct } from '../../api/productsApi'
import type { Product } from '../../api/productsApi'
import { ROUTES } from '../../constants/routes'

const ProductEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const response = await getProductById(id!)
        setProduct(response.data)
      } catch {
        setError('Product not found.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleSubmit = async (data: ProductFormValues) => {
    if (!product?.id) return
    setIsSubmitting(true)
    setError('')
    try {
      await updateProduct(product.id, { ...product, ...data })
      navigate(`${ROUTES.products}/${product.id}`)
    } catch {
      setError('Failed to update product.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) return <div>Loading product...</div>
  if (error) return <div>{error}</div>
  if (!product) return null

  return (
    <div>
      <h2>Edit Product</h2>
      <ProductForm defaultValues={product} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}

export default ProductEdit
