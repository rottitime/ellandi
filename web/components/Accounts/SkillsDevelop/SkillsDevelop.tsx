import { FC } from 'react'
import DataGrid, { GridColDef } from '@/components/UI/DataGrid/DataGrid'
import useAuth from '@/hooks/useAuth'
import { Query, RegisterUserResponse } from '@/service/api'
import { useQuery } from 'react-query'
import { fetchMe } from '@/service/me'
import TableSkeleton from '@/components/UI/Skeleton/TableSkeleton'
import { Alert } from '@mui/material'

const SkillsDevelop: FC = () => {
  // const { setError } = useUiContext()
  const { authFetch } = useAuth()
  const { isLoading, data } = useQuery<RegisterUserResponse>(Query.Me, () =>
    authFetch(fetchMe)
  )

  return isLoading ? (
    <TableSkeleton />
  ) : (
    <DataGrid
      getRowId={({ name }) => name}
      hideFooterPagination
      onDelete={(cell) => {
        // eslint-disable-next-line no-console
        console.log({ cell })
      }}
      components={{
        NoRowsOverlay: () => <Alert severity="info">Enter a skill to develop</Alert>
      }}
      autoHeight
      columns={columns}
      rows={data.skills_develop}
      enableDelete
    />
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
