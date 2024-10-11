import { FC, PropsWithChildren } from 'react'
import styles from './AdminList.module.scss'

interface IAdminListProps {
  headerItems: string[]
}

const AdminList: FC<PropsWithChildren<IAdminListProps>> = ({
  children,
  headerItems
}) => {
  return (
    <div className={styles['admin-list']}>
      <div className={styles.item_header}>
        {headerItems.map(value => (
          <span key={value}>{value}</span>
        ))}

        <span>Дії</span>
      </div>
      {children}
    </div>
  )
}

export default AdminList
