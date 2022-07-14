import Page from '@/components/Layout/AccountMenuPage'
import { Button, Divider, Grid, Typography, useTheme } from '@mui/material'
import Card from '@/components/UI/Card'
import { Colors } from '@/style/theme'
import Link from '@/components/UI/Link'
import SkillsIcon from '@/components/Icons/Skills'
import LearningIcon from '@/components/Icons/Learning'
import { ReactNode } from 'react'
import LearningStrands from '@/components/LearningStrands'
import ContentBox from '@/components/ContentBox'

type MenuDataType = {
  title: string
  content: string
  linkText: string
  url: string
  color: keyof Colors
  logo: ReactNode
}[]

const profiles: MenuDataType = [
  {
    title: 'Skills',
    content:
      'Update your skills profile to record your current skills and ones you would like to develop',
    linkText: 'Review your skills',
    url: '/account/skills',
    color: 'profileBlue',
    logo: <SkillsIcon />
  },
  {
    title: 'Learning',
    content: 'Explore the wide variety of learning and training courses available to you',
    linkText: 'Find learning',
    url: '/account/learning',
    color: 'profilePink',
    logo: <LearningIcon />
  }
  // {
  //   title: 'Careers',
  //   content:
  //     'View current job vacancies and career pathways to discover what they involve',
  //   linkText: 'Plan your career',
  //   url: '/account/careers',
  //   color: 'profileGreen',
  //   logo: <CareersIcon />
  // },
  // {
  //   title: 'Communities',
  //   content:
  //     'Discuss ideas and share best practice with specific professions and functions',
  //   linkText: 'Access communities',
  //   url: '/account/communities',
  //   color: 'profileYellow',
  //   logo: <CommunitiesIcon />
  // }
]

const IndexPage = () => {
  const theme = useTheme()

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Card fullHeight>
            <ContentBox>
              <Typography variant="h3">Latest updates</Typography>
              <ul>
                <li>
                  You currently have no skills on your profile. Try adding a new skill
                </li>
                <li>You need to complete your DDAT assessment</li>
                <li>
                  Government as a platform has been added as a new course Clear latest
                  updates
                </li>
              </ul>
            </ContentBox>

            <Divider variant="middle" />

            <LearningStrands />
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={4}>
            {profiles.map((data) => (
              <Grid item xs={6} key={data.title}>
                <Card>
                  <Typography
                    gutterBottom
                    variant="h3"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: theme.colors[data.color]
                    }}
                  >
                    {data.logo} {data.title}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {data.content}
                  </Typography>

                  <Divider variant="middle" sx={{ my: 3 }} />
                  <Link href={data.url}>
                    <Button variant="contained" fullWidth>
                      {data.linkText}
                    </Button>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default IndexPage
IndexPage.getLayout = (page) => (
  <Page
    title="Welcome, Joe"
    teaser="Use this service to add and review your skills and find learning opportunities"
  >
    {page}
  </Page>
)
