import { Heading, LeadParagraph } from 'govuk-react'
import AccountLayout from '@/components/AccountLayout'
import styled, { useTheme } from 'styled-components'
import Link from '@/components/UI/Link'
import { Text } from '@/components/UI/Shared/Shared'
import Communities from '@/components/svg/Communities'
import Card from '@/components/UI/Card'
import Skills from '@/components/svg/Skills'
import Trash from '@/components/svg/Trash'
import Learning from '@/components/svg/Learning'
import Careers from '@/components/svg/Careers'

const CardHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: top;
  gap: 10px;
`

const BoxList = styled('div')<{ columns: number }>`
  display: grid;
  grid-template-columns: ${(p) => '1fr '.repeat(p.columns)};
  grid-gap: 20px;
  margin-bottom: 20px;
`

const listLearning = [
  {
    title: 'Vat and PAYE',
    duration: '85 minutes',
    develop: 'Financial management, Numeracy, Communication, Commercial awareness'
  },
  {
    title: 'Finance skills for all 5: budget management',
    duration: '20 minutes',
    develop: 'Financial management, Forecasting, Influencing, Managing budgets'
  },
  {
    title: 'Forecasting',
    duration: '85 minutes',
    develop: 'Financial management, Forecasting, Influencing, Managing budgets'
  }
]

const listCareers = [
  {
    title: 'Sector Skills Networks Coordinator',
    content: 'The Money and Pensions Service',
    salary: '40,000',
    reference: 216700
  },
  {
    title: 'Sector Skills eLearning Manager',
    content: 'The Money and Pensions Service',
    salary: '52,000',
    reference: 216682
  }
]

const listCommunities = [
  { title: 'New to Government Network', activity: '2m ago' },
  { title: 'Project Management Network', activity: '67d ago' }
]

const Page = () => {
  const theme = useTheme()

  return (
    <>
      <Heading>Profile</Heading>
      <LeadParagraph>Personal details</LeadParagraph>

      <Heading
        as="h2"
        size="S"
        style={{
          display: 'flex',
          alignItems: 'center',
          color: theme.palette.profile.skills.color
        }}
      >
        <Skills style={{ marginRight: '10px' }} />
        Skills (6)
      </Heading>

      <BoxList columns={4}>
        {[
          'Team building',
          'Communication',
          'Leadership',
          'HTML/CSS',
          'Job coaching',
          'Figma'
        ].map((item) => (
          <Card key={item} noMargin>
            <CardHeader>
              <Heading as="h3" size="S">
                <Link href="#">{item}</Link>
              </Heading>
              <Trash style={{ fontSize: '20px' }} />
            </CardHeader>
          </Card>
        ))}
      </BoxList>

      <Heading
        as="h2"
        size="S"
        style={{
          display: 'flex',
          alignItems: 'center',
          color: theme.palette.profile.learning.color
        }}
      >
        <Learning style={{ marginRight: '10px' }} />
        Learning (3)
      </Heading>

      <BoxList columns={3}>
        {listLearning.map((item) => (
          <Card noMargin key={item.title}>
            <CardHeader>
              <Heading as="h3" size="S">
                <Link href="#">{item.title}</Link>
              </Heading>
              <Trash style={{ fontSize: '20px' }} />
            </CardHeader>
            <Text noMargin>
              <b>Duration:</b> {item.duration}
              <br />
              <b>Skills you will develop:</b> {item.develop}
            </Text>
          </Card>
        ))}
      </BoxList>

      <Heading
        as="h2"
        size="S"
        style={{
          display: 'flex',
          alignItems: 'center',
          color: theme.palette.profile.careers.color
        }}
      >
        <Careers style={{ marginRight: '10px' }} />
        Careers (2)
      </Heading>

      <BoxList columns={3}>
        {listCareers.map((item) => (
          <Card noMargin key={item.title}>
            <CardHeader>
              <Heading as="h3" size="S">
                <Link href="#">{item.title}</Link>
              </Heading>
              <Trash style={{ fontSize: '20px' }} />
            </CardHeader>
            <Text noMargin>
              <b>{item.content}</b>
              <br />
              <b>Salary:</b> &pound;{item.salary}
              <br />
              <b>Reference:</b> &pound;{item.reference}
            </Text>
          </Card>
        ))}
      </BoxList>

      <Heading
        as="h2"
        size="S"
        style={{
          display: 'flex',
          alignItems: 'center',
          color: theme.palette.profile.communities.color
        }}
      >
        <Communities style={{ marginRight: '10px' }} />
        Communities (2)
      </Heading>

      <BoxList columns={3}>
        {listCommunities.map((item) => (
          <Card noMargin key={item.title}>
            <CardHeader>
              <Heading as="h3" size="S">
                <Link href="#">{item.title}</Link>
              </Heading>
              <Trash style={{ fontSize: '20px' }} />
            </CardHeader>
            <Text noMargin>
              <b>Last activity:</b> {item.activity}
            </Text>
          </Card>
        ))}
      </BoxList>
    </>
  )
}

export default Page
Page.getLayout = (page) => <AccountLayout activeMenu={6}>{page}</AccountLayout>
