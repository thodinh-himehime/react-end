import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import styles from './Layout.module.css'

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen((prev) => !prev)} />
      <div className={styles.content}>
        <Header onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
        <main className={styles.main}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
