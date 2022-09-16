import { FormHelperText, styled, TextField } from '@mui/material'
import { DesktopDatePicker as MuiDatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { forwardRef, useEffect, useState } from 'react'
import { Props } from './types'

const StyledDatePicker = styled(MuiDatePicker)<Props>`
  .MuiFormLabel-root,
  .MuiInputBase-root {
    font-size: 16px;
  }

  &.error {
    .MuiOutlinedInput-notchedOutline {
      border-color: ${(p) => p.theme.colors.red};
    }
  }
`

const DatePicker = forwardRef<HTMLInputElement, Props>(
  ({ onChange, valueFormat, error, helperText, ...props }, ref) => {
    const [value, setValue] = useState<Dayjs | null>(null)

    useEffect(() => {
      const newValue = !!valueFormat ? dayjs(value).format(valueFormat) : value
      onChange(newValue)
    }, [onChange, value, valueFormat])

    return (
      <StyledDatePicker
        {...props}
        value={value}
        className={error ? 'error' : ''}
        inputRef={ref}
        onChange={setValue}
        renderInput={(params) => (
          <>
            <TextField size="small" {...params} />
            {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
          </>
        )}
      />
    )
  }
)
DatePicker.displayName = 'DatePicker'

export default DatePicker
