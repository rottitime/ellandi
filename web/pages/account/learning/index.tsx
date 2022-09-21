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
import Tabs from '@/components/UI/Tabs/Tabs'
import LearningRecordList from '@/components/Account/LearningRecordList/LearningRecordList'

const LearningPage = () => {
  const { authFetch } = useAuth()
  const { data } = useQuery<RegisterUserResponse>(Query.Me, () => authFetch(fetchMe))

  return (
    <>
      <Headline>
        <Typography variant="h1" gutterBottom>
          Welcome to the learning section
        </Typography>
        <Typography>
          You can manage your learning and find new development opportunities
        </Typography>
      </Headline>

      <Button variant="contained" sx={{ mb: 4 }} href="/account/learning/add/">
        Add learning
      </Button>

      <Tabs
        tabItems={[
          {
            title: 'Learning record',
            content: <LearningRecordList />
          }
        ]}
      />

      {/* <RoutedTabs routedTabItems={tabs} tabsPath="/account/skills" /> */}
    </>
  )
}

export default LearningPage
LearningPage.getLayout = (page) => (
  <AccountLayout
    title="Learning"
    titleIcon="learning"
    breadcrumbs={[{ title: 'Learning' }]}
    brandColor="brandSkills"
  >
    {page}
  </AccountLayout>
)
