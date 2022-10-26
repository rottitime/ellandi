import { FC } from 'react'
import DataGrid, { GridColDef } from '@/components/UI/DataGrid/DataGrid'
import useAuth from '@/hooks/useAuth'
import {
  fetchSkillLevels,
  GenericDataList,
  Query,
  RegisterUserResponse,
  SkillsType,
  SkillType
} from '@/service/api'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchMe } from '@/service/me'
import TableSkeleton from '@/components/UI/Skeleton/TableSkeleton'
import {
  Alert,
  Box,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Typography
} from '@mui/material'
import { addSkills, deleteSkill } from '@/service/account'
import { Controller, useForm } from 'react-hook-form'
import Tooltip from '@/components/UI/Tooltip/Tooltip'

const Status = styled('span')`
  &.pending {
    color: ${(p) => p.theme.colors.grey3};
  }
  svg {
    color: ${(p) => p.theme.colors.grey3};
  }
`

const SkillsList: FC = () => {
  const { authFetch } = useAuth()
  const queryClient = useQueryClient()
  const { isLoading, data } = useQuery<RegisterUserResponse>(Query.Me, () =>
    authFetch(fetchMe)
  )

  const { data: levels } = useQuery<GenericDataList[], Error>(
    Query.SkillLevels,
    fetchSkillLevels,
    { staleTime: Infinity }
  )

  const {
    mutate,
    error,
    isError,
    isLoading: deleteLoading
  } = useMutation<RegisterUserResponse, Error, string>(
    async (id: string) => await authFetch(deleteSkill, id),
    {
      onSuccess: async ({ id }) => {
        queryClient.setQueryData(Query.Me, {
          ...data,
          skills: data.skills.filter((skill) => skill.id !== id)
        })
      }
    }
  )

  const {
    mutateAsync: editMutate,
    error: editError,
    isError: editIsError,
    isLoading: editLoading,
    reset: editReset
  } = useMutation<RegisterUserResponse, Error, SkillType[]>(
    async (data) => await authFetch(addSkills, data),
    {
      onSuccess: async (data) => await queryClient.setQueryData(Query.Me, data)
    }
  )

  const { control, getValues } = useForm<SkillsType>({
    defaultValues: { skills: [] }
  })

  return isLoading ? (
    <TableSkeleton data-testid="skelton-table" />
  ) : (
    <Box sx={{ height: 'auto', width: '100%' }}>
      {isError && <Alert severity="error">{error.message}</Alert>}
      <DataGrid
        hideFooterPagination
        noRowContent={
          <Typography variant="body2" data-testid="empty-rows">
            No skills have been added. Click the 'Add a skill' button to add some.
          </Typography>
        }
        autoHeight
        columns={columns}
        rows={data.skills}
        modalLoading={deleteLoading || editLoading}
        onModalClose={async () => await editReset()}
        onEdit={async (cell) => {
          const skillIndex = data.skills.findIndex((skill) => skill.id === cell?.row?.id),
            skill = data.skills[skillIndex]
          const value = getValues(`skills.${skillIndex}.level`)
          try {
            await editMutate([{ ...skill, level: value }])
          } catch (err) {
            return false
          }

          return true
        }}
        editModalTitle="Edit skill level"
        editModalContent={(cell) => {
          const skillIndex = data.skills.findIndex((skill) => skill.id === cell?.row?.id)
          return (
            <>
              {editIsError && (
                <Alert severity="error" sx={{ mb: 4 }}>
                  {editError?.message}
                </Alert>
              )}
              <Controller
                name={`skills.${skillIndex}.level`}
                defaultValue={data?.skills[skillIndex]?.level}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl error={!!error} size="small">
                    <InputLabel>Select a level</InputLabel>
                    <Select
                      {...field}
                      label="Select a level"
                      variant="outlined"
                      sx={{ width: 200 }}
                    >
                      {levels.map(({ name }) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                    {!!error && <FormHelperText error>{error.message}</FormHelperText>}
                  </FormControl>
                )}
              />

              <Typography fontWeight="bold" sx={{ mt: 3 }}>
                Beginner
              </Typography>
              <Typography gutterBottom>
                You have minimal or textbook knowledge and need close supervision or
                guidance
              </Typography>
              <Typography fontWeight="bold">Advanced beginner</Typography>
              <Typography gutterBottom>
                You have basic knowledge of key aspects and can do straightforward tasks
                using your own judgement
              </Typography>
              <Typography fontWeight="bold">Competent</Typography>
              <Typography gutterBottom>
                You have good working and background knowledge. You can achieve most tasks
                using your own judgement
              </Typography>
              <Typography fontWeight="bold">Proficient</Typography>
              <Typography gutterBottom>
                You have deep understanding and take full responsibility for your own
                work. You can deal with complex situations and make informed decisions
              </Typography>
              <Typography fontWeight="bold">Expert</Typography>
              <Typography gutterBottom>
                You have authoritative knowledge and achieve excellence with ease, going
                beyond existing standards and seeing the bigger picture
              </Typography>
            </>
          )
        }}
        onDelete={async (cell) => await mutate(cell.id.toString())}
        deleteModalTitle="Delete skill"
        deleteModalContent={
          <Typography>
            Are you sure you want to delete this skill from your profile?
          </Typography>
        }
      />
    </Box>
  )
}

export default SkillsList

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Skill',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue, row: { pending } }) =>
      formattedValue && (
        <Status
          className={`${pending ? 'pending' : ''}`}
          data-testid={pending && 'status-pending'}
        >
          {formattedValue}
          {pending && (
            <Tooltip brandColor="brandSkills" title="Pending line manager approval" />
          )}
        </Status>
      ),
    flex: 1
  },
  {
    field: 'level',
    headerName: 'Skill level',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue }) => formattedValue && <Chip label={formattedValue} />,
    flex: 1
  }
]
