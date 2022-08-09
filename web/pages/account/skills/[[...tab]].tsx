import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Box, Chip, IconButton, Typography } from '@mui/material'
import Tabs, { TabItem } from '@/components/UI/Tabs/Tabs'
import Button from '@/components/UI/Button/Button'
import useAuth from '@/hooks/useAuth'
import { useQuery } from 'react-query'
import { Query, RegisterUserResponse } from '@/service/api'
import { fetchMe } from '@/service/me'
import Headline from '@/components/Accounts/Headline/Headline'
import { useUiContext } from '@/context/UiContext'
import { useEffect } from 'react'
import { GetStaticPropsContext } from 'next'
import DataGrid, { GridColDef } from '@/components/UI/DataGrid/DataGrid'
import Icon from '@/components/Icon/Icon'

const SkillsPage = ({ tabIndex }) => {
  const { setLoading } = useUiContext()
  const { authFetch } = useAuth()
  const { isLoading, data } = useQuery<RegisterUserResponse>(Query.Me, () =>
    authFetch(fetchMe)
  )

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  return (
    <>
      <Headline>
        <Typography variant="h1" gutterBottom>
          Hello {data?.first_name}, welcome to the Skills and Learning Service
        </Typography>
      </Headline>

      <Button variant="contained" sx={{ mb: 4 }}>
        Add a skill
      </Button>

      <Tabs
        tabItems={tabs.map((tab, i) => {
          return i === tabIndex
            ? {
                ...tab,
                content: (
                  <Box sx={{ height: 'auto', width: '100%' }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      hideFooterPagination
                      autoHeight
                    />
                  </Box>
                )
              }
            : tab
        })}
        activeOnUrl
      />
    </>
  )
}

export default SkillsPage
SkillsPage.getLayout = (page) => (
  <AccountLayout
    title="Skills"
    titleIcon="skills"
    breadcrumbs={[{ title: 'Skills' }]}
    brandColor="brandSkills"
  >
    {page}
  </AccountLayout>
)

export async function getStaticPaths() {
  return {
    paths: tabs.map(({ href }) => ({
      params: { tab: [createIdFromHref(href)] }
    })),
    fallback: false
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const tab = context.params.tab || ['']
  const tabIndex = tabs.map(({ href }) => createIdFromHref(href)).indexOf(tab[0])

  return {
    props: { tabIndex }
  }
}

const createIdFromHref = (href: string) =>
  href.replace('/account/skills', '').split('/').at(-1)

const tabs: TabItem[] = [
  {
    title: 'Your skills',
    content: null,
    href: '/account/skills'
  },
  {
    title: 'Language skills',
    content: null,
    href: '/account/skills/language-skills'
  },
  {
    title: "Skills you'd like to develop",
    content: null,
    href: '/account/skills/skills-develop'
  }
]

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Skill name',
    disableColumnMenu: true,
    resizable: false,
    flex: 1
    // width: 200
  },
  {
    field: 'firstName',
    headerName: 'Skill level',
    disableColumnMenu: true,
    resizable: false,
    renderCell: ({ formattedValue }) => formattedValue && <Chip label={formattedValue} />,
    flex: 1
  },
  {
    field: 'id',
    headerName: '',
    resizable: false,
    disableColumnMenu: true,
    sortable: false,
    align: 'right',
    width: 50,
    renderCell: (cell) => {
      return (
        <IconButton
          color="primary"
          aria-label="delete"
          component="label"
          sx={{ color: 'text.primary' }}
          onClick={() => {
            console.log('formattedValue', cell.formattedValue)
          }}
        >
          <Icon icon="circle-delete" />
        </IconButton>
      )
    }
  }
]

const rows = [
  { id: 1, lastName: 'Snow', name: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', name: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', name: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', name: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', name: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', name: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', name: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', name: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', name: 'Roxie', firstName: 'Harvey', age: 65 }
]
