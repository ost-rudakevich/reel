import AdminHome from 'components/admin/admin-home/AdminHome'
import { IAppRouter } from './app-router-data.interface'
import MainStatistics from 'components/admin/statistics/main-statistics/MainStatistics'
import UsersManage from 'components/admin/users-manage/UsersManage'
import MoviesManage from 'components/admin/movies-manage/MoviesManage'
import GenresManage from 'components/admin/genres-manage/GenresManage'
import EditGenre from 'components/admin/genres-manage/edit-genre/EditGenre'
import ActorsManage from 'components/admin/actors-manage/ActorsManage'
import EditActor from 'components/admin/actors-manage/edit-actor/EditActor'
import IconGallery from 'components/admin/icon-gallery/IconGallery'
import Movies from 'components/pages/movies/Movies'
import Genre from 'components/pages/genre/Genre'
import Profile from 'components/pages/profile/Profile'
import Favourites from 'components/pages/favourites/Favourites'
import EditMovie from 'components/admin/movies-manage/edit-movie/EditMovie'
import Home from 'components/pages/home/Home'
import Actor from 'components/pages/actor/Actor'
import MovieDetails from 'components/pages/movies/movie-details/MovieDetails'
import ActorsGallery from 'components/pages/actor/actors-gallery/ActorsGallery'

export const USER_ROUTES: IAppRouter[] = [
  { path: '/', element: Home },
  { path: 'movies', element: Movies },
  { path: 'actors', element: ActorsGallery },
  { path: 'movies/:movieSlug', element: MovieDetails },
  { path: 'genre/:genreSlug', element: Genre },
  { path: 'actor/:actorSlug', element: Actor },
  { path: 'favourites', element: Favourites, requireAuth: true },
  {
    path: 'profile',
    element: Profile,
    requireAuth: true
  }
]

export const ADMIN_ROUTES: IAppRouter[] = [
  { path: '/admin', element: AdminHome },
  { path: '/admin/statistics', element: MainStatistics },
  { path: '/admin/users', element: UsersManage },
  { path: '/admin/movies', element: MoviesManage },
  { path: '/admin/movies/update-movie/:movieSlug', element: EditMovie },
  { path: '/admin/genres', element: GenresManage },
  { path: '/admin/genres/update-genre/:genreSlug', element: EditGenre },
  { path: '/admin/actors', element: ActorsManage },
  { path: '/admin/actors/update-actor/:actorSlug', element: EditActor },
  { path: '/admin/icon-gallery', element: IconGallery }
]
