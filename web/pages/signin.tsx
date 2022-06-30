import Page from '@/components/GenericPage'
import Link from '@/components/Link'
import LinkButton from '@/components/LinkButton'
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from '@mui/material'

const SigninPage = () => (
  <>
    <Typography variant="h1" gutterBottom>
      Sign in
    </Typography>
    <Box component="form" noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <LinkButton href="/" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </LinkButton>
      <Grid container>
        <Grid item xs>
          <Link href="/register">Forgot password?</Link>
        </Grid>
        <Grid item>
          <Link href="/register">{"Don't have an account? Sign Up"}</Link>
        </Grid>
      </Grid>
    </Box>
  </>
)

export default SigninPage
SigninPage.getLayout = (page) => <Page>{page}</Page>
