import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Typography } from '@mui/material'
import Button from '@/components/UI/Button/Button'
import useAuth from '@/hooks/useAuth'
import { useQuery } from 'react-query'
import { Query, RegisterUserResponse } from '@/service/api'
import { fetchMe } from '@/service/me'
import Headline from '@/components/Account/Headline/Headline'
import SkillsList from '@/components/Account/SkillsList/SkillsList'
import LanguageList from '@/components/Account/LanguageList/LanguageList'
import SkillsDevelop from '@/components/Account/SkillsDevelop/SkillsDevelop'
import RoutedTabs, { RoutedTabItem } from '@/components/UI/Tabs/RoutedTabs'

const SkillsPage = () => {
  const { authFetch } = useAuth()
  const { data } = useQuery<RegisterUserResponse>(Query.Me, () => authFetch(fetchMe))

  return (
    <>
      <Headline>
        <Typography variant="h1" gutterBottom>
          Hello {data?.first_name}, welcome to the Skills and Learning Service
        </Typography>
        <Typography>
          You can manage your skills, language skills and skills you would like to develop
        </Typography>
      </Headline>

      <Button variant="contained" sx={{ mb: 4 }} href="/account/skills/add/">
        Add a skill
      </Button>

      <RoutedTabs routedTabItems={tabs} tabsPath="/account/skills" />
    </>
  )
}

export default SkillsPage
SkillsPage.getLayout = (page) => (
  <AccountLayout
    title="Skills"
    titleIcon="skills"
    breadcrumbs={[{ title: 'Skills' }]}
    brandColor="brandSkills"
  >
    {page}
  </AccountLayout>
)

export async function getStaticPaths() {
  return {
    paths: tabs.map((tab) => ({
      params: {
        tab: [tab.id]
      }
    })),
    fallback: false
  }
}

export async function getStaticProps() {
  return { props: { post: {} } }
}

const tabs: RoutedTabItem[] = [
  {
    title: 'Your skills',
    content: <SkillsList />,
    id: ''
  },
  {
    title: 'Skills you would like to develop',
    content: <SkillsDevelop />,
    id: 'skills-develop'
  },
  {
    title: 'Language skills',
    content: <LanguageList />,
    id: 'language-skills'
  }
]
