import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import Headline from '@/components/Account/Headline/Headline'
import BadgeNumber from '@/components/UI/BadgeNumber/BadgeNumber'
import Router from 'next/router'
import { FC } from 'react'
import RoutedTabs, { RoutedTabItem } from '@/components/UI/Tabs/RoutedTabs'

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
    id: ''
  },
  {
    title: 'Learning',
    content: <>Learning</>,
    id: 'learning'
  },
  {
    title: 'Staff overview',
    content: <>Staff overview</>,
    id: 'staff-overview'
  }
]
