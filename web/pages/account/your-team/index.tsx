import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Typography, Grid } from '@mui/material'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import useAuth from '@/hooks/useAuth'
import { useQuery } from 'react-query'
import { Query, TeamMember } from '@/service/api'
import Skeleton from '@/components/UI/Skeleton/Skeleton'
import { fetchTeam } from '@/service/account'
import Link from '@/components/UI/Link'

const YourTeamPage = () => {
  const { authFetch } = useAuth()

  const { data, isLoading } = useQuery<TeamMember[]>(Query.TeamMembers, () =>
    authFetch(fetchTeam)
  )

  const renderSkeletons = () =>
    [...Array(5).keys()].map((i) => (
      <Grid item xs={6} md={4} key={i}>
        <AccountCard>
          <Skeleton />
        </AccountCard>
      </Grid>
    ))

  const renderList = () =>
    data.map(({ first_name, last_name, id }) => (
      <Grid item xs={6} md={4} key={id}>
        <AccountCard>
          <Typography variant="h1" component="h3">
            <Link href={`/account/your-team/member/?id=${id}`}>
              {first_name} {last_name}
            </Link>
          </Typography>
        </AccountCard>
      </Grid>
    ))

  return (
    <Grid container spacing={2}>
      {isLoading ? renderSkeletons() : renderList()}
    </Grid>
  )
}

export default YourTeamPage

YourTeamPage.getLayout = (page) => (
  <AccountLayout
    brandColor="brandTeams"
    titleIcon="team"
    title="Your team"
    teaserHeadline="View team members skills and profile"
    breadcrumbs={[{ title: 'Your team' }]}
  >
    {page}
  </AccountLayout>
)
