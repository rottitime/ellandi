import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ComponentProps, FC } from 'react'
import LinkButton from '@/components/LinkButton'
import { LoadingButton } from '@mui/lab'

type Props = {
  buttonProps?: ComponentProps<typeof LoadingButton>
  submitText?: string
  backUrl?: string
}

export const Footer = styled(Box)`
  display: flex;
  justify-content: end;
  gap: 15px;
  padding-top: 20px;
  align-items: center;
  justify-content: space-between;
`

const FormFooter: FC<Props> = ({ backUrl, buttonProps, submitText = 'Continue' }) => {
  return (
    <Footer>
      {backUrl && (
        <LinkButton href={backUrl} variant="outlined" size="small">
          Back
        </LinkButton>
      )}
      <LoadingButton variant="contained" type="submit" {...buttonProps}>
        {submitText}
      </LoadingButton>
    </Footer>
  )
}

export default FormFooter
