import { FC } from 'react'
import styles from './Sidebar.module.scss'
import { useGetAllGenreQuery } from 'services/genre/genre.service'
import Loading from 'ui/loading/Loading'
import Menu from './menu/Menu'
import GenreMenu from './genre-menu/GenreMenu'
import { sidebarMenu } from 'data/sidebar-menu/sidebar-menu.data'

const Sidebar: FC = () => {
  const { data: genreData, isLoading, isError } = useGetAllGenreQuery('')

  if (isLoading) {
    return (
      <aside className={styles.sidebar}>
        <Loading />
      </aside>
    )
  }

  if (!genreData || isError) {
    return <aside className={styles.sidebar}></aside>
  }
  return (
    <aside className={styles.sidebar}>
      <Menu title='Меню' menu={sidebarMenu} />
      <GenreMenu genreMenu={genreData} />
    </aside>
  )
}

export default Sidebar
