import { FC, useState } from 'react'
import { Props, CellType } from './types'
import { DataGrid as MuiDataGrid, GridColDef } from '@mui/x-data-grid'
import { IconButton, styled } from '@mui/material'
import Icon from '@/components/Icon/Icon'
import WarningModal from '@/components/UI/Modals/WarningModal/WarningModal'

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
`

const DataGrid: FC<Props> = ({
  enableDelete,
  onDelete,
  deleteModalTitle,
  deleteModalContent,
  ...props
}) => {
  const [deleteCell, setDeleteCell] = useState<CellType>(null)

  const columns: GridColDef[] = enableDelete
    ? [
        ...props.columns,
        {
          field: 'id',
          headerName: '',
          resizable: false,
          disableColumnMenu: true,
          sortable: false,
          align: 'right',
          width: 50,
          renderCell: (cell) => (
            <IconButton
              color="primary"
              aria-label="delete"
              component="label"
              data-testid={`delete-button-${cell.formattedValue}`}
              sx={{ color: 'text.primary' }}
              onClick={() => {
                setDeleteCell(cell)
                //onDelete && typeof onDelete === 'function' && onDelete(cell)
              }}
            >
              <Icon icon="circle-delete" />
            </IconButton>
          )
        }
      ]
    : props.columns
  const gridProps = {
    ...props,
    columns
  }
  return (
    <>
      <StyledGrid {...gridProps} />
      {enableDelete && (
        <WarningModal
          data-testid="datagrid-delete-modal"
          confirmButton="Delete"
          open={!!deleteCell}
          onClose={() => setDeleteCell(null)}
          onConfirm={async () => {
            await onDelete(deleteCell)
            setDeleteCell(null)
          }}
          title={deleteModalTitle}
        >
          <>{deleteModalContent}</>
        </WarningModal>
      )}
    </>
  )
}

export default DataGrid
export * from '@mui/x-data-grid'
