import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import SimpleTable from '@/components/UI/SimpleTable/SimpleTable'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import { TableCellProps, Chip, styled } from '@mui/material'
import useAuth from '@/hooks/useAuth'
import { useQuery } from 'react-query'
import { Query, TeamMember } from '@/service/api'
import { fetchTeam } from '@/service/account'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import Typography from '@/components/UI/Typography/Typography'
import Tooltip from '@/components/UI/Tooltip/Tooltip'
import Tabs from '@/components/UI/Tabs/Tabs'
import Icon from '@/components/Icon/Icon'
import MembersLearningRecord from '@/components/Account/MembersLearningRecord/MembersLearningRecord'
import { professionsDisplayText } from '@/lib/data-utils'

const IconTitle = styled(Typography)`
  display: flex;
  align-items: center;
  svg {
    margin-right: ${(p) => p.theme.spacing(2)};
  }
`

const Table = styled(SimpleTable)`
  th {
    width: 29%;
  }
`

const YourTeamPage = () => {
  const { authFetch } = useAuth()
  const router = useRouter()
  const { id } = router.query

  const { data, isLoading, isFetched, isSuccess } = useQuery<TeamMember[]>(
    Query.TeamMembers,
    () => authFetch(fetchTeam),
    { keepPreviousData: true, staleTime: Infinity }
  )

  const member = useMemo(
    () => (isFetched ? data.find((team) => team.id === id) : null),
    [data, isFetched, id]
  )

  const fullname = `${member?.first_name} ${member?.last_name}`

  const professions = professionsDisplayText(
    member?.primary_profession,
    member?.professions,
    member?.profession_other
  )

  return (
    <AccountLayout titleIcon="team" title="Your team">
      {isLoading &&
        [...Array(2).keys()].map((i) => <AccountCard loading sx={{ mb: 4 }} key={i} />)}

      {isSuccess && (
        <>
          {
            <Typography variant="h1" component="h2" gutterBottom>
              {fullname}
            </Typography>
          }

          <Tabs
            tabItems={[
              {
                title: 'Skills',
                content: (
                  <Table
                    noRowContent="No skills have been added"
                    headers={[{ children: 'Skill' }, { children: 'Skill level' }]}
                    list={[
                      ...member.skills.map<TableCellProps[]>(
                        ({ name, level, pending }) => [
                          {
                            children: (
                              <Typography
                                variant="body2"
                                component="span"
                                pending={pending}
                                data-testid={pending && 'status-pending'}
                              >
                                {name}
                                {pending && (
                                  <Tooltip
                                    brandColor="brandSkills"
                                    icon="circle-info-filled"
                                    sx={{ svg: { color: 'inherit' } }}
                                    title="Pending approval"
                                  />
                                )}
                              </Typography>
                            )
                          },
                          { children: level && <Chip label={level} /> }
                        ]
                      )
                    ]}
                  />
                ),
                brandColor: 'brandSkills'
              },
              {
                title: 'Learning',
                content: <MembersLearningRecord id={member.id} />,
                brandColor: 'brandLearning'
              },
              {
                title: 'Profile',
                content: (
                  <>
                    <IconTitle variant="h2" gutterBottom>
                      <Icon icon="profile" /> Personal details
                    </IconTitle>
                    <Table
                      sx={{ mb: 4 }}
                      list={[
                        ...[
                          { name: 'Name', value: fullname },
                          { name: 'Job title', value: member.job_title },
                          { name: 'Business unit', value: member.business_unit },
                          { name: 'Work location', value: member.location },
                          {
                            name: 'Line manager email address',
                            value: member.line_manager_email
                          }
                        ]
                          .filter(
                            ({ name, value }) => !(name == 'Primary profession' && !value)
                          )
                          .map<TableCellProps[]>(({ name, value }) => [
                            { children: name, component: 'th' },
                            { children: <Typography>{value}</Typography> }
                          ])
                      ]}
                    />
                    <IconTitle variant="h2" gutterBottom>
                      <Icon icon="case" /> Job details
                    </IconTitle>
                    <Table
                      list={[
                        ...[
                          { name: 'Grade', value: member.grade_other || member.grade },
                          {
                            name: 'Primary profession',
                            value: professions.primary_profession
                          },
                          {
                            name: 'Profession(s)',
                            value: professions.professions
                          },
                          {
                            name: 'Function',
                            value: member.function_other || member.function
                          },
                          {
                            name: 'Contract type',
                            value: member.contract_type_other || member.contract_type
                          },
                          {
                            name: 'Line manager',
                            value: member.is_line_manager
                          },
                          {
                            name: 'Mentor',
                            value: member.is_mentor
                          }
                        ]
                          .filter(
                            ({ name, value }) => !(name == 'Primary profession' && !value)
                          )
                          .map<TableCellProps[]>(({ name, value }) => [
                            { children: name, component: 'th' },
                            { children: <Typography>{value}</Typography> }
                          ])
                      ]}
                    />
                  </>
                )
              }
            ]}
          />
        </>
      )}
    </AccountLayout>
  )
}

export default YourTeamPage
