import { FC, useMemo } from 'react'
import DataGrid, { GridColDef } from '@/components/UI/DataGrid/DataGrid'
import useAuth from '@/hooks/useAuth'
import {
  fetchSkillLevels,
  GenericDataList,
  MeLearningList,
  Query,
  RegisterUserResponse,
  SkillsType,
  SkillType
} from '@/service/api'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  fetchMe,
  fetchMeLearningFormal,
  fetchMeLearningSocial,
  fetchMeLearningWork
} from '@/service/me'
import TableSkeleton from '@/components/UI/Skeleton/TableSkeleton'
import {
  Alert,
  Box,
  Chip,
  duration,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material'
import { addSkills, deleteSkill } from '@/service/account'
import Link from '@/components/UI/Link'
import { Controller, useForm } from 'react-hook-form'
import { ListRecords, RowsType } from './types'
import { SkeletonTable } from '@/components/UI/Skeleton/TableSkeleton.stories'
import { splitMinutes } from '@/lib/date-utils'
import dayjs from 'dayjs'

const SkillsList: FC = () => {
  const { authFetch } = useAuth()
  // const queryClient = useQueryClient()
  const { isLoading, data } = useQuery<RegisterUserResponse>(Query.Me, () =>
    authFetch(fetchMe)
  )

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

  const formatDuration = ({ duration_minutes }: MeLearningList): string => {
    const { days, minutes, hours } = splitMinutes(duration_minutes)
    return `${!!days ? `${days}d` : ''} ${!!hours ? `${hours}hr` : ''} ${
      !!minutes ? `${minutes}m` : ''
    }`
  }

  const formatDate = ({ date_completed }: MeLearningList): string =>
    dayjs(date_completed).format('DD.MM.YYYY')

  const rows: RowsType[] = useMemo(() => {
    return [
      ...dataWork.map((data) => ({
        ...data,
        type: 'On the job',
        duration: formatDuration(data),
        completed: formatDate(data)
      })),
      ...dataSocial.map((data) => ({
        ...data,
        type: 'Social',
        duration: formatDuration(data),
        completed: formatDate(data)
      })),
      ...dataFormal.map((data) => ({
        ...data,
        type: 'Formal',
        duration: formatDuration(data),
        completed: formatDate(data)
      }))
    ]
  }, [dataFormal, dataSocial, dataWork])

  return isLoading ? (
    <TableSkeleton data-testid="skelton-table" />
  ) : (
    <Box sx={{ height: 'auto', width: '100%' }}>
      {isLoadingWork || isLoadingSocial || isLoadingFormal ? (
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
