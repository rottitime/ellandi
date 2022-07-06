import Link from '@/components/UI/Link'
import { Stars, Delete } from '@mui/icons-material'
import Card from '@/components/UI/Card'
import AccountMenuPage from '@/components/Layout/AccountMenuPage'
import { IconButton, styled, Typography } from '@mui/material'
import Skills from '@/components/Icons/Skills'
import Learning from '@/components/Icons/Learning'
import Careers from '@/components/Icons/Careers'
import Communities from '@/components/Icons/Communities'
import ContentBox from '@/components/ContentBox'

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
  return (
    <>
      <Typography variant="subtitle1">
        You can favourite skills, learning, careers and communities across the service.
        Click the red trash icon to remove.
      </Typography>

      <Card>
        <Typography
          variant="h3"
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            color: (p) => p.colors.profileBlue
          }}
        >
          <Skills style={{ marginRight: '10px' }} />
          Skills (6)
        </Typography>

        <BoxList columns={4}>
          {[
            'Team building',
            'Communication',
            'Leadership',
            'HTML/CSS',
            'Job coaching',
            'Figma'
          ].map((item) => (
            <ContentBox key={item}>
              <CardHeader>
                <Typography variant="h3">
                  <Link href="#">{item}</Link>
                </Typography>

                <IconButton aria-label="delete">
                  <Delete sx={{ fontSize: '20px' }} />
                </IconButton>
              </CardHeader>
            </ContentBox>
          ))}
        </BoxList>

        <Typography
          variant="h3"
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            color: (p) => p.colors.profileBlue
          }}
        >
          <Learning style={{ marginRight: '10px' }} />
          Learning (3)
        </Typography>

        <BoxList columns={3}>
          {listLearning.map((item) => (
            <ContentBox key={item.title}>
              <CardHeader>
                <Typography variant="h3">
                  <Link href="#">{item.title}</Link>
                </Typography>
                <IconButton aria-label="delete">
                  <Delete sx={{ fontSize: '20px' }} />
                </IconButton>
              </CardHeader>
              <Typography>
                <b>Duration:</b> {item.duration}
                <br />
                <b>Skills you will develop:</b> {item.develop}
              </Typography>
            </ContentBox>
          ))}
        </BoxList>

        <Typography
          variant="h3"
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            color: (p) => p.colors.profileBlue
          }}
        >
          <Careers style={{ marginRight: '10px' }} />
          Careers (2)
        </Typography>

        <BoxList columns={3}>
          {listCareers.map((item) => (
            <ContentBox key={item.title}>
              <CardHeader>
                <Typography variant="h3">
                  <Link href="#">{item.title}</Link>
                </Typography>
                <IconButton aria-label="delete">
                  <Delete sx={{ fontSize: '20px' }} />
                </IconButton>
              </CardHeader>
              <Typography>
                <b>{item.content}</b>
                <br />
                <b>Salary:</b> &pound;{item.salary}
                <br />
                <b>Reference:</b> &pound;{item.reference}
              </Typography>
            </ContentBox>
          ))}
        </BoxList>

        <Typography
          variant="h3"
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            color: (p) => p.colors.profileBlue
          }}
        >
          <Communities style={{ marginRight: '10px' }} />
          Communities (2)
        </Typography>

        <BoxList columns={3}>
          {listCommunities.map((item) => (
            <ContentBox key={item.title}>
              <CardHeader>
                <Typography variant="h3">
                  <Link href="#">{item.title}</Link>
                </Typography>
                <IconButton aria-label="delete">
                  <Delete sx={{ fontSize: '20px' }} />
                </IconButton>
              </CardHeader>
              <Typography>
                <b>Last activity:</b> {item.activity}
              </Typography>
            </ContentBox>
          ))}
        </BoxList>
      </Card>
    </>
  )
}

export default Page
Page.getLayout = (page) => (
  <AccountMenuPage
    title={
      <>
        <Stars sx={{ color: (p) => p.colors.profileBlue }} />
        Favourites
      </>
    }
    breadcrumbs={[{ title: 'Favourites' }]}
  >
    {page}
  </AccountMenuPage>
)
