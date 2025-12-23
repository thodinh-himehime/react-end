import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductTable from '../../components/products/ProductTable'
import SearchInput from '../../components/common/SearchInput'
import Pagination from '../../components/common/Pagination'
import { useDebounce } from '../../hooks/useDebounce'
import { usePagination } from '../../hooks/usePagination'
import { useProducts } from '../../hooks/useProducts'
import { deleteProduct } from '../../api/productsApi'
import { ROUTES } from '../../constants/routes'
import styles from './ProductList.module.css'

const ProductList = () => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const { debouncedValue, isDebouncing } = useDebounce(search, 500)
  const [message, setMessage] = useState('')

  const [page, setPage] = useState(1)

  const params = useMemo(() => {
    const query: Record<string, string | number> = {
      _page: page,
    }
    if (debouncedValue) query.q = debouncedValue
    if (status !== 'all') query.status = status
    return query
  }, [debouncedValue, status, page])

  const { data, isLoading, error, totalCount, refetch } = useProducts(params, [params])
  const { totalPages, canPrevious, canNext, showingRange } = usePagination(totalCount, page)

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Delete this product?')
    if (!confirmed) return
    await deleteProduct(id)
    setMessage('Product deleted successfully.')
    refetch()
  }

  const handleClear = () => {
    setSearch('')
    setStatus('all')
    setPage(1)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h2>Products</h2>
          <p>Total: {totalCount}</p>
        </div>
        <Link className={styles.newButton} to={ROUTES.productNew}>
          New Product
        </Link>
      </div>

      <div className={styles.filters}>
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name" />
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button onClick={handleClear}>Clear</button>
        {isDebouncing ? <span className={styles.searching}>Searching...</span> : null}
      </div>

      {message ? <div className={styles.message}>{message}</div> : null}

      {isLoading ? <div>Loading products...</div> : null}
      {error ? <div>{error}</div> : null}

      {data && data.length ? (
        <>
          <ProductTable products={data} onDelete={handleDelete} />
          <Pagination
            page={page}
            totalPages={totalPages}
            canPrevious={canPrevious}
            canNext={canNext}
            onPageChange={setPage}
            showingRange={showingRange}
          />
        </>
      ) : null}

      {data && data.length === 0 && !isLoading ? (
        <div className={styles.empty}>
          <p>No products found.</p>
          <Link to={ROUTES.productNew}>Add First Product</Link>
        </div>
      ) : null}
    </div>
  )
}

export default ProductList
