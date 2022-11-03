import Chip from '@/components/Chip/Chip'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import DataGrid, { GridColDef } from '@/components/UI/DataGrid/DataGrid'
import Select from '@/components/UI/Select/Select'
import SkeletonTable from '@/components/UI/Skeleton/TableSkeleton'
import useAuth from '@/hooks/useAuth'
import {
  exportReportSkills,
  fetchReportSkills,
  MeReportSkills,
  Query,
  ReportSkillsData
} from '@/service/api'
import { FormControlLabel, Radio, RadioGroup, styled, Typography } from '@mui/material'
import { FC, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import functions from '@/prefetch/functions.json'
import professions from '@/prefetch/professions.json'
import grades from '@/prefetch/grades.json'
import businessUnits from '@/prefetch/business-units.json'
import { asStringList } from '@/lib/data-utils'
import SplitButton from '@/components/UI/SplitButton/SplitButton'
import { FiltersType, Props } from './types'
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

const userOptions = ['All', 'Line managers', 'Mentors']

const SkillsReport: FC<Props> = (props) => {
  const { authFetch } = useAuth()
  const [filters, setFilters] = useState<FiltersType>({})
  const debouncedSearchQuery = useDebounce(filters, 600)

  const { isLoading, data } = useQuery<MeReportSkills>(
    [Query.ReportSkills, debouncedSearchQuery],
    () => authFetch(fetchReportSkills, debouncedSearchQuery),
    { keepPreviousData: true }
  )

  const skills: string[] = useMemo(
    () => (!data?.data ? [] : data.data.map(({ name }) => name).sort()),
    [data?.data]
  )

  return (
    <Card {...props}>
      <Typography variant="h2" gutterBottom>
        Skills data
      </Typography>
      {isLoading ? (
        <SkeletonTable columns={3} rows={10} />
      ) : (
        <>
          <div className="main-filters">
            <Select
              defaultValue={filters?.skills?.split(',') || []}
              label="Select skill(s)"
              data={skills}
              sx={{ width: 314 }}
              onChange={(e) => {
                setFilters((p) => ({
                  ...p,
                  skills: (e.target.value as string[]).join(',')
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
          <div className="filters">
            <Select
              label="Select profession(s)"
              defaultValue={filters?.professions?.split(',') || []}
              data={asStringList(professions)}
              onChange={(e) => {
                setFilters((p) => ({
                  ...p,
                  professions: (e.target.value as string[]).join(',')
                }))
              }}
              checkboxes
            />
            <Select
              label="Select function(s)"
              defaultValue={filters?.functions?.split(',') || []}
              data={asStringList(functions)}
              onChange={(e) => {
                setFilters((p) => ({
                  ...p,
                  functions: (e.target.value as string[]).join(',')
                }))
              }}
              checkboxes
            />
            <Select
              label="Select grade(s)"
              defaultValue={filters?.grades?.split(',') || []}
              data={asStringList(grades)}
              onChange={(e) =>
                setFilters((p) => ({
                  ...p,
                  grades: (e.target.value as string[]).join(',')
                }))
              }
              checkboxes
            />
            <Select
              label="Select business unit(s)"
              defaultValue={filters?.business_unit?.split(',') || []}
              data={asStringList(businessUnits)}
              onChange={(e) =>
                setFilters((p) => ({
                  ...p,
                  business_unit: (e.target.value as string[]).join(',')
                }))
              }
              checkboxes
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
    field: 'skill_value_percentage',
    headerName: 'Total with skill (%)',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue, row }) =>
      formattedValue && <Chip label={row.skill_label} />,
    flex: 1
  },
  {
    field: 'skills_develop_value_percentage',
    headerName: 'Total with skill they would like to develop (%)',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue, row }) =>
      formattedValue && <Chip label={row.skills_develop_label} />,
    flex: 1
  }
]
