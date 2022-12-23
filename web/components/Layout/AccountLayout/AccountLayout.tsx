import { FC } from 'react'
import { Typography, styled, Box, CircularProgress } from '@mui/material'
import AppBar from '@/components/UI/AppBar/AppBar'
import Template from '@/components/Layout/Template'
import useAuth from '@/hooks/useAuth'
import Footer from '@/components/Footer/Footer'
import Icon from '@/components/Icon/Icon'
import Headline from '@/components/Account/Headline/Headline'
import { useQuery } from '@tanstack/react-query'
import { fetchMe } from '@/service/me'
import { Query, RegisterUserResponseWithCustomFields } from '@/service/api'
import Router, { useRouter } from 'next/router'
import getConfig from 'next/config'
import { Props } from './types'
import { isRegisterComplete } from '@/lib/profile-utils'

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
  const router = useRouter()
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
    onSuccess: (data) => {
      //check email is verified
      if (!data.verified && enableEmailVerify) Router.replace(urls.emailConfirm)
      if (!isRegisterComplete(data)) {
        router.push('/register/step/0/')
      }
    }
  })

  if (isError) return null

  return (
    <Layout>
      <Template>
        {isLoading ||
        (!!enableEmailVerify && !data.verified) ||
        !isRegisterComplete(data) ? (
          <Box className="page-loading" data-testid="layout-loading">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box className="navigation-section">
              <AppBar
                sx={{ mt: 4 }}
                settingsTip={data?.fullname}
                homepage={{
                  title: 'Home',
                  url: urls.landingSignin,
                  icon: 'cabinet-office'
                }}
                pages={[
                  {
                    title: 'Skills',
                    url: '/account/skills/',
                    color: 'brandSkills',
                    icon: 'skills'
                  },
                  {
                    title: 'Learning',
                    url: '/account/learning/',
                    color: 'brandLearning',
                    icon: 'mortar-hat'
                  },
                  {
                    title: 'Your team',
                    url: '/account/your-team/',
                    hidden: !data?.has_direct_reports,
                    icon: 'team'
                  },
                  {
                    title: 'Reports',
                    url: '/account/reports/',
                    hidden: !data?.has_reports_access,
                    icon: 'report'
                  }
                ]}
                settings={[
                  { title: 'Profile', url: '/account/profile/', icon: 'profile' },
                  {
                    title: 'Invite members',
                    url: '/account/invite/',
                    icon: 'paper-plane'
                  },
                  { title: 'Sign out', url: urls.signin, onClick: logout, icon: 'exit' }
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
          { title: 'Privacy', url: '/help/privacy-policy', newWindow: true },
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
