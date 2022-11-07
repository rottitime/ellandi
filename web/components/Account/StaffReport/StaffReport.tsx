import Chip from '@/components/Chip/Chip'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import DataGrid, { GridColDef } from '@/components/UI/DataGrid/DataGrid'
import SkeletonTable from '@/components/UI/Skeleton/TableSkeleton'
import useAuth from '@/hooks/useAuth'
import {
  exportReportSkills,
  fetchReportGrade,
  fetchReportResponsibility,
  MeReporResponsibility,
  MeReportSkills,
  Query,
  SimpleLabelValueData
} from '@/service/api'
import { Box } from '@mui/material'
import { useQuery } from 'react-query'
import SplitButton from '@/components/UI/SplitButton/SplitButton'
import TotalRow from './TotalRow'

const StaffReport = () => {
  const { authFetch } = useAuth()

  const { isLoading: isLoadingResponsibility, data: dataResponsibility } =
    useQuery<MeReporResponsibility>(Query.ReportResponsibility, () =>
      authFetch(fetchReportResponsibility)
    )

  const { isLoading: isLoadingGrade, data: dataGrade } = useQuery<MeReportSkills>(
    Query.ReportGrade,
    () => authFetch(fetchReportGrade)
  )

  const total = !!dataResponsibility?.data
    ? dataResponsibility.data.reduce((p, c) => p + c.total_value_total, 0)
    : 0

  return (
    <>
      <AccountCard sx={{ mb: 4 }}>
        {isLoadingResponsibility ? (
          <SkeletonTable columns={3} rows={3} />
        ) : (
          <>
            <Box sx={{ mb: 4, textAlign: 'right' }}>
              <SplitButton
                label="Export"
                options={['CSV', 'Excel', 'PDF']}
                onSelected={(_, option) => {
                  const url = exportReportSkills({ format: option.toLowerCase() })
                  window.open(url)
                }}
              />
            </Box>
            <DataGrid
              pageSize={10}
              columns={columns}
              rows={dataResponsibility.data}
              getRowId={(row) => row.name}
              autoHeight
              components={{ Footer: TotalRow }}
              componentsProps={{
                footer: { total }
              }}
            />
          </>
        )}
      </AccountCard>
      <AccountCard>
        {isLoadingGrade ? (
          <SkeletonTable columns={3} rows={10} />
        ) : (
          <DataGrid
            pageSize={10}
            columns={columns}
            rows={dataGrade.data}
            getRowId={(row) => row.name}
            autoHeight
          />
        )}
      </AccountCard>
    </>
  )
}

export default StaffReport

const columns: GridColDef<SimpleLabelValueData>[] = [
  {
    field: 'name',
    headerName: 'Responsibility',
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
    renderCell: ({ formattedValue, row }) =>
      formattedValue && <Chip label={row.total_label} />,
    flex: 1
  }
]
