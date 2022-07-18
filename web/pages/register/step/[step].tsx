import { StandardRegisterProps } from '@/components/Form/Register/types'
import GenericPage from '@/components/Layout/GenericPage'
import Link from '@/components/UI/Link'
import { Query, RegisterUser, RegisterUserResponse } from '@/service/types'
import { createUser, updateUser } from '@/service/user'
import { Alert, Fade, Typography } from '@mui/material'
import { GetStaticPropsContext } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ComponentType, FC, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

type Props = {
  stepNumber: number
  title: string
  backUrl: null | string
  nextUrl: string
  progress: number
}

type Steps = {
  form: ComponentType<StandardRegisterProps<unknown>>
  title: string
  prevUrl?: string
  nextUrl?: string
}

const steps: Steps[] = [
  {
    form: dynamic(() => import('@/components/Form/Register/CreateAccountForm')),
    title: 'Create an account'
  },
  {
    form: dynamic(() => import('@/components/Form/Register/PrivacyForm')),
    title: 'Privacy policy'
  },
  {
    form: dynamic(() => import('@/components/Form/Register/RegisterDetailsForm')),
    title: 'Your details'
  },
  {
    form: dynamic(() => import('@/components/Form/Register/GradeForm')),
    title: 'Grade'
  },
  {
    form: dynamic(() => import('@/components/Form/Register/ProfessionForm')),
    title: 'Profession'
  },
  {
    form: dynamic(() => import('@/components/Form/Register/PrimaryProfessionForm')),
    title: 'Primary profession'
  },
  {
    form: dynamic(() => import('@/components/Form/Register/FunctionTypeForm')),
    title: 'Function'
  },
  {
    form: dynamic(() => import('@/components/Form/Register/ContractTypeForm')),
    title: 'Contract type'
  },
  {
    form: dynamic(() => import('@/components/Form/Register/ContactForm')),
    title: 'Contact preference',
    nextUrl: '/register/thankyou2'
  },
  {
    form: dynamic(() => import('@/components/Form/Register/LanguageForm')),
    title: 'Language skills'
  },
  {
    form: dynamic(() => import('@/components/Form/Register/SkillsForm')),
    title: 'Current skills',
    nextUrl: '/register/complete'
  }
]

const RegisterPage = ({ nextUrl, backUrl }: Props) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { step } = router.query
  const stepInt = parseInt(step as string)
  const FormComponent = steps[stepInt].form
  const [error, setError] = useState(null)
  const data = queryClient.getQueryData<RegisterUserResponse>(Query.RegisterUser)
  const id = data?.id

  const { isError, isLoading, ...mutate } = useMutation<
    RegisterUserResponse,
    Error,
    Partial<RegisterUserResponse>
  >(async (data) => (id ? updateUser(id, data) : createUser(data as RegisterUser)), {
    onSuccess: (data) => {
      queryClient.setQueryData(Query.RegisterUser, data)
      router.push(nextUrl)
      setError(null)
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

      <FormComponent
        backUrl={backUrl}
        loading={isLoading}
        defaultValues={data}
        onFormSubmit={(data) => mutate.mutate(data)}
      />
    </>
  )
}

export default RegisterPage

RegisterPage.getLayout = (page) => {
  const { props } = page
  return (
    <GenericPage
      title={props.title}
      progress={props.progress}
      footer={
        <Typography>
          <Link href={props.nextUrl}>Skip this step</Link>
        </Typography>
      }
    >
      {page}
    </GenericPage>
  )
}

export async function getStaticPaths() {
  return {
    paths: [...Array(steps.length).keys()].map((i) => ({ params: { step: `${i}` } })),
    fallback: false
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { step } = context.params
  const stepInt = parseInt(step as string)
  const { title, nextUrl } = steps[stepInt]

  return {
    props: {
      progress: Math.floor((stepInt / (steps.length + 1)) * 100),
      stepNumber: stepInt,
      title,
      backUrl: stepInt === 0 ? `/register` : `/register/step/${stepInt - 1}`,
      nextUrl: nextUrl || `/register/step/${stepInt + 1}`
    } as Props
  }
}
