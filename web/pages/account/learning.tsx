import { Button, Heading, LabelText, Link, Select, Table, Tabs } from 'govuk-react'
import AccountLayout from '@/components/AccountLayout'
import styled, { useTheme } from 'styled-components'
import { useState } from 'react'

const Page = () => {
  const theme = useTheme()

  return (
    <>
      <Heading style={{ color: theme.palette.profile.learning.color }}>Learning</Heading>
    </>
  )
}

export default Page
Page.getLayout = (page) => <AccountLayout activeMenu={2}>{page}</AccountLayout>
