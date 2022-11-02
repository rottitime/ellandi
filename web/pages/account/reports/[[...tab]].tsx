import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Typography } from '@mui/material'
import Headline from '@/components/Account/Headline/Headline'
import { RoutedTabItem, RoutedTabs } from '@/components/UI/Tabs/Tabs'

const ReportsPage = () => (
  <>
    <Headline>
      <Typography variant="h1" gutterBottom>
        Welcome to the reports section
      </Typography>
      <Typography variant="h2" gutterBottom>
        You can view statistics on skills and learning
      </Typography>
    </Headline>
    <RoutedTabs routedTabItems={tabs} tabsPath="/account/reports" />
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
    content: <>Skills</>,
    id: '',
    brandColor: 'brandSkills'
  },
  {
    title: 'Learning',
    content: <>Learning</>,
    id: 'learning',
    brandColor: 'brandLearning'
  },
  {
    title: 'Staff overview',
    content: <>Staff overview</>,
    id: 'staff-overview'
  }
]