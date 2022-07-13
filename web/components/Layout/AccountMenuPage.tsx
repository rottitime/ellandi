import { FC, ReactNode } from 'react'
import { Box, Breadcrumbs, Typography } from '@mui/material'
import AppBar from '@/components/UI/AppBar/AppBar'
import Link from '@/components/UI/Link'
import Template from './Template'

type Props = {
  children: ReactNode
  title: string | ReactNode
  breadcrumbs?: { title: string; url?: string }[]
  teaser?: string
}

const pages = [
  { title: 'Skills', url: '/account/skills' },
  { title: 'Learning', url: '/account/learning' }
  // { title: 'Careers', url: '/account/careers' },
  // { title: 'Communities', url: '/account/communities' },
  // { title: 'Favourites', url: '/account/favourites' }
]

const settings = [
  { title: 'Profile', url: '/account/profile' },
  { title: 'Logout', url: '/' }
]

const AccountMenuPage: FC<Props> = ({ breadcrumbs, title, children, teaser }) => (
  <Template header={<AppBar pages={pages} settings={settings} />}>
    <Box component="header" sx={{ my: 4 }}>
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

      {teaser && (
        <Typography variant="subtitle1" gutterBottom>
          {teaser}
        </Typography>
      )}
    </Box>

    {children}
  </Template>
)

export default AccountMenuPage
