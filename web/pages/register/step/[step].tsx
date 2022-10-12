/* eslint-disable react-hooks/exhaustive-deps */
import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import { useUiContext } from '@/context/UiContext'
import {
  fetchContractTypes,
  fetchFunctions,
  fetchGrades,
  fetchJobTitles,
  fetchLanguages,
  fetchLanguageSkillLevels,
  fetchProfessions,
  fetchSkills,
  Query,
  RegisterUserResponse
} from '@/service/api'
import { updateUser } from '@/service/auth'
import { GetStaticPropsContext } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useMemo, ComponentType } from 'react'
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient
} from 'react-query'
import useAuth from '@/hooks/useAuth'
import { fetchMe } from '@/service/me'
import { StandardRegisterProps } from '@/components/Form/Register/types'

type Props = {
  stepInt: number
  title: string
  backUrl: string
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
  isHidden?: (data: RegisterUserResponse) => boolean
}

const RegisterPage = ({ stepInt, nextUrl, skip, ...props }: Props) => {
  const { setLoading, setError } = useUiContext()
  const { authFetch, hasToken } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()
  const FormComponent = steps[stepInt].form

  const { isLoading: isLoadingMe, data } = useQuery<RegisterUserResponse>(
    Query.Me,
    () => authFetch(fetchMe),
    { enabled: !!stepInt }
  )

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

  const { isLoading: isMutateLoading, ...mutate } = useMutation<
    RegisterUserResponse,
    Error,
    Partial<RegisterUserResponse>
  >(async (data) => authFetch(updateUser, data), {
    onSuccess: async (data) => {
      if (!!stepInt) queryClient.setQueryData(Query.Me, data)
      router.push(getNextUrl(data))
    },
    onError: ({ message }) => setError(message)
  })

  useEffect(() => {
    //disable loading once a new step has initialised
    setLoading(false)
  }, [stepInt])

  useEffect(() => {
    setLoading(isLoadingMe)
    return () => {
      setLoading(false)
    }
  }, [isLoadingMe])

  //handle unauthorized user (no id)
  useEffect(() => {
    const redirect = async () => {
      setLoading(true)
      queryClient.removeQueries(Query.Me)
      await router.replace({
        pathname: '/register',
        query: { ecode: 1 }
      })
    }

    if (!hasToken()) {
      redirect()
    }
  }, [stepInt, router, isLoadingMe, hasToken, queryClient, data])

  return (
    <FormComponent
      backUrl={backUrl}
      buttonLoading={isMutateLoading}
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
  await queryClient.prefetchQuery(Query.JobTitles, fetchJobTitles)
  await queryClient.prefetchQuery(Query.Professions, fetchProfessions)
  await queryClient.prefetchQuery(Query.Functions, fetchFunctions)
  await queryClient.prefetchQuery(Query.ContractTypes, fetchContractTypes)
  await queryClient.prefetchQuery(Query.Languages, fetchLanguages)
  await queryClient.prefetchQuery(Query.LanguageSkillLevels, fetchLanguageSkillLevels)
  await queryClient.prefetchQuery(Query.Skills, fetchSkills)

  return {
    props: {
      progress: Math.floor(((stepInt + 1) / (steps.length + 1)) * 100),
      stepInt,
      title,
      backUrl: stepInt ? `/register/step/${stepInt - 1}` : null,
      nextUrl: nextUrl || `/register/step/${stepInt + 1}`,
      skip: !!skip,
      dehydratedState: dehydrate(queryClient)
    } as Props
  }
}

const steps: Steps[] = [
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
    title: 'Profession'
  },
  {
    form: dynamic(() => import('@/components/Form/Register/PrimaryProfessionForm')),
    title: 'Primary profession',
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
    form: dynamic(() => import('@/components/Form/Register/SkillsForm')),
    title: 'Current skills',
    nextUrl: '/register/complete'
  }
  // Hidden temporarily
  // {
  //   form: dynamic(() => import('@/components/Form/Register/ContactForm')),
  //   title: 'Contact preference',
  //   nextUrl: '/register/thankyou'
  // },
  // {
  //   form: dynamic(() => import('@/components/Form/Register/LanguageForm/LanguageForm')),
  //   title: 'Language skills'
  // },
  // {
  //   form: dynamic(() => import('@/components/Form/Register/SkillsForm')),
  //   title: 'Current skills'
  // },
  // {
  //   form: dynamic(() => import('@/components/Form/Register/SkillsDevelopForm')),
  //   title: 'Skills you would like to develop',
  //   nextUrl: '/register/complete'
  // }
]
