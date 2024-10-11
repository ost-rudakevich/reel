import { FC } from 'react'
import styles from './Loading.module.scss'
import { Spinner } from '@chakra-ui/react'
import { ILoadingProps } from './loading.interface'

const Loading: FC<ILoadingProps> = ({ size = 'xl' }) => {
  return (
    <div className={styles.loading}>
      <Spinner thickness='4px' speed='0.65s' color='red' size={size} />
    </div>
  )
}

export default Loading
