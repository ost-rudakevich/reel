import { ISidebarMenuItem } from './sidebar-menu.interface'

export const sidebarMenu: ISidebarMenuItem[] = [
  {
    name: 'Головна',
    link: '/',
    icon: 'LuCompass'
  },
  {
    name: 'Фільми',
    link: '/movies',
    icon: 'LuFilm'
  },
  {
    name: 'Актори',
    link: '/actors',
    icon: 'LuClapperboard'
  }
]

export const adminSidebarMenu: ISidebarMenuItem[] = [
  {
    name: 'Адмiн',
    link: '/admin',
    icon: 'LuShield'
  },
  {
    name: 'Статистика',
    link: '/admin/statistics',
    icon: 'LuLayoutDashboard'
  },
  {
    name: 'Користувачі',
    link: '/admin/users',
    icon: 'LuUsers'
  },
  {
    name: 'Фільми',
    link: '/admin/movies',
    icon: 'LuFilm'
  },
  {
    name: 'Жанри',
    link: '/admin/genres',
    icon: 'LuBook'
  },
  {
    name: 'Актори',
    link: '/admin/actors',
    icon: 'LuTv'
  }
]
