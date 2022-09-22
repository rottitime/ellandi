import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { menu, SectionOne } from './index'
import { useMutation } from 'react-query'
import { LearningAddFormalType, RegisterUserResponse } from '@/service/api'
import useAuth from '@/hooks/useAuth'
import Router from 'next/router'
import { addLearningFormal } from '@/service/account'
import LearningAddFormalForm from '@/components/Form/LearningAddFormalForm/LearningAddFormalForm'

const FormalPage = () => {
  const { authFetch } = useAuth()

  const { isLoading, error, ...mutate } = useMutation<
    RegisterUserResponse,
    Error,
    LearningAddFormalType[]
  >(async (data) => authFetch(addLearningFormal, data), {
    onSuccess: async () => await Router.push('/account/skills/')
  })

  return (
    <>
      <SectionOne active={menu[2].title} />
      <LearningAddFormalForm
        error={error?.message}
        onFormSubmit={(data) => mutate.mutate([data])}
        loading={isLoading}
      />
    </>
  )
}

export default FormalPage

FormalPage.getLayout = (page) => (
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
