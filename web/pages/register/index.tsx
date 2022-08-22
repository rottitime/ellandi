import CreateAccountForm from '@/components/Form/Register/CreateAccountForm/CreateAccountForm'
import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import { useUiContext } from '@/context/UiContext'
import useAuth from '@/hooks/useAuth'
import { Query } from '@/service/api'
import { useRouter } from 'next/router'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'

const RegisterPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { setError } = useUiContext()
  const { createAndLogin } = useAuth()

  const { isLoading, ...mutate } = useMutation(createAndLogin, {
    onSuccess: async (data) => {
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
