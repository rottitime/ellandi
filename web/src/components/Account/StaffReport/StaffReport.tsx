import Chip from '@/components/Chip/Chip'
import Button from '@/components/UI/Button/Button'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import DataGrid, { GridColDef } from '@/components/UI/DataGrid/DataGrid'
import SkeletonTable from '@/components/UI/Skeleton/TableSkeleton'
import useAuth from '@/hooks/useAuth'
import { csvDownload } from '@/lib/data-utils'
import {
  exportReportResponsibility,
  fetchReportGrade,
  fetchReportResponsibility,
  MeReportGrade,
  MeReportResponsibility,
  Query,
  SimpleLabelValueData
} from '@/service/api'
import { Alert, Box } from '@mui/material'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

const StaffReport = () => {
  const { authFetch } = useAuth()
  const [exportLoading, setExportLoading] = useState(false)
  const [exportError, setExportError] = useState()

  const {
    isLoading: isLoadingResponsibility,
    data: dataResponsibility,
    isError: isErrorResponsibility,
    error: errorResponsibility
  } = useQuery<MeReportResponsibility, Error>(
    [Query.ReportResponsibility],
    () => authFetch(fetchReportResponsibility),
    { staleTime: Infinity }
  )

  const {
    isLoading: isLoadingGrade,
    data: dataGrade,
    isError: isErrorGrade,
    error: errorGrade
  } = useQuery<MeReportGrade, Error>(
    [Query.ReportGrade],
    () => authFetch(fetchReportGrade),
    {
      staleTime: Infinity
    }
  )

  if (isErrorResponsibility || isErrorGrade)
    return (
      <AccountCard>
        <Alert severity="error" sx={{ mt: 3, mb: 3 }}>
          {errorResponsibility?.message || errorGrade?.message}
        </Alert>
      </AccountCard>
    )

  return (
    <>
      <AccountCard sx={{ mb: 4 }} data-testid="responsibilities">
        {isLoadingResponsibility ? (
          <SkeletonTable columns={3} rows={2} />
        ) : (
          <>
            <Box sx={{ textAlign: 'right' }}>
              <Button
                color="primary"
                className="export"
                error={exportError}
                loading={exportLoading}
                onClick={async () => {
                  setExportError(null)
                  try {
                    setExportLoading(true)
                    const data = await authFetch(exportReportResponsibility, {})
                    csvDownload(data, 'responsibility')
                  } catch (e) {
                    setExportError(e.message)
                  }
                  setExportLoading(false)
                }}
              >
                Export
              </Button>
            </Box>

            <DataGrid
              columns={columnsResponsibility}
              rows={dataResponsibility?.data || []}
              getRowId={(row) => row.name}
              autoHeight
            />
          </>
        )}
      </AccountCard>
      <AccountCard>
        {isLoadingGrade ? (
          <SkeletonTable columns={3} rows={4} />
        ) : (
          <DataGrid
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
    field: 'total_value_total',
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
