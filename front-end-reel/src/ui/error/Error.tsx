import { FC } from 'react'
import styles from './Error.module.scss'
import { FaHome, FaHistory } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { IErrorProps } from './error.interface'

const Error: FC<IErrorProps> = ({ error }) => {
  const navigate = useNavigate()

  if (error === 'clientError') {
    return (
      <div className={styles['wrapper-error']}>
        <div className={styles.error}>
          <div className={styles.logo}>
            <span>4</span>
            <img src='/logo.svg' alt='' />
            <span>4</span>
          </div>

          <p className={styles.message}>
            The page you were looking for doesn't exist.
          </p>

          <div className={styles['button-wrapper']}>
            <button onClick={() => navigate('/')}>
              <FaHome />
              <span>Go to Home</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles['wrapper-error']}>
      <div className={styles.error}>
        <div className={styles.logo}>
          <span>5</span>
          <img src='/logo.svg' alt='' />
          <span>5</span>
        </div>

        <p className={styles.message}>
          Server not responding, please try again later
        </p>

        <div className={styles['button-wrapper']}>
          <button onClick={() => window.location.reload()}>
            <FaHistory />
            <span>Try again</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Error
