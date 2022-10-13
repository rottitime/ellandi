import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import { Link, Typography } from '@mui/material'

export default function Custom500() {
  return (
    <CardLayout title="Sorry, there is a problem with the service" dark>
      <Typography gutterBottom>Try again later.</Typography>

      <Typography gutterBottom>
        If the problem persists,{' '}
        <Link href="mailto:paul.harmer@cabinetoffice.gov.uk" target="_blank">
          contact the Civil Service Skills and Learning team
        </Link>
        .
      </Typography>
    </CardLayout>
  )
}
