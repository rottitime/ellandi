import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Typography } from '@mui/material'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import { menu, SectionOne } from './index'
import BadgeNumber from '@/components/UI/BadgeNumber/BadgeNumber'
import { dehydrate, QueryClient, useMutation } from 'react-query'
import {
  fetchSkillLevels,
  fetchSkills,
  Query,
  RegisterUserResponse,
  SkillType
} from '@/service/api'
import SkillsAddForm from '@/components/Form/Account/SkillsAddForm/SkillsAddForm'
import useAuth from '@/hooks/useAuth'
import Router from 'next/router'
import { addSkills } from '@/service/account'

const SkillsAddSkillsPage = () => {
  const { authFetch } = useAuth()

  const { isLoading, ...mutate } = useMutation<RegisterUserResponse, Error, SkillType[]>(
    async (data) => authFetch(addSkills, data),
    {
      onSuccess: async () => Router.push('/account/skills')
    }
  )

  return (
    <>
      <SectionOne active={menu[0].title} />

      <AccountCard
        header={
          <Typography variant="subtitle1" component="h2">
            <BadgeNumber label="2" sx={{ mr: 2 }} /> Skill name and levels
          </Typography>
        }
      >
        <SkillsAddForm
          loading={isLoading}
          onFormSubmit={({ skills }) => mutate.mutate(skills)}
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
  await queryClient.prefetchQuery(Query.SkillLevels, fetchSkillLevels)
  await queryClient.prefetchQuery(Query.Skills, fetchSkills)
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
