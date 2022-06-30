// import { Button, Heading, HintText, LeadParagraph, Paragraph, Radio } from 'govuk-react'
import Link from '@/components/Link'
import LinkButton from '@/components/LinkButton'
import Page from '@/components/GenericPage'
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import Divider from '@/components/ui/Divider'

const options = [
  'Administrative Officer (AO) Equivalent',
  'Administrative Assistant (AA) Equivalent',
  'Executive Officer (EO) Equivalent',
  'Higher Executive Officer (HEO) Equivalent',
  'Senior Executive Officer (SEO) Equivalent',
  'Grade 7 Equivalent',
  'Grade 6 Equivalent',
  'Senior Civil Servant - Deputy Director (PB1/1A',
  'Senior Civil Servant - Director (PB2',
  'Senior Civil Servant - Director General (PB3',
  'Senior Civil Servant - Permanent Secretary',
  'Other equivalent grade'
]

const RegisterPage = () => {
  return (
    <>
      <Typography variant="h1" gutterBottom></Typography>

      <Typography variant="subtitle1" gutterBottom>
        Select your grade. You may only choose one
      </Typography>

      <Typography gutterBottom>
        We'll use this to suggest learning and career development opportunities that are
        relevant to you
      </Typography>

      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        {options.map((option) => (
          <FormControlLabel
            key={option}
            control={<Radio />}
            label={option}
            value={option}
          />
        ))}
      </RadioGroup>

      <Typography gutterBottom>
        <Link href="/register/page7">Skip this step</Link>
      </Typography>

      <Divider spacing={20} variant="middle" />

      <LinkButton href="/register/page7" fullWidth>
        Continue
      </LinkButton>
    </>
  )
}

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page title="Create a profile - Grade" progress={30}>
    {page}
  </Page>
)
