import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import SimpleTable from '@/components/UI/SimpleTable/SimpleTable'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableCellProps
} from '@mui/material'
import useAuth from '@/hooks/useAuth'
import { useQuery } from 'react-query'
import { Query, TeamMember } from '@/service/api'
import Skeleton from '@/components/UI/Skeleton/Skeleton'
import { fetchTeam } from '@/service/account'
import Link from '@/components/UI/Link'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import TableSkeleton from '@/components/UI/Skeleton/TableSkeleton'

const YourTeamPage = () => {
  const { authFetch } = useAuth()
  const router = useRouter()

  const { id } = router.query

  const { data, isLoading, isFetched } = useQuery<TeamMember[]>(Query.TeamMembers, () =>
    authFetch(fetchTeam)
  )

  const member = useMemo(
    () => isFetched && data.find((team) => team.id === id),
    [data, isFetched, id]
  )

  if (isLoading)
    return [...Array(2).keys()].map((i) => (
      <AccountCard header={<Skeleton width={200} />} sx={{ mb: 4 }} key={i}>
        <TableSkeleton />
      </AccountCard>
    ))

  return (
    <>
      <Typography variant="h1" component="h2" gutterBottom>
        {member.first_name} {member.last_name}
      </Typography>

      <AccountCard
        headerLogo="profile"
        header={
          <Typography variant="h1" component="h2">
            Personal Details
          </Typography>
        }
        sx={{ mb: 4 }}
      >
        <>
          <SimpleTable
            list={[
              ...[
                { name: 'Job title', value: member.job_title },
                { name: 'Work location', value: member.location },
                { name: 'Grade', value: member.grade },
                { name: 'Professions', value: member.professions.join(', ') },
                { name: 'Primary Profession', value: member.primary_profession },
                { name: 'Function', value: member.function },
                { name: 'Contract type', value: member.contract_type }
              ].map<TableCellProps[]>(({ name, value }) => [
                { children: name, component: 'th' },
                { children: <Typography variant="subtitle1">{value}</Typography> }
              ])
            ]}
          />
        </>
      </AccountCard>

      <AccountCard
        headerLogo="world"
        header={
          <Typography variant="h1" component="h2">
            Languages
          </Typography>
        }
        sx={{ mb: 4 }}
      >
        <></>
      </AccountCard>
    </>
  )
}

export default YourTeamPage

YourTeamPage.getLayout = (page) => (
  <AccountLayout
    title="Your team"
    titleIcon="skills"
    teaserHeadline="View team members skills and profile"
    breadcrumbs={[{ title: 'Your team' }]}
  >
    {page}
  </AccountLayout>
)
