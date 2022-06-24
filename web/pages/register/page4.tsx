import Page from '@/components/GenericPage'
import Link from '@/components/Link'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  LinearProgress,
  Typography
} from '@mui/material'
import LinkButton from '@/components/LinkButton'

const RegisterPage = () => (
  <Page>
    <LinearProgress variant="determinate" value={10} sx={{ mb: 6 }} />

    <Typography variant="h1" gutterBottom>
      Create an account - Privacy policy
    </Typography>
    <Typography gutterBottom>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, vitae?
      <br />
      <Link href="#">Privacy policy (opens in a new tab)</Link>
    </Typography>

    <FormGroup sx={{ mb: 5 }}>
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="I agree to the privacy policy"
      />
    </FormGroup>

    <LinkButton href="/register/page5">Continue</LinkButton>
  </Page>
)

export default RegisterPage
