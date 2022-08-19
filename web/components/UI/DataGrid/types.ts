import { ComponentProps, ReactElement, ReactNode } from 'react'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'

export type Props = {
  noRowContent?: ReactElement
} & DeleteProps &
  ComponentProps<typeof DataGrid>

type DeleteProps =
  | {
      enableDelete?: boolean
      onDelete?: never
      deleteModalTitle?: never
      deleteModalContent?: never
    }
  | {
      enableDelete?: true
      onDelete: (cell: CellType) => void
      deleteModalTitle: string
      deleteModalContent: ReactNode
    }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CellType = GridRenderCellParams<any, any, any>
