import CardLayout from '@/components/Layout/CardLayout'
import { Typography, styled, Box } from '@mui/material'
import Button from '@/components/UI/Button/Button'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import FooterButtons from '@/components/UI/FooterButtons/FooterButtons'
import router from 'next/router'
import { useEffect } from 'react'
import useRegisterUser from '@/hooks/useRegisterUser'

const Title = styled(Box)`
  display: flex;
  .icon {
    color: ${(p) => p.theme.colors.green};
    font-size: 46px;
    margin-right: ${(p) => p.theme.spacing(1)};
  }
`

const RegisterPage = () => {
  const { deleteUserId } = useRegisterUser()

  useEffect(() => {
    deleteUserId()
  }, [deleteUserId])

  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        You have successfully signed up for the Civil Service Skills and Learning Service
      </Typography>
      <Typography gutterBottom>
        You will now be taken to your dashboard where you can navigate around the service
      </Typography>

      <FooterButtons>
        <Button variant="outlined" size="small" onClick={() => router.back()}>
          Back
        </Button>
        <Button href="/account" variant="contained">
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
