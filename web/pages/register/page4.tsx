import Page from '@/components/Layout/GenericPage'
// import router from 'next/router'
import PrivacyForm from '@/components/Form/Register/PrivacyForm'
import { useMutation, useQueryClient } from 'react-query'
import { useState } from 'react'
import {
  PrivacyAcceptType,
  Query,
  RegisterUser,
  RegisterUserResponse
} from '@/service/types'
import { updateUser } from '@/service/user'

const page = 4

const RegisterPage = () => {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<RegisterUserResponse>(Query.RegisterUser)
  const id = data?.id

  const [error, setError] = useState(null)
  const { isError, isLoading, ...mutate } = useMutation<
    RegisterUserResponse,
    Error,
    RegisterUser
  >(async (data) => updateUser(id, data), {
    onSuccess: (data) => {
      queryClient.setQueryData(Query.RegisterUser, data)
      // router.push(`/register/page${page + 1}`)
    },
    onError: ({ message }) => setError(message)
  })

  return (
    <PrivacyForm
      backUrl={`/register/page${page - 1}`}
      onFormSubmit={(data) => {
        // eslint-disable-next-line no-console
        console.log({ data })
        //router.push(`/register/page${page + 1}`)
      }}
    />
  )
}

export default RegisterPage

RegisterPage.getLayout = (page) => (
  <Page title="Privacy policy" progress={10}>
    {page}
  </Page>
)
