import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UpdateAccountPasswordForm } from './UpdateAccountPasswordForm'
import { renderWithProviders } from '@/lib/test-utils'

describe('UpdateAccountPasswordForm', () => {
  it('renders', () => {
    renderWithProviders(
      <UpdateAccountPasswordForm callback={jest.fn()} onCancel={jest.fn()} />
    )
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
    expect(screen.getByTestId('textfield_password')).toBeInTheDocument()
    expect(screen.getByTestId('textfield_newPasswordConfirm')).toBeInTheDocument()
    expect(screen.getByTestId('textfield_currentPassword')).toBeInTheDocument()
  })

  it('shows errors', async () => {
    const mockSubmit = jest.fn()
    renderWithProviders(
      <UpdateAccountPasswordForm callback={jest.fn()} onCancel={jest.fn()} />
    )

    const inputPassword = screen.getByTestId('textfield_password')
    const button = screen.getByTestId('submit-button')

    const fieldPassword = screen.getByTestId('field_password')
    const fieldNewPasswordConfirm = screen.getByTestId('field_newPasswordConfirm')
    const fieldCurrentPassword = screen.getByTestId('field_currentPassword')

    await userEvent.type(inputPassword, 't')
    await userEvent.click(button)

    await waitFor(async () => {
      await userEvent.click(button)
    })

    expect(fieldPassword).toHaveTextContent('Password must be 8 characters or more')
    expect(fieldNewPasswordConfirm).toHaveTextContent('Confirm new password')
    expect(fieldCurrentPassword).toHaveTextContent('This is a required field')

    expect(mockSubmit).not.toHaveBeenCalled()
  })
})
