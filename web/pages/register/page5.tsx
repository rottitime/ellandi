// import { Button, FormGroup, Heading, InputField } from 'govuk-react'
import LinkButton from '@/components/LinkButton'
import Page from '@/components/GenericPage'
import { LinearProgress, TextField, Typography } from '@mui/material'

const RegisterPage = () => {
  return (
    <Page>

<LinearProgress variant="determinate" value={20} sx={{ mb: 6 }} />
      <Typography variant="h1" gutterBottom>
        Create an account - Your details
      </Typography>

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
