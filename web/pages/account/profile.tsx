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
import { useQuery } from 'react-query'
import { fetchMe } from '@/service/me'
import { Query, RegisterUserResponse } from '@/service/api'
import useAuth from '@/hooks/useAuth'
import TableSkeleton from '@/components/UI/Skeleton/TableSkeleton'
import Skeleton from '@/components/UI/Skeleton/Skeleton'

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

const Page = () => {
  const { authFetch } = useAuth()
  const { isLoading, data } = useQuery<RegisterUserResponse>(Query.Me, () =>
    authFetch(fetchMe)
  )

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

  if (isLoading)
    return [...Array(2).keys()].map((i) => (
      <AccountCard header={<Skeleton width={200} />} sx={{ mb: 4 }} key={i}>
        <TableSkeleton />
      </AccountCard>
    ))

  return (
    <>
      <AccountCard
        headerLogo="profile"
        header={
          <Typography variant="h1" component="h2">
            Personal Details
          </Typography>
        }
        sx={{ mb: 4 }}
      >
        {renderTable([
          { name: 'Full name', value: `${data.first_name} ${data.last_name}` },
          { name: 'Primary email address', value: data.email },
          { name: 'Password', value: '********' }
        ])}
      </AccountCard>

      <AccountCard
        headerLogo="case"
        header={
          <Typography variant="h1" component="h2">
            Job Details
          </Typography>
        }
        sx={{ mb: 4 }}
      >
        {renderTable([
          {
            name: 'Contract type',
            value: data.contract_type_other || data.contract_type
          },
          { name: 'Job title', value: data.job_title },
          { name: 'Business unit', value: data.business_unit },
          { name: 'Line manager email', value: data.line_manager_email },
          { name: 'Grade', value: data.grade_other || data.grade },
          { name: 'Profession', value: data.professions.join(', ') },
          { name: 'Primary profession', value: data.primary_profession },
          { name: 'Function', value: data.function_other || data.function }
        ])}
      </AccountCard>

      <AccountCard
        headerLogo="mail"
        header={
          <Typography variant="h1" component="h2">
            Contact preferences
          </Typography>
        }
      >
        {renderTable([
          { name: 'Contact preference', value: !!data.contact_preference ? 'Yes' : 'No' }
        ])}
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
