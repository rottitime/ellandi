import { Typography } from '@mui/material'
import React, { FC } from 'react'
import Link from './UI/Link'

type Props = {
  list?: { title: string; url: string }[]
  title?: string
}

const links = [
  { title: 'Foundations of public admin', url: '#' },
  { title: 'Working in government', url: '#' },
  { title: 'Leading and managing', url: '#' },
  { title: 'Specialist skills', url: '#' },
  { title: 'Domain knowledge', url: '#' }
]

const LearningStrands: FC<Props> = ({
  list = links,
  title = 'Browse learning strands'
}) => (
  <>
    <Typography variant="h3" sx={{ mb: 3 }}>
      {title}
    </Typography>

    <ul>
      {list.map((item) => (
        <li key={item.title}>
          <Typography>
            <Link href={item.url}>{item.title}</Link>
          </Typography>
        </li>
      ))}
    </ul>
  </>
)

export default LearningStrands
