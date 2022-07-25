import { ComponentProps, SyntheticEvent } from 'react'
import { Autocomplete } from '@mui/material'

export interface ListType {
  inputValue?: string
  name: string
}

export type Props = {
  onSelected: (e: SyntheticEvent<Element, Event>, newValue: ListType) => void
  data: ListType[]
  helperText?: string
  label: string
  loading?: ComponentProps<typeof Autocomplete>['loading']
  disableOptions?: string[]
}
