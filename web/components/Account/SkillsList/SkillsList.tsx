import { FC } from 'react'
import DataGrid, { GridColDef } from '@/components/UI/DataGrid/DataGrid'
import useAuth from '@/hooks/useAuth'
import { Query, RegisterUserResponse } from '@/service/api'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchMe } from '@/service/me'
import TableSkeleton from '@/components/UI/Skeleton/TableSkeleton'
import { Alert, Box, Chip, Typography } from '@mui/material'
import { deleteSkill } from '@/service/account'

const SkillsList: FC = () => {
  const { authFetch } = useAuth()
  const queryClient = useQueryClient()
  const { isLoading, data } = useQuery<RegisterUserResponse>(Query.Me, () =>
    authFetch(fetchMe)
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { mutate, error, isError } = useMutation<RegisterUserResponse, Error, any>(
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

  return isLoading ? (
    <TableSkeleton data-testid="skelton-table" />
  ) : (
    <Box sx={{ height: 'auto', width: '100%' }}>
      {isError && <Alert severity="error">{error.message}</Alert>}
      <DataGrid
        hideFooterPagination
        components={{
          NoRowsOverlay: () => <Alert severity="info">Enter a skill</Alert>
        }}
        autoHeight
        columns={columns}
        rows={data.skills}
        enableDelete
        onDelete={async (cell) => await mutate(cell.id)}
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
    headerName: 'Skill name',
    disableColumnMenu: true,
    resizable: false,
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
