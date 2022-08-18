import { FC } from 'react'
import { styled, Typography } from '@mui/material'
import Template from '@/components/Layout/Template'
import { Props } from './types'

const Page = styled(Template)`
  padding-top: ${(p) => p.theme.spacing(6)};
  .main-header {
    text-align: center;
    margin-bottom: ${(p) => p.theme.spacing(5)};
  }
`

const PlainLayout: FC<Props> = ({ title, children }) => (
  <Page>
    <header className="main-header">
      <Typography variant="display" sx={{ textAlign: 'center', mb: 3 }}>
        {title}
      </Typography>
    </header>

    {children}
  </Page>
)

export default PlainLayout
