import {
  Checkbox,
  ListItemText,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent
} from '@mui/material'
import { FC, forwardRef, ReactNode, useState } from 'react'
import { CheckBoxValue, Props } from './types'

const SelectCheckbox: FC<Props> = forwardRef<FC, Props>(
  ({ data = [], onChange, ...props }, ref) => {
    const [selectValue, setSelectValue] = useState<CheckBoxValue>([])

    const handleChange = (
      event: SelectChangeEvent<typeof selectValue>,
      child: ReactNode
    ) => {
      const {
        target: { value }
      } = event
      setSelectValue(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value
      )
      if (typeof onChange === 'function') onChange(event, child)
    }

    return (
      <MuiSelect
        value={selectValue}
        multiple
        onChange={handleChange}
        renderValue={(selected: CheckBoxValue) => selected.join(', ')}
        {...props}
        ref={ref}
      >
        {data.map((label) => (
          <MenuItem key={label} value={label}>
            <Checkbox checked={selectValue.indexOf(label) > -1} />
            <ListItemText primary={label} disableTypography />
          </MenuItem>
        ))}
      </MuiSelect>
    )
  }
)

SelectCheckbox.displayName = 'SelectCheckbox'

export default SelectCheckbox
