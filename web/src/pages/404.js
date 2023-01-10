import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import { Link, Typography } from '@mui/material'
import { title } from '@/content'

export default function Custom404() {
  return (
    <CardLayout title="Page not found" dark>
      <Typography gutterBottom>
        If you typed the web address, check it is correct.
      </Typography>
      <Typography gutterBottom>
        If you pasted the web address, check you copied the entire address.
      </Typography>
      <Typography gutterBottom>
        If the web address is correct, or you selected a link or button,{' '}
        <Link href="mailto:paul.harmer@cabinetoffice.gov.uk" target="_blank">
          contact the {title} team
        </Link>
        .
      </Typography>
    </CardLayout>
  )
}
