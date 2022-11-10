import Skeleton from '@/components/UI/Skeleton/Skeleton'
import Tooltip from '@/components/UI/Tooltip/Tooltip'
import useAuth from '@/hooks/useAuth'
import { fetchMeLearning } from '@/service/me'
import { MeLearningRecord, Query } from '@/service/types'
import { Box, styled, Typography } from '@mui/material'
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
  days,
  percentage,
  ...props
}: Props) => {
  const { authFetch } = useAuth()

  const { isLoading, data, isSuccess } = useQuery<MeLearningRecord>(
    Query.MeLearning,
    () => authFetch(fetchMeLearning),
    { staleTime: 0, enabled: !disableFetch }
  )

  if (isSuccess) {
    days = data.goal_value_days
    percentage = data.goal_value_percentage
  }

  return (
    <GoalBar {...props}>
      {!!isLoading ? (
        <Skeleton />
      ) : (
        <>
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
          <Typography variant="h1" component="p">
            <span
              className={`stat ${percentage >= 100 ? 'completed' : ''}`}
              data-testid="stat"
            >
              {days} {days === 1 ? 'day' : 'days'} ({percentage}%)
            </span>{' '}
            completed
          </Typography>
        </>
      )}
    </GoalBar>
  )
}

export default LearningGoalBar
