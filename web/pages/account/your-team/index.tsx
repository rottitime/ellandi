import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Typography, Grid, styled, Box } from '@mui/material'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import useAuth from '@/hooks/useAuth'
import { useMutation, useQuery } from 'react-query'
import { Query, TeamMember } from '@/service/api'
import Skeleton from '@/components/UI/Skeleton/Skeleton'
import { fetchTeam, reviewSkill } from '@/service/account'
import Link from '@/components/UI/Link'
import SkillsReview from '@/components/Form/SkillsReview/SkillsReview'
import { ReviewFields } from '@/components/Form/SkillsReview/types'

const Members = styled(Box)`
  display: flex;
  gap: ${(p) => p.theme.spacing(3)};
  flex-wrap: wrap;
  width: 100%;
  .member {
    flex-grow: 1;
    max-width: 380px;
  }
`

const YourTeamPage = () => {
  const { authFetch } = useAuth()

  const { data, isLoading, isSuccess, refetch } = useQuery<TeamMember[]>(
    Query.TeamMembers,
    () => authFetch(fetchTeam)
    // { initialData: mockTeam, staleTime: Infinity }
  )

  console.log({ data })

  const { isLoading: isMutateLoading, mutate } = useMutation<
    boolean,
    Error,
    ReviewFields[]
  >(async (data) => authFetch(reviewSkill, data), {
    onSuccess: async () => refetch()
  })

  const pendingSkills = isSuccess
    ? data.reduce((c, p) => [...c, ...p.skills.filter((skill) => !!skill?.pending)], [])
    : []

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
      <AccountCard key={id} className="member">
        <Typography variant="h1" component="h3">
          <Link href={`/account/your-team/member/?id=${id}`}>
            {first_name} {last_name}
          </Link>
        </Typography>
      </AccountCard>
    ))

  if (isLoading) return <>{renderSkeletons()}</>

  return (
    <Grid container spacing={4}>
      {!!pendingSkills.length && (
        <Grid item xs={12} md={4}>
          <SkillsReview
            data={pendingSkills}
            buttonLoading={isMutateLoading || isLoading}
            onFormSubmit={async (data) => await mutate(data)}
          />
        </Grid>
      )}
      <Grid item xs>
        <Members>{renderList()}</Members>
      </Grid>
    </Grid>
  )
}

export default YourTeamPage

YourTeamPage.getLayout = (page) => (
  <AccountLayout
    titleIcon="team"
    title="Your team"
    teaserHeadline="View team members skills and profile"
    breadcrumbs={[{ title: 'Your team' }]}
  >
    {page}
  </AccountLayout>
)

// const mockTeam: TeamMember[] = [
//   {
//     id: 'teamember-id-1',
//     email: 'team1@test.com',
//     privacy_policy_agreement: true,
//     first_name: 'Albert',
//     last_name: 'Einstein',
//     department: null,
//     organisation: null,
//     job_title: 'Developer',
//     business_unit: 'Coding',
//     location: 'London',
//     line_manager_email: 'manager@test.com',
//     has_direct_reports: false,
//     grade: 'Senior Advisors',
//     grade_other: null,
//     professions: [
//       'Legal',
//       'Medical',
//       'Occupational psychology',
//       'Operational delivery',
//       'Operational research',
//       'Other'
//     ],
//     profession_other: 'Another profession',
//     primary_profession: 'Occupational psychology',
//     function: 'best function',
//     function_other: null,
//     contract_type: 'full time',
//     contract_type_other: null,
//     contact_preference: true,
//     skills: [...Array(5).keys()].map((i) => ({
//       id: `id${i}`,
//       name: `Skill ${i}`,
//       level: 'Ok',
//       pending: true
//     })),
//     languages: [],
//     skills_develop: [],
//     created_at: '2022-08-15T07:32:28.100294Z',
//     modified_at: '2022-08-22T15:56:40.942252Z'
//   },

//   {
//     id: 'teamember-id-2',
//     email: 'team2@test.com',
//     privacy_policy_agreement: true,
//     first_name: 'Sherlock',
//     last_name: 'Holmes ',
//     department: null,
//     organisation: null,
//     job_title: 'Admin',
//     business_unit: 'Security',
//     location: 'London',
//     line_manager_email: 'manager@test.com',
//     has_direct_reports: false,
//     grade: 'Other',
//     grade_other: 'MyOther" Grade',
//     professions: ['Legal', 'Medical', 'Occupational psychology', 'Other'],
//     profession_other: 'MyOther: Profession',
//     primary_profession: 'MyOther: Profession',
//     function: 'Other',
//     function_other: 'myother: function',
//     contract_type: 'Other',
//     contract_type_other: 'myother: contract',
//     contact_preference: null,
//     skills: [],
//     languages: [],
//     skills_develop: [],
//     created_at: '2022-08-25T10:06:53.513495Z',
//     modified_at: '2022-08-25T10:08:32.863561Z'
//   }
// ]
