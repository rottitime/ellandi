import CreateAccountForm from '@/components/Form/Register/CreateAccountForm/CreateAccountForm'
import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import { useUiContext } from '@/context/UiContext'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const RegisterPage = () => {
  const router = useRouter()

  const { createAndLogin } = useAuth()
  const { setError } = useUiContext()

  useEffect(() => () => setError(''), [setError])

  const { isLoading, ...mutate } = useMutation(createAndLogin, {
    onSuccess: async () => router.push(`/register/step/0`),
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
