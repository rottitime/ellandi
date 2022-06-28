import Page from '@/components/GenericPage2'
import { styled } from '@mui/material/styles'
import { Box, Button, Chip, Typography } from '@mui/material'
import LinkButton from '@/components/LinkButton'
import Link from '@/components/Link'

const Stack = styled(Box)`
  .MuiChip-root {
    margin: 10px;
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
    <Stack>
      <Chip label="Auditing" variant="outlined" />
      <Chip label="Bookkeeping" variant="outlined" />
      <Chip label="Communication" />
      <Chip label="Coding" variant="outlined" />
      <Chip label="Creative thinking" variant="outlined" />
      <Chip label="Customer service" variant="outlined" />
      <Chip label="Data entry" />
      <Chip label="Diary management" />
      <Chip label="Flexibility" />
      <Chip label="Microsoft Office" variant="outlined" />
      <Chip label="Motivation" variant="outlined" />
      <Chip label="Negotiation" />
      <Chip label="Planning" variant="outlined" />
      <Chip label="Problem solving" />
      <Chip label="Project management" variant="outlined" />
      <Chip label="Sales" variant="outlined" />
      <Chip label="Social media" variant="outlined" />
      <Chip label="Teamwork" variant="outlined" />
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
