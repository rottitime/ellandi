import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { menu, SectionOne } from './index'
import { useMutation } from 'react-query'
import { LearningAddFormalType, RegisterUserResponse } from '@/service/api'
import useAuth from '@/hooks/useAuth'
import Router from 'next/router'
import { addLearningFormal } from '@/service/account'
import LearningAddForm from '@/components/Form/LearningAddForm/LearningAddForm'

const FormalPage = () => {
  const { authFetch } = useAuth()

  const { isLoading, error, ...mutate } = useMutation<
    RegisterUserResponse,
    Error,
    LearningAddFormalType[]
  >(async (data) => authFetch(addLearningFormal, data), {
    onSuccess: async () => await Router.push('/account/learning/')
  })

  return (
    <>
      <SectionOne active={menu[2].title} />
      <LearningAddForm
        type="formal"
        error={error?.message}
        onFormSubmit={(data) => mutate.mutate([data] as LearningAddFormalType[])}
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
