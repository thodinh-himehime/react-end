import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import styles from './NotFound.module.css'

const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to={ROUTES.dashboard}>Back to Dashboard</Link>
    </div>
  )
}

export default NotFoundPage
