import Chip from '@/components/Chip/Chip'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import DataGrid, { GridColDef } from '@/components/UI/DataGrid/DataGrid'
import Select from '@/components/UI/Select/Select'
import SkeletonTable from '@/components/UI/Skeleton/TableSkeleton'
import useAuth from '@/hooks/useAuth'
import {
  exportReportSkills,
  fetchReportLanguages,
  MeReportSkills,
  Query,
  ReportLanguagesData
} from '@/service/api'
import { FormControlLabel, Radio, RadioGroup, styled, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import SplitButton from '@/components/UI/SplitButton/SplitButton'
import { FiltersType } from './types'

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
  const [filters, setFilters] = useState<FiltersType>({})

  const { isLoading, data } = useQuery<MeReportSkills>(
    [Query.ReportLanguages, filters],
    () => authFetch(fetchReportLanguages, filters),
    { keepPreviousData: true }
  )

  const languages: string[] = useMemo(
    () => (!data?.data ? [] : data.data.map(({ name }) => name).sort()),
    [data?.data]
  )

  return (
    <Card>
      <Typography variant="h2" gutterBottom>
        Languages data
      </Typography>
      {isLoading ? (
        <SkeletonTable columns={3} rows={10} />
      ) : (
        <>
          <div className="main-filters">
            <Select
              defaultValue={filters?.languages?.split(',') || []}
              label="Select languages(s)"
              data={languages}
              sx={{ width: 314 }}
              onChange={(e) => {
                setFilters((p) => ({
                  ...p,
                  languages: (e.target.value as string[]).join(',')
                }))
              }}
              fullWidth={false}
              checkboxes
            />

            <RadioGroup
              row
              defaultValue={userOptions[0]}
              onChange={(e) =>
                setFilters((p) => ({
                  ...p,
                  users: e.target.value
                }))
              }
            >
              {userOptions.map((option, i) => (
                <FormControlLabel
                  value={option}
                  control={<Radio />}
                  label={option}
                  key={option}
                />
              ))}
            </RadioGroup>

            <SplitButton
              label="Export"
              options={['CSV', 'Excel', 'PDF']}
              onSelected={(_, option) => {
                const url = exportReportSkills({
                  ...filters,
                  format: option.toLowerCase()
                })
                window.open(url)
              }}
            />
          </div>

          <DataGrid
            pageSize={10}
            columns={columns}
            rows={data.data}
            getRowId={(row) => row.name}
            autoHeight
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
    renderCell: ({ formattedValue, row }) =>
      formattedValue && <Chip label={row.basic_label} />,
    flex: 1
  },
  {
    field: 'independent_value_percentage',
    headerName: 'Total (%) independent',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue, row }) =>
      formattedValue && <Chip label={row.independent_label} />,
    flex: 1
  },
  {
    field: 'proficient_value_percentage',
    headerName: 'Total (%) proficient',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue, row }) =>
      formattedValue && <Chip label={row.proficient_label} />,
    flex: 1
  },
  {
    field: 'native_value_percentage',
    headerName: 'Total (%) native',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue, row }) =>
      formattedValue && <Chip label={row.native_label} />,
    flex: 1
  }
]
