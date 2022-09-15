import Template from '@/components/Layout/Template'
import { withGovLogoBackground } from '@/style/global'
import { styled, Alert, Box } from '@mui/material'
import { FC } from 'react'
import { useUiContext } from '@/context/UiContext'
import GovCard from '@/components/UI/Cards/GovCard/GovCard'
import { Props } from './types'

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
      max-width: 540px;
      width: 100%;
      margin: ${(p) => p.theme.spacing(2)};
    }
  }
`

const CardLayout: FC<Props> = ({ children, title, footer, progress }) => {
  const { error, loading } = useUiContext()
  return (
    <Template disableGutters>
      <style jsx global>
        {withGovLogoBackground}
      </style>
      <Page>
        <GovCard
          title={title}
          progress={progress}
          loading={loading}
          headerTitle="Civil Service Skills and Learning"
        >
          {!!error && (
            <Alert severity="error" sx={{ mt: 3, mb: 3 }}>
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
