import { FC, PropsWithChildren } from 'react'
import styles from './AdminHeader.module.scss'
import Field from 'ui/input/field/Field'
import { CiSearch } from 'react-icons/ci'
import { IAdminHeaderProps } from './admin-header.interface'

const AdminHeader: FC<PropsWithChildren<IAdminHeaderProps>> = ({
  children,
  setSearchTerm
}) => {
  return (
    <div className={styles['admin-header']}>
      <div className={styles.field}>
        <Field
          placeholder='Я шукаю...'
          Icon={CiSearch}
          style={{ height: '44px' }}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {children}
    </div>
  )
}

export default AdminHeader
