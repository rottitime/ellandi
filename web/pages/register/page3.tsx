import Page from '@/components/Layout/GenericPage'
import CreateAccountForm from '@/components/Form/Register/CreateAccountForm'
import { useQueryClient, useMutation } from 'react-query'
import { RegisterUser, RegisterUserResponse, Query } from '@/service/types'
import { createUser } from '@/service/user'
import router from 'next/router'
import { Alert, Fade } from '@mui/material'
import { useState } from 'react'

const page = 3

const RegisterPage = () => {
  const queryClient = useQueryClient()
  const [error, setError] = useState(null)
  const { isError, isLoading, ...mutate } = useMutation<
    RegisterUserResponse,
    Error,
    RegisterUser
  >(async (data) => createUser(data), {
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

      <CreateAccountForm
        backUrl="/register"
        loading={isLoading}
        onFormSubmit={({ email, password }) => mutate.mutate({ email, password })}
      />
    </>
  )
}

export default RegisterPage

RegisterPage.getLayout = (page) => (
  <Page title="Create an account" progress={5}>
    {page}
  </Page>
)
