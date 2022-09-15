import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import AccountCard from '@/components/UI/Cards/AccountCard/AccountCard'
import SimpleTable from '@/components/UI/SimpleTable/SimpleTable'
import { Typography, TableCellProps, styled } from '@mui/material'
import { useQuery } from 'react-query'
import { fetchMe } from '@/service/me'
import { Query, RegisterUserResponse } from '@/service/api'
import useAuth from '@/hooks/useAuth'
import { useMemo } from 'react'

const Table = styled(SimpleTable)`
  th {
    width: 29%;
  }
`

const ProfilePage = () => {
  const { authFetch } = useAuth()
  const { isLoading, data } = useQuery<RegisterUserResponse>(Query.Me, () =>
    authFetch(fetchMe)
  )

  const professions = useMemo(
    () =>
      data?.professions.map((profession) => {
        if (profession.toLowerCase() === 'other') return data.profession_other
        return profession
      }) || [],
    [data]
  )

  const renderTable = (list = []) => (
    <Table
      list={[
        ...list
          .filter(({ name, value }) => !(name == 'Primary profession' && !value))
          .map<TableCellProps[]>(({ name, value }) => [
            { children: name, component: 'th' },
            { children: <Typography>{value}</Typography> }
          ])
      ]}
    />
  )

  if (isLoading)
    return (
      <>
        {[...Array(2).keys()].map((i) => (
          <AccountCard loading={true} sx={{ mb: 4 }} key={i} />
        ))}
      </>
    )

  return (
    <>
      <AccountCard
        headerLogo="profile"
        header={
          <Typography variant="h1" component="h2">
            Personal details
          </Typography>
        }
        sx={{ mb: 4 }}
      >
        {renderTable([
          { name: 'Full name', value: `${data.first_name} ${data.last_name}` },
          { name: 'Email address', value: data.email },
          { name: 'Password', value: '********' }
        ])}
      </AccountCard>

      <AccountCard
        headerLogo="case"
        header={
          <Typography variant="h1" component="h2">
            Job details
          </Typography>
        }
        sx={{ mb: 4 }}
      >
        {renderTable([
          { name: 'Job title', value: data.job_title },
          { name: 'Business unit', value: data.business_unit },
          { name: 'Work location', value: data.location },
          { name: 'Line manager email', value: data.line_manager_email },
          { name: 'Grade', value: data.grade_other || data.grade },
          { name: 'Profession(s)', value: professions.join(', ') },
          {
            name: 'Primary profession',
            value: professions.length > 1 && data.primary_profession
          },
          { name: 'Function', value: data.function_other || data.function },
          {
            name: 'Contract type',
            value: data.contract_type_other || data.contract_type
          }
        ])}
      </AccountCard>
    </>
  )
}

export default ProfilePage
ProfilePage.getLayout = (page) => (
  <AccountLayout
    breadcrumbs={[{ title: 'Profile' }]}
    title="Profile"
    titleIcon="profile"
    teaserHeadline="Welcome to your profile"
    teaserContent="You can manage your details including email, password, job title, profession and more"
  >
    {page}
  </AccountLayout>
)
