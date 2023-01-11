import { Box } from '@mui/material'
import { ComponentProps, FC } from 'react'
import Button from '@/components/UI/Button/Button'
import FooterButtons from '@/components/UI/FooterButtons/FooterButtons'

type Props = {
  buttonProps?: ComponentProps<typeof Button>
  submitText?: string
  backUrl?: string
  skipUrl?: string
  onCancel?: () => void
}

const FormFooter: FC<Props> = ({
  backUrl,
  buttonProps,
  submitText = 'Continue',
  skipUrl,
  onCancel
}) => {
  return (
    <FooterButtons>
      <Box>
        {backUrl && (
          <Button href={backUrl} color="tertiary" size="small" sx={{ mr: 2 }}>
            Back
          </Button>
        )}
        {skipUrl && (
          <Button href={skipUrl} size="small">
            Skip
          </Button>
        )}
      </Box>
      <div>
        {!!onCancel && (
          <Button onClick={onCancel} variant="contained" color="secondary" sx={{ mr: 2 }}>
            Cancel
          </Button>
        )}

        <Button
          variant="contained"
          type="submit"
          {...buttonProps}
          data-testid={`submit-button`}
        >
          {submitText}
        </Button>
      </div>
    </FooterButtons>
  )
}

export default FormFooter
