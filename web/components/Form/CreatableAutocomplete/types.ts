import { ComponentProps, ReactNode, SyntheticEvent } from 'react'
import { Autocomplete } from '@mui/material'

export interface ListType {
  inputValue?: string
  title: string
  helper?: ReactNode
}

export type Props = {
  onSelected: (e: SyntheticEvent<Element, Event>, newValue: ListType) => void
  options: ListType[]
  helperText?: string
  label: string
  loading?: ComponentProps<typeof Autocomplete>['loading']
  disableOptions?: string[]
  onSelectedClear?: boolean
  size?: 'medium' | 'small'
  error?: boolean
} & Omit<ComponentProps<typeof Autocomplete>, 'renderInput'>

export type OnChangeValue =
  | {
      inputValue: string
    }
  | string
