import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Typography } from '@mui/material'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import { menu, SectionOne } from './index'
import BadgeNumber from '@/components/UI/BadgeNumber/BadgeNumber'
import { dehydrate, QueryClient } from 'react-query'
import { fetchSkillLevels, fetchSkills, Query } from '@/service/api'
import SkillsAddForm from '@/components/Form/Account/SkillsAddForm/SkillsAddForm'

const IndexPage = () => {
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
          onFormSubmit={(data) => {
            console.log({ data })
          }}
        />
      </AccountCard>
    </>
  )
}

export default IndexPage

IndexPage.getLayout = (page) => (
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
