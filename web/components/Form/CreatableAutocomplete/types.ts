import { ComponentProps, ReactNode, SyntheticEvent } from 'react'
import { Autocomplete, AutocompleteChangeReason } from '@mui/material'

export interface ListType {
  inputValue?: string
  title: string
  helper?: ReactNode
}

export type Props = {
  onChange: (
    newValue: string,
    e: SyntheticEvent<Element, Event>,
    reason: AutocompleteChangeReason
  ) => void
  options: ListType[]
  helperText?: string
  label: string
  loading?: ComponentProps<typeof Autocomplete>['loading']
  disableOptions?: string[]
  size?: 'medium' | 'small'
  error?: boolean
} & Omit<ComponentProps<typeof Autocomplete>, 'renderInput'>

export type OnChangeValue = ListType | string
