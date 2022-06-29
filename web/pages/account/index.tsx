import {
  Button,
  GridCol,
  GridRow,
  Heading,
  Input,
  LeadParagraph,
  ListItem,
  Radio,
  UnorderedList
} from 'govuk-react'
import AccountLayout from '@/components/AccountLayout'
import Link from '@/components/UI/Link'
import { Text } from '@/components/UI/Shared/Shared'
import theme from '@/style/theme'
import styled from 'styled-components'
import SkillsIcon from '@/components/svg/Skills'
import CareersIcon from '@/components/svg/Careers'
import CommunitiesIcon from '@/components/svg/Communities'
import LearningIcon from '@/components/svg/Learning'
import { ReactNode } from 'react'

type MenuDataType = {
  title: string
  content: string
  linkText: string
  url: string
  color: string
  logo: ReactNode
}[]

const LearningLinks = styled(Link)`
  background-color: #f2f2f2;
  display: block;
  margin-bottom: 4px;
  padding: 13px;
`

const InfoBox = styled.div`
  border: 4px solid #1d70b8;
  .header {
    background-color: #1d70b8;
    color: #fff;
    padding: 5px 20px;
  }
  content {
    padding: 5px 20px;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  grid-gap: 15px;
  .first {
    grid-row: 1 / -1;
  }
`

const Box = styled.div`
  border-top: 2px solid #1d70b8;
  padding-top: 10px;
`

const menuData: MenuDataType = [
  {
    title: 'Skills',
    content:
      'Update your skills profile to find learning and development opportunities tailored to you',
    linkText: 'Review your skills',
    url: '/account/skills',
    color: theme.palette.profile.skills.color,
    logo: <SkillsIcon />
  },
  {
    title: 'Learning',
    content: 'Explore the wide variety of learning and training courses available to you',
    linkText: 'Find learning',
    url: '/account/learning',
    color: theme.palette.profile.learning.color,
    logo: <LearningIcon />
  },
  {
    title: 'Careers',
    content:
      'View current job vacancies and career pathways to discover what they involve',
    linkText: 'Plan your career',
    url: '/account/careers',
    color: theme.palette.profile.careers.color,
    logo: <CareersIcon />
  },
  {
    title: 'Communities',
    content:
      'Discuss ideas and share best practice with specific professions and functions',
    linkText: 'Access communities',
    url: '/account/communities',
    color: theme.palette.profile.communities.color,
    logo: <CommunitiesIcon />
  }
]

const IndexPage = () => (
  <>
    <div style={{ width: '518px' }}>
      <div style={{ display: 'flex', columnGap: '10px' }}>
        <Input placeholder="Your search term" />
        <Button>Search</Button>
      </div>
      <Radio inline name="group1">
        All
      </Radio>
      <Radio inline name="group1">
        Skills
      </Radio>
      <Radio inline name="group1">
        Learning
      </Radio>
      <Radio inline name="group1">
        Careers
      </Radio>
      <Radio inline name="group1">
        Communities
      </Radio>
    </div>

    <Heading style={{ display: 'block', clear: 'both' }}>Welcome, Joe</Heading>

    <LeadParagraph>
      Use this service to add and review skills, view learning opportunities, plan your
      career pathway and keep up to date with communities.
    </LeadParagraph>

    <GridRow>
      <GridCol setWidth="one-third">
        <Box>
          <InfoBox>
            <Heading size="SMALL" className="header">
              Latest updates
            </Heading>
            <div className="content">
              <UnorderedList>
                <ListItem>
                  You currently have no skills on your profile. Try adding a new skill{' '}
                </ListItem>
                <ListItem>You need to complete your DDAT assessment</ListItem>
                <ListItem>
                  Government as a platform has been added as a new course
                </ListItem>
                <Link href="#">
                  <b>Clear latest updates</b>
                </Link>
              </UnorderedList>
            </div>
          </InfoBox>
        </Box>

        <Box style={{ marginTop: '20px' }}>
          <LeadParagraph>Browse learning strands</LeadParagraph>
          <LearningLinks href="#">Foundations of public admin</LearningLinks>
          <LearningLinks href="#">Working in government</LearningLinks>
          <LearningLinks href="#">Leading and managing</LearningLinks>
          <LearningLinks href="#">Specialist skills</LearningLinks>
          <LearningLinks href="#">Domain knowledge</LearningLinks>
        </Box>
      </GridCol>
      <GridCol setWidth="two-thirds">
        <Grid>
          {menuData.map((menu) => (
            <Box key={menu.title}>
              <Heading
                size="SMALL"
                style={{
                  color: menu.color,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                {menu.logo}
                {menu.title}
              </Heading>
              <Text>{menu.content}</Text>
              <Link href={menu.url}>
                <Button>{menu.linkText}</Button>
              </Link>
            </Box>
          ))}
        </Grid>
      </GridCol>
    </GridRow>
  </>
)

export default IndexPage

IndexPage.getLayout = (page) => <AccountLayout>{page}</AccountLayout>
