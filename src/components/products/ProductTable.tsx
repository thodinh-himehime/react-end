import { Link } from 'react-router-dom'
import type { Product } from '../../api/productsApi'
import { formatCurrency } from '../../utils/formatCurrency'
import { ROUTES } from '../../constants/routes'
import styles from './ProductTable.module.css'

interface ProductTableProps {
  products: Product[]
  onDelete: (id: number) => void
}

const ProductTable = ({ products, onDelete }: ProductTableProps) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>
              <img className={styles.thumbnail} src={product.imageUrl} alt={product.name} />
            </td>
            <td>
              <Link to={`${ROUTES.products}/${product.id}`}>{product.name}</Link>
            </td>
            <td className={styles.description}>{product.description}</td>
            <td>{formatCurrency(product.price)}</td>
            <td className={product.stock < 5 ? styles.critical : product.stock < 10 ? styles.low : undefined}>
              {product.stock}
            </td>
            <td>
              <span className={`${styles.status} ${styles[product.status]}`}>{product.status}</span>
            </td>
            <td >
              <div className={styles.actions}>
              <Link to={`${ROUTES.products}/${product.id}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                View
              </Link>
              <Link to={`${ROUTES.products}/${product.id}/edit`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Edit
              </Link>
              <button onClick={() => onDelete(product.id!)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
                Delete
              </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProductTable
