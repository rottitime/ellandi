import { FC } from 'react'
import DataGrid, { GridColDef } from '@/components/UI/DataGrid/DataGrid'
import useAuth from '@/hooks/useAuth'
import { Query, RegisterUserResponse } from '@/service/api'
import { useQuery } from 'react-query'
import { fetchMe } from '@/service/me'
import TableSkeleton from '@/components/UI/Skeleton/TableSkeleton'
import { Alert, Chip } from '@mui/material'

const LanguageList: FC = () => {
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
        NoRowsOverlay: () => <Alert severity="info">Enter a language</Alert>
      }}
      autoHeight
      columns={columns}
      rows={data.languages}
      enableDelete
    />
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
    field: 'speaking',
    headerName: 'Speaking',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue }) => formattedValue && <Chip label={formattedValue} />,
    flex: 1
  },
  {
    field: 'writing',
    headerName: 'Writing',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue }) => formattedValue && <Chip label={formattedValue} />,
    flex: 1
  }
]
