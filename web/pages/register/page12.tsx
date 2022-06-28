import Page from '@/components/GenericPage2'
import { styled } from '@mui/material/styles'
import { Box, Button, Chip, Typography } from '@mui/material'
import LinkButton from '@/components/LinkButton'
import Link from '@/components/Link'
import ToggleChip from '@/components/ToggleChip'

const Stack = styled(Box)`
  .MuiChip-root {
    margin: 5px;
  }
`

const RegisterPage = () => (
  <Page title="Create a profile - Your current skills" progress={90}>
    <Typography variant="subtitle1" gutterBottom>
      Select any skills that you already have. You can change or add to these later
    </Typography>
    <Typography gutterBottom>
      We'll use this to suggest learning and career development opportunities that are
      relevant to you
    </Typography>
    <Stack sx={{ mb: 3 }}>
      <ToggleChip label="Auditing" variant="outlined" />
      <ToggleChip label="Bookkeeping" variant="outlined" />
      <ToggleChip label="Communication" variant="outlined" />
      <ToggleChip label="Coding" variant="outlined" />
      <ToggleChip label="Creative thinking" variant="outlined" />
      <ToggleChip label="Customer service" variant="outlined" />
      <ToggleChip label="Data entry" variant="outlined" />
      <ToggleChip label="Diary management" variant="outlined" />
      <ToggleChip label="Flexibility" variant="outlined" />
      <ToggleChip label="Microsoft Office" variant="outlined" />
      <ToggleChip label="Motivation" variant="outlined" />
      <ToggleChip label="Negotiation" />
      <ToggleChip label="Planning" variant="outlined" />
      <ToggleChip label="Problem solving" />
      <ToggleChip label="Project management" variant="outlined" />
      <ToggleChip label="Sales" variant="outlined" />
      <ToggleChip label="Social media" variant="outlined" />
      <ToggleChip label="Teamwork" variant="outlined" />
    </Stack>

    <Button variant="contained" color="secondary" sx={{ mb: 3 }}>
      Load more skills
    </Button>

    <Typography gutterBottom>
      <Link href="/mock/page13">Skip this step</Link>
    </Typography>

    <LinkButton href="/register/page13" fullWidth>
      Continue
    </LinkButton>
  </Page>
)

export default RegisterPage
