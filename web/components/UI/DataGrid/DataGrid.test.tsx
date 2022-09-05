/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, waitFor } from '@testing-library/react'
import DataGrid, { GridColDef, GridRowsProp } from './DataGrid'
import { renderWithProviders, bugfixForTimeout } from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'

const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' }
]

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 }
]

describe('DataGrid', () => {
  it('Renders', async () => {
    renderWithProviders(<DataGrid rows={rows} columns={columns} />)

    expect(screen.getByText('Column 1')).toBeInTheDocument()
    expect(screen.getByText('Column 2')).toBeInTheDocument()
    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('World')).toBeInTheDocument()
    expect(screen.getByText('DataGridPro')).toBeInTheDocument()
    expect(screen.getByText('is Awesome')).toBeInTheDocument()
    expect(screen.getByText('MUI')).toBeInTheDocument()
    expect(screen.getByText('is Amazing')).toBeInTheDocument()
  })

  describe('Delete modal', () => {
    it('shows  modal', async () => {
      renderWithProviders(
        <DataGrid
          rows={rows}
          columns={columns}
          onDelete={() => null}
          deleteModalTitle="delete-test-headline"
          deleteModalContent={<>delete-modal-content</>}
        />
      )

      await bugfixForTimeout()
      await waitFor(async () => {
        expect(screen.getByTestId('delete-button-1')).toBeInTheDocument()
      })

      await userEvent.click(screen.getByTestId('delete-button-1'))

      await waitFor(async () => {
        expect(screen.getByTestId('datagrid-delete-modal')).toBeVisible()
      })
      expect(screen.getByText('delete-test-headline')).toBeVisible()
      expect(screen.getByText('delete-modal-content')).toBeVisible()
    })
  })

  describe('Edit modal', () => {
    it('shows modal', async () => {
      renderWithProviders(
        <DataGrid
          rows={rows}
          columns={columns}
          onEdit={() => null}
          editModalTitle="edit-test-headline"
          editModalContent={() => <>edit-modal-content</>}
        />
      )

      await bugfixForTimeout()

      await waitFor(async () => {
        expect(screen.getByTestId('edit-button-1')).toBeInTheDocument()
      })

      await userEvent.click(screen.getByTestId('edit-button-1'))

      await waitFor(async () => {
        expect(screen.getByTestId('datagrid-edit-modal')).toBeVisible()
      })
      expect(screen.getByText('edit-test-headline')).toBeVisible()

      expect(screen.getByText('edit-modal-content')).toBeVisible()
    })
  })
})
