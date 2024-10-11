import { IField } from 'ui/input/field/field.interface'
import type { Options } from 'react-select'
import type { ControllerRenderProps } from 'react-hook-form'

export interface IOption {
  label: string
  value: number
}

export interface ISelect
  extends Omit<IField, 'iconSide' | 'Icon' | 'handleSearch'> {
  options: Options<IOption>
  isMulti?: boolean
  field: ControllerRenderProps<any, any>
  isLoading?: boolean
}
