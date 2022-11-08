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
import { useMemo } from 'react'
import { BarDataType } from '@/components/UI/PercentageBar/types'
import LearningDistribution from '@/components/Account/LearningDistribution/LearningDistribution'

const LearningPage = () => {
  const { authFetch } = useAuth()

  const { data } = useQuery<MeLearningRecord[]>(
    Query.MeLearning,
    () => authFetch(fetchMeLearning),
    { initialData: [], staleTime: 0 }
  )

  const barData = useMemo<BarDataType[]>(() => {
    const totalWork = data.filter(
      ({ learning_type }) => learning_type.toLowerCase() === 'on the job'
    ).length
    const totalSocial = data.filter(
      ({ learning_type }) => learning_type.toLowerCase() === 'social'
    ).length
    const totalFormal = data.filter(
      ({ learning_type }) => learning_type.toLowerCase() === 'formal'
    ).length
    const total = totalWork + totalSocial + totalFormal

    return [
      {
        label: 'On the job',
        percentage: (totalWork / total) * 100,
        color: null
      },
      { label: 'Social', percentage: (totalSocial / total) * 100, color: null },
      { label: 'Formal', percentage: (totalFormal / total) * 100, color: null }
    ]
  }, [data])

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
        <Grid item xs={6}>
          <AccountCard sx={{ height: '100%' }}>
            <LearningDistribution
              barData={barData}
              titleTip='"To get the most out of your learning you should aim for 70% learning
    on the job, 20% social and 10% formal training"'
            />
          </AccountCard>
        </Grid>
        <Grid item xs={6}>
          <AccountCard sx={{ height: '100%' }}>
            <Typography variant="h2" component="h3" gutterBottom>
              Learning goal
            </Typography>
            <Typography variant="body2" gutterBottom>
              You should aim to complete 10 days learning each year
            </Typography>

            <LearningGoalBar />
          </AccountCard>
        </Grid>
      </Grid>

      <Tabs
        brandColor="brandLearning"
        tabItems={[
          {
            title: 'Learning record',
            content: <LearningRecordList />
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
