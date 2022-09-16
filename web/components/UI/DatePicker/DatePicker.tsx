import { TextField } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { FC, forwardRef } from 'react'
import { Props } from './types'

const DatePicker = forwardRef<HTMLInputElement, Props>(
  ({ onChange, valueFormat, ...props }, ref) => {
    return (
      <DesktopDatePicker
        {...props}
        inputRef={ref}
        onChange={(value) => {
          const newValue = !!valueFormat
            ? dayjs(value as Date).format(valueFormat)
            : value
          onChange(newValue)
        }}
        renderInput={(params) => <TextField size="small" {...params} />}
      />
    )
  }
)
DatePicker.displayName = 'DatePicker'

export default DatePicker
