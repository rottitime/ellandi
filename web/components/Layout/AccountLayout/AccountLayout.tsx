import { FC } from 'react'
import { Typography, styled, Box, CircularProgress } from '@mui/material'
import AppBar from '@/components/UI/AppBar/AppBar'
import Template from '@/components/Layout/Template'
import useAuth from '@/hooks/useAuth'
import Footer from '@/components/Footer/Footer'
import Icon from '@/components/Icon/Icon'
import Headline from '@/components/Account/Headline/Headline'
import { useQuery } from 'react-query'
import { fetchMe } from '@/service/me'
import { Query, RegisterUserResponseWithCustomFields } from '@/service/api'
import Router from 'next/router'
import getConfig from 'next/config'
import { Props } from './types'

const {
  publicRuntimeConfig: { urls, enableEmailVerify }
} = getConfig()

const Layout = styled(Box)`
  --footer-height: 60px;

  .navigation-section {
    border-bottom: 3px solid #000;
    margin-bottom: ${(p) => p.theme.spacing(4)};
    padding-bottom: ${(p) => p.theme.spacing(4)};
  }

  > .MuiContainer-root {
    padding-bottom: ${(p) => p.theme.spacing(5)};
    ${({ theme }) => theme.breakpoints.up('md')} {
      min-height: calc(100vh - (var(--footer-height) + var(--banner-height)));
      height: auto;
    }
  }
  .main-footer {
    height: var(--footer-height);
  }

  .page-loading {
    display: flex;
    justify-content: center;
    padding: 50px;
  }
`

const AccountLayout: FC<Props> = ({
  title,
  titleIcon,
  children,
  teaserHeadline,
  brandColor,
  teaserContent
}) => {
  const { logout, authFetch, invalidate } = useAuth()

  const { isLoading, data, isError } = useQuery<
    RegisterUserResponseWithCustomFields,
    Error
  >(Query.Me, () => authFetch(fetchMe), {
    retry: 0,
    onError: () => {
      invalidate()
      Router.replace({
        pathname: urls.signin,
        query: { ecode: 3 }
      })
    },
    onSuccess: ({ verified }) => {
      //check email is verified
      if (!verified && enableEmailVerify) Router.replace(urls.emailConfirm)
    }
  })

  if (isError) return null

  return (
    <Layout>
      <Template>
        {isLoading || (!!enableEmailVerify && !data.verified) ? (
          <Box className="page-loading" data-testid="layout-loading">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box className="navigation-section">
              <AppBar
                sx={{ mt: 4 }}
                logoUrl={urls.landingSignin}
                settingsTip={data?.fullname}
                pages={[
                  { title: 'Home', url: urls.landingSignin },
                  { title: 'Skills', url: '/account/skills/', color: 'brandSkills' },
                  {
                    title: 'Learning',
                    url: '/account/learning/',
                    color: 'brandLearning'
                  },
                  {
                    title: 'Your team',
                    url: '/account/your-team/',
                    hidden: !data?.has_direct_reports
                  }
                ]}
                settings={[
                  { title: 'Profile', url: '/account/profile/' },
                  { title: 'Sign out', url: urls.signin, onClick: logout }
                ]}
              />
            </Box>

            {title && (
              <Headline textColor={brandColor}>
                <Typography variant="h1" gutterBottom>
                  {titleIcon && <Icon icon={titleIcon} />}
                  {title}
                </Typography>
                {teaserHeadline && (
                  <Typography variant="h1" component="p" gutterBottom>
                    {teaserHeadline}
                  </Typography>
                )}
                {teaserContent && <Typography gutterBottom>{teaserContent}</Typography>}
              </Headline>
            )}

            {children}
          </>
        )}
      </Template>

      <Footer
        menu={[
          // { title: 'Cookies', url: '#' },
          { title: 'Privacy', url: '/help/privacy-policy', newWindow: true },
          // { title: 'Contact us', url: '#' },
          // { title: 'Help', url: '#' },
          // { title: 'Accessibility statement', url: '#' }
          {
            title: 'Feedback',
            url: 'https://civilserviceinsight.qualtrics.com/jfe/form/SV_1NQ8jHnD05yvpUW',
            newWindow: true
          }
        ]}
      />
    </Layout>
  )
}

export default AccountLayout
