import Template from '@/components/Layout/Template'
import { withGovLogoBackground } from '@/style/global'
import { Grid, Typography, styled, Box, Divider, Alert } from '@mui/material'
import { FC } from 'react'
import List from '@/components/List'
import { AccountBox, Yard, Search, QuestionAnswer } from '@mui/icons-material'
import { useUiContext } from '@/context/UiContext'
import GovCard from '@/components/UI/Cards/GovCard/GovCard'
import { Props } from './types'

const GridContainer = styled(Grid)`
  flex-direction: column;
  flex-wrap: nowrap;
  min-height: calc(100vh - var(--banner-height));
  ${({ theme }) => theme.breakpoints.up('md')} {
    flex-direction: row;
    flex-wrap: nowrap;
  }
  > .MuiGrid-item {
    ${({ theme }) => theme.breakpoints.down('md')} {
      flex-basis: auto;
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
    order: 1;
    flex-grow: 1;

    ${({ theme }) => theme.breakpoints.down('md')} {
      h1 {
        margin: 0;
      }
    }

    ${({ theme }) => theme.breakpoints.up('md')} {
      order: 0;
      flex-grow: 0;
      padding: 80px 48px 60px;

      display: flex;
      align-items: center;
    }

    &:after {
      content: '';
      position: absolute;
      inset: 0px 0px 0px -100vw;
      z-index: -1;
      background-color: #161e2f;
    }

    .MuiDivider-root {
      border-color: ${(p) => p.theme.colors.white};
    }
  }

  .main-content {
    flex-grow: 0;
    order: 0;
    padding: ${(p) => p.theme.spacing(2)};
    ${({ theme }) => theme.breakpoints.up('md')} {
      order: 1;
      flex-grow: 1;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      display: flex;
    }

    > .MuiPaper-root {
      ${({ theme }) => theme.breakpoints.up('md')} {
        max-width: 540px;
        width: 100%;
        margin: ${(p) => p.theme.spacing(2)};
      }
    }
  }
`

const CardLayout: FC<Props> = ({ children, showPromo, title, footer, progress }) => {
  const { error } = useUiContext()
  return (
    <Template disableGutters>
      <style jsx global>
        {withGovLogoBackground}
      </style>
      <GridContainer spacing={0} container>
        <Grid item xs className="main-content">
          <GovCard title={title} progress={progress}>
            {!!error && (
              <Alert severity="error" sx={{ mt: 3, mb: 3 }}>
                <>{error}</>
              </Alert>
            )}

            {children}
          </GovCard>
          {footer}
        </Grid>
        {!!showPromo && (
          <Grid item xs={12} md={4} className="promo-box">
            <Box>
              <Typography variant="h1" component="h2" gutterBottom textAlign="center">
                Civil Service Skills and Learning
              </Typography>

              <Divider variant="middle" sx={{ my: 4 }} />
              <Typography>You can use this service to:</Typography>
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
            </Box>
          </Grid>
        )}
      </GridContainer>
    </Template>
  )
}

export default CardLayout
