import { TypeIconName } from 'ui/Icon'

export interface IGenre {
  id: number
  name: string
  slug: string
  description: string
  icon: TypeIconName
}

export interface IGenreEdit extends Omit<IGenre, 'id' | 'slug'> {}
