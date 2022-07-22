import { ComponentProps, FC, SyntheticEvent, useState } from 'react'
import {
  TextField,
  Autocomplete as MuiAutocomplete,
  FormHelperText,
  CircularProgress
} from '@mui/material'
import { createFilterOptions } from '@mui/material/Autocomplete'

interface ListType {
  inputValue?: string
  name: string
}

const filter = createFilterOptions<ListType>()

type Props = {
  onSelected: (e: SyntheticEvent<Element, Event>, newValue: ListType) => void
  data: ListType[]
  helperText?: string
  label: string
  loading?: boolean
}

const Autocomplete: FC<Props> = ({
  onSelected,
  data,
  label,
  helperText,
  loading = false
}) => {
  const [value, setValue] = useState<ListType | null>(null)

  return (
    <>
      <MuiAutocomplete
        loading={loading}
        value={value}
        fullWidth
        onChange={(event, name) => {
          if (name === null) return

          if (typeof name === 'string') {
            setValue({ name })
            onSelected(event, { name })
          } else if (name && name.inputValue) {
            // Create a new value from the user input
            setValue({ name: name.inputValue })
            onSelected(event, { name: name.inputValue })
          } else {
            setValue({ name: name.name })
            onSelected(event, { name: name.name })
          }

          //setValue(null)
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)

          const { inputValue } = params
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option.name)
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              name: `Add "${params.inputValue}"`
            })
          }

          return filtered
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={data}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue
          }
          // Regular option
          return option.name
        }}
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </>
  )
}

export default Autocomplete
