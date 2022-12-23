import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Typography } from '@mui/material'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import { menu, SectionOne } from './index'
import BadgeNumber from '@/components/UI/BadgeNumber/BadgeNumber'
import { dehydrate, QueryClient, useMutation } from '@tanstack/react-query'
import { fetchSkills, Query, RegisterUserResponse, SkillDevelopType } from '@/service/api'
import SkillsDevelopAddForm from '@/components/Form/Account/SkillsDevelopAddForm/SkillsDevelopAddForm'
import useAuth from '@/hooks/useAuth'
import Router from 'next/router'
import { addSkillsToDevelop } from '@/service/account'

const SkillsAddDevelopPage = () => {
  const { authFetch } = useAuth()

  const { isLoading, ...mutate } = useMutation<
    RegisterUserResponse,
    Error,
    SkillDevelopType[]
  >(async (data) => authFetch(addSkillsToDevelop, data), {
    onSuccess: async () => Router.push('/account/skills/skills-develop')
  })

  return (
    <>
      <SectionOne active={menu[1].title} />

      <AccountCard
        header={
          <Typography component="h2">
            <BadgeNumber label="2" sx={{ mr: 2 }} /> Skill you would like to develop
          </Typography>
        }
        sx={{ width: 450 }}
      >
        <SkillsDevelopAddForm
          loading={isLoading}
          onFormSubmit={({ skills_develop }) => mutate.mutate(skills_develop)}
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
  await queryClient.prefetchQuery([Query.Skills], fetchSkills)
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
