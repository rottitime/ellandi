import { Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import AccountMenuPage from '@/components/Layout/AccountMenuPage'
import Card from '@/components/UI/Card'
import Link from '@/components/UI/Link'

const list = [
  { name: 'Full name', value: 'John Smith' },
  { name: 'Primary emailaddress', value: 'john.smith@cabinetoffice.gov.uk' },
  { name: 'Secondary email' },
  { name: 'address' },
  { name: 'Password' },
  { name: 'CV', value: 'mycv.pdf' },
  { name: 'mycv.pdf' },
  { name: 'Contact preference', value: 'Yes' },
  { name: 'Organisation', value: 'Cabinet Office' },
  { name: 'Job title', value: 'Service Designer' },
  { name: 'Country', value: 'United Kingdom' },
  { name: 'Work location', value: 'London' },
  { name: 'Line manager email', value: 'alan@gov.uk' },
  { name: 'Grade', value: 'Senior Executive Officer (SEO)' },
  { name: 'Profession', value: 'Digital, Data and Technology' },
  { name: 'Contract type', value: 'Permanent' }
]

const Page = () => {
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        Personal details
      </Typography>

      <Card>
        <Table>
          <TableBody>
            {list.map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.value || ' '}</TableCell>
                <TableCell className="cta">
                  <Link href="#">Change</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  )
}

export default Page
Page.getLayout = (page) => (
  <AccountMenuPage breadcrumbs={[{ title: 'Profile' }]} title="Profile">
    {page}
  </AccountMenuPage>
)
