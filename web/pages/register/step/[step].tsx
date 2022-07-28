import { StandardRegisterProps } from '@/components/Form/Register/types'
import CardLayout from '@/components/Layout/CardLayout'
import Link from '@/components/UI/Link'
import { useUiContext } from '@/context/UiContext'
import {
  fetchContractTypes,
  fetchFunctions,
  fetchGrades,
  fetchLanguages,
  fetchProfessions,
  Query,
  RegisterUser,
  RegisterUserResponse
} from '@/service/api'
import { createUser, updateUser } from '@/service/user'
import { Typography } from '@mui/material'
import { GetStaticPropsContext } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ComponentType, useEffect } from 'react'
import { dehydrate, QueryClient, useMutation, useQueryClient } from 'react-query'

type Props = {
  stepInt: number
  title: string
  backUrl: null | string
  nextUrl: string
  progress: number
  skip: boolean
}

type Steps = {
  form: ComponentType<StandardRegisterProps<unknown>>
  title: string
  prevUrl?: string
  nextUrl?: string
  skip?: boolean
}

const steps: Steps[] = [
  {
    form: dynamic(
      () => import('@/components/Form/Register/CreateAccountForm/CreateAccountForm')
    ),
    title: 'Create an account'
  },
  {
    form: dynamic(() => import('@/components/Form/Register/PrivacyForm')),
    title: 'Privacy policy'
  },
  {
    form: dynamic(
      () => import('@/components/Form/Register/RegisterDetailsForm/RegisterDetailsForm')
    ),
    title: 'Your details'
  },
  {
    form: dynamic(() => import('@/components/Form/Register/GradeForm/GradeForm')),
    title: 'Grade'
  },
  {
    form: dynamic(() => import('@/components/Form/Register/ProfessionForm')),
    title: 'Profession',
    skip: true
  },
  {
    form: dynamic(() => import('@/components/Form/Register/PrimaryProfessionForm')),
    title: 'Primary profession',
    skip: true
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
    nextUrl: '/register/thankyou'
  },
  {
    form: dynamic(() => import('@/components/Form/Register/LanguageForm')),
    title: 'Language skills',
    skip: true
  },
  {
    form: dynamic(() => import('@/components/Form/Register/LanguageFormTest')),
    title: 'Language skills (DEMO)',
    skip: true
  },
  {
    form: dynamic(() => import('@/components/Form/Register/SkillsForm')),
    title: 'Current skills',
    nextUrl: '/register/complete',
    skip: true
  }
]

const RegisterPage = ({ nextUrl, backUrl, stepInt }: Props) => {
  const { setLoading, setError } = useUiContext()
  const router = useRouter()
  const queryClient = useQueryClient()
  const FormComponent = steps[stepInt].form
  const data = queryClient.getQueryData<RegisterUserResponse>(Query.RegisterUser)
  const id = data?.id

  useEffect(() => {
    if (!id && stepInt > 0) {
      router.replace({
        pathname: '/register/step/0',
        query: { ecode: 1 }
      })
    } else {
      setLoading(false)
    }
  }, [id, stepInt, router, setLoading])

  const { isLoading, ...mutate } = useMutation<
    RegisterUserResponse,
    Error,
    Partial<RegisterUserResponse>
  >(async (data) => (id ? updateUser(id, data) : createUser(data as RegisterUser)), {
    onSuccess: (data) => {
      queryClient.setQueryData(Query.RegisterUser, data)
      router.push(nextUrl)
    },
    onError: ({ message }) => setError(message)
  })

  if (!id && stepInt > 0) {
    setLoading(true)
    return null
  }

  return (
    <FormComponent
      backUrl={backUrl}
      loading={isLoading}
      defaultValues={data}
      onFormSubmit={(data) => mutate.mutate(data)}
    />
  )
}

export default RegisterPage

RegisterPage.getLayout = (page) => {
  const { props } = page
  return (
    <CardLayout
      title={props.title}
      progress={props.progress}
      footer={
        props.skip && (
          <Typography>
            <Link href={props.nextUrl}>Skip this step</Link>
          </Typography>
        )
      }
    >
      {page}
    </CardLayout>
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
  const { title, nextUrl, skip } = steps[stepInt]

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(Query.Grades, fetchGrades)
  await queryClient.prefetchQuery(Query.Professions, fetchProfessions)
  await queryClient.prefetchQuery(Query.Functions, fetchFunctions)
  await queryClient.prefetchQuery(Query.ContractTypes, fetchContractTypes)
  await queryClient.prefetchQuery(Query.Languages, fetchLanguages)

  return {
    props: {
      progress: Math.floor((stepInt / (steps.length + 1)) * 100),
      stepInt,
      title,
      backUrl: stepInt === 0 ? `/register` : `/register/step/${stepInt - 1}`,
      nextUrl: nextUrl || `/register/step/${stepInt + 1}`,
      skip: !!skip,
      dehydratedState: dehydrate(queryClient)
    } as Props
  }
}
