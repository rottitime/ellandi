import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Typography } from '@mui/material'
import Tabs, { TabItem } from '@/components/UI/Tabs/Tabs'
import Button from '@/components/UI/Button/Button'
import useAuth from '@/hooks/useAuth'
import { useQuery } from 'react-query'
import { Query, RegisterUserResponse } from '@/service/api'
import { fetchMe } from '@/service/me'
import Headline from '@/components/Accounts/Headline/Headline'
import { createIdFromHref } from '@/lib/url-utils'
import SkillsList from '@/components/Accounts/SkillsList/SkillsList'
import LanguageList from '@/components/Accounts/LanguageList/LanguageList'
import SkillsDevelop from '@/components/Accounts/SkillsDevelop/SkillsDevelop'

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

      <Button variant="contained" sx={{ mb: 4 }}>
        Add a skill
      </Button>

      <Tabs tabItems={tabs} activeOnUrl />
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
    paths: tabs.map(({ href }) => ({
      params: { tab: [createIdFromHref(href, '', '/account/skills')] }
    })),
    fallback: false
  }
}

export async function getStaticProps() {
  return { props: { post: {} } }
}

const tabs: TabItem[] = [
  {
    title: 'Your skills',
    content: <SkillsList />,
    href: '/account/skills'
  },
  {
    title: 'Language skills',
    content: <LanguageList />,
    href: '/account/skills/language-skills'
  },
  {
    title: "Skills you'd like to develop",
    content: <SkillsDevelop />,
    href: '/account/skills/skills-develop'
  }
]
