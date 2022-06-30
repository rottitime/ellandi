import LinkButton from '@/components/LinkButton'
import Page from '@/components/GenericPage2'
import { TextField, Typography } from '@mui/material'

const RegisterPage = () => {
  return (
    <>
      <Typography gutterBottom>
        You need to create an account before using this service
      </Typography>

      <Typography variant="h3">Enter your email address</Typography>

      <TextField
        margin="normal"
        label="Email address"
        variant="filled"
        placeholder="e.g. Joe.Bloggs@gmail.com"
        fullWidth
      />
      <TextField
        margin="normal"
        label="Confirm your email address"
        variant="filled"
        fullWidth
      />

      <Typography variant="h3">Create a password</Typography>

      <Typography gutterBottom>
        Your password should have at least 8 characters and not include your name or email
        address
      </Typography>

      <TextField margin="normal" label="Password" variant="filled" fullWidth />

      <TextField
        margin="normal"
        label="Confirm your password"
        variant="filled"
        fullWidth
      />

      <LinkButton href="/register/page4" fullWidth>
        Continue
      </LinkButton>
    </>
  )
}

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page title="Create an account" progress={5}>
    {page}
  </Page>
)
