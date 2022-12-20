import {
  Box,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  Toolbar,
  Typography
} from '@mui/material'
import { Props } from './types'
import Button from '../UI/Button/Button'
import Icon from '../Icon/Icon'
import { MenuItem } from '../UI/AppBar/types'
import { useRouter } from 'next/router'

const DrawerStyled = styled(MuiDrawer)`
  .MuiToolbar-root {
    justify-content: end;
  }
  .active {
    font-weight: bold;
  }

  svg {
    font-size: 20px;
    color: inherit;
  }
`

export default function TemporaryDrawer({
  anchor,
  pages,
  settings,
  onClose,
  ...props
}: Props) {
  const router = useRouter()
  const renderList = (menu: MenuItem[]) => {
    return menu.map(({ title, active, url, icon }) => (
      <ListItem
        key={title}
        disablePadding
        secondaryAction={
          icon && (
            <IconButton edge="end" aria-label="delete">
              <Icon icon={icon} />
            </IconButton>
          )
        }
      >
        <ListItemButton onClick={() => router.push(url)}>
          <ListItemText
            primary={
              <Typography variant="body2" className={`${active ? 'active' : ''}`}>
                {title}
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
    ))
  }

  const list = () => (
    <>
      <Toolbar disableGutters>
        <Button
          onClick={(e) => typeof onClose === 'function' && onClose(e, 'backdropClick')}
        >
          <Icon icon="cross" />
        </Button>
      </Toolbar>
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
      >
        <List>{renderList(pages)}</List>
        <Divider />
        <List>{renderList(settings)}</List>
      </Box>
    </>
  )

  return (
    <DrawerStyled
      {...props}
      anchor={anchor}
      onClose={(e, reason) => typeof onClose === 'function' && onClose(e, reason)}
    >
      {list()}
    </DrawerStyled>
  )
}

export * from './types'
