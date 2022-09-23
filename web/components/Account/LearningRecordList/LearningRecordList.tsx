import { FC, useMemo } from 'react'
import DataGrid, { GridColDef } from '@/components/UI/DataGrid/DataGrid'
import useAuth from '@/hooks/useAuth'
import { MeLearningList, Query } from '@/service/api'
import { useQuery } from 'react-query'
import { fetchMeLearning } from '@/service/me'
import { Alert, Box, Chip } from '@mui/material'
import Link from '@/components/UI/Link'
import { RowsType } from './types'
import { SkeletonTable } from '@/components/UI/Skeleton/TableSkeleton.stories'
import { splitMinutes } from '@/lib/date-utils'
import dayjs from 'dayjs'

const SkillsList: FC = () => {
  const { authFetch } = useAuth()
  const { data, isLoading } = useQuery<MeLearningList[]>(
    Query.MeLearning,
    () => authFetch(fetchMeLearning),
    { initialData: [], staleTime: 0 }
  )

  const formatDuration = ({ duration_minutes }: MeLearningList): string => {
    const { days, minutes, hours } = splitMinutes(duration_minutes)
    return `${!!days ? `${days}d` : ''} ${!!hours ? `${hours}hr` : ''} ${
      !!minutes ? `${minutes}m` : ''
    }`
  }

  const formatDate = ({ date_completed }: MeLearningList): string =>
    dayjs(date_completed).format('DD.MM.YYYY')

  const rows: RowsType[] = useMemo(
    () =>
      data.map((record) => ({
        ...record,
        type:
          record.learning_type.toLowerCase() === 'work'
            ? 'On the job'
            : record.learning_type,
        duration: formatDuration(record),
        completed: formatDate(record)
      })),
    [data]
  )

  return (
    <Box sx={{ height: 'auto', width: '100%' }}>
      {!!isLoading ? (
        <SkeletonTable />
      ) : (
        <DataGrid
          hideFooterPagination
          initialState={{
            sorting: {
              sortModel: [{ field: 'name', sort: 'asc' }]
            }
          }}
          noRowContent={
            <Alert severity="info">
              <Link href="/account/learning/add">Add learning</Link>
            </Alert>
          }
          autoHeight
          columns={columns}
          rows={rows}
        />
      )}
    </Box>
  )
}

export default SkillsList

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Learning details',
    disableColumnMenu: true,
    resizable: false,
    flex: 1
  },
  {
    field: 'type',
    headerName: 'Type',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue }) => formattedValue && <Chip label={formattedValue} />,
    flex: 1
  },
  {
    field: 'duration',
    headerName: 'Duration',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue }) => formattedValue && <Chip label={formattedValue} />,
    flex: 1
  },
  {
    field: 'completed',
    headerName: 'Completed',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue }) => formattedValue && <Chip label={formattedValue} />,
    flex: 1
  }
]
