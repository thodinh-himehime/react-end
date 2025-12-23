import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'
import styles from './Header.module.css'

const Header = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    const confirm = window.confirm('Log out of the system?')
    if (!confirm) return
    logout()
    navigate(ROUTES.login)
  }

  return (
    <header className={styles.header}>
      <button className={styles.menu} onClick={onToggleSidebar}>
        Menu
      </button>
      <h1 className={styles.title}>Product & Order Management</h1>
      <button className={styles.logout} onClick={handleLogout}>
        Logout
      </button>
    </header>
  )
}

export default Header
