import Page, { FormFooter } from '@/components/Layout/GenericPage'
import LinkButton from '@/components/LinkButton'
import { Alert, AlertTitle, Skeleton, Stack, styled, Typography } from '@mui/material'
import Link from '@/components/UI/Link'
import ToggleChip from '@/components/ToggleChip'
import { fetchProfessions } from '@/service/api'
import { GenericDataList } from '@/service/types'
import { useUiContext } from '@/context/UiContext'
import { useQuery } from 'react-query'
import { useEffect } from 'react'

const List = styled(Stack)`
  .MuiChip-root {
    margin: 3px;
  }
`

const RegisterPage = () => {
  const { setLoading } = useUiContext()
  const { isLoading, isError, data } = useQuery<GenericDataList[], { message?: string }>(
    'professions',
    fetchProfessions,
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
        Select the Profession(s) that you belong to. You may choose more than one
      </Typography>

      <Typography gutterBottom>
        We'll use this to suggest learning and career development opportunities that are
        relevant to you
      </Typography>

      <List
        direction="row"
        flexWrap="wrap"
        spacing={0}
        justifyContent="center"
        aria-live="polite"
        aria-busy={isLoading}
      >
        {isLoading
          ? [...Array(22).keys()].map((i) => (
              <Skeleton key={i} width={100} sx={{ m: 1 }} />
            ))
          : data.map(({ name, slug }) => <ToggleChip key={slug} label={name} />)}
      </List>

      <FormFooter>
        <LinkButton href="/register/page6" variant="outlined">
          Back
        </LinkButton>

        <LinkButton href="/register/page8">Continue</LinkButton>
      </FormFooter>
    </>
  )
}

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page
    title="Create an account - Current profession"
    footer={
      <Typography gutterBottom>
        <Link href="/register/page8">Skip this step</Link>
      </Typography>
    }
    progress={40}
  >
    {page}
  </Page>
)
