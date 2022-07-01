import Page from '@/components/GenericPage'
import { styled } from '@mui/material/styles'
import {
  Box,
  Button,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material'
import LinkButton from '@/components/LinkButton'
import Link from '@/components/UI/Link'
import ToggleChip from '@/components/ToggleChip'
import { Delete } from '@mui/icons-material'
import Divider from '@/components/UI/Divider'

const Stack = styled(Box)`
  .MuiChip-root {
    margin: 5px;
  }
`

const RegisterPage = () => (
  <>
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

    <TableContainer>
      <Table size="small">
        <TableRow>
          <TableCell>Selected skill</TableCell>
          <TableCell>&nbsp;</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Skill 1</TableCell>
          <TableCell>
            <Button>
              <Delete />
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Skill 2</TableCell>
          <TableCell>
            <Button>
              <Delete />
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Skill 3</TableCell>
          <TableCell>
            <Button>
              <Delete />
            </Button>
          </TableCell>
        </TableRow>
      </Table>
    </TableContainer>

    <Typography gutterBottom>
      <Link href="/register/page14">Skip this step</Link>
    </Typography>

    <Divider spacing={20} variant="middle" />

    <LinkButton href="/register/page14" fullWidth>
      Continue
    </LinkButton>
  </>
)

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page title="Create a profile - Your current skills" progress={90}>
    {page}
  </Page>
)
