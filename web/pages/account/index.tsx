import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Button, Typography, styled, Box } from '@mui/material'
import { IconsType } from '@/components/Icon/Icon'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import Link from '@/components/UI/Link'
import useAuth from '@/hooks/useAuth'
import { fetchMe } from '@/service/me'
import { useQuery } from 'react-query'
import { Query, RegisterUserResponse } from '@/service/api'
import Headline from '@/components/Account/Headline/Headline'
import { ColorBrands } from '@/style/types'

type MenuDataType = {
  title: string
  content: string
  linkText: string
  url: string
  color: keyof ColorBrands
  logo: IconsType
}[]

const profiles: MenuDataType = [
  {
    title: 'Skills',
    content:
      'Update your skills profile to record your current skills and ones you would like to develop.',
    linkText: 'Review your skills',
    url: '/account/skills',
    color: 'brandSkills',
    logo: 'skills'
  },
  {
    title: 'Learning',
    content:
      'Explore the wide variety of  learning and training courses available to you.',
    linkText: 'Find learning',
    url: '/account/learning',
    color: 'brandLearning',
    logo: 'learning'
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
  const { authFetch } = useAuth()

  const { data } = useQuery<RegisterUserResponse>(Query.Me, () => authFetch(fetchMe))

  return (
    <>
      <Headline>
        <Typography variant="h1" gutterBottom>
          Hello {data?.first_name}, welcome to the <br />
          Skills and Learning Service
        </Typography>
      </Headline>
      <Content>
        <AccountCard
          color="brandGov"
          header={
            <Typography variant="h1" component="h3">
              Latest updates
            </Typography>
          }
        >
          <ul className="news-feed">
            {[...Array(3).keys()].map((i) => (
              <li key={i}>
                <Typography>27.06.23 @ 14:00</Typography>
                <Typography>
                  <Box className="circle" component="span" />
                  <Link href="#">Agile Bitesized</Link> learning course added
                </Typography>
              </li>
            ))}
          </ul>
        </AccountCard>

        <AccountCard
          color="brandSkills"
          className="single"
          header={
            <Typography variant="h1" component="h3">
              Skills added
            </Typography>
          }
        >
          <Typography sx={{ mb: 4 }}>16</Typography>
          <Link href="#">
            <Typography>Add a skill</Typography>
          </Link>
        </AccountCard>

        <AccountCard
          color="brandLearning"
          className="single"
          header={
            <Typography variant="h1" component="h3">
              Learning this week
            </Typography>
          }
        >
          <Typography sx={{ mb: 4 }}>2hrs</Typography>
          <Link href="#">
            <Typography>Record learning</Typography>
          </Link>
        </AccountCard>

        {profiles.map((profile) => (
          <AccountCard
            color={profile.color}
            key={profile.title}
            headerLogoSize="large"
            headerLogo={profile.logo}
            header={
              <Typography variant="h1" component="h3">
                {profile.title}
              </Typography>
            }
            headerColorInherit
          >
            <Typography gutterBottom>{profile.content}</Typography>
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

IndexPage.getLayout = (page) => <AccountLayout>{page}</AccountLayout>
