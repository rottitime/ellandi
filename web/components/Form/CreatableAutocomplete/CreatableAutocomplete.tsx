import { FC, useState } from 'react'
import {
  Box,
  styled,
  TextField,
  Autocomplete,
  FormHelperText,
  Paper
} from '@mui/material'
import { createFilterOptions } from '@mui/material/Autocomplete'
import Icon from '@/components/Icon/Icon'
import { FilmOptionType, ListType, Props } from './types'

const filter = createFilterOptions<FilmOptionType>()

const DropDown = styled(Paper)`
  border: 1px solid ${(p) => p.theme.colors.grey1};
`

const Wrapper = styled(Box)`
  .button-add {
    display: flex;
    align-items: center;
    svg {
      color: ${(p) => p.theme.colors.grey3};
      font-size: 25px;
      margin-right: ${(p) => p.theme.spacing(2)};
    }
  }
`

const CreatableAutocomplete: FC<Props> = ({
  onSelected,
  data,
  label,
  helperText,
  loading = false,
  onSelectedClear,
  disableOptions = [],
  size = 'medium',
  error,
  ...props
}) => {
  const [value, setValue] = useState<ListType | null>(null)

  return (
    <Wrapper className="creatable-autocomplete" {...props}>
      <Autocomplete
        loading={loading}
        value={value}
        fullWidth
        getOptionDisabled={({ title }) => disableOptions.includes(title)}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setValue({ title: newValue })
            onSelected(event, { title: newValue })
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({ title: newValue.inputValue })
            onSelected(event, { title: newValue.inputValue })
          } else {
            setValue(newValue)
            onSelected(event, newValue)
          }
          onSelectedClear && setValue({ title: '' })
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)

          const { inputValue } = params
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option.title)
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              title: `Add "${params.inputValue}"`,
              helper: (
                <Box className="button-add">
                  <Icon icon="circle-plus" />
                  Add "{params.inputValue}"
                </Box>
              )
            })
          }

          return filtered
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        PaperComponent={DropDown}
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
          return option.title
        }}
        renderOption={(props, { helper, title }) => <li {...props}>{helper || title}</li>}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label={label} size={size} error={error} />
        )}
      />
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </Wrapper>
  )
}

export default CreatableAutocomplete
