import { ComponentProps } from 'react'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'

export type Props = {
  enableDelete?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete?: (cell: GridRenderCellParams<any, any, any>) => void
} & ComponentProps<typeof DataGrid>
