import { forwardRef } from 'react'
import { IField } from './field.interface'
import cn from 'clsx'
import styles from './Field.module.scss'

const Field = forwardRef<HTMLInputElement, IField>(
  (
    {
      placeholder,
      error,
      className,
      type = 'text',
      style,
      Icon,
      iconSide,
      handleSearch,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={styles.field} style={style}>
        <div className={styles.container}>
          {Icon && iconSide === 'left' && (
            <div className={styles['icon-container']} onClick={handleSearch}>
              <Icon className={styles.icon} />
            </div>
          )}

          <input
            className={cn(styles.input, {
              [styles['input-error']]: error
            })}
            autoComplete='off'
            ref={ref}
            type={type}
            placeholder={placeholder}
            {...rest}
          />

          {Icon && iconSide === 'right' && (
            <div className={styles['icon-container']} onClick={handleSearch}>
              <Icon className={styles.icon} />
            </div>
          )}
        </div>

        {error && <div className={styles.error}>{error}</div>}
      </div>
    )
  }
)

Field.displayName = 'Field'

export default Field
