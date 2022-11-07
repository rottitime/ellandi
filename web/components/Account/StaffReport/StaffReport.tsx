import Chip from '@/components/Chip/Chip'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import DataGrid, { GridColDef } from '@/components/UI/DataGrid/DataGrid'
import SkeletonTable from '@/components/UI/Skeleton/TableSkeleton'
import useAuth from '@/hooks/useAuth'
import {
  fetchReportGrade,
  fetchReportResponsibility,
  MeReporResponsibility,
  MeReportSkills,
  Query,
  SimpleLabelValueData
} from '@/service/api'
import { useQuery } from 'react-query'

const StaffReport = () => {
  const { authFetch } = useAuth()

  const { isLoading: isLoadingResponsibility, data: dataResponsibility } =
    useQuery<MeReporResponsibility>(
      Query.ReportResponsibility,
      () => authFetch(fetchReportResponsibility),
      { staleTime: Infinity }
    )

  const { isLoading: isLoadingGrade, data: dataGrade } = useQuery<MeReportSkills>(
    Query.ReportGrade,
    () => authFetch(fetchReportGrade),
    { staleTime: Infinity }
  )

  return (
    <>
      <AccountCard sx={{ mb: 4 }}>
        {isLoadingResponsibility ? (
          <SkeletonTable columns={3} rows={2} />
        ) : (
          <DataGrid
            pageSize={10}
            columns={columnsResponsibility}
            rows={dataResponsibility?.data || []}
            getRowId={(row) => row.name}
            autoHeight
          />
        )}
      </AccountCard>
      <AccountCard>
        {isLoadingGrade ? (
          <SkeletonTable columns={3} rows={4} />
        ) : (
          <DataGrid
            pageSize={10}
            columns={columnsGrade}
            rows={dataGrade?.data || []}
            getRowId={(row) => row.name}
            autoHeight
          />
        )}
      </AccountCard>
    </>
  )
}

export default StaffReport

const columnsResponsibility: GridColDef<SimpleLabelValueData>[] = [
  {
    field: 'name',
    headerName: 'Responsibility',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue }) => formattedValue,
    sortable: false,
    flex: 1
  },
  {
    field: 'total_value_percentage',
    headerName: 'Total (%)',
    disableColumnMenu: true,
    resizable: false,
    align: 'right',
    headerAlign: 'right',
    sortable: false,
    renderCell: ({ row }) => {
      return (
        <Chip
          label={row.total_label}
          brandColor={row.name.toLowerCase() === 'total users' ? 'black' : null}
        />
      )
    },
    flex: 1
  }
]

const columnsGrade: GridColDef<SimpleLabelValueData>[] = [
  {
    field: 'name',
    headerName: 'Grade',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue }) => formattedValue,
    flex: 1
  },
  {
    field: 'total_value_percentage',
    headerName: 'Total (%)',
    disableColumnMenu: true,
    resizable: false,
    align: 'right',
    headerAlign: 'right',
    renderCell: ({ row }) => <Chip label={row.total_label} />,
    flex: 1
  }
]
