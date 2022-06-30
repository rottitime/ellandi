import { Heading, LeadParagraph, Table } from 'govuk-react'
import AccountLayout from '@/components/AccountLayout'
import styled from 'styled-components'
import Link from '@/components/UI/Link'

const ProfileTable = styled(Table)`
  .cta {
    text-align: right;
  }
`

const listTable = [
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
  { name: 'Line manager email', value: 'alan@gov.uk' },
  { name: 'Country', value: 'United Kingdom' },
  { name: 'Work location', value: 'London' },
  { name: 'Grade', value: 'Senior Executive Officer (SEO)' },
  { name: 'Profession', value: 'Digital, Data and Technology' },
  { name: 'Contract type', value: 'Permanent' }
]

const Page = () => {
  return (
    <>
      <Heading>Profile</Heading>
      <LeadParagraph>Personal details</LeadParagraph>

      <ProfileTable caption="Dates and amounts">
        {listTable.map((item) => (
          <Table.Row key={item.name}>
            <Table.CellHeader>{item.name}</Table.CellHeader>
            <Table.Cell>{item.value || '&nbsp;'}</Table.Cell>
            <Table.Cell className="cta">
              <Link href="#">Change</Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </ProfileTable>
    </>
  )
}

export default Page
Page.getLayout = (page) => <AccountLayout activeMenu={6}>{page}</AccountLayout>
