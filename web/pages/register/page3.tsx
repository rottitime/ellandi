import LinkButton from '@/components/LinkButton'
import Page, { FormFooter } from '@/components/GenericPage'
import { TextField, Typography } from '@mui/material'
import Divider from '@/components/UI/Divider2'

const RegisterPage = () => {
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        You need to create an account before using this service
      </Typography>

      <Typography variant="h3">Enter your email address</Typography>

      <TextField
        margin="normal"
        label="Email address"
        variant="filled"
        placeholder="e.g. Joe.Bloggs@gmail.com"
        size="small"
        fullWidth
      />
      <TextField
        margin="normal"
        label="Confirm your email address"
        variant="filled"
        size="small"
        fullWidth
      />

      <Typography variant="h3" gutterBottom>
        Create a password
      </Typography>

      <Typography gutterBottom>
        Your password should have at least 8 characters and not include your name or email
        address
      </Typography>

      <TextField
        margin="normal"
        label="Password"
        variant="filled"
        fullWidth
        size="small"
      />

      <TextField
        margin="normal"
        label="Confirm your password"
        variant="filled"
        size="small"
        fullWidth
      />

      <Divider spacing={20} variant="middle" />

      <FormFooter>
        <LinkButton href="/register/page2" variant="outlined">
          Back
        </LinkButton>

        <LinkButton href="/register/page4">Continue</LinkButton>
      </FormFooter>
    </>
  )
}

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page title="Create an account" progress={5}>
    {page}
  </Page>
)
