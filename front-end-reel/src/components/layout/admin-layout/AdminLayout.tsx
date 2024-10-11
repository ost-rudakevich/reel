import { FC } from 'react'
import styles from './AdminLayout.module.scss'
import Header from '../header/Header'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './admin-sidebar/AdminSidebar'

const AdminLayout: FC = () => {
  return (
    <div className={styles['admin-layout']}>
      <Header />
      <div className={styles.outlet}>
        <AdminSidebar />
        <div className={styles['outlet-wrapper']}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
