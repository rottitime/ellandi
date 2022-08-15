import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Typography } from '@mui/material'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import { menu, SectionOne } from './index'
import BadgeNumber from '@/components/UI/BadgeNumber/BadgeNumber'
import { dehydrate, QueryClient, useMutation, useQuery } from 'react-query'
import { fetchSkillLevels, fetchSkills, Query, RegisterUserResponse } from '@/service/api'
import SkillsDevelopAddForm from '@/components/Form/Account/SkillsDevelopAddForm/SkillsDevelopAddForm'
import useAuth from '@/hooks/useAuth'
import { fetchMe } from '@/service/me'
import { updateUser } from '@/service/auth'
import Router from 'next/router'

const SkillsAddDevelopPage = () => {
  const { authFetch } = useAuth()
  const {
    data: { id }
  } = useQuery<RegisterUserResponse>(Query.Me, () => authFetch(fetchMe))

  const { isLoading, ...mutate } = useMutation<
    RegisterUserResponse,
    Error,
    Partial<RegisterUserResponse>
  >(async (data) => updateUser(id, data), {
    onSuccess: async () => Router.push('/account/skills/skills-develop')
  })

  return (
    <>
      <SectionOne active={menu[1].title} />

      <AccountCard
        header={
          <Typography variant="subtitle1" component="h2">
            <BadgeNumber label="2" sx={{ mr: 2 }} /> Skill name and levels
          </Typography>
        }
      >
        <SkillsDevelopAddForm
          loading={isLoading}
          onFormSubmit={(data) => mutate.mutate(data)}
        />
      </AccountCard>
    </>
  )
}

export default SkillsAddDevelopPage

SkillsAddDevelopPage.getLayout = (page) => (
  <AccountLayout
    title="Skills"
    titleIcon="skills"
    brandColor="brandSkills"
    breadcrumbs={[
      { title: 'Skills', url: '/account/skills' },
      { title: 'Add a skill or language to your profile' }
    ]}
  >
    {page}
  </AccountLayout>
)
export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(Query.SkillLevels, fetchSkillLevels)
  await queryClient.prefetchQuery(Query.Skills, fetchSkills)
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
