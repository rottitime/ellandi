import Page, { FormFooter } from '@/components/Layout/GenericPage'
import Link from '@/components/UI/Link'
import {
  Alert,
  AlertTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import LinkButton from '@/components/LinkButton'
import { useUiContext } from '@/context/UiContext'
import { GenericDataList } from '@/service/types'
import { useQuery } from 'react-query'
import { fetchContractTypes } from '@/service/api'
import { useEffect } from 'react'
import RadioSkeleton from '@/components/UI/Skeleton/RadioSkeleton'

const RegisterPage = () => {
  const { setLoading } = useUiContext()
  const { isLoading, isError, data } = useQuery<GenericDataList[], { message?: string }>(
    'contract-types',
    fetchContractTypes,
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
      <Typography variant="subtitle1" gutterBottom>
        Select your contract type. You can only choose one
      </Typography>
      <Typography gutterBottom>
        We'll use this to suggest learning and career development opportunities that are
        relevant to you
      </Typography>

      <RadioGroup>
        {isLoading
          ? [...Array(4).keys()].map((i) => (
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
        <Link href="/register/page9">Skip this step</Link>
      </Typography>

      <FormFooter>
        <LinkButton href="/register/page7" variant="outlined">
          Back
        </LinkButton>

        <LinkButton href="/register/page9">Continue</LinkButton>
      </FormFooter>
    </>
  )
}

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page title="Create an account - Current contract type" progress={50}>
    {page}
  </Page>
)
