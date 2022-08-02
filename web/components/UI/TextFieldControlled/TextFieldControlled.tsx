import TextField from '@/components/Form/TextField/TextField'
import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Props } from './types'

const TextFieldControlled: FC<Props> = ({ label, name, ...props }) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          size="small"
          error={!!error}
          data-testid={`field_${name}`}
          helperText={<>{error?.message ?? ''}</>}
          fullWidth
          inputProps={{ 'data-testid': `textfield_${name}` }}
          {...props}
        />
      )}
    />
  )
}

export default TextFieldControlled
