import Page from '@/components/AccountMenuPage'
import { Box, Button, Grid, Typography, useTheme } from '@mui/material'
import Card from '@/components/UI/Card'
import Divider from '@/components/UI/Divider'
import { Colors } from '@/style/theme'
import Link from '@/components/UI/Link'
import SkillsIcon from '@/components/Icons/Skills'
import CareersIcon from '@/components/Icons/Careers'
import CommunitiesIcon from '@/components/Icons/Communities'
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
      'Update your skills profile to find learning and development opportunities tailored to you',
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
  },
  {
    title: 'Careers',
    content:
      'View current job vacancies and career pathways to discover what they involve',
    linkText: 'Plan your career',
    url: '/account/careers',
    color: 'profileGreen',
    logo: <CareersIcon />
  },
  {
    title: 'Communities',
    content:
      'Discuss ideas and share best practice with specific professions and functions',
    linkText: 'Access communities',
    url: '/account/communities',
    color: 'profileYellow',
    logo: <CommunitiesIcon />
  }
]

const IndexPage = () => {
  const theme = useTheme()

  return (
    <>
      <Box sx={{ mb: 6 }}>
        <Typography variant="subtitle1" gutterBottom>
          Use this service to add and review skills, view learning opportunities, plan
          your career pathway and keep up to date with communities.
        </Typography>
      </Box>

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

            <Divider variant="middle" spacing={30} />

            <LearningStrands />
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card fullHeight>
            <Grid container spacing={4}>
              {profiles.map((data) => (
                <Grid item xs={6} key={data.title}>
                  <ContentBox>
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

                    <Link href={data.url}>
                      <Button variant="contained">{data.linkText}</Button>
                    </Link>
                  </ContentBox>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default IndexPage
IndexPage.getLayout = (page) => <Page title="Welcome, Joe">{page}</Page>
