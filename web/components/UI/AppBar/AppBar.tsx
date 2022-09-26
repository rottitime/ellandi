import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material'
import Link from 'next/link'
import { FC, useState } from 'react'
import { Props } from './types'
import Icon from '@/components/Icon/Icon'
import { useRouter } from 'next/router'
import Button from '../Button/Button'

const StyledAppBar = styled(MuiAppBar)`
  background: transparent;

  .header-logo {
    color: ${(p) => p.theme.colors.black};
    font-size: 50px;
    margin-right: 20px;
  }

  .menu {
    flex-grow: 1;
    display: flex;
    a {
      color: ${(p) => p.theme.colors.black};
      font-weight: 700;
      font-size: 20px;
      text-transform: none;
      display: block;
    }
    .active {
      text-decoration: underline 4px;
      text-underline-offset: 5px;
    }
  }

  .icon-profile {
    font-size: 32px;
  }
`

const AppBar: FC<Props> = ({ pages, logoUrl, settings, settingsTip = '', ...props }) => {
  const theme = useTheme()
  const router = useRouter()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <StyledAppBar position="static" elevation={0} {...props}>
      <Toolbar disableGutters>
        <Link href={logoUrl}>
          <a>
            <Icon icon="crown-logo" className="header-logo" />
          </a>
        </Link>

        <Box className="menu">
          {pages
            .filter(({ hidden }) => !hidden)
            .map(({ title, url, color }) => (
              <Button
                style={{ textDecorationColor: theme.colors[color] }}
                key={title}
                href={url}
                className={` ${router?.pathname === url ? 'active' : ''}`}
              >
                {title}
              </Button>
            ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title={settingsTip}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Icon icon="account-circle" className="icon-profile" />
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
            {settings.map(({ url, title, onClick }) => (
              <MenuItem
                key={title}
                onClick={(e) => {
                  handleCloseUserMenu()

                  if (onClick !== undefined) onClick(e)
                  if (url) router.push(url)
                }}
              >
                <Typography textAlign="center" variant="body2">
                  {title}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </StyledAppBar>
  )
}
export default AppBar
