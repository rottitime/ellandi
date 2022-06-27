// import { Button, Heading, HintText, LeadParagraph, Paragraph, Radio } from 'govuk-react'
import Link from '@/components/Link'
import LinkButton from '@/components/LinkButton'
import Page from '@/components/GenericPage2'
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'

const RegisterPage = () => {
  return (
    <Page title="Create a profile - Grade" progress={30}>
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
        <FormControlLabel
          name="group1"
          control={<Radio />}
          label="Administrative Officer (AO) Equivalent"
          value="Administrative Officer (AO) Equivalent"
        />

        <FormControlLabel
          name="group1"
          control={<Radio />}
          label="Administrative Assistant (AA) Equivalent"
          value="Administrative Assistant (AA) Equivalent"
        />

        <FormControlLabel
          name="group1"
          control={<Radio />}
          label="Executive Officer (EO) Equivalent"
          value="Executive Officer (EO) Equivalent"
        />

        <FormControlLabel
          name="group1"
          control={<Radio />}
          label="Higher Executive Officer (HEO) Equivalent"
          value="Higher Executive Officer (HEO) Equivalent"
        />

        <FormControlLabel
          name="group1"
          control={<Radio />}
          label="Senior Executive Officer (SEO) Equivalent"
          value="Senior Executive Officer (SEO) Equivalent"
        />

        <FormControlLabel
          name="group1"
          control={<Radio />}
          label="Grade 7 Equivalent"
          value="Grade 7 Equivalent"
        />

        <FormControlLabel
          name="group1"
          control={<Radio />}
          label="Grade 6 Equivalent"
          value="Grade 6 Equivalent"
        />

        <FormControlLabel
          name="group1"
          control={<Radio />}
          label="Senior Civil Servant - Deputy Director (PB1/1A)"
          value="Senior Civil Servant - Deputy Director (PB1/1A)"
        />

        <FormControlLabel
          name="group1"
          control={<Radio />}
          label="Senior Civil Servant - Director (PB2)"
          value="Senior Civil Servant - Director (PB2)"
        />

        <FormControlLabel
          name="group1"
          control={<Radio />}
          label="Senior Civil Servant - Director General (PB3)"
          value="Senior Civil Servant - Director General (PB3)"
        />

        <FormControlLabel
          name="group1"
          control={<Radio />}
          label="Senior Civil Servant - Permanent Secretary"
          value="Senior Civil Servant - Permanent Secretary"
        />

        <FormControlLabel
          name="group1"
          control={<Radio />}
          label="Other equivalent grade"
          value="Other equivalent grade"
        />
      </RadioGroup>

      <Typography gutterBottom>
        <Link href="/mock/page7">Skip this step</Link>
      </Typography>

      <LinkButton href="/register/page7" fullWidth>
        Continue
      </LinkButton>
    </Page>
  )
}

export default RegisterPage
