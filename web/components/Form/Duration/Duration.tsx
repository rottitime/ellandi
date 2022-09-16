import { TextField } from '@mui/material'
import { FC, useEffect, useRef } from 'react'
import { splitDays, combineDaysMinutesHoursToDays as combine } from '@/lib/date-utils'
import { Props } from './types'

const Duration: FC<Props> = ({ value, onChange }) => {
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

  const onTextChanged = () => onChange(getTotal())

  useEffect(() => {
    if (!value) {
      reset()
    } else if (!!value && getTotal() !== value) {
      const { days, minutes, hours } = splitDays(value)
      daysRef.current.value = days.toString()
      hoursRef.current.value = hours.toString()
      minutesRef.current.value = minutes.toString()
    }
  }, [value])

  return (
    <>
      <TextField
        size="small"
        label="Days"
        name="Days"
        type="number"
        inputRef={daysRef}
        inputProps={{
          'data-testid': 'duration-days'
        }}
        onChange={onTextChanged}
      />
      <TextField
        size="small"
        label="Hours"
        name="Hours"
        type="number"
        inputRef={hoursRef}
        onChange={onTextChanged}
        inputProps={{
          'data-testid': 'duration-hours'
        }}
      />
      <TextField
        size="small"
        label="Minutes"
        name="Minutes"
        type="number"
        inputRef={minutesRef}
        onChange={onTextChanged}
        inputProps={{
          'data-testid': 'duration-minutes'
        }}
      />

      <button
        onClick={() => {
          daysRef.current.value = '12'
        }}
      >
        click
      </button>
    </>
  )
}

export default Duration
