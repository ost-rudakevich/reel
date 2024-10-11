import { IGenre } from 'types/genre.types'

export interface ISidebarMenuItem
  extends Omit<IGenre, 'id' | 'description' | 'slug'> {
  link: string
}
