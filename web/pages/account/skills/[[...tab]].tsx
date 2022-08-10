import AccountLayout from '@/components/Layout/AccountLayout/AccountLayout'
import { Box, Chip, IconButton, Typography } from '@mui/material'
import Tabs, { TabItem } from '@/components/UI/Tabs/Tabs'
import Button from '@/components/UI/Button/Button'
import useAuth from '@/hooks/useAuth'
import { useQuery } from 'react-query'
import { Query, RegisterUserResponse, SkillType } from '@/service/api'
import { fetchMe } from '@/service/me'
import Headline from '@/components/Accounts/Headline/Headline'
import { GetStaticPropsContext } from 'next'
import DataGrid, { GridColDef } from '@/components/UI/DataGrid/DataGrid'
import Icon from '@/components/Icon/Icon'
import TableSkeleton from '@/components/UI/Skeleton/TableSkeleton'

const SkillsPage = ({ tabIndex }) => {
  const { authFetch } = useAuth()
  const { isLoading, data } = useQuery<RegisterUserResponse>(Query.Me, () =>
    authFetch(fetchMe)
  )

  const getDataGridProps = () => {
    switch (tabIndex) {
      case 0:
        return {
          rows: data.skills,
          columns: columnsSkills,
          getRowId: ({ name }) => name
        }
      default:
        return { rows: mockData, columns: columnsSkills }
    }
  }

  return (
    <>
      <Headline>
        <Typography variant="h1" gutterBottom>
          to the Skills and Learning Service
        </Typography>
      </Headline>

      <Button variant="contained" sx={{ mb: 4 }}>
        Add a skill
      </Button>

      <Tabs
        tabPanel={
          isLoading ? (
            <TableSkeleton data-testid="skelton-table" />
          ) : (
            <Box sx={{ height: 'auto', width: '100%' }}>
              <DataGrid
                getRowId={({ name }) => name}
                hideFooterPagination
                autoHeight
                {...getDataGridProps()}
              />
            </Box>
          )
        }
        // tabPanel={
        //   <Box sx={{ height: 'auto', width: '100%' }}>
        //     <DataGrid
        //       getRowId={({ name }) => name}
        //       hideFooterPagination
        //       autoHeight
        //       {...getDataGridProps()}
        //     />
        //   </Box>
        // }
        tabItems={tabs}
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

const columnsSkills: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Skill name',
    disableColumnMenu: true,
    resizable: false,
    flex: 1
  },
  {
    field: 'level',
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

const mockData: SkillType[] = [
  { name: 'Snow', level: 'Jon' },
  { name: 'Lannister', level: 'Cersei' },
  { name: 'Lannister1', level: 'Jaime' },
  { name: 'Stark', level: 'Arya' },
  { name: 'Targaryen', level: 'Daenerys' },
  { name: 'Melisandre', level: null },
  { name: 'Clifford', level: 'Ferrara' },
  { name: 'Frances', level: 'Rossini' },
  { name: 'Roxie', level: 'Harvey' }
]
