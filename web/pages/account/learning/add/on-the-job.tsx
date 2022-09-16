import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { menu, SectionOne } from './index'
import { useMutation } from 'react-query'
import { RegisterUserResponse, SkillType } from '@/service/api'
import useAuth from '@/hooks/useAuth'
import Router from 'next/router'
import { addSkills } from '@/service/account'
import LearningAddForm from '@/components/Form/LearningAddForm/LearningAddForm'

const OnTheJobPage = () => {
  const { authFetch } = useAuth()

  const { isLoading, ...mutate } = useMutation<RegisterUserResponse, Error, SkillType[]>(
    async (data) => authFetch(addSkills, data),
    {
      onSuccess: async () => await Router.push('/account/learning')
    }
  )

  return (
    <>
      <SectionOne active={menu[0].title} />
      <LearningAddForm
        onFormSubmit={(data) => {
          // eslint-disable-next-line no-console
          console.log({ data, mutate })
        }}
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
