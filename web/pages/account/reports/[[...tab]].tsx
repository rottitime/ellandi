import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Typography } from '@mui/material'
import Headline from '@/components/Account/Headline/Headline'
import { RoutedTabItem, RoutedTabs } from '@/components/UI/Tabs/Tabs'
import SkillsReport from '@/components/Account/SkillsReport/SkillsReport'
import LanguagesReport from '@/components/Account/LanguagesReport/LanguagesReport'
import StaffReport from '@/components/Account/StaffReport/StaffReport'
import LearningReport from '@/components/Account/LearningReport/LearningReport'

const ReportsPage = () => (
  <>
    <Headline>
      <Typography variant="h1" gutterBottom>
        Welcome to the reports section
      </Typography>
      <Typography gutterBottom>You can view statistics on skills and learning</Typography>
    </Headline>
    <RoutedTabs routedTabItems={tabs} tabsPath="/account/reports" disableCard />
  </>
)

export default ReportsPage

ReportsPage.getLayout = (page) => (
  <AccountLayout title="Reports" titleIcon="report">
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
    title: 'Skills',
    content: (
      <>
        <SkillsReport sx={{ mb: 4 }} />
        <LanguagesReport />
      </>
    ),
    id: '',
    brandColor: 'brandSkills'
  },
  {
    title: 'Learning',
    content: <LearningReport />,
    id: 'learning',
    brandColor: 'brandLearning'
  },
  {
    title: 'Staff overview',
    content: <StaffReport />,
    id: 'staff-overview'
  }
]
