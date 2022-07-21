import CardLayout from '@/components/Layout/CardLayout'
import PrivacyForm from '@/components/Form/Register/PrivacyForm'
import { useMutation, useQueryClient } from 'react-query'
import { useState } from 'react'
import { Query, RegisterUserResponse } from '@/service/types'
import { updateUser } from '@/service/user'
import { Alert, Fade } from '@mui/material'
import router from 'next/router'

const page = 4

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

      <PrivacyForm
        loading={isLoading}
        defaultValues={data}
        backUrl={`/register/page${page - 1}`}
        onFormSubmit={(data) => mutate.mutate(data)}
      />
    </>
  )
}

export default RegisterPage

RegisterPage.getLayout = (page) => (
  <CardLayout title="Privacy policy" progress={10}>
    {page}
  </CardLayout>
)
