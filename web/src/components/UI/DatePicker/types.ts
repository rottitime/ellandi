import { DesktopDatePicker } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import { ComponentProps } from 'react'

export type Props = {
  valueFormat?: string
  error?: boolean
  helperText?: string
  value?: Dayjs | string | null
} & Omit<ComponentProps<typeof DesktopDatePicker>, 'renderInput'>
