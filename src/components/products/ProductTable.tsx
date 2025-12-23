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
            <td className={styles.actions}>
              <Link to={`${ROUTES.products}/${product.id}`}>View</Link>
              <Link to={`${ROUTES.products}/${product.id}/edit`}>Edit</Link>
              <button onClick={() => onDelete(product.id!)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProductTable
