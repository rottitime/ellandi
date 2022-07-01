import { FC, ReactNode } from 'react'
import { Breadcrumbs, Container as MuiContainer, Typography, styled } from '@mui/material'
import AppBar from '@/components/UI/AppBar/AppBar'
import Link from '@/components/UI/Link'

type Props = {
  children: ReactNode
  breadcrumbs?: { title: string; url: string }[]
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

const AccountMenuPage: FC<Props> = ({ breadcrumbs, children }) => (
  <>
    <AppBar pages={pages} settings={settings} />
    <Container maxWidth="xl">
      {breadcrumbs && (
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          {breadcrumbs.map((item, i) =>
            i + 1 === breadcrumbs.length ? (
              <Typography color="text.primary">{item.title}</Typography>
            ) : (
              <Link underline="hover" color="inherit" href={item.url} key={item.title}>
                {item.title}
              </Link>
            )
          )}
        </Breadcrumbs>
      )}

      {children}
    </Container>
  </>
)

export default AccountMenuPage
