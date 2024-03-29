import Chip from '@/components/Chip/Chip'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import Select from '@/components/UI/Select/Select'
import SkeletonTable from '@/components/UI/Skeleton/TableSkeleton'
import useAuth from '@/hooks/useAuth'
import {
  exportReportLearning,
  fetchReportLearning,
  MeReportLearning,
  Query
} from '@/service/api'
import {
  Alert,
  Box,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  styled,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FiltersType, UserOptions, UsersType } from './types'
import professions from '@/prefetch/professions.json'
import functions from '@/prefetch/functions.json'
import grades from '@/prefetch/grades.json'
import businessUnits from '@/prefetch/business-units.json'
import { asStringList, csvDownload } from '@/lib/data-utils'
import useDebounce from '@/hooks/useDebounce'
import Button from '@/components/UI/Button/Button'
import SimpleTable from '@/components/UI/SimpleTable/SimpleTable'
import LearningDistribution from '../LearningDistribution/LearningDistribution'
import LearningGoalBar from '../LearningGoalBar/LearningGoalBar'

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
    flex-direction: column;
    gap: ${(p) => p.theme.spacing(3)};
    margin-bottom: ${(p) => p.theme.spacing(4)};
    ${({ theme }) => theme.breakpoints.up('md')} {
      gap: ${(p) => p.theme.spacing(4)};
      display: flex;
      flex-direction: row;
    }
  }
`

const userOptions: UserOptions = [
  { label: 'All', value: 'all' },
  { label: 'Line managers', value: 'line_managers' },
  { label: 'Mentors', value: 'mentors' }
]

const LanguagesReport = () => {
  const { authFetch } = useAuth()
  const [filters, setFilters] = useState<FiltersType>({ users: 'all' })
  const [exportLoading, setExportLoading] = useState(false)
  const [exportError, setExportError] = useState()
  const debouncedSearchQuery = useDebounce(filters, 600)

  const { isLoading, data, isFetching, isSuccess, isError, error } = useQuery<
    MeReportLearning,
    Error
  >(
    [Query.ReportLearning, debouncedSearchQuery],
    () => authFetch(fetchReportLearning, debouncedSearchQuery),
    {
      staleTime: Infinity,
      keepPreviousData: true
    }
  )

  return (
    <Card>
      <Typography variant="h2" gutterBottom>
        Learning data
      </Typography>

      {isLoading && <SkeletonTable columns={3} rows={5} />}
      {isError && (
        <Alert severity="error" sx={{ mt: 3, mb: 3 }}>
          {error?.message}
        </Alert>
      )}
      {isSuccess && (
        <>
          <div className="main-filters">
            <RadioGroup
              className="user-type"
              row
              defaultValue={filters?.users}
              onChange={(e) =>
                setFilters((p) => ({
                  ...p,
                  users: e.target.value as UsersType
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
            <Box className="export">
              <Button
                color="primary"
                error={exportError}
                loading={exportLoading}
                onClick={async () => {
                  setExportError(null)
                  try {
                    setExportLoading(true)
                    const data = await authFetch(exportReportLearning, filters)
                    csvDownload(data, 'learning')
                  } catch (e) {
                    setExportError(e.message)
                  }
                  setExportLoading(false)
                }}
              >
                Export
              </Button>
            </Box>
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
              onChange={(e) => {
                setFilters((p) => ({
                  ...p,
                  grades: e.target.value as string[]
                }))
              }}
              checkboxes
            />
            <Select
              label="Select business unit(s)"
              defaultValue={filters?.business_units || []}
              data={asStringList(businessUnits)}
              onChange={(e) => {
                setFilters((p) => ({
                  ...p,
                  business_units: e.target.value as string[]
                }))
              }}
              checkboxes
            />
          </div>
          <Grid container spacing={5} sx={{ mb: 5 }}>
            <Grid item md={6}>
              <LearningDistribution
                description="Data based on the current financial year so far"
                barData={data?.distribution}
              />
            </Grid>
            <Grid item md={6}>
              <LearningGoalBar
                description="Average number of days learning completed per person so far this financial year"
                disableFetch
                days={data.goal_value_days}
                percentage={data.goal_value_percentage}
              />
            </Grid>
          </Grid>

          <SimpleTable
            loading={isFetching}
            headers={[{ children: 'Course cost' }, { children: null }]}
            list={[
              [
                { children: <>Average cost</> },
                {
                  children: (
                    <Chip
                      label={data.course_average_cost_label}
                      brandColor="black"
                      data-testid="average-cost"
                    />
                  ),
                  align: 'right'
                }
              ],
              [
                { children: <Typography variant="h3">Total course cost</Typography> },
                {
                  children: (
                    <Chip
                      label={data.course_total_cost_label}
                      brandColor="black"
                      data-testid="total-cost"
                    />
                  ),
                  align: 'right'
                }
              ]
            ]}
          />
        </>
      )}
    </Card>
  )
}

export default LanguagesReport
