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
        Log Out
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      </button>
    </header>
  )
}

export default Header
