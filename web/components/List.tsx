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
    content?: string
  }[]
} & ListProps

const List: FC<Props> = ({ list, ...props }) => (
  <MuiList {...props} sx={{ width: '100%' }}>
    {list.map(({ icon, title, content }) => (
      <ListItem alignItems="center" key={title} disablePadding sx={{ mb: 2 }}>
        <ListItemAvatar>{icon}</ListItemAvatar>
        <ListItemText
          primary={<Typography>{title}</Typography>}
          secondary={
            content ? (
              <Typography variant="caption" sx={{ color: 'rgb(159, 169, 183)' }}>
                {content}
              </Typography>
            ) : null
          }
        />
      </ListItem>
    ))}
  </MuiList>
)

export default List
