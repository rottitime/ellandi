import Page from '@/components/GenericPage2'
import LinkButton from '@/components/LinkButton'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  LinearProgress,
  Typography
} from '@mui/material'
import Link from '@/components/Link'

const RegisterPage = () => {
  return (
    <Page title="Create an account - Current profession" progress={40}>
      <Typography variant="subtitle1" gutterBottom>
        Select the Profession(s) that you belong to. You may choose more than one
      </Typography>

      <Typography gutterBottom>
        We'll use this to suggest learning and career development opportunities that are
        relevant to you
      </Typography>

      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Corporate Finance Profession" />
        <FormControlLabel
          control={<Checkbox />}
          label="Counter-fraud Standards and Profession"
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Digital, Data and Technology Professions"
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Government Communication Service"
        />
        <FormControlLabel control={<Checkbox />} label="Government Economic Service" />
        <FormControlLabel control={<Checkbox />} label="Government Finance Profession" />
        <FormControlLabel control={<Checkbox />} label="Government IT Profession" />
        <FormControlLabel
          control={<Checkbox />}
          label="Government Knowledge and Information Management Profession"
        />
        <FormControlLabel control={<Checkbox />} label="Government Legal Profession" />
        <FormControlLabel
          control={<Checkbox />}
          label="Government Occupational Psychology Profession"
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Government Operational Research Service"
        />
        <FormControlLabel control={<Checkbox />} label="Government Planning Inspectors" />
        <FormControlLabel control={<Checkbox />} label="Government Planning Profession" />
        <FormControlLabel control={<Checkbox />} label="Government Property Profession" />
        <FormControlLabel control={<Checkbox />} label="Government Security Profession" />
        <FormControlLabel
          control={<Checkbox />}
          label="Government Science and Engineering Profession"
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Government Social Research Profession"
        />
        <FormControlLabel control={<Checkbox />} label="Government Tax Profession" />
        <FormControlLabel
          control={<Checkbox />}
          label="Government Veterinary Profession"
        />
        <FormControlLabel control={<Checkbox />} label="Human Resources Profession" />
        <FormControlLabel control={<Checkbox />} label="Intelligence Analysis" />
        <FormControlLabel control={<Checkbox />} label="Internal Audit Profession" />
        <FormControlLabel
          control={<Checkbox />}
          label="Operational Delivery Profession"
        />
        <FormControlLabel control={<Checkbox />} label="Policy Profession" />
        <FormControlLabel control={<Checkbox />} label="Procurement Profession" />
        <FormControlLabel control={<Checkbox />} label="Project Delivery Profession" />
      </FormGroup>

      <Typography gutterBottom>
        <Link href="/mock/page8">Skip this step</Link>
      </Typography>

      <LinkButton href="/register/page8" fullWidth>
        Continue
      </LinkButton>
    </Page>
  )
}

export default RegisterPage
