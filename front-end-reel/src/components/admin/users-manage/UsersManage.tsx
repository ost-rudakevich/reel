import styles from './UsersManage.module.scss'
import AdminHeader from '../ui/admin-header/AdminHeader'
import { useGetAllUsersQuery } from 'services/user/user.service'
import { useState } from 'react'
import Loading from 'ui/loading/Loading'
import Error from 'ui/error/Error'
import AdminList from '../ui/admin-list/AdminList'
import AdminListItem from '../ui/admin-list/admin-list-item/AdminListItem'
import UsersActions from './users-actions/UsersActions'
import moment from 'moment'

const UsersManage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const {
    data: usersData,
    isError,
    isLoading
  } = useGetAllUsersQuery(searchTerm, {
    refetchOnMountOrArgChange: true
  })

  if (isLoading) {
    return (
      <div className={styles['users-manage']}>
        <Loading />
      </div>
    )
  }

  if (isError || !usersData) {
    return (
      <div className={styles['users-manage']}>
        <Error error='serverError' />
      </div>
    )
  }

  return (
    <div className={styles['users-manage']}>
      <AdminHeader setSearchTerm={setSearchTerm} />
      <AdminList headerItems={["Ім'я", 'Ел.пошта', 'Дата створення']}>
        {usersData.map(user => {
          return (
            <AdminListItem
              id={user.id}
              name={user.name}
              rowOne={user.email}
              rowTwo={moment(user.createdAt).format('DD MMMM-YYYY-HH:mm')}
              key={user.email}
            >
              <UsersActions id={user.id} name={user.name} role={user.role} />
            </AdminListItem>
          )
        })}
      </AdminList>
    </div>
  )
}

export default UsersManage
