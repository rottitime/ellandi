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
import { useRouter } from 'next/router'

const SkillsPage = () => {
  const { authFetch } = useAuth()
  const { data } = useQuery<RegisterUserResponse>(Query.Me, () => authFetch(fetchMe))
  const router = useRouter()

  return (
    <AccountLayout
      title="Skills"
      titleIcon="skills"
      breadcrumbs={breadcrumbs[router?.query?.tab?.[0] || '']}
      brandColor="brandSkills"
    >
      <Headline>
        <Typography variant="h1" gutterBottom>
          Welcome to the skills section
        </Typography>
        <Typography>
          You can manage your skills, language skills and skills you would like to develop
        </Typography>
      </Headline>

      <Button variant="contained" sx={{ mb: 4 }} href="/account/skills/add/">
        Add a skill
      </Button>

      <RoutedTabs routedTabItems={tabs} tabsPath="/account/skills" />
    </AccountLayout>
  )
}

export default SkillsPage

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

const breadcrumbs = {
  '': [{ title: 'Skills' }],
  'skills-develop': [
    { title: 'Skills', url: '/account/skills/' },
    { title: 'Skills you would like to develop' }
  ],
  'language-skills': [
    { title: 'Skills', url: '/account/skills/' },
    { title: 'Language skills' }
  ]
}
