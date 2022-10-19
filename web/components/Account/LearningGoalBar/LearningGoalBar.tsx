import Skeleton from '@/components/UI/Skeleton/Skeleton'
import useAuth from '@/hooks/useAuth'
import { fetchMeLearning } from '@/service/me'
import { MeLearningRecord, Query } from '@/service/types'
import { Box, styled, Typography } from '@mui/material'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { Props } from './types'

const GoalBar = styled(Box)`
  .stat {
    color: ${(p) => p.theme.colors.red};
    &.completed {
      color: ${(p) => p.theme.colors.green};
    }
  }
`

const LearningGoalBar: FC<Props> = (props) => {
  const { authFetch } = useAuth()

  const { isLoading, data } = useQuery<MeLearningRecord[]>(
    Query.MeLearning,
    () => authFetch(fetchMeLearning),
    { initialData: [], staleTime: 0 }
  )

  const totalMinutes = data.reduce((p, { duration_minutes }) => p + duration_minutes, 0)
  const totalDays = Math.trunc(totalMinutes / 450)
  const percentage = Math.trunc((totalMinutes / 450 / 10) * 100)

  return (
    <GoalBar {...props}>
      {!!isLoading ? (
        <Skeleton />
      ) : (
        <>
          <Typography variant="h1" component="p">
            <span
              className={`stat ${percentage >= 100 ? 'completed' : ''}`}
              data-testid="stat"
            >
              {totalDays} ({percentage}%)
            </span>{' '}
            completed
          </Typography>
        </>
      )}
    </GoalBar>
  )
}

export default LearningGoalBar
