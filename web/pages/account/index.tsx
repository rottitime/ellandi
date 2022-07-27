import AccountLayout from '@/components/Layout/AccountLayout'
import { Button, Typography, styled, Box } from '@mui/material'
import { Brands } from '@/style/theme'
import Icon from '@/components/Icons/Icon'
import { ReactNode } from 'react'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import Link from '@/components/UI/Link'

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
  gap: ${(p) => p.theme.spacing(4)};
  > .MuiCard-root {
    grid-column: span 2;
    &.single {
      grid-column: span 1;
    }
  }

  .news-feed {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      padding: ${(p) => p.theme.spacing(2)} 0;
      border-bottom: 1px solid #d9d9d9;
    }
    .circle {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: red;
      margin-right: ${(p) => p.theme.spacing(2)};
    }
  }
`

const IndexPage = () => {
  return (
    <>
      <Content>
        <AccountCard
          color="brandGov"
          header={<Typography variant="h2">Latest updates</Typography>}
        >
          <ul className="news-feed">
            {[...Array(3).keys()].map((i) => (
              <li key={i}>
                <Typography>27.06.23 @ 14:00</Typography>
                <Typography variant="subtitle1">
                  <Box className="circle" />
                  <Link href="#">Agile Bitesized</Link> learning course added
                </Typography>
              </li>
            ))}
          </ul>
        </AccountCard>

        <AccountCard
          color="brandSkills"
          className="single"
          header={<Typography variant="h2">Skills added</Typography>}
        >
          <Typography variant="h1" sx={{ mb: 4 }}>
            16
          </Typography>
          <Link href="#">
            <Typography variant="subtitle1">Add a skill</Typography>
          </Link>
        </AccountCard>

        <AccountCard
          color="brandLearning"
          className="single"
          header={<Typography variant="h2">Learning this week</Typography>}
        >
          <Typography variant="h1" sx={{ mb: 4 }}>
            2hrs
          </Typography>
          <Link href="#">
            <Typography variant="subtitle1">Record learning</Typography>
          </Link>
        </AccountCard>

        {profiles.map((profile) => (
          <AccountCard
            color={profile.color}
            key={profile.title}
            headerLogo={profile.logo}
            header={<Typography variant="h2">{profile.title}</Typography>}
            headerColorInherit
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
