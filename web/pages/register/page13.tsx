import Page from '@/components/GenericPage2'
import { styled } from '@mui/material/styles'
import {
  Box,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material'
import LinkButton from '@/components/LinkButton'
import Link from '@/components/Link'

const Stack = styled(Box)`
  .MuiChip-root {
    margin: 10px;
  }
`

const RegisterPage = () => {
  return (
    <Page title="Create a profile - Skills you'd like to develop" progress={100}>
      <Typography variant="subtitle1" gutterBottom>
        Select any skills that you'd like to develop. You can change or add to these later
      </Typography>
      <Typography gutterBottom>
        We'll use this to suggest learning and career development opportunities that are
        relevant to you
      </Typography>
      <Stack>
        <Chip label="Auditing" variant="outlined" />
        <Chip label="Bookkeeping" variant="outlined" />
        <Chip label="Communication" variant="outlined" />
        <Chip label="Coding" variant="outlined" />
        <Chip label="Creative thinking" variant="outlined" />
        <Chip label="Customer service" variant="outlined" />
        <Chip label="Data entry" variant="outlined" />
        <Chip label="Diary management" variant="outlined" />
        <Chip label="Flexibility" variant="outlined" />
        <Chip label="Microsoft Office" variant="outlined" />
        <Chip label="Motivation" variant="outlined" />
        <Chip label="Negotiation" variant="outlined" />
        <Chip label="Planning" variant="outlined" />
        <Chip label="Problem solving" variant="outlined" />
        <Chip label="Project management" variant="outlined" />
        <Chip label="Sales" variant="outlined" />
        <Chip label="Social media" variant="outlined" />
        <Chip label="Teamwork" variant="outlined" />
      </Stack>
      <Button>Load more skills</Button>

      <TableContainer component={Paper}>
        <Table>
          <TableRow>
            <TableCell>Selected skill</TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Skill 1</TableCell>
            <TableCell>
              <Link href="#">Remove</Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Skill 2</TableCell>
            <TableCell>
              <Link href="#">Remove</Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Skill 3</TableCell>
            <TableCell>
              <Link href="#">Remove</Link>
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>

      <Typography gutterBottom>
        <Link href="/skills">Skip this page</Link>
      </Typography>

      <LinkButton href="/skills" fullWidth>
        Continue
      </LinkButton>
    </Page>
  )
}

export default RegisterPage
