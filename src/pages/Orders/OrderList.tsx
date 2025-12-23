import { useMemo, useState } from 'react'
import SearchInput from '../../components/common/SearchInput'
import Pagination from '../../components/common/Pagination'
import OrderTable from '../../components/orders/OrderTable'
import { useDebounce } from '../../hooks/useDebounce'
import { usePagination } from '../../hooks/usePagination'
import { useOrders } from '../../hooks/useOrders'
import styles from './OrderList.module.css'

const OrderList = () => {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const { debouncedValue, isDebouncing } = useDebounce(search, 500)

  const [page, setPage] = useState(1)

  const params = useMemo(() => {
    const query: Record<string, string | number> = {
      _page: page,
    }
    if (debouncedValue) query.q = debouncedValue
    if (status !== 'all') query.status = status
    return query
  }, [debouncedValue, status, page])

  const { data, isLoading, error, totalCount } = useOrders(params, [params])
  const { totalPages, canPrevious, canNext, showingRange } = usePagination(totalCount, page)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2>Orders</h2>
        <div className={styles.filters}>
          <SearchInput value={search} onChange={setSearch} placeholder="Search by order ID or customer" />
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {isDebouncing ? <span className={styles.searching}>Searching...</span> : null}
        </div>
      </div>

      {isLoading ? <div>Loading orders...</div> : null}
      {error ? <div>{error}</div> : null}

      {data && data.length ? (
        <>
          <OrderTable orders={data} />
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

      {data && data.length === 0 && !isLoading ? <div>No orders found.</div> : null}
    </div>
  )
}

export default OrderList
