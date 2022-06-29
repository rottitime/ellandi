import { Button, Heading, LabelText, Link, Select, Table, Tabs } from 'govuk-react'
import AccountLayout from '@/components/AccountLayout'
import styled from 'styled-components'
import { useState } from 'react'

const Page = () => (
  <>
    <Heading style={{ display: 'block', clear: 'both' }}>Learning</Heading>
  </>
)

export default Page
Page.getLayout = (page) => <AccountLayout activeMenu={2}>{page}</AccountLayout>
