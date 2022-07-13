import Template from '@/components/Layout/Template'
import {
  Grid,
  Typography,
  styled,
  LinearProgress,
  Hidden,
  Box,
  Divider
} from '@mui/material'
import Card from '@/components/UI/Card'
import { FC, ReactNode } from 'react'
import Crown from '@/components/Icons/CrownLogo'
import List from '@/components/List'
import { AccountBox, Yard, Search, QuestionAnswer } from '@mui/icons-material'
import { useUiContext } from '@/context/UiContext'

type Props = {
  children: ReactNode
  footer?: ReactNode
  title?: string | ReactNode
  progress?: number
  showPromo?: boolean
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

    ${({ theme }) => theme.breakpoints.up('md')} {
      margin-bottom: 40px;
      position: absolute;
      top: ${(p) => p.theme.spacing(4)};
      left: ${(p) => p.theme.spacing(4)};
    }
  }

  .list svg {
    font-size: 40px;
    color: #f49e76;
  }

  .promo-box {
    background: linear-gradient(127.55deg, #141e30 3.73%, #243b55 92.26%);
    color: ${(p) => p.theme.colors.white};
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
      padding: 80px 48px 60px;

      display: flex;
      align-items: center;
    }

    &:after {
      content: '';
      position: absolute;
      inset: 0px 0px 0px -100vw;
      z-index: -1;
      background-color: ${({ theme }) => theme.colors.blueDark};
    }

    .MuiDivider-root {
      border-color: ${(p) => p.theme.colors.white};
    }
  }

  .main-content {
    justify-content: center;
    align-items: center;
    /* align-self: start; */
    flex-direction: column;
    display: flex;
    ${({ theme }) => theme.breakpoints.up('md')} {
      /* margin-top: 100px; */
    }
  }
`

const GenericPage: FC<Props> = ({ children, showPromo, title, footer, progress }) => {
  const { loading } = useUiContext()
  return (
    <Template disableGutters>
      <GridContainer spacing={0} container>
        {!!showPromo && (
          <Grid item xs={12} md={4} className="promo-box">
            <Crown className="logo" />
            <Box>
              <Typography variant="leader" gutterBottom textAlign="center">
                Civil Service Skills and Learning
              </Typography>

              <Hidden initialWidth="md" mdDown={true}>
                <Divider variant="middle" sx={{ my: 4 }} />
                <Typography variant="h3" component="p">
                  You can use this service to:
                </Typography>
                <List
                  className="list"
                  list={[
                    {
                      icon: <AccountBox />,
                      title: 'upload and maintain your skills and learning profile'
                    },
                    {
                      icon: <Yard />,
                      title: "specify any skills you'd like to develop in the future"
                    },
                    {
                      icon: <Search />,
                      title: 'find courses and development opportunities'
                    },
                    {
                      icon: <QuestionAnswer />,
                      title:
                        'support discussions about skills and career development with your line manager'
                    }
                  ]}
                />
              </Hidden>
            </Box>
          </Grid>
        )}
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
                sx={{ mb: 4, height: '7px' }}
              />
            )}

            {children}

            {loading && <LinearProgress className="loading-bar" />}
          </Card>
          {footer}
        </Grid>
      </GridContainer>
    </Template>
  )
}

export default GenericPage
