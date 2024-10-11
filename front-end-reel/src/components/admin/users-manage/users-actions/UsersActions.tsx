import { FC } from 'react'
import { useUpdateUserRoleMutation } from 'services/user/user.service'
import { hasErrorField } from 'utils/has-error-field'
import { IUsersActionsProps } from './users-actions.interface'
import Button from 'ui/button/Button'
import useCustomToast from 'hooks/useCustomToast'

const UsersActions: FC<IUsersActionsProps> = ({ id, name, role }) => {
  const [toggleUserRole] = useUpdateUserRoleMutation()
  const showToast = useCustomToast()

  const updateUserRole = async () => {
    try {
      await toggleUserRole(id).unwrap()
      if (role === 'USER') {
        showToast({
          title: 'Успіх!',
          description: `Ви надали статус Адміна користувачу ${name}`,
          status: 'success'
        })
      } else if (role === 'ADMIN') {
        showToast({
          title: 'Увага!',
          description: `Ви зняли статус Адміна з користувача ${name}`,
          status: 'info'
        })
      }
    } catch (err) {
      const error = hasErrorField(err) ? err.data.error : 'Server not Found'
      showToast({
        title: 'Не вдалось оновити роль користувача.',
        description: `Помилка: ${error}`,
        status: 'error'
      })
    }
  }
  return (
    <Button variant='primary' onClick={updateUserRole}>
      {role === 'ADMIN' ? 'To User' : 'To Admin'}
    </Button>
  )
}
export default UsersActions
