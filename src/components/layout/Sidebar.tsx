import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import styles from './Sidebar.module.css'

const Sidebar = ({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) => {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <button className={styles.toggle} onClick={onToggle}>
        {isOpen ? '−' : '+'}
      </button>
      <nav className={styles.nav}>
        <NavLink to={ROUTES.dashboard} className={({ isActive }) => (isActive ? styles.active : undefined)}>
          Dashboard
        </NavLink>
        <NavLink to={ROUTES.products} className={({ isActive }) => (isActive ? styles.active : undefined)}>
          Products
        </NavLink>
        <NavLink to={ROUTES.orders} className={({ isActive }) => (isActive ? styles.active : undefined)}>
          Orders
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar
