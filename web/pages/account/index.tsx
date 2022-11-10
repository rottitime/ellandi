import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import LearningGoalBar from '@/components/Account/LearningGoalBar/LearningGoalBar'
import { Button, Typography, styled, Box } from '@mui/material'
import { IconsType } from '@/components/Icon/Icon'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import Link from '@/components/UI/Link'
import { RegisterUserResponse } from '@/service/api'
import Headline from '@/components/Account/Headline/Headline'
import { ColorBrands } from '@/style/types'
import Skeleton from '@/components/UI/Skeleton/Skeleton'
import { useProfile } from '@/hooks/useProfile'

type MenuDataType = {
  title: string
  content: string
  url: string
  color: keyof ColorBrands
  logo: IconsType
}

const Content = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  ${({ theme }) => theme.breakpoints.up('md')} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
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
  const { userProfile: data, isLoading } = useProfile<RegisterUserResponse>({})

  return (
    <>
      <Headline>
        <Typography variant="h1" gutterBottom>
          Hello {data?.first_name}, welcome to the Skills and Learning Service
        </Typography>
        <Typography>
          Use this service to add and review your skills and find learning opportunities
        </Typography>
      </Headline>

      <Content>
        <AccountCard
          color="brandSkills"
          action={
            <Button variant="contained" href="/account/skills/add">
              Add skills
            </Button>
          }
        >
          {isLoading ? (
            [...Array(4).keys()].map((i) => (
              <Skeleton key={i} sx={{ mb: 3, maxWidth: i % 2 ? 100 : 50 }} />
            ))
          ) : (
            <>
              <Typography variant="h2" gutterBottom>
                Skills
              </Typography>
              <Link href="/account/skills/">
                <Typography variant="h1" component="p" gutterBottom>
                  {data?.skills.length}
                </Typography>
              </Link>
              <Typography variant="h2" gutterBottom>
                Languages
              </Typography>
              <Link href="/account/skills/language-skills/">
                <Typography variant="h1" component="p" gutterBottom>
                  {data?.languages.length}
                </Typography>
              </Link>
            </>
          )}
        </AccountCard>

        <AccountCard
          color="brandLearning"
          action={
            <Button variant="contained" href="/account/learning/add/">
              Add learning
            </Button>
          }
        >
          <LearningGoalBar
            sx={{ mb: 5 }}
            description="You should aim to complete 10 days learning each year"
          />
        </AccountCard>

        {profiles.map((profile) => (
          <AccountCard
            color={profile.color}
            key={profile.title}
            headerLogoSize="large"
            headerLogo={profile.logo}
            header={<Typography variant="h2">{profile.title}</Typography>}
            headerColorInherit
            action={
              <Button variant="contained" href={profile.url}>
                Review {profile.title.toLowerCase()}
              </Button>
            }
          >
            <Typography gutterBottom>{profile.content}</Typography>
          </AccountCard>
        ))}
      </Content>
    </>
  )
}

export default IndexPage

IndexPage.getLayout = (page) => <AccountLayout>{page}</AccountLayout>

const profiles: MenuDataType[] = [
  {
    title: 'Skills',
    content:
      'Update your skills profile to record your current skills and ones you would like to develop.',
    url: '/account/skills',
    color: 'brandSkills',
    logo: 'skills'
  },
  {
    title: 'Learning',
    content:
      'Explore the wide variety of learning and training courses available to you.',
    url: '/account/learning',
    color: 'brandLearning',
    logo: 'mortar-hat'
  }
]
