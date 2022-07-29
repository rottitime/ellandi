import CardLayout from '@/components/Layout/CardLayout'
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
import { updateUser } from '@/service/auth'
import { GetStaticPropsContext } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient
} from 'react-query'
import { Props, Steps } from './types'
import useAuth from '@/hooks/useAuth'
import { fetchMe } from '@/service/me'

const RegisterPage = ({ stepInt, nextUrl, skip, ...props }: Props) => {
  const { setLoading, setError } = useUiContext()
  const { createAndLogin, authFetch } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()
  const FormComponent = steps[stepInt].form

  const {
    isLoading: isLoadingMe,
    data,
    refetch
  } = useQuery<RegisterUserResponse>(Query.Me, () => authFetch(fetchMe), {
    enabled: !!stepInt
  })

  const userId = useMemo(() => data?.id || null, [data])

  const isFormHidden = (step, data): boolean => !!step?.isHidden && step.isHidden(data)

  const getNextUrl = (data): string =>
    isFormHidden(steps[stepInt + 1], data) ? `/register/step/${stepInt + 2}` : nextUrl

  const backUrl = useMemo(
    () =>
      !!stepInt && isFormHidden(steps[stepInt - 1], data)
        ? `/register/step/${stepInt - 2}`
        : props.backUrl,
    [stepInt, data, props.backUrl]
  )

  //handle unauthorized user (no id)
  useEffect(() => {
    refetch()
  }, [stepInt])

  //handle unauthorized user (no id)
  useEffect(() => {
    setLoading(false)
    if (!isLoadingMe && !userId && stepInt > 0) {
      setLoading(true)
      router.replace({
        pathname: '/register/step/0',
        query: { ecode: 1 }
      })
    }
  }, [stepInt, router, setLoading, userId, isLoadingMe])

  const { isLoading, ...mutate } = useMutation<
    RegisterUserResponse,
    Error,
    Partial<RegisterUserResponse>
  >(
    async (data) =>
      userId ? updateUser(userId, data) : createAndLogin(data as RegisterUser),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(Query.RegisterUser, data)
        router.push(getNextUrl(data))
      },
      onError: ({ message }) => setError(message)
    }
  )

  return (
    <FormComponent
      backUrl={backUrl}
      loading={isLoading || isLoadingMe}
      defaultValues={data}
      skipUrl={skip && getNextUrl(data)}
      onFormSubmit={(data) => mutate.mutate(data)}
    />
  )
}

export default RegisterPage

RegisterPage.getLayout = (page) => {
  const { props } = page
  return (
    <CardLayout title={props.title} progress={props.progress}>
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
      backUrl: stepInt === 0 ? '/register' : `/register/step/${stepInt - 1}`,
      nextUrl: nextUrl || `/register/step/${stepInt + 1}`,
      skip: !!skip,
      dehydratedState: dehydrate(queryClient)
    } as Props
  }
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
    skip: true,
    isHidden: (data) => (data?.professions || []).length < 2
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
