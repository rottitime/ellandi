import { FC, ReactNode } from 'react'
import { Box, styled, Typography } from '@mui/material'
import Crown from '@/components/Icons/CrownLogo'
import Template from '@/components/Layout/Template'

type Props = {
  children: ReactNode
  title: string | ReactNode
}

const Page = styled(Template)`
  padding-top: ${(p) => p.theme.spacing(6)};
  .main-header {
    text-align: center;
    margin-bottom: ${(p) => p.theme.spacing(5)};

    .logo {
      font-size: 45px;
      display: inline-block;
      margin-bottom: ${(p) => p.theme.spacing(4)};
    }
  }
`

const PlainLayout: FC<Props> = ({ title, children }) => {
  return (
    <Page>
      <header className="main-header">
        <Box className="logo">
          <Crown />
        </Box>
        <Typography variant="leader" sx={{ textAlign: 'center', mb: 3 }}>
          {title}
        </Typography>
      </header>

      {children}
    </Page>
  )
}

export default PlainLayout
