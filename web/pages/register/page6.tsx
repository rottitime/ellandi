import Link from '@/components/UI/Link'
import LinkButton from '@/components/LinkButton'
import Page, { FormFooter } from '@/components/Layout/GenericPage'
import {
  Alert,
  AlertTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import { useQuery } from 'react-query'
import RadioSkeleton from '@/components/UI/Skeleton/RadioSkeleton'
import { fetchGrades } from '@/service/api'
import { GradeData } from '@/service/types'
import { useUiContext } from '@/context/UiContext'
import { useEffect } from 'react'

const RegisterPage = () => {
  const { setLoading } = useUiContext()
  const { isLoading, isError, data } = useQuery<GradeData[], { message?: string }>(
    'grades',
    fetchGrades,
    { staleTime: Infinity }
  )

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  if (isError)
    return (
      <Alert severity="error">
        <AlertTitle>Service Unavailable</AlertTitle>
        Please try again later.
      </Alert>
    )

  return (
    <>
      <Typography variant="h1" gutterBottom></Typography>

      <Typography variant="subtitle1" gutterBottom>
        Select your grade. You may only choose one
      </Typography>

      <Typography gutterBottom>
        We'll use this to suggest learning and career development opportunities that are
        relevant to you
      </Typography>

      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        aria-live="polite"
        aria-busy={isLoading}
        name="radio-buttons-group"
      >
        {isLoading
          ? [...Array(5).keys()].map((i) => (
              <RadioSkeleton key={i} width="80%" sx={{ mb: 1 }} />
            ))
          : data.map(({ name, slug }) => (
              <FormControlLabel
                key={slug}
                control={<Radio />}
                label={name}
                value={slug}
              />
            ))}
      </RadioGroup>

      <Typography gutterBottom>
        <Link href="/register/page7">Skip this step</Link>
      </Typography>

      <FormFooter>
        <LinkButton href="/register/page5" variant="outlined">
          Back
        </LinkButton>

        <LinkButton href="/register/page7">Continue</LinkButton>
      </FormFooter>
    </>
  )
}

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page title="Create a profile - Grade" progress={30}>
    {page}
  </Page>
)
