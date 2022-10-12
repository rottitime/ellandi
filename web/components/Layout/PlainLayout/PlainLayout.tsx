import { FC } from 'react'
import { styled, Typography } from '@mui/material'
import Template from '@/components/Layout/Template'
import { Props } from './types'

const Page = styled(Template)`
  padding-bottom: ${(p) => p.theme.spacing(5)};
  .main-header {
    margin-top: ${(p) => p.theme.spacing(4)};
    margin-bottom: ${(p) => p.theme.spacing(5)};
  }
`

const PlainLayout: FC<Props> = ({ title, children }) => (
  <Page>
    <header className="main-header">
      <Typography variant="h1">{title}</Typography>
    </header>

    {children}
  </Page>
)

export default PlainLayout
