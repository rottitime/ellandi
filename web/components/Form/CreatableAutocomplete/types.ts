import { ComponentProps, ReactNode, SyntheticEvent } from 'react'
import { Autocomplete, Box } from '@mui/material'

export interface ListType {
  inputValue?: string
  title: string
  helper?: ReactNode
}

export type Props = {
  onSelected: (e: SyntheticEvent<Element, Event>, newValue: ListType) => void
  data: ListType[]
  helperText?: string
  label: string
  loading?: ComponentProps<typeof Autocomplete>['loading']
  disableOptions?: string[]
  onSelectedClear?: boolean
  size?: 'medium' | 'small'
  error?: boolean
} & ComponentProps<typeof Box>

export type FilmOptionType = {
  inputValue?: string
  title: string
  year?: number
  helper?: ReactNode
}
