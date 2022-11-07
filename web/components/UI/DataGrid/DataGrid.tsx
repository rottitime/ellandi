import Icon from '@/components/Icon/Icon'
import Button from '../Button/Button'
import Dialog from '@/components/UI/Dialogs/Dialog/Dialog'
import WarningDialog from '@/components/UI/Dialogs/WarningDialog/WarningDialog'
import { FC, useState } from 'react'
import { Props, CellType } from './types'
import { DataGrid as MuiDataGrid, GridColDef } from '@mui/x-data-grid'
import { IconButton, styled } from '@mui/material'
import SkeletonTable from '../Skeleton/TableSkeleton'
import Pagination from './Pagination'

const StyledGrid = styled(MuiDataGrid)`
  border: none;
  .MuiDataGrid-columnSeparator {
    display: none;
  }
  .MuiDataGrid-columnHeaderTitle {
    font-weight: bold;
  }

  .MuiDataGrid-sortIcon {
    color: ${(p) => p.theme.colors.black};
    font-size: 18px;
  }

  .MuiDataGrid-columnHeaders {
    border: none;
  }

  .MuiDataGrid-cell {
    border-color: ${(p) => p.theme.colors.grey2};
  }

  .MuiDataGrid-columnHeader,
  .MuiDataGrid-cell {
    padding-left: 0;
    padding-right: 0;
  }

  .MuiDataGrid-footerContainer {
    justify-content: flex-start;
    padding-top: ${(p) => p.theme.spacing(3)};
  }
`

const DataGrid: FC<Props> = ({
  onDelete,
  onEdit,
  editModalTitle,
  editModalContent,
  deleteModalTitle,
  deleteModalContent,
  noRowContent,
  modalLoading,
  onModalClose,
  initialLoading,
  ...props
}) => {
  const [deleteCell, setDeleteCell] = useState<CellType>(null)
  const [editCell, setEditCell] = useState<CellType>(null)
  const enableDelete = typeof onDelete === 'function'
  const enableEdit = typeof onEdit === 'function'
  // const alertRef = useRef(null)

  const onClose = () => {
    setDeleteCell(null)
    setEditCell(null)
    if (typeof onEdit === 'function') onModalClose()
  }

  const columns: GridColDef[] =
    enableDelete || enableEdit
      ? [
          ...props.columns,
          {
            field: 'id',
            headerName: '',
            resizable: false,
            disableColumnMenu: true,
            sortable: false,
            align: 'right',
            renderCell: (cell) => (
              <>
                {enableEdit && (
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    component="label"
                    data-testid={`edit-button-${cell.formattedValue}`}
                    sx={{ color: 'text.primary' }}
                    onClick={() => setEditCell(cell)}
                  >
                    <Icon icon="pencil" />
                  </IconButton>
                )}
                {enableDelete && (
                  <IconButton
                    color="primary"
                    aria-label="delete"
                    component="label"
                    data-testid={`delete-button-${cell.formattedValue}`}
                    sx={{ color: 'text.primary' }}
                    onClick={() => setDeleteCell(cell)}
                  >
                    <Icon icon="circle-delete" />
                  </IconButton>
                )}
              </>
            )
          }
        ]
      : props.columns

  const gridProps = {
    ...props,
    components: { Pagination },
    columns
  }

  if (noRowContent && !props.rows.length) return noRowContent

  return (
    <>
      {!!initialLoading ? <SkeletonTable /> : <StyledGrid {...gridProps} />}

      {enableDelete && (
        <WarningDialog
          data-testid="datagrid-delete-modal"
          confirmButton="Delete"
          open={!!deleteCell}
          onClose={onClose}
          buttonLoading={modalLoading}
          onConfirm={async () => {
            await onDelete(deleteCell)
            setDeleteCell(null)
          }}
          title={deleteModalTitle}
        >
          {deleteModalContent}
        </WarningDialog>
      )}

      {enableEdit && (
        <Dialog
          // ref={alertRef}
          title={editModalTitle}
          open={!!editCell}
          onClose={onClose}
          data-testid="datagrid-edit-modal"
          actions={
            <>
              <Button color="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button
                loading={modalLoading}
                color="primary"
                onClick={async () => (await onEdit(editCell)) && setEditCell(null)}
              >
                Confirm
              </Button>
            </>
          }
        >
          {editModalContent(editCell)}
        </Dialog>
      )}
    </>
  )
}

export default DataGrid
export * from '@mui/x-data-grid'
