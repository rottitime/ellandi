import { Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ComponentProps, FC } from 'react'
import LinkButton from '@/components/LinkButton'
import useTranslation from '@/hooks/useTranslation'

type Props = {
  buttonProps?: ComponentProps<typeof Button>
  backUrl?: string
}

export const Footer = styled(Box)`
  display: flex;
  justify-content: end;
  gap: 15px;
  padding-top: 20px;
  align-items: center;
`

const FormFooter: FC<Props> = ({ backUrl, buttonProps }) => {
  const { t } = useTranslation()
  return (
    <Footer>
      {backUrl && (
        <LinkButton href={backUrl} variant="outlined">
          {t('buttonBack')}
        </LinkButton>
      )}
      <Button variant="contained" type="submit" {...buttonProps}>
        Continue
      </Button>
    </Footer>
  )
}

export default FormFooter
