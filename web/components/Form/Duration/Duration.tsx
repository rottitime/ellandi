import { Box, FormHelperText, Grid } from '@mui/material'
import TextField from '@/components/Form/TextField/TextField'
import { FC, forwardRef, useEffect, useRef } from 'react'
import {
  splitMinutes,
  combineDaysMinutesHoursToMinutes as combine
} from '@/lib/date-utils'
import { OnKeyDownType, Props } from './types'

const invalidKeys = ['e', '-', '.']

const Duration: FC<Props> = forwardRef<HTMLDivElement, Props>(
  ({ value, onChange, error, helperText }, ref) => {
    const daysRef = useRef<HTMLInputElement>()
    const hoursRef = useRef<HTMLInputElement>()
    const minutesRef = useRef<HTMLInputElement>()

    const reset = () => {
      daysRef.current.value = null
      hoursRef.current.value = null
      minutesRef.current.value = null
    }

    const getTotal = () =>
      combine(
        daysRef.current.valueAsNumber || 0,
        hoursRef.current.valueAsNumber || 0,
        minutesRef.current.valueAsNumber || 0
      )

    useEffect(() => {
      if (!value) {
        reset()
      } else if (!!value && getTotal() !== value) {
        const { days, minutes, hours } = splitMinutes(value)
        daysRef.current.value = days.toString()
        hoursRef.current.value = hours.toString()
        minutesRef.current.value = minutes.toString()
      }
    }, [value])

    const fields = [
      { name: 'Days', ref: daysRef },
      { name: 'Hours', ref: hoursRef },
      { name: 'Minutes', ref: minutesRef }
    ]

    const onKeyDown: OnKeyDownType = (e) =>
      !!invalidKeys.includes(e.key) && e.preventDefault()

    return (
      <Box ref={ref}>
        <Grid container spacing={2}>
          {fields.map(({ name, ref }) => (
            <Grid item xs={4} key={name}>
              <TextField
                label={name}
                name={name}
                inputRef={ref}
                size="small"
                type="number"
                error={error}
                fullWidth
                onKeyDown={onKeyDown}
                inputProps={{
                  'data-testid': `duration-${name.toLowerCase()}`
                }}
                onChange={() => onChange(getTotal())}
              />
            </Grid>
          ))}
        </Grid>
        {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
      </Box>
    )
  }
)

Duration.displayName = 'Duration'

export default Duration
