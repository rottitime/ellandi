import {
  Button,
  GridCol,
  GridRow,
  Heading,
  Input,
  LeadParagraph,
  Link,
  ListItem,
  Paragraph,
  Radio,
  UnorderedList
} from 'govuk-react'
import Layout from '@/components/Layout'
import styled from 'styled-components'

const HeaderIcon = styled.img`
  display: inline-block;
  vertical-align: middle;
  margin-right: 12px;
`

const LearningLinks = styled(Link)`
  background-color: #f2f2f2;
  display: block;
  margin-bottom: 4px;
  padding: 10px;
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

const Page = () => (
  <Layout backLink={true}>
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
        <Box>
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
          <Box>
            <Heading size="SMALL">
              <HeaderIcon src="/images/skills.svg" alt="" />
              Skills
            </Heading>
            <Text>
              Update your skills profile to find learning and development opportunities
              tailored to you
            </Text>
            <Button>Review your skills</Button>
          </Box>

          <Box>
            <Heading size="SMALL">
              <HeaderIcon src="/images/skills.svg" alt="" />
              Learning
            </Heading>
            <Text>
              Explore the wide variety of learning and training courses available to you
            </Text>
            <Button>Find learning</Button>
          </Box>

          <Box>
            <Heading size="SMALL">
              <HeaderIcon src="/images/skills.svg" alt="" />
              Careers
            </Heading>
            <Text>
              View current job vacancies and career pathways to discover what they involve
            </Text>
            <Button>Plan your career</Button>
          </Box>

          <Box>
            <Heading size="SMALL">
              <HeaderIcon src="/images/skills.svg" alt="" />
              Communities
            </Heading>
            <Text>
              Discuss ideas and share best practice with specific professions and
              functions
            </Text>
            <Button>Access communities</Button>
          </Box>
        </Grid>
      </GridCol>
    </GridRow>
  </Layout>
)

export default Page
