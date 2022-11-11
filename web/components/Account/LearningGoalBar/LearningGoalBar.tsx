import Skeleton from '@/components/UI/Skeleton/Skeleton'
import Tooltip from '@/components/UI/Tooltip/Tooltip'
import useAuth from '@/hooks/useAuth'
import { fetchMeLearning } from '@/service/me'
import { MeLearningRecord, Query } from '@/service/types'
import { Box, styled, Typography } from '@mui/material'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Props } from './types'

const GoalBar = styled(Box)`
  .stat {
    color: ${(p) => p.theme.colors.red};
    &.completed {
      color: ${(p) => p.theme.colors.green1};
    }
  }
`

const LearningGoalBar = ({
  hideTitle,
  description,
  disableFetch,
  days = 0,
  percentage = 0,
  ...props
}: Props) => {
  const { authFetch } = useAuth()
  const [dayValue, setDayValue] = useState(days)
  const [percentageValue, setPercentageValue] = useState(percentage)

  const { isLoading } = useQuery<MeLearningRecord>(
    Query.MeLearning,
    () => authFetch(fetchMeLearning),
    {
      staleTime: 0,
      enabled: !disableFetch,
      onSuccess: (data) => {
        setDayValue(data?.goal_value_days || days)
        setPercentageValue(data?.goal_value_percentage || percentage)
      }
    }
  )

  return (
    <GoalBar {...props}>
      {!hideTitle && (
        <Typography variant="h2" component="h3" gutterBottom>
          Learning goal
          <Tooltip
            sx={{ p: 0 }}
            brandColor="brandLearning"
            title="Based on a 37 hour working week, one day is the equivalent of 7.4 hours, or 7 hours 24 minutes"
          />
        </Typography>
      )}
      {description && (
        <Typography variant="body2" gutterBottom>
          {description}
        </Typography>
      )}

      {isLoading ? (
        <Skeleton sx={{ maxWidth: 300 }} height="40px" />
      ) : (
        <Typography variant="h1" component="p">
          <span
            className={`stat ${percentageValue >= 100 ? 'completed' : ''}`}
            data-testid="stat"
          >
            {dayValue} {dayValue === 1 ? 'day' : 'days'} ({percentageValue}%)
          </span>{' '}
          completed
        </Typography>
      )}
    </GoalBar>
  )
}

export default LearningGoalBar
