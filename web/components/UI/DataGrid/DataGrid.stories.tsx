import { Box } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import DataGrid, { GridColDef, GridRowsProp } from './DataGrid'

const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' }
]

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 }
]

export default {
  title: 'Ellandi/DataGrid',
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

export const Default = Template.bind({})
Default.args = {
  rows,
  columns,
  autoHeight: true
}

export const WithDelete = Template.bind({})
WithDelete.args = {
  ...Default.args,
  enableDelete: true,
  onDelete: () => null,
  deleteModalTitle: 'Delete headline',
  deleteModalContent: 'Are you sure you want to delete?'
}
