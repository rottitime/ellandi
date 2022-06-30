import Page from '@/components/GenericPage2'
import Link from '@/components/Link'
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import LinkButton from '@/components/LinkButton'

const RegisterPage = () => {
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        Select your contract type. You can only choose one
      </Typography>
      <Typography gutterBottom>
        We'll use this to suggest learning and career development opportunities that are
        relevant to you
      </Typography>

      <RadioGroup>
        <FormControlLabel control={<Radio />} label="Permanent" value="Permanent" />
        <FormControlLabel control={<Radio />} label="Fixed term" value="Fixed term" />
        <FormControlLabel control={<Radio />} label="Agency" value="Agency" />
        <FormControlLabel control={<Radio />} label="Other" value="Other" />
      </RadioGroup>

      <Typography gutterBottom>
        <Link href="/mock/page9">Skip this step</Link>
      </Typography>
      <LinkButton href="/register/page9" fullWidth>
        Continue
      </LinkButton>
    </>
  )
}

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page title="Create an account - Current contract type" progress={50}>
    {page}
  </Page>
)
