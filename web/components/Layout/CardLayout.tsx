import Template from '@/components/Layout/Template'
import { withGovLogoBackground } from '@/style/global'
import { Grid, Typography, styled, Hidden, Box, Divider } from '@mui/material'
import { FC, ReactNode } from 'react'
import Crown from '@/components/Icons/CrownLogo'
import List from '@/components/List'
import { AccountBox, Yard, Search, QuestionAnswer } from '@mui/icons-material'
import { useUiContext } from '@/context/UiContext'
import GovCard from '@/components/UI/Cards/GovCard/GovCard'

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

const CardLayout: FC<Props> = ({ children, showPromo, title, footer, progress }) => {
  const { loading } = useUiContext()
  return (
    <Template disableGutters>
      <style jsx global>
        {withGovLogoBackground}
      </style>
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
          <GovCard loading={loading} title={title} progress={progress}>
            {children}
          </GovCard>
          {footer}
        </Grid>
      </GridContainer>
    </Template>
  )
}

export default CardLayout
