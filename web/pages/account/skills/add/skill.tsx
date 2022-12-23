import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Typography } from '@mui/material'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import { menu, SectionOne } from './index'
import BadgeNumber from '@/components/UI/BadgeNumber/BadgeNumber'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Query, RegisterUserResponse, SkillType } from '@/service/api'
import SkillsAddForm from '@/components/Form/Account/SkillsAddForm/SkillsAddForm'
import useAuth from '@/hooks/useAuth'
import Router from 'next/router'
import { addSkills } from '@/service/account'
import {
  fetchRecommendedSkillBundle,
  RecommendedSkillBundleResponse,
  SkillGroup
} from '@/service/me'

const skillGroupDescription = (group: SkillGroup) => {
  switch (group) {
    case 'job_title_skills':
      return 'Skills you might have, based on your current job title:'
    case 'profession_skills':
      return 'Skills you might have, based on your current job:'
    case 'popular_skills':
      return 'Skills you might have, based on popular skills:'
    case 'skill_skills':
      return 'More skills selected by others with similar skills to you:'
    default:
      return 'All skills:'
  }
}

const SkillsAddSkillsPage = () => {
  const { authFetch } = useAuth()

  const { data, isLoading: isLoadingSuggested } =
    useQuery<RecommendedSkillBundleResponse>(Query.SuggestedSkillsbyRole, () =>
      authFetch(fetchRecommendedSkillBundle)
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
        {data && (
          <SkillsAddForm
            loading={isLoading}
            onFormSubmit={({ skills }) => mutate.mutate(skills)}
            suggestionProps={Object.keys(data)
              .filter((group) => ['profession_skills', 'skill_skills'].includes(group))
              .map((item: SkillGroup) => {
                return {
                  groupId: item,
                  max: 10,
                  data: data[item],
                  hideOptions: [],
                  loading: isLoadingSuggested,
                  description: skillGroupDescription(item)
                }
              })}
            showAll
          />
        )}
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
