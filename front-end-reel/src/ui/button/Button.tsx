import { FC, PropsWithChildren } from 'react'
import { IButton } from './button.interface'
import styles from './Button.module.scss'
import cn from 'clsx'

const Button: FC<PropsWithChildren<IButton>> = ({
  children,
  variant,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={cn(
        styles.general,
        {
          [styles['primary-variant']]: variant === 'primary',
          [styles['white-variant']]: variant === 'white',
          [styles['gray-variant']]: variant === 'gray'
        },
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
