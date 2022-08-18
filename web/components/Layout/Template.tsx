import AlphaBanner from '@/components/AlphaBanner/AlphaBanner'
import {
  Container as MuiContainer,
  ContainerProps,
  Link,
  styled,
  Typography
} from '@mui/material'
import { FC } from 'react'

type Props = ContainerProps

const bannerHeight = 60

const Container = styled(MuiContainer)`
  --banner-height: ${bannerHeight}px;

  padding: 0 ${({ disableGutters, theme }) => (disableGutters ? 0 : theme.spacing(3))};
  ${({ theme }) => theme.breakpoints.up('md')} {
    height: auto;
    min-height: calc(100vh - var(--banner-height));
  }
`

const Template: FC<Props> = ({ children, ...props }) => (
  <>
    <AlphaBanner sx={{ minHeight: bannerHeight }}>
      <Typography>
        This is a new service - your{' '}
        <Link href="mailto:feedback@gov.uk?subject=Ellandi feedback" target="_blank">
          feedback
        </Link>{' '}
        will help us to improve it.
      </Typography>
    </AlphaBanner>
    <Container maxWidth="xl" {...props}>
      <main>{children}</main>
    </Container>
  </>
)

export default Template
