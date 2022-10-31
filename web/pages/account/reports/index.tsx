import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import Headline from '@/components/Account/Headline/Headline'
import BadgeNumber from '@/components/UI/BadgeNumber/BadgeNumber'
import Router from 'next/router'
import { FC } from 'react'

type MenuDataType = {
  title: string
  url: string
}

const ReportsPage = () => (
  <Headline>
    <Typography variant="h1" gutterBottom>
      Welcome to the reports section
    </Typography>
    <Typography variant="h2" gutterBottom>
      You can view statistics on skills and learning
    </Typography>
  </Headline>
)

export default ReportsPage

ReportsPage.getLayout = (page) => (
  <AccountLayout title="Reports" titleIcon="report">
    {page}
  </AccountLayout>
)

export const menu: MenuDataType[] = [
  {
    title: 'Skill',
    url: '/account/reports/skill'
  },
  {
    title: 'Learning',
    url: '/account/skills/learning'
  },
  {
    title: 'Staff overview',
    url: '/account/skills/staff-overview'
  }
]
