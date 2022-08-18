/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, waitFor } from '@testing-library/react'
import WarningModal from './WarningModal'
import { renderWithProviders } from '@/lib/test-utils'

import userEvent from '@testing-library/user-event'

const mockClose = jest.fn()

describe('WarningModal', () => {
  it('Renders', async () => {
    renderWithProviders(
      <WarningModal
        data-testid="test-warning-modal"
        onConfirm={() => mockClose()}
        confirmButton="delete-button"
        title="my title"
        open={true}
      >
        <div data-testid="test-content">Random content</div>
      </WarningModal>
    )

    expect(screen.getByTestId('test-warning-modal')).toBeVisible()
    expect(screen.getByText('my title')).toBeVisible()
    expect(screen.getByTestId('test-content')).toHaveTextContent('Random content')
    expect(screen.getByRole('button', { name: /delete-button/i })).toBeVisible()
  })

  it('Confim callback', async () => {
    renderWithProviders(
      <WarningModal
        data-testid="test-warning-modal"
        onConfirm={() => mockClose('close was clicked')}
        confirmButton="delete-button"
        title="my title"
        open={true}
      >
        <div data-testid="test-content">Random content</div>
      </WarningModal>
    )

    expect(screen.getByTestId('test-warning-modal')).toBeVisible()
    await userEvent.click(screen.getByRole('button', { name: /delete-button/i }))

    await waitFor(async () => {
      expect(mockClose).toHaveBeenLastCalledWith('close was clicked')
    })
  })
})
