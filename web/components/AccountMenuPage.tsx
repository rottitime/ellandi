import { FC, ReactNode } from 'react'
import { Breadcrumbs, Container as MuiContainer, Typography, styled } from '@mui/material'
import AppBar from '@/components/UI/AppBar/AppBar'
import Link from '@/components/UI/Link'

type Props = {
  children: ReactNode
  title: string | ReactNode
  breadcrumbs?: { title: string; url?: string }[]
}

const pages = [
  { title: 'Skills', url: '/account/skills' },
  { title: 'Learning', url: '/account/learning' },
  { title: 'Careers', url: '/account/careers' },
  { title: 'Communities', url: '/account/communities' },
  { title: 'Favourites', url: '/account/favourites' }
]

const settings = [
  { title: 'Profile', url: '/account/profile' },
  { title: 'Logout', url: '/' }
]

const Container = styled(MuiContainer)`
  padding-top: 20px;
  padding-bottom: 20px;
`

const AccountMenuPage: FC<Props> = ({ breadcrumbs, title, children }) => (
  <>
    <AppBar pages={pages} settings={settings} />
    <Container maxWidth="xl">
      {breadcrumbs && (
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link underline="hover" color="inherit" href="/account">
            Home
          </Link>

          {breadcrumbs.map((item) =>
            item.url ? (
              <Link underline="hover" color="inherit" href={item.url} key={item.title}>
                {item.title}
              </Link>
            ) : (
              <Typography color="text.primary">{item.title}</Typography>
            )
          )}
        </Breadcrumbs>
      )}

      <Typography variant="h1" gutterBottom>
        {title}
      </Typography>

      {children}
    </Container>
  </>
)

export default AccountMenuPage
