import Card from '../common/Card'
import styles from './StatsCard.module.css'

interface StatsCardProps {
  title: string
  value: string
}

const StatsCard = ({ title, value }: StatsCardProps) => {
  return (
    <Card>
      <div className={styles.card}>
        <span className={styles.title}>{title}</span>
        <strong className={styles.value}>{value}</strong>
      </div>
    </Card>
  )
}

export default StatsCard
