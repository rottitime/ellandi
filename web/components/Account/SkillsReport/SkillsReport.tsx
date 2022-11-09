import Dialog from '@/components/UI/Dialogs/Dialog/Dialog'
import Chip from '@/components/Chip/Chip'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import DataGrid, { GridColDef } from '@/components/UI/DataGrid/DataGrid'
import Select from '@/components/UI/Select/Select'
import SkeletonTable from '@/components/UI/Skeleton/TableSkeleton'
import useAuth from '@/hooks/useAuth'
import {
  exportReportSkills,
  fetchReportSkills,
  fetchSkills,
  MeReportSkills,
  Query,
  ReportSkillsData
} from '@/service/api'
import {
  Alert,
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  styled,
  Typography
} from '@mui/material'
import { FC, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import functions from '@/prefetch/functions.json'
import professions from '@/prefetch/professions.json'
import grades from '@/prefetch/grades.json'
import businessUnits from '@/prefetch/business-units.json'
import { asStringList, csvDownload } from '@/lib/data-utils'
import { ChartValues, FiltersType, Props, UserOptions } from './types'
import useDebounce from '@/hooks/useDebounce'
import SimpleTable from '@/components/UI/SimpleTable/SimpleTable'
import Chart from '@/components/UI/Chart/Chart'
import Button from '@/components/UI/Button/Button'

const Card = styled(AccountCard)`
  .main-filters {
    display: flex;
    margin-bottom: ${(p) => p.theme.spacing(4)};
    gap: ${(p) => p.theme.spacing(3)};
    .export {
      margin-left: auto;
      text-align: right;
      p {
        text-align: inherit;
      }
    }
  }
  .filters {
    display: flex;
    margin-bottom: ${(p) => p.theme.spacing(3)};
    gap: ${(p) => p.theme.spacing(4)};
  }
`

const Pane = styled(Box)`
  display: flex;
`

const userOptions: UserOptions = [
  { label: 'All', value: 'all' },
  { label: 'Line managers', value: 'line_managers' },
  { label: 'Mentors', value: 'mentors' }
]

const SkillsReport: FC<Props> = (props) => {
  const { authFetch } = useAuth()
  const [filters, setFilters] = useState<FiltersType>({ users: 'all' })
  const [dialog, setDialog] = useState<ReportSkillsData>(undefined)
  const [exportLoading, setExportLoading] = useState(false)
  const [exportError, setExportError] = useState()

  const debouncedSearchQuery = useDebounce(filters, 600)

  const { isSuccess: isSuccessSkills, data: skillsList } = useQuery<string[], Error>(
    Query.Skills,
    fetchSkills,
    { staleTime: Infinity }
  )

  const { isLoading, data, isFetching, error, isError, isSuccess } = useQuery<
    MeReportSkills,
    Error
  >(
    [Query.ReportSkills, debouncedSearchQuery],
    () => authFetch(fetchReportSkills, debouncedSearchQuery),
    {
      staleTime: Infinity,
      keepPreviousData: true
    }
  )

  const onClose = () => setDialog(null)

  const skills: string[] = useMemo(
    () => (isSuccessSkills ? skillsList.sort() : []),
    [isSuccessSkills, skillsList]
  )

  const chartValues: ChartValues[] = !!dialog
    ? [
        {
          label: 'Beginner',
          valuePercentage: 'beginner_value_percentage',
          valueLabel: 'beginner_label',
          color: 'teal'
        },
        {
          label: 'Advanced beginner',
          valuePercentage: 'advanced_beginner_value_percentage',
          valueLabel: 'advanced_beginner_label',
          color: 'black'
        },
        {
          label: 'Competent',
          valuePercentage: 'competent_value_percentage',
          valueLabel: 'competent_label',
          color: 'green2'
        },
        {
          label: 'Proficient',
          valuePercentage: 'proficient_value_percentage',
          valueLabel: 'proficient_label',
          color: 'grey1'
        },
        {
          label: 'Expert',
          valuePercentage: 'expert_value_percentage',
          valueLabel: 'expert_label',
          color: 'grey3'
        }
      ]
    : []

  return (
    <>
      <Card {...props}>
        <Typography variant="h2" gutterBottom>
          Skills data
        </Typography>

        {isError && (
          <Alert severity="error" sx={{ mt: 3, mb: 3 }}>
            {error?.message}
          </Alert>
        )}

        {isLoading && <SkeletonTable columns={3} rows={5} />}

        {isSuccess && (
          <>
            <div className="main-filters">
              <Select
                disabled={!isSuccessSkills}
                defaultValue={filters?.skills || []}
                label="Select skill(s)"
                data={skills}
                sx={{ width: 314 }}
                onChange={(e) => {
                  setFilters((p) => ({
                    ...p,
                    skills: e.target.value as string[]
                  }))
                }}
                fullWidth={false}
                checkboxes
              />

              <RadioGroup
                row
                defaultValue={filters.users}
                onChange={(e) =>
                  setFilters((p) => ({
                    ...p,
                    users: e.target.value
                  }))
                }
              >
                {userOptions.map((options) => (
                  <FormControlLabel
                    {...options}
                    control={<Radio />}
                    key={options.value as string}
                  />
                ))}
              </RadioGroup>
              <div className="export">
                <Button
                  color="primary"
                  error={exportError}
                  loading={exportLoading}
                  onClick={async () => {
                    setExportError(null)
                    try {
                      setExportLoading(true)
                      const data = await authFetch(exportReportSkills, filters)
                      csvDownload(data, 'skills')
                    } catch (e) {
                      setExportError(e.message)
                    }
                    setExportLoading(false)
                  }}
                >
                  Export
                </Button>
              </div>
            </div>
            <div className="filters">
              <Select
                label="Select profession(s)"
                defaultValue={filters?.professions || []}
                data={asStringList(professions)}
                onChange={(e) => {
                  setFilters((p) => ({
                    ...p,
                    professions: e.target.value as string[]
                  }))
                }}
                checkboxes
              />
              <Select
                label="Select function(s)"
                defaultValue={filters?.functions || []}
                data={asStringList(functions)}
                onChange={(e) => {
                  setFilters((p) => ({
                    ...p,
                    functions: e.target.value as string[]
                  }))
                }}
                checkboxes
              />
              <Select
                label="Select grade(s)"
                defaultValue={filters?.grades || []}
                data={asStringList(grades)}
                onChange={(e) =>
                  setFilters((p) => ({
                    ...p,
                    grades: e.target.value as string[]
                  }))
                }
                checkboxes
              />
              <Select
                label="Select business unit(s)"
                defaultValue={filters?.business_unit || []}
                data={asStringList(businessUnits)}
                onChange={(e) =>
                  setFilters((p) => ({
                    ...p,
                    business_unit: e.target.value as string[]
                  }))
                }
                checkboxes
              />
            </div>

            <DataGrid
              pageSize={10}
              columns={columns}
              onRowClick={({ row }) => setDialog(row)}
              rows={data?.data || []}
              getRowId={(row) => row.name}
              headerHeight={80}
              autoHeight
              loading={isFetching}
              initialState={{
                sorting: {
                  sortModel: [{ field: 'skill_value_total', sort: 'desc' }]
                }
              }}
              columnVisibilityModel={{
                total_users: false
              }}
            />
          </>
        )}
      </Card>
      <Dialog
        title={''}
        open={!!dialog}
        onClose={onClose}
        data-testid="datagrid-graph-modal"
      >
        {dialog && (
          <Pane>
            <Box>
              <Chart
                colors={chartValues.map(({ color }) => color)}
                data={{
                  columns: chartValues.map(({ label, valuePercentage }) => [
                    label,
                    dialog[valuePercentage]
                  ]),
                  type: 'pie'
                }}
                hideLegends
              />
            </Box>
            <SimpleTable
              headers={[{ children: 'Level' }, { children: 'Total number (%)' }]}
              list={chartValues.map((item) => [
                { children: <>{item.label}</> },
                {
                  children: (
                    <Chip label={dialog[item.valueLabel]} brandColor={item.color} />
                  )
                }
              ])}
            />
          </Pane>
        )}
      </Dialog>
    </>
  )
}

export default SkillsReport

const columns: GridColDef<ReportSkillsData>[] = [
  {
    field: 'name',
    headerName: 'Skill',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue }) => formattedValue,
    flex: 1
  },
  {
    field: 'skill_value_total',
    headerName: 'Total with skill (%)',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ row }) => <Chip label={row.skill_label} />,
    flex: 1,
    maxWidth: 286
  },
  {
    field: 'skills_develop_value_total',
    headerName: 'Total with skill they would like to develop (%)',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ row }) => <Chip label={row.skill_develop_label} />,
    flex: 1,
    maxWidth: 286
  },
  {
    field: 'total_users',
    disableColumnMenu: true,
    resizable: false
  }
]
