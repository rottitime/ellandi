import Page, { FormFooter } from '@/components/Layout/GenericPage'
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

      <RadioGroup sx={{ mb: 3 }}>
        <FormControlLabel control={<Radio />} label="Yes" value="Yes" />
        <FormControlLabel control={<Radio />} label="No" value="No" />
      </RadioGroup>

      <FormFooter>
        <LinkButton href="/register/page9" variant="outlined">
          Back
        </LinkButton>

        <LinkButton href="/register/page11">Continue</LinkButton>
      </FormFooter>
    </>
  )
}

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page title="Create an account - Current contract type" progress={70}>
    {page}
  </Page>
)
