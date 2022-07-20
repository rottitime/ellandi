import CardLayout from '@/components/Layout/CardLayout'
import router from 'next/router'
import RegisterDetailsForm from '@/components/Form/Register/RegisterDetailsForm'
import { dehydrate, QueryClient, useMutation, useQueryClient } from 'react-query'
import { fetchCountries, Query, RegisterUserResponse } from '@/service/api'
import { updateUser } from '@/service/user'
import { useState } from 'react'
import { Alert, Fade } from '@mui/material'

const page = 5

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

      <RegisterDetailsForm
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

  await queryClient.prefetchQuery(Query.Countries, fetchCountries)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

RegisterPage.getLayout = (page) => (
  <CardLayout title="Your details" progress={20}>
    {page}
  </CardLayout>
)
