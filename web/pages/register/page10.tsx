import Page from '@/components/GenericPage'
import { FormControlLabel, LinearProgress, Radio, RadioGroup, Typography } from '@mui/material'
import LinkButton from '@/components/LinkButton'

const RegisterPage = () => {
  return (
    <Page>

<LinearProgress variant="determinate" value={70} sx={{ mb: 6 }} />


      <Typography variant="h1" gutterBottom>
        Create an account - Current contract type
      </Typography>
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

      <LinkButton href="/register/page11">Continue</LinkButton>
    </Page>
  )
}

export default RegisterPage
