import Chip from '@/components/Chip/Chip'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import DataGrid, { GridColDef } from '@/components/UI/DataGrid/DataGrid'
import Select from '@/components/UI/Select/Select'
import SkeletonTable from '@/components/UI/Skeleton/TableSkeleton'
import useAuth from '@/hooks/useAuth'
import {
  fetchReportLanguages,
  MeReportLanguages,
  Query,
  ReportLanguagesData
} from '@/service/api'
import { FormControlLabel, Radio, RadioGroup, styled, Typography } from '@mui/material'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { FiltersType } from './types'
import languages from '@/prefetch/languages.json'
import { asStringList } from '@/lib/data-utils'
import useDebounce from '@/hooks/useDebounce'

const Card = styled(AccountCard)`
  .main-filters {
    display: flex;
    margin-bottom: ${(p) => p.theme.spacing(4)};
    gap: ${(p) => p.theme.spacing(3)};
    .splitbutton {
      margin-left: auto;
    }
  }
  .filters {
    display: flex;
    margin-bottom: ${(p) => p.theme.spacing(3)};
    gap: ${(p) => p.theme.spacing(4)};
  }
`

const userOptions = ['Speaking', 'Writing']

const LanguagesReport = () => {
  const { authFetch } = useAuth()
  const [filters, setFilters] = useState<FiltersType>({ type: 'speaking' })
  const debouncedSearchQuery = useDebounce(filters, 600)

  const { isLoading, data, isFetching } = useQuery<MeReportLanguages>(
    [Query.ReportLanguages, debouncedSearchQuery],
    () => authFetch(fetchReportLanguages, debouncedSearchQuery),
    {
      staleTime: Infinity,
      keepPreviousData: true
    }
  )

  return (
    <Card>
      <Typography variant="h2" gutterBottom>
        Languages data
      </Typography>
      {isLoading ? (
        <SkeletonTable columns={3} rows={5} />
      ) : (
        <>
          <div className="main-filters">
            <Select
              disabled={!languages.length}
              defaultValue={filters?.languages || []}
              label="Select languages(s)"
              data={asStringList(languages)}
              sx={{ width: 314 }}
              onChange={(e) => {
                setFilters((p) => ({
                  ...p,
                  languages: e.target.value as string[]
                }))
              }}
              fullWidth={false}
              checkboxes
            />

            <RadioGroup
              row
              defaultValue={filters.type}
              onChange={(e) =>
                setFilters((p) => ({
                  ...p,
                  type: e.target.value
                }))
              }
            >
              {userOptions.map((option) => (
                <FormControlLabel
                  value={option.toLowerCase()}
                  control={<Radio />}
                  label={option}
                  key={option}
                />
              ))}
            </RadioGroup>
          </div>

          <DataGrid
            pageSize={10}
            columns={columns}
            rows={data?.data || []}
            getRowId={(row) => row.name}
            autoHeight
            loading={isFetching}
          />
        </>
      )}
    </Card>
  )
}

export default LanguagesReport

const columns: GridColDef<ReportLanguagesData>[] = [
  {
    field: 'name',
    headerName: 'Language',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue }) => formattedValue,
    flex: 1
  },
  {
    field: 'basic_value_percentage',
    headerName: 'Total (%) basic',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ row }) => <Chip label={row.basic_label} />,
    flex: 1,
    maxWidth: 204
  },
  {
    field: 'independent_value_percentage',
    headerName: 'Total (%) independent',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ row }) => <Chip label={row.independent_label} />,
    flex: 1,
    maxWidth: 204
  },
  {
    field: 'proficient_value_percentage',
    headerName: 'Total (%) proficient',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ row }) => <Chip label={row.proficient_label} />,
    flex: 1,
    maxWidth: 204
  },
  {
    field: 'native_value_percentage',
    headerName: 'Total (%) native',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ row }) => <Chip label={row.native_label} />,
    flex: 1,
    maxWidth: 204
  }
]
