import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { menu, SectionOne } from './index'
import { useMutation } from 'react-query'
import { LearningAddType, RegisterUserResponse } from '@/service/api'
import useAuth from '@/hooks/useAuth'
import Router from 'next/router'
import { addLearningSocial } from '@/service/account'
import LearningAddForm from '@/components/Form/LearningAddForm/LearningAddForm'

const OnTheJobPage = () => {
  const { authFetch } = useAuth()

  const { isLoading, error, ...mutate } = useMutation<
    RegisterUserResponse,
    Error,
    LearningAddType[]
  >(async (data) => authFetch(addLearningSocial, data), {
    onSuccess: async () => await Router.push('/account/learning/')
  })

  return (
    <>
      <SectionOne active={menu[1].title} />
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
