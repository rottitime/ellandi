import LinkButton from '@/components/LinkButton'
import Page, { FormFooter } from '@/components/Layout/GenericPage'
import { TextField } from '@mui/material'

const RegisterPage = () => {
  return (
    <>
      <TextField
        margin="normal"
        label="Full name"
        variant="filled"
        size="small"
        fullWidth
      />
      <TextField
        margin="normal"
        label="Department"
        variant="filled"
        size="small"
        fullWidth
      />
      <TextField
        margin="normal"
        label="Job title"
        variant="filled"
        size="small"
        fullWidth
      />
      <TextField
        margin="normal"
        label="Your line manager's email address"
        variant="filled"
        size="small"
        fullWidth
      />
      <TextField
        margin="normal"
        label="Country"
        variant="filled"
        size="small"
        fullWidth
      />

      <FormFooter>
        <LinkButton href="/register/page4" variant="outlined">
          Back
        </LinkButton>

        <LinkButton href="/register/page6">Continue</LinkButton>
      </FormFooter>
    </>
  )
}

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page title="Create an account - Your details" progress={20}>
    {page}
  </Page>
)
