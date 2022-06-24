import LinkButton from '@/components/LinkButton'
import Page from '@/components/GenericPage'
import { Box, TextField, Typography } from '@mui/material'
import HorizontalLinearStepper from '@/components/HorizontalLinearStepper'

const RegisterPage = () => {
  return (
    <Page>
      <Box sx={{ mb: 3 }}>
        <HorizontalLinearStepper />
      </Box>

      <Typography variant="h1" gutterBottom>
        Create an account
      </Typography>
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

      <LinkButton href="/register/page4">continue</LinkButton>
    </Page>
  )
}

export default RegisterPage
