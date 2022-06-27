import Template from '@/components/Template'
import { Card, Grid, Typography, styled } from '@mui/material'
import { FC, ReactNode } from 'react'
import Crown from '@/components/icons/Crown'
import List from '@/components/List'
import {
  AccountBox,
  Yard,
  Work,
  Search,
  FormatListBulleted,
  QuestionAnswer
} from '@mui/icons-material'

type Props = {
  children: ReactNode
}

const GridContainer = styled(Grid)`
  flex-flow: row wrap;
  margin: 0px auto;
  height: 100vh;

  .logo {
    font-size: 45px;
    margin-bottom: 40px;
  }

  .list svg {
    font-size: 40px;
    color: #f49e76;
  }

  .first-box {
    background-color: rgb(9, 31, 62);
    position: relative;
    padding: 160px 48px 24px;
    color: #fff;

    &:after {
      content: '';
      position: absolute;
      inset: 0px 0px 0px -100vw;
      z-index: -1;
      background-color: inherit;
    }
  }

  .main-content {
    -webkit-box-pack: center;
    justify-content: center;
    padding: 0px;
    -webkit-box-align: center;
    align-items: center;
    display: flex;
  }
`

const GenericPage2: FC<Props> = ({ children }) => (
  <Template>
    <GridContainer spacing={0} container>
      <Grid item xs={12} md={4} className="first-box">
        <Crown className="logo" />
        <Typography variant="h1" gutterBottom>
          Civil Service Skills &amp; Learning
        </Typography>
        <Typography>You can use this service to:</Typography>
        <List
          className="list"
          list={[
            {
              icon: <AccountBox />,
              title: 'Your own skills profile',
              content: 'Upload and maintain your skills profile'
            },
            {
              icon: <Yard />,
              title: 'Develop in the future',
              content: 'Specify any skills youd like to develop in the future'
            },
            {
              icon: <Work />,
              title: 'Job suggestions',
              content: 'View job suggestions based on your skills'
            },
            {
              icon: <Search />,
              title: 'Find courses',
              content: 'Find courses based on your interests'
            },
            {
              icon: <FormatListBulleted />,
              title: 'Plan your career',
              content: 'Help you plan the next steps in your career'
            },
            {
              icon: <QuestionAnswer />,
              title: 'Discuss your skills',
              content: 'Facilitate discussions about skills with your line manager'
            }
          ]}
        />
        {/* Registering takes around 5 -10a minutes. Before you start You'll be asked to
        upload your CV. If you don't have a CV available you can add one later by going to
        your Profile */}
      </Grid>
      <Grid item xs className="main-content">
        <Card elevation={0} sx={{ maxWidth: '454px', padding: '24px' }}>
          {children}
        </Card>
      </Grid>
    </GridContainer>
  </Template>
)
export default GenericPage2
