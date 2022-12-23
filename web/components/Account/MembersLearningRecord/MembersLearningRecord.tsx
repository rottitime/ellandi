import Chip from '@/components/Chip/Chip'
import SkeletonTable from '@/components/UI/Skeleton/TableSkeleton'
import useAuth from '@/hooks/useAuth'
import { MeLearningRecord, Query } from '@/service/api'
import { Alert, Grid, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import LearningDistribution from '../LearningDistribution/LearningDistribution'
import LearningGoalBar from '../LearningGoalBar/LearningGoalBar'
import { Props } from './types'
import { GridColDef } from '@mui/x-data-grid'
import { formatDate, formatDuration } from '@/lib/date-utils'
import DataGrid from '@/components/UI/DataGrid/DataGrid'
import { fetchMemeberLearning } from '@/service/account'

const MembersLearningRecord = ({ id }: Props) => {
  const { authFetch } = useAuth()

  const { isLoading, data, isFetching, isSuccess, isError, error } = useQuery<
    MeLearningRecord,
    Error
  >([Query.TeamMembersLearning, id], () => authFetch(fetchMemeberLearning, id), {
    staleTime: Infinity,
    keepPreviousData: true
  })

  return (
    <>
      {isLoading && <SkeletonTable columns={3} rows={5} />}
      {isError && (
        <Alert severity="error" sx={{ mt: 3, mb: 3 }}>
          {error?.message}
        </Alert>
      )}
      {isSuccess && (
        <>
          <Grid container spacing={5} sx={{ mb: 5 }}>
            <Grid item xs={12} md={6}>
              <LearningDistribution
                description="Data based on the current financial year so far"
                barData={data?.distribution}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LearningGoalBar
                description="Average number of days learning completed per person so far this financial year"
                disableFetch
                days={data.goal_value_days}
                percentage={data.goal_value_percentage}
              />
            </Grid>
          </Grid>

          <DataGrid
            initialLoading={isLoading}
            loading={isFetching}
            hideFooterPagination
            noRowContent={
              <Typography variant="body2" data-testid="empty-rows">
                No learning has been added
              </Typography>
            }
            initialState={{
              sorting: {
                sortModel: [{ field: 'learning_type', sort: 'desc' }]
              }
            }}
            autoHeight
            columns={columns}
            rows={data?.data}
          />
        </>
      )}
    </>
  )
}

export default MembersLearningRecord

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Learning details',
    disableColumnMenu: true,
    resizable: false,
    flex: 1
  },
  {
    field: 'learning_type',
    headerName: 'Type',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue }) => formattedValue && <Chip label={formattedValue} />,
    flex: 1
  },
  {
    field: 'duration_minutes',
    headerName: 'Duration',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue }) =>
      formattedValue && <Chip label={formatDuration(formattedValue)} />,
    flex: 1
  },
  {
    field: 'date_completed',
    headerName: 'Completed',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue }) =>
      formattedValue && <Chip label={formatDate(formattedValue)} />,
    flex: 1
  }
]
