import { FC } from 'react'
import DataGrid, { GridColDef, GridRowId } from '@/components/UI/DataGrid/DataGrid'
import useAuth from '@/hooks/useAuth'
import { LanguagesType, LanguageType, Query, RegisterUserResponse } from '@/service/api'
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
  Typography
} from '@mui/material'
import { addLanguages, deleteLanguage } from '@/service/account'
import { Controller, useForm } from 'react-hook-form'
import levels from '@/prefetch/language-skill-levels.json'

const LanguageList: FC = () => {
  const queryClient = useQueryClient()
  const { authFetch } = useAuth()
  const { isLoading, data } = useQuery<RegisterUserResponse>(Query.Me, () =>
    authFetch(fetchMe)
  )

  const {
    mutate,
    error,
    isError,
    isLoading: deleteLoading
  } = useMutation<RegisterUserResponse, Error, GridRowId>(
    async (id) => await authFetch(deleteLanguage, id),
    {
      onSuccess: async ({ id }) => {
        queryClient.setQueryData(Query.Me, {
          ...data,
          languages: data.languages.filter((language) => language.id !== id)
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
  } = useMutation<RegisterUserResponse, Error, LanguageType[]>(
    async (data) => await authFetch(addLanguages, data),
    {
      onSuccess: async (data) => await queryClient.setQueryData(Query.Me, data)
    }
  )

  const { control, getValues } = useForm<LanguagesType>({
    defaultValues: { languages: [] }
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
        rows={data.languages}
        modalLoading={deleteLoading || editLoading}
        onDelete={async (cell) => await mutate(cell.id)}
        deleteModalTitle="Delete language"
        deleteModalContent={
          <Typography>
            Are you sure you want to delete this language from your profile?
          </Typography>
        }
        onModalClose={async () => await editReset()}
        onEdit={async (cell) => {
          const index = data.languages.findIndex(({ id }) => id === cell?.row?.id),
            languages = data.languages[index]
          const speaking_level = getValues(`languages.${index}.speaking_level`)
          const writing_level = getValues(`languages.${index}.writing_level`)
          try {
            await editMutate([{ ...languages, speaking_level, writing_level }])
          } catch (err) {
            return false
          }

          return true
        }}
        editModalTitle="Edit skill level"
        editModalContent={(cell) => {
          const index = data.languages.findIndex(({ id }) => id === cell?.row?.id)
          return (
            <>
              {editIsError && (
                <Alert severity="error" sx={{ mb: 4 }}>
                  {editError?.message}
                </Alert>
              )}
              <Typography variant="h2" gutterBottom>
                Speaking
              </Typography>
              <Controller
                name={`languages.${index}.speaking_level`}
                defaultValue={data?.languages[index]?.speaking_level}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl error={!!error} size="small">
                    <InputLabel>Select a level</InputLabel>
                    <Select
                      {...field}
                      label="Select a level"
                      variant="outlined"
                      sx={{ width: 180, mb: 3 }}
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
              <Typography variant="h3">Basic</Typography>
              <Typography variant="body2" gutterBottom>
                You can understand and use basic phrases, introduce yourself and describe
                in simple terms aspects of your background and environment
              </Typography>

              <Typography variant="h3">Independent</Typography>
              <Typography variant="body2" gutterBottom>
                You can deal with most situations likely to arise while travelling in an
                area where the language is spoken and interact with a degree of fluency
              </Typography>

              <Typography variant="h3">Proficient</Typography>
              <Typography variant="body2" gutterBottom>
                You can express ideas fluently and spontaneously and can use the language
                flexibly for social, academic and professional purposes
              </Typography>

              <Typography variant="h2" gutterBottom>
                Writing
              </Typography>
              <Controller
                name={`languages.${index}.writing_level`}
                defaultValue={data?.languages[index]?.writing_level}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl error={!!error} size="small">
                    <InputLabel>Select a level</InputLabel>
                    <Select
                      {...field}
                      label="Select a level"
                      variant="outlined"
                      sx={{ width: 180, mb: 3 }}
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

              <Typography variant="h3">Basic</Typography>
              <Typography variant="body2" gutterBottom>
                You can understand and use basic phrases, introduce yourself and describe
                in simple terms aspects of your background and environment
              </Typography>

              <Typography variant="h3">Independent</Typography>
              <Typography variant="body2" gutterBottom>
                You can produce clear, detailed text on a wide range of subjects and
                explain the advantages and disadvantages of a topical issue
              </Typography>

              <Typography variant="h3">Proficient</Typography>
              <Typography variant="body2" gutterBottom>
                You can produce clear, well-structured, detailed text on complex subjects
                and can express yourself fluently and precisely
              </Typography>
            </>
          )
        }}
      />
    </Box>
  )
}

export default LanguageList

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Language',
    disableColumnMenu: true,
    resizable: false,
    flex: 1
  },
  {
    field: 'speaking_level',
    headerName: 'Speaking',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue }) => formattedValue && <Chip label={formattedValue} />,
    flex: 1
  },
  {
    field: 'writing_level',
    headerName: 'Writing',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue }) => formattedValue && <Chip label={formattedValue} />,
    flex: 1
  }
]
