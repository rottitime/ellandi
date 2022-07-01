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

const options = [
  'Auditing',
  'Bookkeeping',
  'Communication',
  'Coding',
  'Creative thinking',
  'Customer service',
  'Data entry',
  'Diary management',
  'Flexibility',
  'Microsoft Office',
  'Motivation',
  'Negotiation',
  'Planning',
  'Problem solving',
  'Project management',
  'Sales',
  'Social media',
  'Teamwork'
]

const Stack = styled(Box)`
  .MuiChip-root {
    margin: 10px;
  }
`

const RegisterPage = () => {
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        Select any skills that you'd like to develop. You can change or add to these later
      </Typography>
      <Typography gutterBottom>
        We'll use this to suggest learning and career development opportunities that are
        relevant to you
      </Typography>
      <Stack>
        {options.map((option) => (
          <ToggleChip label={option} variant="outlined" key={option} />
        ))}
      </Stack>
      <Button>Load more skills</Button>

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
        <Link href="/account">Skip this page</Link>
      </Typography>

      <Divider spacing={20} variant="middle" />

      <LinkButton href="/skills" fullWidth>
        Continue
      </LinkButton>
    </>
  )
}

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page title="Create a profile - Skills you'd like to develop" progress={100}>
    {page}
  </Page>
)
