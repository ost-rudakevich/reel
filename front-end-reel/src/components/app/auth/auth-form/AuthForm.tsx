import { FC } from 'react'
import styles from './AuthForm.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  useLoginMutation,
  useRegisterMutation
} from 'services/auth/auth.service'
import { IAuthProps } from './auth-form.interface'
import { MdOutlineMailOutline } from 'react-icons/md'
import { MdLockOutline } from 'react-icons/md'
import { LuPenLine } from 'react-icons/lu'
import Button from 'ui/button/Button'
import { useNavigate } from 'react-router-dom'
import AuthHeader from '../auth-header/AuthHeader'
import Loading from 'ui/loading/Loading'
import { AuthEnum } from '../auth.interface'
import { IAuthData } from 'types/auth.types'
import { validEmail } from 'utils/valid-email'
import Field from 'ui/input/field/Field'
import { hasErrorField } from 'utils/has-error-field'
import useCustomToast from 'hooks/useCustomToast'

const Auth: FC<IAuthProps> = ({ type }) => {
  const [register, { isLoading: isLoadingRegister }] = useRegisterMutation()
  const [login, { isLoading: isLoadingLogin }] = useLoginMutation()
  const navigate = useNavigate()
  const showToast = useCustomToast()

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IAuthData>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<IAuthData> = async values => {
    try {
      {
        type === AuthEnum.LOGIN
          ? await login(values).unwrap()
          : await register(values).unwrap()
      }
      reset()
      navigate('/')
    } catch (err: any) {
      const error = hasErrorField(err) ? err.data.message : 'Server not Found'

      showToast({
        title: 'Не вдалось увійти, спробуйте ще раз.',
        description: `Помилка: ${error}`,
        status: 'error'
      })
    }
  }

  if (isLoadingRegister || isLoadingLogin) {
    return (
      <section className={styles['form-container']}>
        <Loading />
      </section>
    )
  }

  return (
    <section className={styles['form-container']}>
      <AuthHeader type={type} reset={reset} />

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {type === AuthEnum.REGISTER && (
          <Field
            {...formRegister('name', {
              required: "Ви повинні ввести ім'я",
              minLength: {
                value: 3,
                message: "Ім'я повинне містити не менше 2 символів"
              },
              maxLength: {
                value: 8,
                message: "Ім'я не повинне містити більше 8 символів"
              }
            })}
            Icon={LuPenLine}
            iconSide='left'
            placeholder="Введіть ім'я"
            error={errors.name?.message}
            style={{ height: '80px' }}
          />
        )}
        <Field
          {...formRegister('email', {
            required: 'Ви повинні ввести електронну пошту',
            pattern: {
              value: validEmail,
              message: 'Введіть існуючу електронну пошту'
            }
          })}
          Icon={MdOutlineMailOutline}
          iconSide='left'
          placeholder='Введіть елекронну пошту'
          error={errors.email?.message}
          style={{ height: '80px' }}
        />
        <Field
          {...formRegister('password', {
            required: 'Ви повинні ввести пароль',
            minLength: {
              value: 6,
              message: 'Пароль повинен містити не менше 6 символів'
            }
          })}
          Icon={MdLockOutline}
          iconSide='left'
          type='password'
          placeholder='Введіть пароль'
          error={errors.password?.message}
          style={{ height: '80px' }}
        />
        <Button variant='primary' className={styles.btn}>
          {type === AuthEnum.LOGIN ? 'Увійти' : 'Зареєструватися'}
        </Button>
      </form>
    </section>
  )
}

export default Auth
