import CreateAccountForm from '@/components/Form/Register/CreateAccountForm/CreateAccountForm'
import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import { useUiContext } from '@/context/UiContext'
import useAuth from '@/hooks/useAuth'
import { Query, RegisterUserResponse } from '@/service/api'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'

const RegisterPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { createAndLogin } = useAuth()
  const { setError } = useUiContext()

  useEffect(() => () => setError(''), [setError])

  const { isLoading, ...mutate } = useMutation(createAndLogin, {
    onSuccess: async (data: RegisterUserResponse) => {
      queryClient.setQueryData(Query.Me, data)
      router.push(`/register/step/0`)
    },
    onError: ({ message }) => setError(message)
  })

  return (
    <CreateAccountForm
      backUrl="/"
      defaultValues={{}}
      buttonLoading={isLoading}
      onFormSubmit={(data) => mutate.mutate(data)}
    />
  )
}

export default RegisterPage

RegisterPage.getLayout = (page) => {
  return <CardLayout title="Create an account">{page}</CardLayout>
}
