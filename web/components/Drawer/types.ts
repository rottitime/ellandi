import { Drawer } from '@mui/material'
import { ComponentProps } from 'react'
import { MenuItem } from '../UI/AppBar/types'

export type Props = {
  pages: MenuItem[]
  settings: MenuItem[]
  settingsTip?: string
} & ComponentProps<typeof Drawer>
