import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  styled
} from '@mui/material'
import AccountLayout from '@/components/Layout/AccountLayout'
import Link from '@/components/UI/Link'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'

const Table = styled(MuiTable)`
  th {
    font-weight: 700;
    font-size: 16px;
    width: 29%;
  }
  th,
  td {
    padding: ${(p) => p.theme.spacing(3, 0)};
  }
`

const listProfile = [
  { name: 'Full name', value: 'John Smith' },
  { name: 'Primary email address', value: 'john.smith@cabinetoffice.gov.uk' },
  { name: 'Secondary email' },
  { name: 'Password', value: '********' },
  { name: 'CV' }
]

const listJob = [
  { name: 'Contract type', value: 'Permanent' },
  { name: 'Job title', value: 'Service Designer' },
  { name: 'Business unit', value: 'XXXXXX' },
  { name: 'Line manager email', value: 'alan@gov.uk' },
  { name: 'Grade', value: 'Senior Executive Officer (SEO)' },
  { name: 'Profession', value: 'Digital, Data and Technology' },
  { name: 'Primary profession', value: 'Human Resources' },
  { name: 'Function', value: 'Digital' }
]

const listContact = [{ name: 'Contact preference', value: 'Yes' }]

const Page = () => {
  const renderTable = (list = []) => (
    <Table size="small">
      <TableBody>
        {list.map((item) => (
          <TableRow key={item.name}>
            <TableCell component="th">{item.name}</TableCell>
            <TableCell>
              <Typography variant="subtitle1">{item.value || ' '}</Typography>
            </TableCell>
            <TableCell className="cta" align="right">
              <Link href="#">Change</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <>
      <AccountCard
        headerLogo="profile"
        header={<Typography variant="h2">Personal Details</Typography>}
        sx={{ mb: 4 }}
      >
        {renderTable(listProfile)}
      </AccountCard>

      <AccountCard
        headerLogo="case"
        header={<Typography variant="h2">Job Details</Typography>}
        sx={{ mb: 4 }}
      >
        {renderTable(listJob)}
      </AccountCard>

      <AccountCard
        headerLogo="mail"
        header={<Typography variant="h2">Contact preferences</Typography>}
      >
        {renderTable(listContact)}
      </AccountCard>
    </>
  )
}

export default Page
Page.getLayout = (page) => (
  <AccountLayout
    breadcrumbs={[{ title: 'Profile' }]}
    title="Profile"
    titleIcon="profile"
    teaserHeadline="Welcome to your profile"
    teaserContent="Here you can manage profile details including email, password, contact preferences and profession."
  >
    {page}
  </AccountLayout>
)
