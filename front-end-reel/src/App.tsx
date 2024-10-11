import { FC } from 'react'
import styles from './App.module.scss'
import AppRouter from './components/app/app-router/AppRouter'

const App: FC = () => {
  return (
    <div className={styles.app}>
      <AppRouter />
    </div>
  )
}

export default App
