import AccountLayout from '@/components/Layout/AccountLayout'
import { Divider, Grid, Typography } from '@mui/material'
import Link from '@/components/UI/Link'
import Communities from '@/components/Icons/Communities'
import ContentBox from '@/components/ContentBox'
import Card from '@/components/UI/Card'
import LinkButton from '@/components/LinkButton'

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
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        Start a conversation, share your views, ask a question.
      </Typography>
      <Card>
        <Typography variant="h2">My communities</Typography>
        <Grid container spacing={4}>
          {listCommunities.map((community) => (
            <Grid item xs={4} key={community.title}>
              <ContentBox sx={{ height: '100%' }}>
                <Typography variant="h3">
                  <Link href="#">{community.title}</Link>
                </Typography>
                <Typography>
                  <b>Members:</b> {community.members}
                  <br />
                  <b>Recent:</b> {community.recent}
                  <br />
                  <b>Posted:</b> {community.posted}
                </Typography>
              </ContentBox>
            </Grid>
          ))}
        </Grid>
        <LinkButton href="/register/page4" sx={{ my: 5 }}>
          View all communities
        </LinkButton>

        <Divider variant="middle" />

        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Typography variant="h2">Recent posts</Typography>

            {listPosts.map((post) => (
              <>
                <Typography variant="h3">
                  <Link href="#">{post.title}</Link>
                </Typography>
                <Typography>
                  {post.content}
                  <br />
                  Comments: {post.comments}
                </Typography>

                <Divider />
              </>
            ))}
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h2">Suggested communities</Typography>
            <ul>
              <li>
                <Link href="#">Climate change action Network</Link>
              </li>
              <li>
                <Link href="#">York based employees Network</Link>
              </li>
              <li>
                <Link href="#">Skills and Learning Service network</Link>
              </li>
              <li>
                <Link href="#">Work and Pensions Network</Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}

export default Page
Page.getLayout = (page) => (
  <AccountLayout
    title={
      <>
        <Communities /> Communities
      </>
    }
    breadcrumbs={[{ title: 'Communities' }]}
  >
    {page}
  </AccountLayout>
)
