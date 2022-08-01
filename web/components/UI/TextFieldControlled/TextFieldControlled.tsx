import TextField from '@/components/Form/TextField/TextField'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { Props } from './types'

const TextFieldControlled: FC<Props> = ({ label, name, ...props }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <TextField
      label={label}
      variant="outlined"
      size="small"
      error={!!errors[name]}
      data-testid={`field_${name}`}
      helperText={<>{errors[name]?.message ?? ''}</>}
      fullWidth
      {...props}
      {...register(name)}
      inputProps={{ 'data-testid': `textfield_${name}` }}
    />
  )
}

export default TextFieldControlled
