import { DesktopDatePicker } from '@mui/x-date-pickers'
import { ComponentProps } from 'react'

export type Props = {
  valueFormat?: string
  error?: boolean
  helperText?: string
} & Omit<ComponentProps<typeof DesktopDatePicker>, 'renderInput'>
