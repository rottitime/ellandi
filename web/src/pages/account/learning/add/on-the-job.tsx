import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { menu, SectionOne } from './index'
import { useMutation } from '@tanstack/react-query'
import { LearningBaseType, RegisterUserResponse } from '@/service/api'
import useAuth from '@/hooks/useAuth'
import Router from 'next/router'
import { addLearningOnTheJob } from '@/service/account'
import LearningAddForm from '@/components/Form/LearningAddForm/LearningAddForm'

const OnTheJobPage = () => {
  const { authFetch } = useAuth()

  const { isLoading, error, ...mutate } = useMutation<
    RegisterUserResponse,
    Error,
    LearningBaseType[]
  >(async (data) => authFetch(addLearningOnTheJob, data), {
    onSuccess: async () => await Router.push('/account/learning/')
  })

  return (
    <>
      <SectionOne active={menu[0].title} />
      <LearningAddForm
        error={error?.message}
        onFormSubmit={(data) => mutate.mutate([data])}
        loading={isLoading}
      />
    </>
  )
}

export default OnTheJobPage

OnTheJobPage.getLayout = (page) => (
  <AccountLayout
    title="Learning"
    titleIcon="mortar-hat"
    brandColor="brandLearning"
    breadcrumbs={[
      { title: 'Learning', url: '/account/learning' },
      { title: 'Add learning' }
    ]}
  >
    {page}
  </AccountLayout>
)
