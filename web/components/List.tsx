import { FC, ReactElement } from 'react'
import {
  List as MuiList,
  ListProps,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography
} from '@mui/material'

type Props = {
  list: {
    icon: ReactElement
    title: string
    content: string
  }[]
} & ListProps

const List: FC<Props> = ({ list, ...props }) => (
  <MuiList {...props} sx={{ width: '100%' }}>
    {list.map(({ icon, title, content }) => (
      <ListItem alignItems="center" key={title} disablePadding>
        <ListItemAvatar>{icon}</ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="h3">
              <b>{title}</b>
            </Typography>
          }
          secondary={
            <Typography variant="caption" sx={{ color: 'rgb(159, 169, 183)' }}>
              {content}
            </Typography>
          }
        />
      </ListItem>
    ))}
  </MuiList>
)

export default List
