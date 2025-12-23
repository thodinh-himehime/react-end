import { Link } from 'react-router-dom'
import styles from './Breadcrumbs.module.css'

interface Crumb {
  label: string
  to?: string
}

const Breadcrumbs = ({ items }: { items: Crumb[] }) => {
  return (
    <nav className={styles.breadcrumbs}>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
          {index < items.length - 1 ? <span className={styles.separator}>/</span> : null}
        </span>
      ))}
    </nav>
  )
}

export default Breadcrumbs
