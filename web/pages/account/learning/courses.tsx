import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import Tabs from '@/components/UI/Tabs/Tabs'
import { useEffect } from 'react'
import FindCourses from '@/components/Account/FindCourses'
import { useRouter } from 'next/router'
import { SharedLearningHeader } from './index'

const LearningRecordRedirect = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/account/learning/')
  }, [router])

  return null
}

const FindCoursesPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/account/learning/')
  }, [router])

  return (
    <>
      <SharedLearningHeader />

      <Tabs
        brandColor="brandLearning"
        activeIndex={1}
        tabItems={[
          {
            title: 'Learning record',
            content: <LearningRecordRedirect />
          },
          {
            title: 'Find courses',
            content: <FindCourses />
          }
        ]}
      />
    </>
  )
}

export default FindCoursesPage
FindCoursesPage.getLayout = (page) => (
  <AccountLayout
    title="Learning"
    titleIcon="mortar-hat"
    breadcrumbs={[{ title: 'Learning' }]}
    brandColor="brandLearning"
  >
    {page}
  </AccountLayout>
)
