import { Box } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import DataGrid, { GridColDef, GridRowsProp } from './DataGrid'

type RowType = {
  id: number
  col1: string
  col2: string
}

export default {
  title: 'Ellandi/Table/DataGrid',
  component: DataGrid,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/JEg4GJzDWL4NbiWXShxHiL/Ellandi-Prototype-V3.4?node-id=9202%3A77709'
    }
  }
} as ComponentMeta<typeof DataGrid>

const Template: ComponentStory<typeof DataGrid> = (args) => (
  <Box sx={{ height: 'auto', width: '100%' }}>
    <DataGrid {...args} />
  </Box>
)

const rows: GridRowsProp<RowType> = [...Array(100).keys()].map((i) => ({
  id: i,
  col1: `Skill ${i}`,
  col2: `${i} (${i}%)`
}))

const columns: GridColDef<RowType>[] = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 }
]

export const Default = Template.bind({})
Default.args = {
  rows,
  columns,
  autoHeight: true,
  onEdit: null,
  onDelete: null,
  pageSize: 10
}

export const WithDelete = Template.bind({})
WithDelete.args = {
  ...Default.args,
  onDelete: () => null,
  deleteModalTitle: 'Delete headline',
  deleteModalContent: 'Are you sure you want to delete?'
}

export const WithEditDelete = Template.bind({})
WithEditDelete.args = {
  ...WithDelete.args,
  onEdit: () => null,
  editModalTitle: 'Delete headline',
  editModalContent: 'Are you sure you want to delete?'
}
