import LinkButton from '@/components/LinkButton'
import Page from '@/components/GenericPage'
import { TextField } from '@mui/material'
import Divider from '@/components/UI/Divider'

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

      <Divider spacing={20} variant="middle" />

      <LinkButton href="/register/page6" fullWidth>
        Continue
      </LinkButton>
    </>
  )
}

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page title="Create an account - Your details" progress={20}>
    {page}
  </Page>
)
