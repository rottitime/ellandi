import { FC, useState } from 'react'
import {
  styled,
  Autocomplete,
  FormHelperText,
  Paper,
  CircularProgress,
  Typography
} from '@mui/material'
import TextField from '@/components/Form/TextField/TextField'
import { createFilterOptions } from '@mui/material/Autocomplete'
import Icon from '@/components/Icon/Icon'
import { ListType, OnChangeValue, Props } from './types'

const filter = createFilterOptions<ListType>()

const DropDown = styled(Paper)`
  border: 1px solid ${(p) => p.theme.colors.grey1};

  li {
    font-size: 16px;
  }
`

const ButtonAdd = styled(Typography)`
  display: flex;
  align-items: center;

  svg {
    color: ${(p) => p.theme.colors.grey3};
    font-size: 25px;
    margin-right: ${(p) => p.theme.spacing(2)};
  }
`

const CreatableAutocomplete: FC<Props> = ({
  label,
  helperText,
  loading = false,
  disableOptions = [],
  size = 'medium',
  onChange,
  error,
  ...props
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Autocomplete
        {...props}
        loading={loading}
        fullWidth
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        getOptionDisabled={(data: ListType) => disableOptions.includes(data?.title)}
        onSelect={(event) =>
          typeof onChange === 'function' &&
          onChange((event.target as HTMLInputElement).value, event, 'selectOption')
        }
        onChange={(event, value: OnChangeValue, reason) => {
          let title
          if (typeof value === 'string') {
            title = value
          } else if (value?.inputValue) {
            title = value?.inputValue
          } else if (value?.title) {
            title = value.title
          }

          if (typeof onChange === 'function') onChange(title, event, reason)
        }}
        filterOptions={(options: ListType[], params) => {
          const filtered = filter(options, params)

          const { inputValue } = params
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option.title)
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              title: `Add "${params.inputValue}"`,
              helper: (
                <ButtonAdd variant="body2">
                  <Icon icon="circle-plus" />
                  Add "{params.inputValue}"
                </ButtonAdd>
              )
            })
          }

          return filtered
        }}
        selectOnFocus
        handleHomeEndKeys
        PaperComponent={DropDown}
        getOptionLabel={(option: ListType) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') return option
          // Add "xxx" option created dynamically
          if (!!option?.inputValue) return option.inputValue
          // Regular option
          return option.title
        }}
        renderOption={(props, { helper, title }) => <li {...props}>{helper || title}</li>}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            size={size}
            error={error}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && open ? (
                    <CircularProgress
                      color="inherit"
                      size={20}
                      data-testid="loading-icon"
                    />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
      />
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </>
  )
}

export default CreatableAutocomplete
