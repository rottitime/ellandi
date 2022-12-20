import {
  Box,
  Divider,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
  Typography
} from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { Props } from './types'
import Button from '../UI/Button/Button'
import Icon from '../Icon/Icon'
import { MenuItem } from '../UI/AppBar/types'
import { useRouter } from 'next/router'

const DrawerStyled = styled(MuiDrawer)`
  .active {
    font-weight: bold;
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
    return menu.map(({ title, active, url }, index) => (
      <ListItem key={title} disablePadding>
        <ListItemButton onClick={() => router.push(url)}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
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
