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
  useMediaQuery,
  useTheme
} from '@mui/material'
import { useState } from 'react'
import { Props } from './types'
import Icon from '@/components/Icon/Icon'
import { useRouter } from 'next/router'
import Button from '../Button/Button'
import Drawer from '@/components/Drawer/Drawer'

const StyledAppBar = styled(MuiAppBar)`
  background: transparent;

  .header-logo {
    color: ${(p) => p.theme.colors.black};
    font-size: 50px;
    margin-right: 20px;
  }

  .button-wrapper {
    display: flex;
    align-items: center;
    height: 50px;
    gap: 20px;
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

const AppBar = ({ pages, settings, homepage, settingsTip = '', ...props }: Props) => {
  const theme = useTheme()
  const router = useRouter()

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [mobleMenu, setMobileMenu] = useState(false)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const isActive = (url: string): boolean => {
    const currentPath = router?.asPath
    const { url: homepageLink } = homepage

    //landing page
    if (url === homepageLink && currentPath === homepageLink) return true
    //url contains
    if (currentPath?.startsWith(url) && url !== homepageLink) return true

    return false
  }

  const pagesWithActive = pages.map((page) => ({ ...page, active: isActive(page.url) }))

  return (
    <StyledAppBar position="static" elevation={0} {...props}>
      <Toolbar disableGutters>
        <Box className="menu">
          <Button
            style={{
              textDecorationColor: theme.colors[homepage.color],
              color: isActive(homepage.url)
                ? theme.colors[homepage.color]
                : theme.colors.black
            }}
            href={homepage.url}
            className={`homelink ${isActive(homepage.url) ? 'active' : ''}`}
          >
            <span className="button-wrapper">
              <Icon icon="cabinet-office" className="header-logo" />
              {!isMobile && homepage.title}
            </span>
          </Button>

          {!isMobile &&
            pagesWithActive
              .filter(({ hidden }) => !hidden)
              .map(({ title, url, color, active }, i) => (
                <Button
                  style={{
                    textDecorationColor: theme.colors[color],
                    color: active ? theme.colors[color] : theme.colors.black
                  }}
                  key={title}
                  href={url}
                  className={` ${active ? 'active' : ''}`}
                >
                  <span className="button-wrapper">{title}</span>
                </Button>
              ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          {isMobile ? (
            <IconButton
              sx={{ p: 0 }}
              onClick={() => setMobileMenu(true)}
              className="mobleMenu"
            >
              <Icon icon="menu" />
            </IconButton>
          ) : (
            <>
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
            </>
          )}
        </Box>
      </Toolbar>
      {isMobile && (
        <Drawer
          anchor="right"
          open={mobleMenu}
          pages={pagesWithActive}
          settings={settings}
          onClose={() => setMobileMenu(false)}
        />
      )}
    </StyledAppBar>
  )
}
export default AppBar
