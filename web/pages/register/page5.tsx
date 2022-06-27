import LinkButton from '@/components/LinkButton'
import Page from '@/components/GenericPage2'
import { TextField } from '@mui/material'

const RegisterPage = () => {
  return (
    <Page title="Create an account - Your details" progress={20}>
      <TextField margin="normal" label="Full name" variant="filled" fullWidth />
      <TextField margin="normal" label="Department" variant="filled" fullWidth />
      <TextField margin="normal" label="Job title" variant="filled" fullWidth />
      <TextField
        margin="normal"
        label="Your line manager's email address"
        variant="filled"
        fullWidth
      />
      <TextField margin="normal" label="Country" variant="filled" fullWidth />

      <LinkButton href="/register/page6" fullWidth>
        Continue
      </LinkButton>
    </Page>
  )
}

export default RegisterPage
