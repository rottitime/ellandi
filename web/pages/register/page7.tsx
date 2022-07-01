import Page from '@/components/GenericPage'
import LinkButton from '@/components/LinkButton'
import { Stack, styled, Typography } from '@mui/material'
import Link from '@/components/UI/Link'
import ToggleChip from '@/components/ToggleChip'
import Divider from '@/components/UI/Divider'

const List = styled(Stack)`
  .MuiChip-root {
    margin: 3px;
  }
`

const RegisterPage = () => {
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        Select the Profession(s) that you belong to. You may choose more than one
      </Typography>

      <Typography gutterBottom>
        We'll use this to suggest learning and career development opportunities that are
        relevant to you
      </Typography>

      <List direction="row" flexWrap="wrap" spacing={0} justifyContent="center">
        <ToggleChip label="Corporate Finance Profession" />
        <ToggleChip label="Counter-fraud Standards and Profession" />
        <ToggleChip label="Digital, Data and Technology Professions" />
        <ToggleChip label="Government Communication Service" />
        <ToggleChip label="Government Economic Service" />
        <ToggleChip label="Government Finance Profession" />
        <ToggleChip label="Government IT Profession" />
        <ToggleChip label="Government Knowledge and Information Management Profession" />
        <ToggleChip label="Government Legal Profession" />
        <ToggleChip label="Government Occupational Psychology Profession" />
        <ToggleChip label="Government Operational Research Service" />
        <ToggleChip label="Government Planning Inspectors" />
        <ToggleChip label="Government Planning Profession" />
        <ToggleChip label="Government Property Profession" />
        <ToggleChip label="Government Security Profession" />
        <ToggleChip label="Government Science and Engineering Profession" />
        <ToggleChip label="Government Social Research Profession" />
        <ToggleChip label="Government Tax Profession" />
        <ToggleChip label="Government Veterinary Profession" />
        <ToggleChip label="Human Resources Profession" />
        <ToggleChip label="Intelligence Analysis" />
        <ToggleChip label="Internal Audit Profession" />
        <ToggleChip label="Operational Delivery Profession" />
        <ToggleChip label="Policy Profession" />
        <ToggleChip label="Procurement Profession" />
        <ToggleChip label="Project Delivery Profession" />
      </List>

      <Typography gutterBottom>
        <Link href="/register/page8">Skip this step</Link>
      </Typography>

      <Divider spacing={20} variant="middle" />

      <LinkButton href="/register/page8" fullWidth>
        Continue
      </LinkButton>
    </>
  )
}

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page title="Create an account - Current profession" progress={40}>
    {page}
  </Page>
)
