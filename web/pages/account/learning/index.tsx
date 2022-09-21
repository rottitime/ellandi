import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Box, Grid, styled, Typography, useTheme } from '@mui/material'
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
import { useMemo } from 'react'
import { BarDataType } from '@/components/UI/PercentageBar/types'
import PercentageBar from '@/components/UI/PercentageBar/PercentageBar'

const KeyList = styled(Typography)`
  display: inline-flex;
  margin-bottom: ${(p) => p.theme.spacing(2)};
  > span {
    display: inline-flex;
    align-items: center;
    margin-right: ${(p) => p.theme.spacing(2)};
  }
  .dot {
    border: 2px solid ${(p) => p.theme.colors.black};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: ${(p) => p.theme.spacing(1)};
  }
`

const LearningPage = () => {
  const { authFetch } = useAuth()
  const { colors } = useTheme()

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

  const barData = useMemo<BarDataType[]>(() => {
    const totalWork = dataWork.length
    const totalSocial = dataSocial.length
    const totalFormal = dataFormal.length
    const total = totalWork + totalSocial + totalFormal

    return [
      { label: 'On the job', percentage: (totalWork / total) * 100, color: 'blue1' },
      { label: 'Social', percentage: (totalSocial / total) * 100, color: 'white' },
      { label: 'Formal', percentage: (totalFormal / total) * 100, color: 'black' }
    ]
  }, [dataFormal.length, dataSocial.length, dataWork.length])

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

      <Grid container spacing={5} sx={{ mb: 5 }}>
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
            <KeyList variant="body2">
              {barData.map(({ label, color, percentage }) => (
                <span key={label}>
                  <Box className="dot" sx={{ backgroundColor: colors[color] }} /> {label}{' '}
                  ({percentage.toFixed()}%)
                </span>
              ))}
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
            </KeyList>
            <PercentageBar
              data={barData}
              marks={[0, 25, 50, 75, 100].map((value) => ({
                value,
                label: value.toString()
              }))}
            />
          </AccountCard>
        </Grid>
        <Grid item xs={6}>
          {/* <AccountCard>
            <Typography variant="body1" gutterBottom>
              Learning goal
            </Typography>
            <Typography variant="body2">
              You are expected to complete 10 days learning each year
            </Typography>
          </AccountCard> */}
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
