import {
  Button,
  GridCol,
  GridRow,
  Heading,
  LeadParagraph,
  ListItem,
  SectionBreak,
  UnorderedList
} from 'govuk-react'
import AccountLayout from '@/components/AccountLayout'
import styled, { useTheme } from 'styled-components'
import Link from '@/components/UI/Link'
import { Text } from '@/components/UI/Shared/Shared'
import Communities from '@/components/svg/Communities'
import Card from '@/components/UI/Card'

const CommunityList = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 20px;
`

const listCommunities = [
  {
    title: 'Learn UX Design Network',
    members: '6,254',
    recent: 'How do I vertically align in Figma?',
    posted: '25m ago'
  },
  {
    title: 'Agile Learning Network',
    members: '231',
    recent: 'Next bitesized agile learning course details',
    posted: '15m ago'
  },
  {
    title: 'GBS Events Network',
    members: '6,254',
    recent: 'Civil Service Live 2023 ',
    posted: '2d ago'
  },
  {
    title: 'Interaction Designers Network',
    members: '96',
    recent: 'Is there a repository for gov design assets like fonts etc?',
    posted: '7d ago'
  },
  {
    title: 'Strategic Workforce Planning Network',
    members: '163',
    recent: "July's monthly meeting agenda",
    posted: '12d ago'
  },
  {
    title: 'User Centred Design Network',
    members: '3,152',
    recent: 'Looking for focus group participants',
    posted: '2m ago'
  }
]

const listPosts = [
  {
    title: 'How do I vertically align in Figma?',
    content: '15m ago in User Centred Design Network',
    comments: 0
  },
  {
    title:
      "does anyone have a prototype that was using heroku's automatic github deploy that I can test something with, nowish? ",
    content: '33m ago in User Centred Design Network',
    comments: 3
  },

  {
    title: 'Grab a last minute ticket for the Civil Service Live 2023',
    content: '1hr 22m ago in User Centred Design Network',
    comments: 2
  },

  {
    title: 'What Adobe tools do you use?',
    content: '1 day ago in User Centred Design Network',
    comments: 1
  }
]

const Page = () => {
  const theme = useTheme()

  return (
    <>
      <Heading style={{ color: theme.palette.profile.communities.color }}>
        <Communities style={{ marginRight: '10px' }} />
        Communities
      </Heading>
      <LeadParagraph>
        Start a conversation, share your views, ask a question.
      </LeadParagraph>
      <Heading as="h2" size="S">
        My communities
      </Heading>

      <CommunityList>
        {listCommunities.map((community) => (
          <Card key={community.title} noMargin>
            <Heading as="h3" size="S">
              <Link href="#">{community.title}</Link>
            </Heading>
            <Text>
              <b>Members:</b> {community.members}
              <br />
              <b>Recent:</b> {community.recent}
              <br />
              <b>Posted:</b> {community.posted}
            </Text>
          </Card>
        ))}
      </CommunityList>

      <Button buttonColour="#1d70b8">View all communities</Button>

      <GridRow>
        <GridCol setWidth="two-thirds">
          <Heading as="h2" size="S">
            Recent posts
          </Heading>

          {listPosts.map((post) => (
            <>
              <Heading as="h3" size="S" style={{ margin: 0 }}>
                <Link href="#">{post.title}</Link>
              </Heading>
              <Text>
                {post.content}
                <br />
                Comments: {post.comments}
              </Text>

              <SectionBreak level="MEDIUM" visible />
            </>
          ))}
        </GridCol>
        <GridCol setWidth="one-third">
          <Heading as="h2" size="S">
            Suggested communities
          </Heading>

          <UnorderedList>
            <ListItem>
              <Link href="#">Climate change action Network</Link>
            </ListItem>
            <ListItem>
              <Link href="#">York based employees Network</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Skills and Learning Service network</Link>
            </ListItem>
            <ListItem>
              <Link href="#">Work and Pensions Network</Link>
            </ListItem>
          </UnorderedList>
        </GridCol>
      </GridRow>
    </>
  )
}

export default Page
Page.getLayout = (page) => <AccountLayout activeMenu={4}>{page}</AccountLayout>
