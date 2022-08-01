import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ComponentProps, FC } from 'react'
import Button from '@/components/UI/Button/Button'
import FooterButtons from '@/components/UI/FooterButtons/FooterButtons'

type Props = {
  buttonProps?: ComponentProps<typeof Button>
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
    <FooterButtons>
      {backUrl && (
        <Button href={backUrl} variant="outlined" size="small">
          Back
        </Button>
      )}
      <Button variant="contained" type="submit" {...buttonProps}>
        {submitText}
      </Button>
    </FooterButtons>
  )
}

export default FormFooter
