import { FC } from 'react'
import { Props } from './types'
import { DataGrid as MuiDataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material'

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

const DataGrid: FC<Props> = (props) => <StyledGrid {...props} />

export default DataGrid
export * from '@mui/x-data-grid'
