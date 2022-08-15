import { Box } from '@mui/material'
import { ComponentProps, FC } from 'react'
import Button from '@/components/UI/Button/Button'
import FooterButtons from '@/components/UI/FooterButtons/FooterButtons'

type Props = {
  buttonProps?: ComponentProps<typeof Button>
  submitText?: string
  backUrl?: string
  skipUrl?: string
}

const FormFooter: FC<Props> = ({
  backUrl,
  buttonProps,
  submitText = 'Continue',
  skipUrl
}) => (
  <FooterButtons>
    <Box>
      {backUrl && (
        <Button href={backUrl} variant="outlined" size="small" sx={{ mr: 2 }}>
          Back
        </Button>
      )}
      {skipUrl && (
        <Button href={skipUrl} size="small">
          Skip
        </Button>
      )}
    </Box>
    <Button
      variant="contained"
      type="submit"
      {...buttonProps}
      data-testid={`submit-button`}
    >
      {submitText}
    </Button>
  </FooterButtons>
)

export default FormFooter
