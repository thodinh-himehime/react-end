import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/Login'
import DashboardPage from './pages/Dashboard'
import ProductsPage from './pages/Products'
import OrdersPage from './pages/Orders'
import NotFoundPage from './pages/NotFound'
import Layout from './components/layout/Layout'
import ProtectedRoute from './routes/ProtectedRoute'
import ProductCreate from './pages/Products/ProductCreate'
import ProductDetail from './pages/Products/ProductDetail'
import ProductEdit from './pages/Products/ProductEdit'
import OrderDetail from './pages/Orders/OrderDetail'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/new" element={<ProductCreate />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/:id/edit" element={<ProductEdit />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
