import { Dispatch, SetStateAction } from 'react'
import { IMovie } from 'types/movie.types'

export interface ISearchListProps {
  data: IMovie[]
  isError: boolean
  isLoading: boolean
  showResults: boolean
  setShowResults: Dispatch<SetStateAction<boolean>>
}
