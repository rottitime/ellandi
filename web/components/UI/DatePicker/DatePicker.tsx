import TextField from '@/components/Form/TextField/TextField'
import { FormHelperText, styled } from '@mui/material'
import { DesktopDatePicker as MuiDatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { forwardRef, useEffect, useState } from 'react'
import { Props } from './types'

const StyledDatePicker = styled(MuiDatePicker)<Props>`
  &.error {
    .MuiOutlinedInput-notchedOutline {
      border-color: ${(p) => p.theme.colors.red};
    }
  }

  .PrivatePickersFadeTransitionGroup-root {
    font-size: 16px;
    border: 10px solid red;
  }
`

const DatePicker = forwardRef<HTMLInputElement, Props>(
  ({ onChange, valueFormat, error, helperText, ...props }, ref) => {
    const [value, setValue] = useState<Dayjs | null>(null)

    useEffect(() => {
      const newValue = !!value && !!valueFormat ? dayjs(value).format(valueFormat) : value
      onChange(newValue)
    }, [onChange, value, valueFormat])

    return (
      <StyledDatePicker
        {...props}
        value={value}
        PopperProps={{
          sx: {
            '.PrivatePickersFadeTransitionGroup-root': { fontSize: 16 }
          }
        }}
        className={error ? 'error' : ''}
        inputRef={ref}
        onChange={setValue}
        renderInput={(params) => (
          <>
            <TextField
              size="small"
              {...params}
              inputProps={{ 'data-testid': 'datepicker', ...params.inputProps }}
            />
            {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
          </>
        )}
      />
    )
  }
)
DatePicker.displayName = 'DatePicker'

export default DatePicker
