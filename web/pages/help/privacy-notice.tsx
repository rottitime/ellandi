import PlainLayout from '@/components/Layout/PlainLayout'
import { Link, Typography } from '@mui/material'

const PrivacyPage = () => (
  <>
    <Typography variant="subtitle1" gutterBottom>
      Lorem ipsum dolor sit amet.
    </Typography>

    <Typography variant="h3" gutterBottom>
      Consectetur adipisicing elit. Eius, quod.
    </Typography>

    <Typography gutterBottom>
      Cabinet Office is the data controller for pages starting with www.gov.uk - for
      example, <Link href="#">www.gov.uk/pip</Link>.
    </Typography>

    <Typography gutterBottom>
      If you have a GOV.UK account, read the full GOV.UK accounts privacy notice to find
      out how your account stores, processes and shares your personal information.
    </Typography>

    <Typography gutterBottom>
      If you follow a link to a service provided by another government department, agency
      or local authority, that organisation will:
      <ul>
        <li>be the data controller</li>
        <li>be responsible for processing any data you share with them</li>
        <li>
          publish and manage their own privacy notice with details of how to contact them
        </li>
      </ul>
    </Typography>
  </>
)

export default PrivacyPage
PrivacyPage.getLayout = (page) => (
  <PlainLayout title="Privacy notice (Holding page)">{page}</PlainLayout>
)
