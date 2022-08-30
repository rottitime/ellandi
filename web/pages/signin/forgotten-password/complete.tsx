import FooterButtons from '@/components/UI/FooterButtons/FooterButtons'
import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import Button from '@/components/UI/Button/Button'
import { Typography } from '@mui/material'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { urls }
} = getConfig()

const CompletedPage = () => (
  <>
    <Typography variant="subtitle1" sx={{ mb: 3 }}>
      You have successfully changed your password
    </Typography>

    <FooterButtons>
      <Button color="primary" href={urls.signin} sx={{ ml: 'auto' }}>
        Sign in
      </Button>
    </FooterButtons>
  </>
)

export default CompletedPage
CompletedPage.getLayout = (page) => (
  <CardLayout title="Congratulations">{page}</CardLayout>
)
