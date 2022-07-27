import AccountLayout from '@/components/Layout/AccountLayout'
import { Button, Typography, styled, Box } from '@mui/material'
import { Brands } from '@/style/theme'
import Icon from '@/components/Icons/Icon'
import { ReactNode } from 'react'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'

type MenuDataType = {
  title: string
  content: string
  linkText: string
  url: string
  color: keyof Brands
  logo: ReactNode
}[]

const profiles: MenuDataType = [
  {
    title: 'Skills',
    content:
      'Update your skills profile to record your current skills and ones you would like to develop.',
    linkText: 'Review your skills',
    url: '/account/skills',
    color: 'brandSkills',
    logo: <Icon icon="skills" />
  },
  {
    title: 'Learning',
    content:
      'Explore the wide variety of  learning and training courses available to you.',
    linkText: 'Find learning',
    url: '/account/learning',
    color: 'brandLearning',
    logo: <Icon icon="learning" />
  }
]

const Content = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  > .MuiCard-root {
    grid-column: span 2;
    &.single {
      grid-column: span 1;
    }
  }
`

const IndexPage = () => {
  return (
    <>
      <Content>
        <AccountCard color="brandGov">1</AccountCard>
        <AccountCard color="brandSkills" className="single">
          2
        </AccountCard>
        <AccountCard color="brandLearning" className="single">
          3
        </AccountCard>

        {profiles.map((profile) => (
          <AccountCard
            color={profile.color}
            key={profile.title}
            headerLogo={profile.logo}
            header={<Typography variant="h2">{profile.title}</Typography>}
          >
            <Typography variant="subtitle1" gutterBottom>
              {profile.content}
            </Typography>
            <Button variant="contained" href={profile.url}>
              Review {profile.title}
            </Button>
          </AccountCard>
        ))}
      </Content>
    </>
  )
}

export default IndexPage

IndexPage.getLayout = (page) => (
  <AccountLayout
    title="Hello Joe"
    teaserHeadline="Welcome to the
  Skills and Learning Service"
    teaserContent="Use this service to add and review your skills and find learning opportunities."
  >
    {page}
  </AccountLayout>
)
