import Page from '@/components/GenericPage2'
import { Box, Typography } from '@mui/material'
import LinkButton from '@/components/LinkButton'
import Link from '@/components/Link'

const RegisterPage = () => {
  return (
    <Page title="Create an account - Upload your CV" progress={60}>
      <Typography variant="subtitle1" gutterBottom>
        If you don't have a CV available you can add one later by going to your Profile
      </Typography>
      <Typography gutterBottom>
        We'll use the information in your CV to suggest skills and opportunities that are
        more relevant to you
      </Typography>

      <Box sx={{ mb: 4 }}>
        <input type="file" id="myFile" name="filename" />
      </Box>

      <Typography gutterBottom>
        <Link href="/mock/page10">Skip this step</Link>
      </Typography>

      <LinkButton href="/register/page10" fullWidth>
        Continue
      </LinkButton>
    </Page>
  )
}

export default RegisterPage
