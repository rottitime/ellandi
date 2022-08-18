import { FC } from 'react'
import DataGrid, { GridColDef } from '@/components/UI/DataGrid/DataGrid'
import useAuth from '@/hooks/useAuth'
import { Query, RegisterUserResponse } from '@/service/api'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchMe } from '@/service/me'
import TableSkeleton from '@/components/UI/Skeleton/TableSkeleton'
import { Alert, Box, Typography } from '@mui/material'
import { deleteSkillDevelop } from '@/service/account'

const SkillsDevelop: FC = () => {
  const { authFetch } = useAuth()
  const queryClient = useQueryClient()
  const { isLoading, data } = useQuery<RegisterUserResponse>(Query.Me, () =>
    authFetch(fetchMe)
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { mutate, error, isError } = useMutation<RegisterUserResponse, Error, any>(
    async (id: string) => await authFetch(deleteSkillDevelop, id),
    {
      onSuccess: async ({ id }) => {
        queryClient.setQueryData(Query.Me, {
          ...data,
          skills_develop: data.skills_develop.filter((skill) => skill.id !== id)
        })
      }
    }
  )

  return isLoading ? (
    <TableSkeleton data-testid="skelton-table" />
  ) : (
    <Box sx={{ height: 'auto', width: '100%' }}>
      {isError && <Alert severity="error">{error.message}</Alert>}
      <Box sx={{ height: 'auto', width: '100%' }}>
        <DataGrid
          hideFooterPagination
          components={{
            NoRowsOverlay: () => <Alert severity="info">Enter a skill to develop</Alert>
          }}
          autoHeight
          columns={columns}
          rows={data.skills_develop}
          enableDelete
          onDelete={async (cell) => await mutate(cell.id)}
          deleteModalTitle="Delete skill to develop"
          deleteModalContent={
            <Typography>
              Are you sure you want to delete this skill to develop from your profile?
            </Typography>
          }
        />
      </Box>
    </Box>
  )
}

export default SkillsDevelop

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Skill',
    disableColumnMenu: true,
    resizable: false,
    flex: 1
  }
]
