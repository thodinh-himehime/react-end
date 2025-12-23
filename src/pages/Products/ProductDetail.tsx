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

  if (loading) {
    return (
      <div className={styles.page}>
        <Breadcrumbs
          items={[
            { label: 'Home', to: ROUTES.dashboard },
            { label: 'Products', to: ROUTES.products },
          ]}
        />
        <div style={{
          textAlign: 'center',
          padding: '32px',
          color: 'var(--text-secondary)',
          fontSize: '16px'
        }}>
          Loading product...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.page}>
        <Breadcrumbs
          items={[
            { label: 'Home', to: ROUTES.dashboard },
            { label: 'Products', to: ROUTES.products },
          ]}
        />
        <div style={{
          textAlign: 'center',
          padding: '32px',
          backgroundColor: 'var(--surface)',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          color: '#ff4d4d'
        }}>
          <p style={{ fontSize: '16px', marginBottom: '16px' }}>{error}</p>
          <button 
            onClick={() => navigate(ROUTES.products)}
            style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            Back to Products
          </button>
        </div>
      </div>
    )
  }

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
          <button onClick={() => navigate(ROUTES.products)}>Back</button>
        </div>
      </div>
      <div className={styles.content}>
        <img src={product.imageUrl} alt={product.name} />
        <div>
          <p className={styles.description}>{product.description}</p>
          
          <div className={styles.priceSection}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>PRICE</span>
            <span className={styles.price}>{formatCurrency(product.price)}</span>
          </div>

          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Stock</span>
              <span className={styles.metaValue}>{product.stock} units</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Status</span>
              <span className={`${styles.badge} ${styles[product.status]}`}>
                {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
              </span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Created</span>
              <span className={styles.metaValue}>{formatDate(product.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
