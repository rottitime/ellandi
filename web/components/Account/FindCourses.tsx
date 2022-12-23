import React, { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import chunck from 'lodash/chunk'
import { formatDuration } from 'date-fns'
import {
  Box,
  Divider,
  FormControlLabel,
  FormGroup,
  Pagination,
  PaginationItem,
  Slider,
  styled,
  Switch,
  Typography,
  Link as MaterialLink
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded'
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded'
import CurrencyPoundRoundedIcon from '@mui/icons-material/CurrencyPoundRounded'
import Select from '../UI/Select/Select'
import TextField from '@/components/Form/TextField/TextField'
import useAuth from '@/hooks/useAuth'
import { Query } from '@/service/api'
import { fetchCourses, Course } from '@/service/me'

const Root = styled(Box)`
  background-color: ${(p) => p.theme.colors.white};
  border-radius: 10px;
  gap: ${(p) => p.theme.spacing(4)};
  ${({ theme }) => theme.breakpoints.up('md')} {
    display: flex;
  }
`
const Main = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const SidebarInner = styled(Box)`
  display: flex;
  background-color: ${(p) => p.theme.colors.grey1};
  flex-direction: column;
  width: 300px;
  border-radius: 10px;
  padding: 16px;

  .MuiSlider-markLabel[data-index='0'] {
    left: 10px !important;
  }
  .MuiSlider-markLabel[data-index='1'] {
    right: -100px !important;
  }
`

const toHoursAndMinutes = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return { hours, minutes }
}

const CourseCard = ({ course }: { course: Course }) => {
  const duration = toHoursAndMinutes(course.duration_minutes)

  return (
    <Box
      component={'article'}
      paddingY={'16px'}
      key={course.id}
      gap={'8px'}
      display="flex"
      flexDirection={'column'}
    >
      <MaterialLink
        href={`https://learn.civilservice.gov.uk/courses/${course.id}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        {course.title}
      </MaterialLink>

      <Box gap={'4px'} display="flex" flexDirection={'column'}>
        <Box display={'flex'} gap={'8px'}>
          <SchoolRoundedIcon />
          <Typography variant="body2">
            {!!course.course_type ? course.course_type : '-'}
          </Typography>
        </Box>

        <Box display={'flex'} gap={'8px'}>
          <WatchLaterRoundedIcon />

          <Typography variant="body2">
            {!!course.duration_minutes ? formatDuration(duration) : '-'}
          </Typography>
        </Box>
        <Box display={'flex'} gap={'8px'}>
          <CurrencyPoundRoundedIcon
            style={{
              color: '#fff',
              backgroundColor: '#000',
              borderRadius: '50%',
              padding: '5px',
              width: '20px',
              height: '20px',
              margin: '0 2px'
            }}
          />
          <Typography variant="body2">
            £{!!course.cost_pounds ? course.cost_pounds : '-'} (ex VAT)
          </Typography>
        </Box>
      </Box>

      <Typography variant="body2" gutterBottom>
        {course.short_description}
      </Typography>
    </Box>
  )
}

const metadata = (courses: Course[]) => {
  const course_type = new Set<string>()
  const area_of_work = new Set<string>()
  const grade = new Set<string>()

  if (courses) {
    courses.forEach((course) => {
      course_type.add(course.course_type)
    })
  }

  return {
    course_type,
    area_of_work,
    grade
  }
}

const FindCourses = () => {
  const pathname = '/account/learning/courses/'
  const { authFetch } = useAuth()

  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [activeSearchFilters, setActiveSearchFilters] = useState<{
    query: string | null
    course_type: string | string[] | null
    min_cost: number | null
    free: boolean | null
  }>({
    query: null,
    course_type: null,
    min_cost: null,
    free: null
  })

  const { isLoading, data } = useQuery<Course[]>([Query.Courses], () =>
    authFetch(fetchCourses)
  )

  const results = useMemo(() => {
    const { min_cost, course_type, query, free } = activeSearchFilters
    const searchTearm = query?.toLowerCase()

    if (!data) return []

    const findByKeyword = (course) => {
      if (!searchTearm) return true
      return (
        course.title.toLowerCase().includes(searchTearm) ||
        course.short_description.toLowerCase().includes(searchTearm)
      )
    }

    const findByCourseType = (course) => {
      if (!course_type) return true
      return course_type.includes(course.course_type)
    }
    const findByMinCost = (course) => {
      if (free === true) {
        return course.cost_pounds === 0
      }
      // if (typeof min_cost !== 'number' || min_cost === 1000) return true

      return course.cost_pounds >= min_cost
    }

    const filteredResults = data
      .filter(findByKeyword)
      .filter(findByCourseType)
      .filter(findByMinCost)

    return filteredResults.sort((a, b) => a.title.localeCompare(b.title))
  }, [data, activeSearchFilters])

  const availableFilters = useMemo(() => {
    return metadata(data)
  }, [data])

  const courseTypeOptions = useMemo(() => {
    return [...availableFilters.course_type].map((courseType) => ({
      value: courseType,
      label: courseType
    }))
  }, [availableFilters])

  const pagedResults = useMemo(() => {
    return chunck(results, 5)
  }, [results])

  useEffect(() => {
    if (router.query.page) {
      setCurrentPage(Number(router.query.page))
    } else {
      setCurrentPage(0)
    }

    if (router.query.course_type) {
      setActiveSearchFilters((v) => ({
        ...v,
        course_type: router.query.course_type
      }))
    } else {
      setActiveSearchFilters((v) => ({
        ...v,
        course_type: null
      }))
    }

    if (router.query.min_cost) {
      setActiveSearchFilters((v) => ({
        ...v,
        min_cost: parseInt(router.query.min_cost as string)
      }))
    } else {
      setActiveSearchFilters((v) => ({
        ...v,
        min_cost: null
      }))
    }
    if (router.query.free) {
      setActiveSearchFilters((v) => ({
        ...v,
        free: true
      }))
    } else {
      setActiveSearchFilters((v) => ({
        ...v,
        free: null
      }))
    }

    if (router.query.query) {
      setActiveSearchFilters((v) => ({
        ...v,
        query: router.query.query as string
      }))
    } else {
      setActiveSearchFilters((v) => ({
        ...v,
        query: null
      }))
    }
  }, [router])

  const onQueryChange = (e) => {
    router.push(
      {
        pathname,
        query: {
          ...router.query,
          query: e.target.value
        }
      },
      undefined,
      {
        scroll: false
      }
    )
  }

  const onQueryToggleFreeCourses = () => {
    if (activeSearchFilters.free === null) {
      router.push(
        {
          pathname,
          query: {
            ...router.query,
            free: true
          }
        },
        undefined,
        {
          scroll: false
        }
      )
    } else {
      router.push(
        {
          pathname,
          query: {
            ...router.query,
            free: null
          }
        },
        undefined,
        {
          scroll: false
        }
      )
    }
  }

  const activeCourseTypes = useMemo(() => {
    if (!router.query.course_type) {
      return []
    }

    let categoryTypesInQuery = []
    if (Array.isArray(router.query.course_type)) {
      categoryTypesInQuery = [...router.query.course_type]
    } else {
      categoryTypesInQuery = [router.query.course_type]
    }
    return categoryTypesInQuery
      .map((v) => {
        return courseTypeOptions.find((o) => o.value === v)
      })
      .filter(Boolean)
  }, [router, courseTypeOptions])

  return (
    <Root>
      <Box>
        <SidebarInner>
          <Typography variant="h2" gutterBottom>
            Search by:
          </Typography>

          <TextField
            size="small"
            label="Enter search term"
            variant="outlined"
            onChange={onQueryChange}
            value={activeSearchFilters.query || ''}
            style={{ backgroundColor: '#fff' }}
          />

          <Box mt={'16px'}>
            <Typography variant="h2" gutterBottom>
              Filter by:
            </Typography>

            <Typography variant="h3">Course type</Typography>
            <Box mt={'8px'} mb={'16px'}>
              <Select
                fullWidth
                key={activeCourseTypes.length}
                checkboxes
                defaultValue={activeCourseTypes?.map((v) => v.value) || []}
                data={courseTypeOptions.map((v) => v.value)}
                label="Course type"
                onChange={(e) => {
                  router.push(
                    {
                      pathname,
                      query: {
                        ...router.query,
                        page: 0,
                        course_type: e.target.value as Array<string>
                      }
                    },
                    undefined,
                    {
                      scroll: false
                    }
                  )
                }}
              />
            </Box>
          </Box>

          <Typography variant="h3">Course cost</Typography>

          <Slider
            disabled={activeSearchFilters.free === true}
            step={250}
            valueLabelDisplay="auto"
            value={activeSearchFilters.min_cost || 0}
            marks={[
              {
                value: 0,
                label: '£0+'
              },
              { value: 1000, label: '£1000+' }
            ]}
            min={0}
            max={1000}
            valueLabelFormat={(v) => `£${v}+`}
            onChange={(_, v) => {
              router.push(
                {
                  pathname,
                  query: {
                    ...router.query,
                    min_cost: v
                  }
                },
                undefined,
                {
                  scroll: false
                }
              )
            }}
          />

          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={!!activeSearchFilters?.free}
                  onClick={onQueryToggleFreeCourses}
                />
              }
              label="Free only"
            />
          </FormGroup>
        </SidebarInner>
      </Box>

      <Main>
        {isLoading && <p>loading...</p>}
        <section>
          {pagedResults &&
            pagedResults[currentPage] &&
            pagedResults[currentPage].map((course) => (
              <div key={course.id}>
                <CourseCard course={course} />
                <Divider component="div" />
              </div>
            ))}
        </section>
        {pagedResults.length > 1 && (
          <Box mt={'16px'}>
            <Pagination
              page={currentPage + 1}
              count={pagedResults.length}
              renderItem={(item) => (
                <Link
                  key={item.page}
                  href={{
                    pathname,
                    query: { ...router.query, page: item.page - 1 }
                  }}
                >
                  <PaginationItem {...item} />
                </Link>
              )}
            />
          </Box>
        )}
        {!isLoading && pagedResults.length === 0 && <p>No results</p>}
      </Main>
    </Root>
  )
}

export default FindCourses
