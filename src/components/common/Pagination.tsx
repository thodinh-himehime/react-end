import styles from './Pagination.module.css'

interface PaginationProps {
  page: number
  totalPages: number
  canPrevious: boolean
  canNext: boolean
  onPageChange: (page: number) => void
  showingRange: string
}

const Pagination = ({ page, totalPages, canPrevious, canNext, onPageChange, showingRange }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className={styles.pagination}>
      <span className={styles.range}>{showingRange}</span>
      <div className={styles.controls}>
        <button disabled={!canPrevious} onClick={() => onPageChange(page - 1)}>
          Prev
        </button>
        {pages.map((p) => (
          <button key={p} className={p === page ? styles.active : undefined} onClick={() => onPageChange(p)}>
            {p}
          </button>
        ))}
        <button disabled={!canNext} onClick={() => onPageChange(page + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination
