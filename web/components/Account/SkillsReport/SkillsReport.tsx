import Chip from '@/components/Chip/Chip'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import DataGrid, { GridColDef } from '@/components/UI/DataGrid/DataGrid'
import Select from '@/components/UI/Select/Select'
import SkeletonTable from '@/components/UI/Skeleton/TableSkeleton'
import useAuth from '@/hooks/useAuth'
import { fetchReportSkills, MeReportSkills, Query, ReportSkillsData } from '@/service/api'
import { FormControlLabel, Radio, RadioGroup, styled, Typography } from '@mui/material'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import functions from '@/prefetch/functions.json'
import professions from '@/prefetch/professions.json'
import grades from '@/prefetch/grades.json'
import businessUnits from '@/prefetch/business-units.json'
import { asStringList } from '@/lib/data-utils'
import SplitButton from '@/components/UI/SplitButton/SplitButton'

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

const SkillsReport = () => {
  const { authFetch } = useAuth()
  const { isLoading, data } = useQuery<MeReportSkills>([Query.ReportSkills], () =>
    authFetch(fetchReportSkills)
  )

  const skills: string[] = useMemo(
    () => (!data?.data ? [] : data.data.map(({ name }) => name).sort()),
    [data?.data]
  )

  return (
    <Card>
      <Typography variant="h2" gutterBottom>
        Skills data
      </Typography>
      {isLoading ? (
        <SkeletonTable columns={3} rows={10} />
      ) : (
        <>
          <div className="main-filters">
            <Select
              label="Select skill(s)"
              data={skills}
              sx={{ width: 314 }}
              fullWidth={false}
            />

            <RadioGroup row>
              {userOptions.map((user) => (
                <FormControlLabel
                  value={user}
                  control={<Radio />}
                  label={user}
                  key={user}
                />
              ))}
            </RadioGroup>

            <SplitButton
              label="Export"
              options={['CSV', 'Excel', 'PDF']}
              onSelected={null}
            />
          </div>
          <div className="filters">
            <Select
              label="Select profession(s)"
              data={asStringList(professions)}
              checkboxes
            />
            <Select
              label="Select function(s)"
              data={asStringList(functions)}
              checkboxes
            />
            <Select label="Select grade(s)" data={asStringList(grades)} checkboxes />
            <Select
              label="Select business unit(s)"
              data={asStringList(businessUnits)}
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
