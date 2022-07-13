import {
  AppBar as MuiAppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import Link from 'next/link'
import Crown from '@/components/Icons/CrownLogo'
import { FC, useState } from 'react'
import { Props } from './types'

const AppBar = styled(MuiAppBar)`
  background: linear-gradient(127.55deg, #141e30 3.73%, #243b55 92.26%);
  .icon-account {
    color: ${(p) => p.theme.colors.greyLight};
    font-size: 31px;
  }
`

const ResponsiveAppBar: FC<Props> = ({ pages, settings }) => {
  // const theme = useTheme()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/account">
            <a>
              <Crown style={{ fontSize: '32px', marginRight: '10px', color: '#fff' }} />
            </a>
          </Link>

          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {pages.map((page) => (
              <Link key={page.title} href={page.url}>
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircle className="icon-account" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link href={setting.url} key={setting.title} passHref>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
