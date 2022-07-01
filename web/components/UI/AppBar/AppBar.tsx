import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import Link from 'next/link'
import { colors } from '@/style/theme'
import Crown from '../../Icons/Crown'
import { FC, useState } from 'react'
import { Props } from './types'

const ResponsiveAppBar: FC<Props> = ({ pages, settings }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: colors.blueDark }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Crown style={{ fontSize: '32px', marginRight: '10px' }} />

          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {pages.map((page) => (
              <Link key={page.title} href={page.url} passHref>
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircle sx={{ color: colors.greyLight, fontSize: '31px' }} />
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
