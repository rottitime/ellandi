import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ComponentProps, FC } from 'react'
import LinkButton from '@/components/LinkButton'
import { LoadingButton } from '@mui/lab'

type Props = {
  buttonProps?: ComponentProps<typeof LoadingButton>
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
  return (
    <Footer>
      {backUrl && (
        <LinkButton href={backUrl} variant="outlined">
          Back
        </LinkButton>
      )}
      <LoadingButton variant="contained" type="submit" {...buttonProps}>
        Continue
      </LoadingButton>
    </Footer>
  )
}

export default FormFooter
