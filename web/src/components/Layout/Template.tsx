import AlphaBanner from '@/components/AlphaBanner/AlphaBanner'
import {
  Container as MuiContainer,
  ContainerProps,
  Link,
  styled,
  Typography
} from '@mui/material'
import { FC } from 'react'
import { useUiContext } from '@/context/UiContext'

type Props = ContainerProps

const Container = styled(MuiContainer, {
  shouldForwardProp: (p) => p !== 'bannerHeight'
})<Props & { bannerHeight: number }>`
  --banner-height: ${({ bannerHeight }) => bannerHeight}px;

  padding: var(--banner-height)
    ${({ disableGutters, theme }) => (disableGutters ? 0 : theme.spacing(3))};

  ${({ theme }) => theme.breakpoints.up('md')} {
    height: auto;
    min-height: calc(100vh - var(--banner-height));
  }
`

const Template: FC<Props> = ({ children, ...props }) => {
  const { setBannerHeight, bannerHeight } = useUiContext()

  return (
    <>
      <AlphaBanner getHeight={(height) => setBannerHeight(height)} sticky>
        <Typography variant="body2">
          This is a new service - your{' '}
          <Link
            href="https://civilserviceinsight.qualtrics.com/jfe/form/SV_1NQ8jHnD05yvpUW"
            rel="noopener noreferrer"
            target="_blank"
          >
            feedback
          </Link>{' '}
          will help us to improve it.
        </Typography>
      </AlphaBanner>
      <Container maxWidth="xl" bannerHeight={bannerHeight} {...props}>
        <main>{children}</main>
      </Container>
    </>
  )
}

export default Template
