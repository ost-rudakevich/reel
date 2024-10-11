import { FC, PropsWithChildren } from 'react'
import styles from './AdminListItem.module.scss'
import { IAdminListItemProps } from './admin-list-item.interface'

const AdminListItem: FC<PropsWithChildren<IAdminListItemProps>> = ({
  children,
  name,
  rowOne,
  rowTwo
}) => {
  return (
    <div className={styles.item}>
      <span>{name}</span>
      <span>{rowOne}</span>
      <span>{rowTwo}</span>

      <div className={styles.child}>{children}</div>
    </div>
  )
}

export default AdminListItem
