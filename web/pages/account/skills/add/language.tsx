import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Grid, Typography } from '@mui/material'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import { menu, SectionOne } from './index'
import BadgeNumber from '@/components/UI/BadgeNumber/BadgeNumber'
import { dehydrate, QueryClient, useMutation, useQuery } from 'react-query'
import {
  fetchLanguages,
  fetchLanguageSkillLevels,
  Query,
  RegisterUserResponse
} from '@/service/api'
import useAuth from '@/hooks/useAuth'
import { fetchMe } from '@/service/me'
import { updateUser } from '@/service/auth'
import Router from 'next/router'
import LanguageAddForm from '@/components/Form/Account/LanguageAddForm/LanguageAddForm'

const SkillsAddSkillsPage = () => {
  const { authFetch } = useAuth()
  const {
    data: { id }
  } = useQuery<RegisterUserResponse>(Query.Me, () => authFetch(fetchMe))

  const { isLoading, ...mutate } = useMutation<
    RegisterUserResponse,
    Error,
    Partial<RegisterUserResponse>
  >(async (data) => updateUser(id, data), {
    onSuccess: async () => Router.push('/account/skills/language-skills')
  })

  return (
    <>
      <SectionOne active={menu[2].title} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <AccountCard
            header={
              <Typography variant="subtitle1" component="h2">
                <BadgeNumber label="2" sx={{ mr: 2 }} /> Language and levels
              </Typography>
            }
          >
            <LanguageAddForm
              loading={isLoading}
              onFormSubmit={(data) => mutate.mutate(data)}
            />
          </AccountCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <AccountCard
            header={
              <Typography variant="h1" component="h3">
                Skills added
              </Typography>
            }
          >
            Speaking Basic You can understand and use basic phrases, introduce yourself
            and describe in simple terms aspects of your background and environment
            Independent You can produce clear, detailed text on a wide range of subjects
            and explain the advantages and disadvantages of a topical issue Proficient You
            can produce clear, well-structured, detailed text on complex subjects and can
            express yourself fluently and precisely Writing Basic You can understand and
            use basic phrases, introduce yourself and describe in simple terms aspects of
            your background and environment Independent You can deal with most situations
            likely to arise while travelling in an area where the language is spoken and
            interact with a degree of fluency Proficient You can express ideas fluently
            and spontaneously and can use the language flexibly for social, academic and
            professional purposes
          </AccountCard>
        </Grid>
      </Grid>
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
  await queryClient.prefetchQuery(Query.Languages, fetchLanguages)
  await queryClient.prefetchQuery(Query.LanguageSkillLevels, fetchLanguageSkillLevels)
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
