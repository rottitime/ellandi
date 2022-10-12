import { FC, useId, useRef, useState } from 'react'
import DataGrid, { GridColDef } from '@/components/UI/DataGrid/DataGrid'
import useAuth from '@/hooks/useAuth'
import {
  fetchLearningTypes,
  GenericDataList,
  LearningAddFormalType,
  LearningAddType,
  MeLearningFormalList,
  MeLearningList,
  Query
} from '@/service/api'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchMeLearning } from '@/service/me'
import {
  Alert,
  Box,
  Chip,
  FormControlLabel,
  Radio,
  RadioGroup,
  styled,
  Typography
} from '@mui/material'
import { splitMinutes } from '@/lib/date-utils'
import dayjs from 'dayjs'
import { deleteLearning, editLearning } from '@/service/account'
import { SkeletonRadio } from '@/components/UI/Skeleton/RadioSkeleton.stories'
import BadgeNumber from '@/components/UI/BadgeNumber/BadgeNumber'
import LearningAddForm from '@/components/Form/LearningAddForm/LearningAddForm'

const Modal = styled(Box)`
  ${({ theme }) => theme.breakpoints.up('md')} {
    width: 600px;
  }
`

const LearningRecordList: FC = () => {
  const { authFetch } = useAuth()
  const id = useId()
  const labelId = `label-learning_type-${id}`
  const queryClient = useQueryClient()
  const [type, setType] = useState<string>()
  const formRef = useRef(null)

  const { data: types, isLoading: isLoadingTypes } = useQuery<GenericDataList[], Error>(
    Query.LearningTypes,
    fetchLearningTypes,
    { staleTime: Infinity }
  )

  const { data, isLoading, refetch } = useQuery<MeLearningList[]>(
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
        queryClient.setQueryData(
          Query.MeLearning,
          data.filter((learning) => learning.id !== id)
        )
      }
    }
  )

  const { mutateAsync: editMutate, reset: editReset } = useMutation<
    MeLearningFormalList[],
    Error,
    LearningAddType[] | LearningAddFormalType[]
  >(async (data) => await authFetch(editLearning, data), {
    onSuccess: async (data) => await queryClient.setQueryData(Query.Me, data)
  })

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
            <Typography variant="body2" data-testid="empty">
              No learning has been added. Click the 'Add learning' button to add some.
            </Typography>
          }
          autoHeight
          columns={columns}
          rows={data}
          modalLoading={deleteLoading}
          onDelete={async (cell) => await mutate(cell.id.toString())}
          deleteModalTitle="Delete learning"
          deleteModalContent={
            <Typography>
              Are you sure you want to delete this learning from your learning record?
            </Typography>
          }
          onModalClose={async () => await editReset()}
          onEdit={async () => {
            await formRef.current.submitForm()
            return false
          }}
          editModalTitle="Edit learning"
          editModalContent={(cell) => {
            const learningData = data.find(({ id }) => id === cell?.row?.id)
            const defaultValue = learningData?.learning_type
            const learning_type = !!type ? type : defaultValue

            return (
              <Modal>
                <Typography component="label" id={labelId} gutterBottom>
                  <BadgeNumber label="1" /> Edit type of learning
                </Typography>
                {isLoadingTypes ? (
                  [...Array(3).keys()].map((i) => <SkeletonRadio key={i} />)
                ) : (
                  <RadioGroup
                    aria-labelledby={labelId}
                    defaultValue={defaultValue}
                    name="learning_type"
                    onChange={(e) => setType(e.currentTarget.value)}
                    sx={{ mb: 4 }}
                  >
                    {types.map(({ name }) => (
                      <FormControlLabel
                        value={name}
                        control={<Radio />}
                        label={name}
                        key={name}
                      />
                    ))}
                  </RadioGroup>
                )}

                <LearningAddForm
                  ref={formRef}
                  loading={false}
                  defaultValues={learningData}
                  compact={true}
                  type={learning_type?.toLowerCase() === 'formal' ? 'formal' : 'generic'}
                  onFormSubmit={async (data) => {
                    alert(1)
                    try {
                      await editMutate([{ ...data, ...{ learning_type } }])
                      await refetch()
                    } catch (err) {
                      return false
                    }
                  }}
                />
              </Modal>
            )
          }}
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
