import Template from '@/components/Layout/Template'
import { Grid, Typography, styled, LinearProgress, Hidden, Box } from '@mui/material'
import Card from '@/components/UI/Card'
import { FC, ReactNode } from 'react'
import Crown from '@/components/Icons/CrownLogo'
import List from '@/components/List'
import {
  AccountBox,
  Yard,
  Work,
  Search,
  FormatListBulleted,
  QuestionAnswer
} from '@mui/icons-material'
import { useUiContext } from '@/context/UiContext'

type Props = {
  children: ReactNode
  title?: string | ReactNode
  progress?: number
}

const GridContainer = styled(Grid)`
  flex-direction: column;
  flex-wrap: nowrap;
  min-height: 100vh;
  ${({ theme }) => theme.breakpoints.up('md')} {
    flex-direction: row;
    flex-wrap: nowrap;
    /* height: 100%; */
  }
  > .MuiGrid-item {
    ${({ theme }) => theme.breakpoints.down('md')} {
      flex-basis: auto;
    }
  }

  .card-content {
    position: relative;
    transition: opacity ease-in-out 0.3;
    &.loading-active {
      :after {
        pointer-events: none;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        opacity: 0.3;
        background-color: ${(p) => p.theme.colors.white};
        z-index: 1;
      }
    }

    .loading-bar {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 2;
    }
  }

  .logo {
    font-size: 45px;
    margin-bottom: 40px;
  }

  .list svg {
    font-size: 40px;
    color: #f49e76;
  }

  .promo-box {
    /* background-color: rgb(9, 31, 62);
    color: #fff; */
    position: relative;
    padding: 20px;

    ${({ theme }) => theme.breakpoints.down('md')} {
      h1 {
        margin: 0;
      }
    }

    ${({ theme }) => theme.breakpoints.up('md')} {
      /* flex-direction: row;
      flex-wrap: wrap; */
      padding: 80px 48px 24px;
    }

    &:after {
      content: '';
      position: absolute;
      inset: 0px 0px 0px -100vw;
      z-index: -1;
      background-color: inherit;
    }
  }

  .main-content {
    justify-content: center;
    align-items: center;
    /* align-self: start; */
    display: flex;
    ${({ theme }) => theme.breakpoints.up('md')} {
      /* margin-top: 100px; */
    }
  }
`

export const FormFooter = styled(Box)`
  display: flex;
  justify-content: end;
  gap: 15px;
  padding-top: 20px;
`

const GenericPage: FC<Props> = ({ children, title, progress }) => {
  const { loading } = useUiContext()
  return (
    <Template disableGutters={true}>
      <GridContainer spacing={0} container>
        <Grid item xs={12} md={4} className="promo-box">
          <Crown className="logo" />
          <Typography variant="h1" gutterBottom>
            Civil Service Skills and Learning
          </Typography>
          <Hidden initialWidth="md" mdDown={true}>
            <Typography variant="h3" component="p">
              You can use this service to:
            </Typography>
            <List
              className="list"
              list={[
                {
                  icon: <AccountBox />,
                  title: 'Upload and maintain your skills and learning profile'
                },
                {
                  icon: <Yard />,
                  title: "Specify any skills you'd like to develop in the future"
                },
                {
                  icon: <Search />,
                  title: 'Find courses and development opportunities'
                },
                {
                  icon: <QuestionAnswer />,
                  title:
                    'support discussions about skills and career development with your line manager'
                }
              ]}
            />
          </Hidden>
        </Grid>
        <Grid item xs className="main-content">
          <Card
            elevation={0}
            className={`card-content ${loading ? 'loading-active' : ''}`}
            sx={{
              maxWidth: '540px',
              padding: '24px',
              wordWrap: 'break-word',
              m: 2,
              width: '100%'
            }}
          >
            <Typography variant="h1" sx={{ textAlign: 'center', mb: 3 }} component="h2">
              {title}
            </Typography>

            {progress && (
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ mb: 6, height: '7px' }}
              />
            )}

            {children}

            {loading && <LinearProgress className="loading-bar" />}
          </Card>
        </Grid>
      </GridContainer>
    </Template>
  )
}

export default GenericPage
