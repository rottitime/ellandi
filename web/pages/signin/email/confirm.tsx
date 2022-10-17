import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import { Typography } from '@mui/material'
import FooterButtons from '@/components/UI/FooterButtons/FooterButtons'
import Button from '@/components/UI/Button/Button'
import useAuth from '@/hooks/useAuth'
import { useState } from 'react'
import Router from 'next/router'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { urls }
} = getConfig()

const EmailVerifyPage = () => {
  const { sendEmailVerification } = useAuth()
  const [loading, setLoading] = useState(false)
  return (
    <>
      <Typography gutterBottom>
        Check your email and click on the link to confirm your address and return to this
        service.
      </Typography>
      <Typography>
        If our email doesn't arrive within 5 minutes, check your spam and trash folder, or
        resend the email.
      </Typography>
      <FooterButtons>
        <Button
          variant="contained"
          data-testid="resend-button"
          sx={{ ml: 'auto' }}
          loading={loading}
          onClick={async () => {
            setLoading(true)
            try {
              await sendEmailVerification()
            } catch (e) {}
            Router.replace(urls.signin)
          }}
        >
          Resend email
        </Button>
      </FooterButtons>
    </>
  )
}

export default EmailVerifyPage
EmailVerifyPage.getLayout = (page) => (
  <CardLayout title="Confirm your email address" dark>
    {page}
  </CardLayout>
)
