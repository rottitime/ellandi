import { FC } from 'react'
import DataGrid, { GridColDef } from '@/components/UI/DataGrid/DataGrid'
import useAuth from '@/hooks/useAuth'
import { Query, RegisterUserResponse } from '@/service/api'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchMe } from '@/service/me'
import TableSkeleton from '@/components/UI/Skeleton/TableSkeleton'
import { Alert, Box, Chip, Typography } from '@mui/material'
import { deleteLanguage } from '@/service/account'

const LanguageList: FC = () => {
  const queryClient = useQueryClient()
  const { authFetch } = useAuth()
  const { isLoading, data } = useQuery<RegisterUserResponse>(Query.Me, () =>
    authFetch(fetchMe)
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { mutate, error, isError } = useMutation<RegisterUserResponse, Error, any>(
    async (id: string) => await deleteLanguage(id),
    {
      onSuccess: async ({ id }) => {
        queryClient.setQueryData(Query.Me, {
          ...data,
          languages: data.languages.filter((language) => language.id !== id)
        })
      }
    }
  )

  return isLoading ? (
    <TableSkeleton data-testid="skelton-table" />
  ) : (
    <Box sx={{ height: 'auto', width: '100%' }}>
      {isError && <Alert severity="error">{error.message}</Alert>}
      <DataGrid
        hideFooterPagination
        components={{
          NoRowsOverlay: () => <Alert severity="info">Enter a language</Alert>
        }}
        autoHeight
        columns={columns}
        rows={data.languages}
        enableDelete
        onDelete={async (cell) => await mutate(cell.id)}
        deleteModalTitle="Delete laguage"
        deleteModalContent={
          <Typography>
            Are you sure you want to delete this language from your profile?
          </Typography>
        }
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
