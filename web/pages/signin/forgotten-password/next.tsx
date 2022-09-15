import FooterButtons from '@/components/UI/FooterButtons/FooterButtons'
import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import Button from '@/components/UI/Button/Button'
import { Typography } from '@mui/material'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { urls }
} = getConfig()

const NextPage = () => (
  <>
    <Typography gutterBottom>
      Check your email for the link to reset your password.
    </Typography>
    <Typography gutterBottom>The link will expire in 24 hours.</Typography>

    <FooterButtons>
      <Button color="tertiary" size="small" href={urls.signin}>
        Sign in
      </Button>
    </FooterButtons>
  </>
)

export default NextPage
NextPage.getLayout = (page) => <CardLayout title="What next?">{page}</CardLayout>
