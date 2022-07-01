import Page from '@/components/GenericPage'
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import LinkButton from '@/components/LinkButton'
import Divider from '@/components/UI/Divider'

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

      <Divider spacing={20} variant="middle" />

      <LinkButton href="/register/page11" fullWidth>
        Continue
      </LinkButton>
    </>
  )
}

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page title="Create an account - Current contract type" progress={70}>
    {page}
  </Page>
)
