import Page from '@/components/GenericPage'
import Link from '@/components/Link'
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material'
import LinkButton from '@/components/LinkButton'
import Divider from '@/components/ui/Divider'

const RegisterPage = () => (
  <>
    <Typography gutterBottom>
      <Link href="#">Privacy policy (opens in a new tab)</Link>
    </Typography>

    <FormGroup sx={{ mb: 5 }}>
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="I agree to the privacy policy"
      />
    </FormGroup>

    <Divider spacing={20} variant="middle" />

    <LinkButton href="/register/page5" fullWidth>
      Continue
    </LinkButton>
  </>
)

export default RegisterPage

RegisterPage.getLayout = (page) => (
  <Page title="Create an account - Privacy policy" progress={10}>
    {page}
  </Page>
)
