import { Link } from 'react-router-dom'
import Card from '../common/Card'
import type { Product } from '../../api/productsApi'
import { ROUTES } from '../../constants/routes'
import styles from './LowStockAlert.module.css'

const LowStockAlert = ({ products }: { products: Product[] }) => {
  if (!products.length) {
    return <Card>All products have healthy stock.</Card>
  }

  return (
    <Card>
      <h3>Low Stock Alert</h3>
      <ul className={styles.list}>
        {products.map((product) => (
          <li key={product.id} className={product.stock < 5 ? styles.critical : undefined}>
            <Link to={`${ROUTES.products}/${product.id}`}>{product.name}</Link> — {product.stock} left
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default LowStockAlert
