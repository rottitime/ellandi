import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import SimpleTable from '@/components/UI/SimpleTable/SimpleTable'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import { Typography, TableCellProps, Chip } from '@mui/material'
import useAuth from '@/hooks/useAuth'
import { useQuery } from 'react-query'
import { Query, TeamMember } from '@/service/api'
import { fetchTeam } from '@/service/account'
import { useMemo } from 'react'
import { useRouter } from 'next/router'

const YourTeamPage = () => {
  const { authFetch } = useAuth()
  const router = useRouter()

  const { id } = router.query

  const { data, isLoading, isFetched } = useQuery<TeamMember[]>(Query.TeamMembers, () =>
    authFetch(fetchTeam)
  )

  const member = useMemo(
    () => (isFetched ? data.find((team) => team.id === id) : null),
    [data, isFetched, id]
  )

  if (isLoading)
    return [...Array(2).keys()].map((i) => (
      <AccountCard loading={true} sx={{ mb: 4 }} key={i} />
    ))

  if (member)
    return (
      <>
        {
          <Typography variant="h1" component="h2" gutterBottom>
            {member.first_name} {member.last_name}
          </Typography>
        }

        <AccountCard
          headerLogo="profile"
          header={
            <Typography variant="h1" component="h2">
              Personal Details
            </Typography>
          }
          sx={{ mb: 4 }}
        >
          <SimpleTable
            loading={isLoading}
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
          <SimpleTable
            loading={isLoading}
            headers={[
              { children: 'Language' },
              { children: 'Speaking' },
              { children: 'Writing' }
            ]}
            list={[
              ...member.languages.map<TableCellProps[]>(
                ({ name, writing_level, speaking_level }) => [
                  { children: name },
                  { children: <Chip label={speaking_level} /> },
                  { children: <Chip label={writing_level} /> }
                ]
              )
            ]}
          />
        </AccountCard>

        <AccountCard
          headerLogo="skills"
          header={
            <Typography variant="h1" component="h2">
              Skills
            </Typography>
          }
          sx={{ mb: 4 }}
        >
          <SimpleTable
            loading={isLoading}
            headers={[{ children: 'Skill' }, { children: 'Skill level' }]}
            list={[
              ...member.skills.map<TableCellProps[]>(({ name, level }) => [
                { children: name },
                { children: level && <Chip label={level} /> }
              ])
            ]}
          />
        </AccountCard>

        <AccountCard
          headerLogo="skills"
          header={
            <Typography variant="h1" component="h2">
              Skills you'd like to develop
            </Typography>
          }
          sx={{ mb: 4 }}
        >
          <SimpleTable
            loading={isLoading}
            headers={[{ children: 'Skill' }]}
            list={[
              ...member.skills_develop.map<TableCellProps[]>(({ name }) => [
                { children: name }
              ])
            ]}
          />
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