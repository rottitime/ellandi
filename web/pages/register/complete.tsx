import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import { Typography, styled, Box } from '@mui/material'
import Button from '@/components/UI/Button/Button'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import FooterButtons from '@/components/UI/FooterButtons/FooterButtons'
import router from 'next/router'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const Title = styled(Box)`
  display: flex;
  .icon {
    color: ${(p) => p.theme.colors.green1};
    font-size: 46px;
    margin-right: ${(p) => p.theme.spacing(1)};
  }
`

const RegisterPage = () => {
  return (
    <>
      <Typography gutterBottom>
        You have successfully signed up for the Cabinet Office Skills and Learning Service
      </Typography>
      <Typography variant="body2" gutterBottom>
        To confirm your account and sign in to the service, click on the link in the email
        we have sent you
      </Typography>

      <FooterButtons>
        <Button color="tertiary" size="small" onClick={() => router.back()}>
          Back
        </Button>
        <Button href={publicRuntimeConfig.urls.landingSignin} variant="contained">
          Finish
        </Button>
      </FooterButtons>
    </>
  )
}

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <CardLayout
    title={
      <Title>
        <CheckCircleIcon className="icon" />
        Congratulations
      </Title>
    }
  >
    {page}
  </CardLayout>
)
