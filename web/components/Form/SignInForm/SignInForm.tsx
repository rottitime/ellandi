import { TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { SignInType } from './types'

const SignInForm = () => {
  const {
    control,
    formState: { errors }
  } = useFormContext<SignInType>()
  return (
    <>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            type="email"
            label="Email address"
            variant="filled"
            placeholder="e.g. Joe.Bloggs@gmail.com"
            size="small"
            error={!!errors.email}
            helperText={errors.email ? errors.email?.message : ''}
            fullWidth
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            type="password"
            label="Password"
            variant="filled"
            size="small"
            error={!!errors.password}
            helperText={errors.password ? errors.password?.message : ''}
            fullWidth
          />
        )}
      />
    </>
  )
}

export default SignInForm
