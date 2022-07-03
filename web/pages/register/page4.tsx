import Page, { FormFooter } from '@/components/GenericPage'
import Link from '@/components/UI/Link'
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material'
import LinkButton from '@/components/LinkButton'

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

    <FormFooter>
      <LinkButton href="/register/page3" variant="outlined">
        Back
      </LinkButton>

      <LinkButton href="/register/page5">Continue</LinkButton>
    </FormFooter>
  </>
)

export default RegisterPage

RegisterPage.getLayout = (page) => (
  <Page title="Create an account - Privacy policy" progress={10}>
    {page}
  </Page>
)
