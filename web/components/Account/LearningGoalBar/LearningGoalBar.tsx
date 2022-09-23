import PercentageBar from '@/components/UI/PercentageBar/PercentageBar'
import Skeleton from '@/components/UI/Skeleton/Skeleton'
import useAuth from '@/hooks/useAuth'
import { fetchMeLearning } from '@/service/me'
import { MeLearningList, Query } from '@/service/types'
import { Box } from '@mui/material'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { Props } from './types'

const LearningGoalBar: FC<Props> = (props) => {
  const { authFetch } = useAuth()

  const { isLoading, data } = useQuery<MeLearningList[]>(
    Query.MeLearning,
    () => authFetch(fetchMeLearning),
    { initialData: [], staleTime: 0 }
  )

  const totalMinutes = data.reduce((p, { duration_minutes }) => p + duration_minutes, 0)

  return (
    <Box {...props}>
      {!!isLoading ? (
        <Skeleton />
      ) : (
        <PercentageBar
          data={[
            {
              label: 'goal',
              percentage: (totalMinutes / 450 / 10) * 100,
              color: 'blue1'
            }
          ]}
          marks={[0, 25, 50, 75, 100].map((value) => ({
            value,
            label: (value / 10).toString()
          }))}
        />
      )}
    </Box>
  )
}

export default LearningGoalBar
