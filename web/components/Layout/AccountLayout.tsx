import { FC, ReactNode } from 'react'
import { Breadcrumbs, Typography, styled, alpha, Box } from '@mui/material'
import AppBar from '@/components/UI/AppBar/AppBar'
import Link from '@/components/UI/Link'
import Template from '@/components/Layout/Template'
import useAuth from '@/hooks/useAuth'
import Footer from '@/components/Footer/Footer'

const Layout = styled(Box)`
  --footer-height: 60px;

  > .MuiContainer-root {
    padding-top: ${(p) => p.theme.spacing(3)};
    padding-bottom: ${(p) => p.theme.spacing(5)};
    min-height: calc(100vh - var(--footer-height));
    height: auto;
  }
  .main-footer {
    height: var(--footer-height);
  }
  .MuiBreadcrumbs-root {
    margin-top: 36px;
    border-bottom: 3px solid #000;
    color: ${(p) => alpha(p.theme.colors.black, 0.6)};
    margin-bottom: ${(p) => p.theme.spacing(4)};
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

  .headline {
    margin-bottom: ${(p) => p.theme.spacing(5)};
  }
`
type Props = {
  children: ReactNode
  title: string | ReactNode
  breadcrumbs?: { title: string; url?: string }[]
  teaserHeadline?: string
  teaserContent?: string
}

const AccountLayout: FC<Props> = ({
  breadcrumbs = [],
  title,
  children,
  teaserHeadline,
  teaserContent
}) => {
  const { logout } = useAuth()

  return (
    <Layout>
      <Template>
        <AppBar
          pages={[
            { title: 'Home', url: '/account' },
            { title: 'Skills', url: '/account/skills', color: 'brandSkills' },
            { title: 'Learning', url: '/account/learning', color: 'brandLearning' }
          ]}
          settings={[
            { title: 'Profile', url: '/account/profile' },
            { title: 'Logout', url: '/', onClick: logout }
          ]}
        />
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/account">
            Home
          </Link>

          {breadcrumbs.map((item) =>
            item.url ? (
              <Link underline="hover" href={item.url} key={item.title}>
                {item.title}
              </Link>
            ) : (
              <Typography key={item.title}>{item.title}</Typography>
            )
          )}
        </Breadcrumbs>

        <Box className="headline">
          <Typography variant="h1" gutterBottom>
            {title}
          </Typography>

          {teaserHeadline && (
            <Typography variant="h1" component="p" gutterBottom>
              {teaserHeadline}
            </Typography>
          )}
          {teaserContent && (
            <Typography variant="subtitle1" component="p" gutterBottom>
              {teaserContent}
            </Typography>
          )}
        </Box>
        {children}
      </Template>

      <Footer
        menu={[
          { title: 'Cookies', url: '#' },
          { title: 'Privacy', url: '#' },
          { title: 'Contact us', url: '#' },
          { title: 'Help', url: '#' },
          { title: 'Accessibility statement', url: '#' }
        ]}
      />
    </Layout>
  )
}

export default AccountLayout
