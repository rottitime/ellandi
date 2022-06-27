import Page from '@/components/GenericPage2'
import Link from '@/components/Link'
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material'
import LinkButton from '@/components/LinkButton'

const RegisterPage = () => (
  <Page title="Create an account - Privacy policy" progress={10}>
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

    <LinkButton href="/register/page5" fullWidth>
      Continue
    </LinkButton>
  </Page>
)

export default RegisterPage
