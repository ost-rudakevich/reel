import { ComponentType } from 'react'

export interface IAppRouter {
  path: string
  element: ComponentType
  requireAuth?: boolean
}
