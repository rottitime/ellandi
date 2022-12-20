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
import { Toolbar } from '@mui/material'
import { Props } from './types'
import Button from '../UI/Button/Button'
import Icon from '../Icon/Icon'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

export default function TemporaryDrawer({ anchor, onClose, ...props }: Props) {
  const list = (anchor: Anchor) => (
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
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  )

  return (
    <Drawer
      {...props}
      anchor={anchor}
      onClose={(e, reason) => typeof onClose === 'function' && onClose(e, reason)}
    >
      {list(anchor)}
    </Drawer>
  )
}
