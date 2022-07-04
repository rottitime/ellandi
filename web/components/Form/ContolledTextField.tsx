import { TextField } from '@mui/material'
import { ComponentProps, FC } from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
  label: string
  name: string
} & ComponentProps<typeof TextField>

const ContolledTextField: FC<Props> = ({ label, name, ...props }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <TextField
      margin="normal"
      label={label}
      variant="filled"
      size="small"
      error={!!errors[name]}
      helperText={<>{errors[name]?.message ?? ''}</>}
      fullWidth
      {...props}
      {...register(name)}
    />
  )
}

export default ContolledTextField
