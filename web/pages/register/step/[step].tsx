/* eslint-disable react-hooks/exhaustive-deps */
import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import { useUiContext } from '@/context/UiContext'
import { Query, RegisterUserResponse } from '@/service/api'
import { updateUser } from '@/service/auth'
import { GetStaticPropsContext } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, ComponentType } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
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
  large?: boolean
}

const RegisterPage = ({ stepInt, nextUrl, backUrl, skip }: Props) => {
  const { setLoading, setError } = useUiContext()
  const { authFetch, hasToken } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()
  const FormComponent = steps[stepInt].form

  const { isLoading: isLoadingMe, data } = useQuery<RegisterUserResponse>(Query.Me, () =>
    authFetch(fetchMe)
  )

  const { isLoading: isMutateLoading, ...mutate } = useMutation<
    RegisterUserResponse,
    Error,
    Partial<RegisterUserResponse>
  >(async (data) => authFetch(updateUser, data), {
    onSuccess: async (data) => {
      queryClient.setQueryData(Query.Me, data)
      setError(null)
      router.push(nextUrl)
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

    if (!hasToken()) redirect()
  }, [stepInt, router, isLoadingMe, hasToken, queryClient, data])

  return (
    <FormComponent
      backUrl={backUrl}
      buttonLoading={isMutateLoading}
      defaultValues={data}
      skipUrl={skip && nextUrl}
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
      maxWidth={!!props.large ? 1320 : 540}
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
  const { title, nextUrl, skip, large = false } = steps[stepInt]

  return {
    props: {
      progress: Math.floor(((stepInt + 1) / (steps.length + 1)) * 100),
      stepInt,
      title,
      large,
      backUrl: stepInt ? `/register/step/${stepInt - 1}` : null,
      nextUrl: nextUrl || `/register/step/${stepInt + 1}`,
      skip: !!skip
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
    form: dynamic(() => import('@/components/Form/Register/PrimaryProfessionForm')),
    title: 'Primary profession'
  },
  {
    form: dynamic(
      () => import('@/components/Form/Register/ProfessionForm/ProfessionForm')
    ),
    title: 'Other professions'
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
    form: dynamic(() => import('@/components/Form/Register/IsLineManagerForm')),
    title: 'Are you a line manager?'
  },
  {
    form: dynamic(() => import('@/components/Form/Register/IsMentorForm')),
    title: 'Are you a mentor?'
  },
  {
    form: dynamic(() => import('@/components/Form/Register/SkillsForm')),
    title: 'What skills do you have?',
    nextUrl: '/register/complete',
    large: true
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
  //   form: dynamic(() => import('@/components/Form/Register/SkillsDevelopForm')),
  //   title: 'Skills you would like to develop',
  //   nextUrl: '/register/complete'
  // }
]
