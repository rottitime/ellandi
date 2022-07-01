import { Typography } from '@mui/material'
import React from 'react'
import Link from './UI/Link'

const links = [
  { title: 'Foundations of public admin', url: '#' },
  { title: 'Working in government', url: '#' },
  { title: 'Leading and managing', url: '#' },
  { title: 'Specialist skills', url: '#' },
  { title: 'Domain knowledge', url: '#' }
]

const LearningStrands = () => (
  <>
    <Typography variant="h3" sx={{ mb: 3 }}>
      Browse learning strands
    </Typography>

    <ul>
      {links.map((item) => (
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
