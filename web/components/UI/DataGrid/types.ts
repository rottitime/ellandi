import { ComponentProps, ReactElement } from 'react'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'

export type Props = {
  initialLoading?: boolean
  noRowContent?: ReactElement
  modalLoading?: boolean
  onModalClose?: () => void
} & DeleteProps &
  EditProps &
  ComponentProps<typeof DataGrid>

type DeleteProps =
  | {
      onDelete?: never
      deleteModalTitle?: never
      deleteModalContent?: never
    }
  | {
      onDelete: (cell: CellType) => void
      deleteModalTitle: string
      deleteModalContent: ReactElement
    }

type EditProps =
  | {
      onEdit?: never
      editModalTitle?: never
      editModalContent?: never
    }
  | {
      onEdit: (cell: CellType) => Promise<boolean>
      editModalTitle: string
      editModalContent: (cell: CellType) => ReactElement
    }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CellType = GridRenderCellParams<any, any, any>
