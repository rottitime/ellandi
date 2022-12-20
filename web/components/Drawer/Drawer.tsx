import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { Toolbar, Typography } from '@mui/material'
import { Props } from './types'
import Button from '../UI/Button/Button'
import Icon from '../Icon/Icon'
import { MenuItem } from '../UI/AppBar/types'

export default function TemporaryDrawer({
  anchor,
  pages,
  settings,
  onClose,
  ...props
}: Props) {
  const renderList = (menu: MenuItem[]) => {
    return menu.map(({ title }, index) => (
      <ListItem key={title} disablePadding>
        <ListItemButton>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={<Typography variant="body2">{title}</Typography>} />
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
    <Drawer
      {...props}
      anchor={anchor}
      onClose={(e, reason) => typeof onClose === 'function' && onClose(e, reason)}
    >
      {list()}
    </Drawer>
  )
}
