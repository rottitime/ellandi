import GenericPage, { FormFooter } from '@/components/GenericPage'
import Link from '@/components/UI/Link'
import { Button, TextField, Typography } from '@mui/material'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

type SignInType = { email: string; password: string }

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required()
})

const SigninPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<SignInType>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema)
  })

  const onFormSubmit: SubmitHandler<SignInType> = (data) => {
    console.log({ data })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Typography variant="subtitle1">
          If this is the first time you have used this website, you will need to{' '}
          <Link href="/">create an account</Link>.
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
        </Typography>

        <FormFooter>
          <Button variant="contained" type="submit">
            Continue
          </Button>
          {/* <LinkButton href="/account">Continue</LinkButton> */}
        </FormFooter>
      </form>
    </>
  )
}

export default SigninPage
SigninPage.getLayout = (page) => <GenericPage title="Sign in">{page}</GenericPage>
