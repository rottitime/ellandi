import Template from '@/components/Layout/Template'
import { govBackgroundDark, withGovLogoBackground } from '@/style/global'
import { styled, Alert, Box } from '@mui/material'
import { FC, useEffect, useRef } from 'react'
import { useUiContext } from '@/context/UiContext'
import GovCard from '@/components/UI/Cards/GovCard/GovCard'
import { Props } from './types'
import { title } from '@/content'

const Page = styled(Box)`
  flex-direction: column;
  min-height: calc(100vh - var(--banner-height));
  padding: ${(p) => p.theme.spacing(2)};
  ${({ theme }) => theme.breakpoints.up('md')} {
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    display: flex;
  }

  > .MuiPaper-root {
    ${({ theme }) => theme.breakpoints.up('md')} {
      width: 100%;
      margin: ${(p) => p.theme.spacing(2)};
    }
  }

  &.auto-width {
    > .MuiPaper-root {
      ${({ theme }) => theme.breakpoints.up('md')} {
        max-width: 100%;
        width: auto;
      }
    }
  }
`

const CardLayout: FC<Props> = ({
  children,
  footer,
  progress,
  dark,
  maxWidth = 540,
  ...props
}) => {
  const { error, loading, isErrorEcode, scroll } = useUiContext()
  const alertRef = useRef(null)

  useEffect(() => {
    if (!!error && !isErrorEcode()) scroll(alertRef.current)
  }, [error, isErrorEcode, scroll])

  return (
    <Template disableGutters>
      <style jsx global>
        {`
          ${withGovLogoBackground}
          ${dark && govBackgroundDark}
        `}
      </style>
      <Page>
        <GovCard
          title={props.title as string}
          progress={progress}
          loading={loading}
          headerTitle={title}
          sx={{ maxWidth }}
        >
          {!!error && (
            <Alert
              severity="error"
              sx={{ mt: 3, mb: 3 }}
              className="template-error"
              ref={alertRef}
            >
              <>{error}</>
            </Alert>
          )}
          {children}
        </GovCard>
        {footer}
      </Page>
    </Template>
  )
}

export default CardLayout
