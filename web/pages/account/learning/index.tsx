import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Grid, Typography } from '@mui/material'
import Button from '@/components/UI/Button/Button'
import useAuth from '@/hooks/useAuth'
import { useQuery } from 'react-query'
import { MeLearningList, Query } from '@/service/api'
import Headline from '@/components/Account/Headline/Headline'
import Tabs from '@/components/UI/Tabs/Tabs'
import LearningRecordList from '@/components/Account/LearningRecordList/LearningRecordList'
import {
  fetchMeLearningFormal,
  fetchMeLearningSocial,
  fetchMeLearningWork
} from '@/service/me'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import Tooltip from '@/components/UI/Tooltip/Tooltip'

const LearningPage = () => {
  const { authFetch } = useAuth()

  const { isLoading: isLoadingWork, data: dataWork } = useQuery<MeLearningList[]>(
    Query.MeLearningWork,
    () => authFetch(fetchMeLearningWork),
    { initialData: [] }
  )

  const { isLoading: isLoadingSocial, data: dataSocial } = useQuery<MeLearningList[]>(
    Query.MeLearningSocial,
    () => authFetch(fetchMeLearningSocial),
    { initialData: [] }
  )

  const { isLoading: isLoadingFormal, data: dataFormal } = useQuery<MeLearningList[]>(
    Query.MeLearningFormal,
    () => authFetch(fetchMeLearningFormal),
    { initialData: [] }
  )

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

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <AccountCard>
            <Typography variant="body1" gutterBottom>
              Learning distribution{' '}
              <Tooltip
                brandColor="brandLearning"
                title="To get the most out of your learning you should aim for 70% learning
                on the job, 20% social and 10% formal training"
              />
            </Typography>
            <Typography variant="body2">
              blah{' '}
              <Tooltip
                brandColor="brandLearning"
                title={
                  <>
                    <Typography variant="body2">On the job</Typography> Self-taught
                    learning by doing, for example reading policies and guidance, using
                    tools and software to do your job
                    <Typography variant="body2">Social</Typography>
                    Learning from colleagues, job shadowing, mentoring, coaching, networks
                    and communities
                    <Typography variant="body2">Formal</Typography>
                    Completing a course on Civil Service Learning, external training,
                    professional qualifications
                  </>
                }
              />
            </Typography>
          </AccountCard>
        </Grid>
        <Grid item xs={6}>
          <AccountCard>
            <Typography variant="body1" gutterBottom>
              Learning goal
            </Typography>
            <Typography variant="body2">
              You are expected to complete 10 days learning each year
            </Typography>
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
    titleIcon="learning"
    breadcrumbs={[{ title: 'Learning' }]}
    brandColor="brandLearning"
  >
    {page}
  </AccountLayout>
)
