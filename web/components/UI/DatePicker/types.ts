import { DesktopDatePicker } from '@mui/x-date-pickers'
import { ComponentProps } from 'react'

export type Props = {
  valueFormat?: string
} & Omit<ComponentProps<typeof DesktopDatePicker>, 'renderInput'>
