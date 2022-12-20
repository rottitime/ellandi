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
import { FC, useState } from 'react'
import { Props } from './types'
import Icon from '@/components/Icon/Icon'
import { useRouter } from 'next/router'
import Button from '../Button/Button'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

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

const AppBar: FC<Props> = ({ pages, settings, settingsTip = '', ...props }) => {
  const theme = useTheme()
  const router = useRouter()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const isActive = (url: string): boolean => {
    const currentPath = router?.asPath
    const homepage = publicRuntimeConfig.urls.landingSignin

    //landing page
    if (url === homepage && currentPath === homepage) return true
    //url contains
    if (currentPath?.startsWith(url) && url !== homepage) return true

    return false
  }

  return (
    <StyledAppBar position="static" elevation={0} {...props}>
      <Toolbar disableGutters>
        <Box className="menu">
          {pages
            .filter(({ hidden }) => !hidden)
            .map(({ title, url, color }, i) => (
              <Button
                style={{
                  textDecorationColor: theme.colors[color],
                  color: isActive(url) ? theme.colors[color] : theme.colors.black
                }}
                key={title}
                href={url}
                className={` ${isActive(url) ? 'active' : ''}`}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '50px',
                    gap: '20px'
                  }}
                >
                  {i === 0 && <Icon icon="cabinet-office" className="header-logo" />}
                  {title}
                </span>
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
