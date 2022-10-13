import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Typography } from '@mui/material'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import { menu, SectionOne } from './index'
import BadgeNumber from '@/components/UI/BadgeNumber/BadgeNumber'
import { dehydrate, QueryClient, useMutation, useQuery } from 'react-query'
import {
  // fetchSkillLevels,
  fetchSkills,
  MeSuggestedSkillsResponse,
  Query,
  RegisterUserResponse,
  SkillType
} from '@/service/api'
import SkillsAddForm from '@/components/Form/Account/SkillsAddForm/SkillsAddForm'
import useAuth from '@/hooks/useAuth'
import Router from 'next/router'
import { addSkills } from '@/service/account'
import { fetchMeSuggestedSkills } from '@/service/me'

const SkillsAddSkillsPage = () => {
  const { authFetch } = useAuth()

  const { data, isLoading: isLoadingSuggested } = useQuery<MeSuggestedSkillsResponse>(
    Query.SuggestedSkillsbyRole,
    () => authFetch(fetchMeSuggestedSkills)
  )

  const { isLoading, ...mutate } = useMutation<RegisterUserResponse, Error, SkillType[]>(
    async (data) => authFetch(addSkills, data),
    {
      onSuccess: async () => await Router.push('/account/skills')
    }
  )

  return (
    <>
      <SectionOne active={menu[0].title} />

      <AccountCard
        header={
          <Typography component="h2">
            <BadgeNumber label="2" sx={{ mr: 2 }} /> Skill name and levels
          </Typography>
        }
      >
        <SkillsAddForm
          loading={isLoading}
          onFormSubmit={({ skills }) => mutate.mutate(skills)}
          suggestionProps={{
            max: 10,
            data,
            hideOptions: [],
            loading: isLoadingSuggested,
            description: 'Skills you might have, based on your profile:'
          }}
          showAll
        />
      </AccountCard>
    </>
  )
}

export default SkillsAddSkillsPage

SkillsAddSkillsPage.getLayout = (page) => (
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
  // await queryClient.prefetchQuery(Query.SkillLevels, fetchSkillLevels) TODO: to enable on Fix: #559
  await queryClient.prefetchQuery(Query.Skills, fetchSkills)
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
