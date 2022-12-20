import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import LearningGoalBar from '@/components/Account/LearningGoalBar/LearningGoalBar'
import { Grid, Typography } from '@mui/material'
import Button from '@/components/UI/Button/Button'
import useAuth from '@/hooks/useAuth'
import { useQuery } from 'react-query'
import { MeLearningRecord, Query } from '@/service/api'
import Headline from '@/components/Account/Headline/Headline'
import Tabs from '@/components/UI/Tabs/Tabs'
import LearningRecordList from '@/components/Account/LearningRecordList/LearningRecordList'
import { fetchMeLearning } from '@/service/me'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import LearningDistribution from '@/components/Account/LearningDistribution/LearningDistribution'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const SharedLearningHeader = () => {
  const { authFetch } = useAuth()

  const { data } = useQuery<MeLearningRecord>(Query.MeLearning, () =>
    authFetch(fetchMeLearning)
  )

  return (
    <>
      <Headline>
        <Typography variant="h1" component="h2" gutterBottom>
          Welcome to the learning section
        </Typography>
        <Typography>
          You can manage your learning and find new development opportunities
        </Typography>
      </Headline>

      <Button variant="contained" sx={{ mb: 4 }} href="/account/learning/add/">
        Add learning
      </Button>

      <Grid container spacing={5} sx={{ mb: 5 }}>
        <Grid item xs={12} md={6}>
          <AccountCard sx={{ height: '100%' }}>
            <LearningDistribution
              titleTip="To get the most out of your learning you should aim for 70% learning
    on the job, 20% social and 10% formal training"
              barData={data?.distribution}
            />
          </AccountCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <AccountCard sx={{ height: '100%' }}>
            <LearningGoalBar description="You should aim to complete 10 days learning each year" />
          </AccountCard>
        </Grid>
      </Grid>
    </>
  )
}

const LearningPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/account/learning/courses/')
  }, [router])

  return (
    <>
      <SharedLearningHeader />
      <Tabs
        brandColor="brandLearning"
        tabItems={[
          {
            title: 'Learning record',
            content: <LearningRecordList />
          },
          {
            title: 'Find courses',
            href: '/account/learning/courses/',
            content: null
          }
        ]}
      />
    </>
  )
}

export default LearningPage
LearningPage.getLayout = (page) => (
  <AccountLayout
    title="Learning"
    titleIcon="mortar-hat"
    breadcrumbs={[{ title: 'Learning' }]}
    brandColor="brandLearning"
  >
    {page}
  </AccountLayout>
)
