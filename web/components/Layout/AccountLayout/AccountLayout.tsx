import { FC, useEffect } from 'react'
import {
  Breadcrumbs,
  Typography,
  styled,
  alpha,
  Box,
  CircularProgress
} from '@mui/material'
import AppBar from '@/components/UI/AppBar/AppBar'
import Link from '@/components/UI/Link'
import Template from '@/components/Layout/Template'
import useAuth from '@/hooks/useAuth'
import Footer from '@/components/Footer/Footer'
import Icon from '@/components/Icon/Icon'
import Headline from '@/components/Account/Headline/Headline'
import { useQuery } from 'react-query'
import { fetchMe } from '@/service/me'
import { Query, RegisterUserResponseWithCustomFields } from '@/service/api'
import router from 'next/router'
import getConfig from 'next/config'
import { Props } from './types'

const {
  publicRuntimeConfig: { urls }
} = getConfig()

const Layout = styled(Box)`
  --footer-height: 60px;

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
  .MuiBreadcrumbs-root {
    margin-top: ${(p) => p.theme.spacing(4)};
    border-bottom: 3px solid #000;
    color: ${(p) => alpha(p.theme.colors.black, 0.6)};
    margin-bottom: ${(p) => p.theme.spacing(4)};
    font-size: 16px;
    li {
      margin-bottom: 10px;
    }
    a {
      color: inherit;
    }
    p {
      font-weight: 700;
    }
  }

  .page-loading {
    display: flex;
    justify-content: center;
    padding: 50px;
  }
`

const AccountLayout: FC<Props> = ({
  breadcrumbs = [],
  title,
  titleIcon,
  children,
  teaserHeadline,
  brandColor,
  teaserContent
}) => {
  const { logout, authFetch, invalidate } = useAuth()
  const { isLoading, data, isError } = useQuery<RegisterUserResponseWithCustomFields>(
    Query.Me,
    () => authFetch(fetchMe),
    { retry: 1 }
  )

  useEffect(() => {
    if (!isLoading && !data) {
      invalidate()
      router.replace({
        pathname: '/signin',
        query: { ecode: 2 }
      })
    }
  }, [isLoading, data, invalidate])

  if (isError) return null

  return (
    <Layout>
      <Template>
        <AppBar
          sx={{ mt: 4 }}
          logoUrl={urls.landingSignin}
          settingsTip={data?.fullname}
          pages={[
            { title: 'Home', url: urls.landingSignin },
            { title: 'Skills', url: '/account/skills/', color: 'brandSkills' },
            { title: 'Learning', url: '/account/learning/', color: 'brandLearning' },
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
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href={urls.landingSignin}>
            Home
          </Link>

          {breadcrumbs.map((item) =>
            item.url ? (
              <Link underline="hover" href={item.url} key={item.title}>
                {item.title}
              </Link>
            ) : (
              <Typography key={item.title} variant="body2">
                {item.title}
              </Typography>
            )
          )}
        </Breadcrumbs>

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

        {isLoading ? (
          <Box className="page-loading">
            <CircularProgress />
          </Box>
        ) : (
          children
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
