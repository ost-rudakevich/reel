import { FC } from 'react'
import styles from '../../sidebar/Sidebar.module.scss'
import Menu from 'components/layout/sidebar/menu/Menu'
import { adminSidebarMenu } from 'data/sidebar-menu/sidebar-menu.data'

const AdminSidebar: FC = () => {
  return (
    <div className={styles.sidebar}>
      <Menu title='Адмін меню' menu={adminSidebarMenu} />
    </div>
  )
}

export default AdminSidebar

// adminSidebar
