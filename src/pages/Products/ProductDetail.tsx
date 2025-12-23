import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Breadcrumbs from '../../components/common/Breadcrumbs'
import { deleteProduct, getProductById } from '../../api/productsApi'
import type { Product } from '../../api/productsApi'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'
import { ROUTES } from '../../constants/routes'
import styles from './ProductDetail.module.css'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
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

  const handleDelete = async () => {
    if (!product?.id) return
    const confirmed = window.confirm('Delete this product?')
    if (!confirmed) return
    await deleteProduct(product.id)
    navigate(ROUTES.products)
  }

  if (loading) return <div>Loading product...</div>
  if (error) return <div>{error}</div>
  if (!product) return null

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          { label: 'Home', to: ROUTES.dashboard },
          { label: 'Products', to: ROUTES.products },
          { label: product.name },
        ]}
      />
      <div className={styles.header}>
        <h2>{product.name}</h2>
        <div className={styles.actions}>
          <Link to={`${ROUTES.products}/${product.id}/edit`}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
      <div className={styles.content}>
        <img src={product.imageUrl} alt={product.name} />
        <div>
          <p>{product.description}</p>
          <p>Price: {formatCurrency(product.price)}</p>
          <p>Stock: {product.stock}</p>
          <p>Status: {product.status}</p>
          <p>Created: {formatDate(product.createdAt)}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
