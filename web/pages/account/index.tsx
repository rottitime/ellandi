import Page from '@/components/AccountMenuPage'
import { Box, Button, Grid, Typography } from '@mui/material'
import Card from '@/components/UI/AppBar/Card'
import Divider from '@/components/UI/Divider'
import { colors } from '@/style/theme'
import Link from '@/components/UI/Link'
import SkillsIcon from '@/components/Icons/Skills'
import CareersIcon from '@/components/Icons/Careers'
import CommunitiesIcon from '@/components/Icons/Communities'
import LearningIcon from '@/components/Icons/Learning'
import { ReactNode } from 'react'

type MenuDataType = {
  title: string
  content: string
  linkText: string
  url: string
  color: string
  logo: ReactNode
}[]

const profiles: MenuDataType = [
  {
    title: 'Skills',
    content:
      'Update your skills profile to find learning and development opportunities tailored to you',
    linkText: 'Review your skills',
    url: '/account/skills',
    color: colors.profileBlue,
    logo: <SkillsIcon />
  },
  {
    title: 'Learning',
    content: 'Explore the wide variety of learning and training courses available to you',
    linkText: 'Find learning',
    url: '/account/learning',
    color: colors.profilePink,
    logo: <LearningIcon />
  },
  {
    title: 'Careers',
    content:
      'View current job vacancies and career pathways to discover what they involve',
    linkText: 'Plan your career',
    url: '/account/careers',
    color: colors.profileGreen,
    logo: <CareersIcon />
  },
  {
    title: 'Communities',
    content:
      'Discuss ideas and share best practice with specific professions and functions',
    linkText: 'Access communities',
    url: '/account/communities',
    color: colors.profileYellow,
    logo: <CommunitiesIcon />
  }
]

const learningLinks = [
  { title: 'Foundations of public admin', url: '#' },
  { title: 'Working in government', url: '#' },
  { title: 'Leading and managing', url: '#' },
  { title: 'Specialist skills', url: '#' },
  { title: 'Domain knowledge', url: '#' }
]

const IndexPage = () => {
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
            <Box sx={{ padding: '20px', border: `1px solid ${colors.greyDark}` }}>
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
            </Box>

            <Divider variant="middle" spacing={30} />

            <Typography variant="h3" sx={{ mb: 3 }}>
              Browse learning strands
            </Typography>

            <ul>
              {learningLinks.map((item) => (
                <li key={item.title}>
                  <Typography>
                    <Link href={item.url}>{item.title}</Link>
                  </Typography>
                </li>
              ))}
            </ul>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card fullHeight>
            <Grid container spacing={4}>
              {profiles.map((data) => (
                <Grid item xs={6} key={data.title}>
                  <Card elevation={1}>
                    <Typography
                      gutterBottom
                      variant="h3"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: data.color
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
                  </Card>
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
