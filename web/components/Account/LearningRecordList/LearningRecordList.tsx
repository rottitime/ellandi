import { FC, useMemo } from 'react'
import DataGrid, { GridColDef } from '@/components/UI/DataGrid/DataGrid'
import useAuth from '@/hooks/useAuth'
import { MeLearningList, Query } from '@/service/api'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchMeLearning } from '@/service/me'
import { Alert, Box, Chip, Typography } from '@mui/material'
import Link from '@/components/UI/Link'
import { RowsType } from './types'
import { splitMinutes } from '@/lib/date-utils'
import dayjs from 'dayjs'
import { deleteLearning } from '@/service/account'

const LearningRecordList: FC = () => {
  const { authFetch } = useAuth()
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery<MeLearningList[]>(
    Query.MeLearning,
    () => authFetch(fetchMeLearning),
    { initialData: [], staleTime: 0 }
  )

  const {
    mutate,
    error,
    isError,
    isLoading: deleteLoading
  } = useMutation<string, Error, string>(
    async (id) => await authFetch(deleteLearning, id),
    {
      onSuccess: async (id) => {
        queryClient.setQueryData(Query.MeLearning, {
          ...data,
          skills: data.filter((learning) => learning.id !== id)
        })
      }
    }
  )

  const rows: RowsType[] = useMemo(
    () =>
      data.map((record) => ({
        ...record,
        type:
          record.learning_type.toLowerCase() === 'work'
            ? 'On the job'
            : record.learning_type
      })),
    [data]
  )

  return (
    <Box sx={{ height: 'auto', width: '100%' }}>
      <>
        {isError && <Alert severity="error">{error.message}</Alert>}
        <DataGrid
          loading={isLoading}
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
          modalLoading={deleteLoading}
          onDelete={async (cell) => await mutate(cell.id.toString())}
          deleteModalTitle="Delete learning"
          deleteModalContent={
            <Typography>
              Are you sure you want to delete this learning from your learning record?
            </Typography>
          }
        />
      </>
    </Box>
  )
}

export default LearningRecordList

const formatDate = (dateValue: string): string => dayjs(dateValue).format('DD.MM.YYYY')

const formatDuration = (duration: number): string => {
  const { days, minutes, hours } = splitMinutes(duration)
  return `${!!days ? `${days}d` : ''} ${!!hours ? `${hours}hr` : ''} ${
    !!minutes ? `${minutes}m` : ''
  }`
}

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
