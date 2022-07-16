import GenericPage from '@/components/Layout/GenericPage'
// import { useUiContext } from '@/context/UiContext'
import { Query, RegisterUser, RegisterUserResponse } from '@/service/types'
import { createUser, updateUser } from '@/service/user'
import { Alert, Fade } from '@mui/material'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

const totalSteps = 4

const steps = [
  {
    form: dynamic(() => import('@/components/Form/Register/PrivacyForm'), {
      suspense: true,
      ssr: false
    })
  },
  {
    form: dynamic(() => import('@/components/Form/Register/RegisterDetailsForm'), {
      suspense: true,
      ssr: false
    })
  },
  {
    form: dynamic(() => import('@/components/Form/Register/GradeForm'), {
      suspense: true,
      ssr: false
    })
  },
  {
    form: dynamic(() => import('@/components/Form/Register/ProfessionForm'), {
      suspense: true,
      ssr: false
    })
  }
]

const RegisterPage = () => {
  //const { setStatusIndicator } = useUiContext()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { step } = router.query
  const stepInt = parseInt(step as string)
  const FormComponent = steps[stepInt].form
  const [error, setError] = useState(null)

  const { isError, isLoading, ...mutate } = useMutation<
    RegisterUserResponse,
    Error,
    Partial<RegisterUserResponse>
  >(
    async (data) =>
      data.id ? updateUser(data.id, data) : createUser(data as RegisterUser),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(Query.RegisterUser, data)
        router.push(`/register/page/step/${stepInt + 1}`)
      },
      onError: ({ message }) => setError(message)
    }
  )

  // useEffect(() => {
  //   setStatusIndicator((stepInt / totalSteps) * 100)
  // }, [stepInt, setStatusIndicator])

  return (
    <>
      {isError && (
        <Fade in={!!isError}>
          <Alert severity="error" sx={{ mt: 3, mb: 3 }}>
            <>{error}</>
          </Alert>
        </Fade>
      )}
      <FormComponent
        backUrl={stepInt > 0 ? `/register/step/${stepInt - 1}` : '/register/step'}
        loading={isLoading}
        onFormSubmit={(data) => mutate.mutate(data)}
      />
    </>
  )
}

export default RegisterPage

RegisterPage.getLayout = (page) => <GenericPage title="Ready">{page}</GenericPage>

export async function getStaticPaths() {
  return {
    paths: [...Array(totalSteps).keys()].map((i) => ({ params: { step: `${i}` } })),
    fallback: false
  }
}

export async function getStaticProps() {
  return { props: {} } // will be passed to the page component as props }
}
