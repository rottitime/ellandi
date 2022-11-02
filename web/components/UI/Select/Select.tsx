import { FormControl, InputLabel, MenuItem, Select as BasicSelect } from '@mui/material'
import { FC, forwardRef, useId } from 'react'
import SelectCheckbox from './SelectCheckbox'
import { Props } from './types'

//const Select: FC<Props> = ({ checkboxes, label, fullWidth, ...props }) => {
const Select: FC<Props> = forwardRef<FC, Props>(
  ({ checkboxes, label, data = [], fullWidth, children, ...props }, ref) => {
    const id = useId()
    const labelId = `label-${id}`
    const newProps = { ...props, label, labelId, ref, data }

    return (
      <FormControl fullWidth={fullWidth} size="small">
        <InputLabel id={labelId}>{label}</InputLabel>

        {checkboxes ? (
          <SelectCheckbox {...newProps} />
        ) : (
          <BasicSelect {...newProps}>
            {data.map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
            {children}
          </BasicSelect>
        )}
      </FormControl>
    )
  }
)

Select.displayName = 'Select'

export default Select
