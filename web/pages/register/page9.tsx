import Page from '@/components/GenericPage2'
import { Box, Typography, styled } from '@mui/material'
import LinkButton from '@/components/LinkButton'
import Link from '@/components/Link'

const DragBox = styled(Box)`
  border: 4px dashed #1976d2;
  background-color: #efefef;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  margin-bottom: 30px;
`

const RegisterPage = () => {
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        If you don't have a CV available you can add one later by going to your Profile
      </Typography>
      <Typography gutterBottom>
        We'll use the information in your CV to suggest skills and opportunities that are
        more relevant to you
      </Typography>

      <DragBox>Drag your files here</DragBox>

      {/* <Box sx={{ mb: 4 }}>
        <input type="file" id="myFile" name="filename" />
      </Box> */}

      <Typography gutterBottom>
        <Link href="/mock/page10">Skip this step</Link>
      </Typography>

      <LinkButton href="/register/page10" fullWidth>
        Continue
      </LinkButton>
    </>
  )
}

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page title="Create an account - Upload your CV" progress={60}>
    {page}
  </Page>
)
