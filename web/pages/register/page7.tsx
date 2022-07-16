import Page from '@/components/Layout/GenericPage'
import { Alert, Fade, Typography } from '@mui/material'
import Link from '@/components/UI/Link'
import ProfessionForm from '@/components/Form/Register/ProfessionForm'
import router from 'next/router'
import { dehydrate, QueryClient, useMutation, useQueryClient } from 'react-query'
import { fetchProfessions, Query, RegisterUserResponse } from '@/service/api'
import { useState } from 'react'
import { updateUser } from '@/service/user'

const page = 7

const RegisterPage = () => {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<RegisterUserResponse>(Query.RegisterUser)
  const id = data?.id
  const [error, setError] = useState(null)

  const { isError, isLoading, ...mutate } = useMutation<
    RegisterUserResponse,
    Error,
    Partial<RegisterUserResponse>
  >(async (data) => updateUser(id, data), {
    onSuccess: (data) => {
      queryClient.setQueryData(Query.RegisterUser, data)
      router.push(`/register/page${page + 1}`)
    },
    onError: ({ message }) => setError(message)
  })

  return (
    <>
      {isError && (
        <Fade in={!!isError}>
          <Alert severity="error" sx={{ mt: 3, mb: 3 }}>
            <>{error}</>
          </Alert>
        </Fade>
      )}
      <ProfessionForm
        defaultValues={data}
        loading={isLoading}
        backUrl={`/register/page${page - 1}`}
        onFormSubmit={(data) => mutate.mutate(data)}
      />
    </>
  )
}

export default RegisterPage

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(Query.Professions, fetchProfessions)
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

RegisterPage.getLayout = (ui) => (
  <Page
    title="Profession"
    footer={
      <Typography gutterBottom>
        <Link href={`/register/page${page + 1}`}>Skip this step</Link>
      </Typography>
    }
    progress={40}
  >
    {ui}
  </Page>
)
