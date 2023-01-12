import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ResetPasswordForm from './ResetPasswordForm'
import { renderWithProviders } from '@/lib/test-utils'

describe('Page: Reset Password', () => {
  const email = 'test@test.com'

  it('renders', () => {
    renderWithProviders(<ResetPasswordForm onFormSubmit={jest.fn()} loading={false} />)
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
    expect(screen.getByTestId('textfield_new_password')).toBeInTheDocument()
    expect(screen.getByTestId('textfield_new_password_confirm')).toBeInTheDocument()
  })

  it('have values typed', async () => {
    renderWithProviders(<ResetPasswordForm onFormSubmit={jest.fn()} loading={false} />)
    const inputPassword = screen.getByTestId('textfield_new_password')

    await userEvent.type(inputPassword, email)

    await waitFor(async () => {
      expect(inputPassword).toHaveValue(email)
    })
  })

  it('shows errors', async () => {
    const mockSubmit = jest.fn()
    renderWithProviders(
      <ResetPasswordForm onFormSubmit={(data) => mockSubmit(data)} loading={false} />
    )

    const inputPassword = screen.getByTestId('textfield_new_password')
    const button = screen.getByTestId('submit-button')

    const fieldPassword = screen.getByTestId('field_new_password')
    const fieldPasswordConfirm = screen.getByTestId('field_new_password_confirm')

    await userEvent.type(inputPassword, 't')
    await userEvent.click(button)

    await waitFor(async () => {
      expect(fieldPassword).toHaveTextContent('Password must be 8 characters or more')
    })

    expect(fieldPasswordConfirm).toHaveTextContent(
      'Enter your new password again to confirm'
    )

    expect(mockSubmit).not.toHaveBeenCalledWith({ email })
  })

  it('submits', async () => {
    const mockSubmit = jest.fn()
    const new_password = 'MyPassword12345'
    renderWithProviders(
      <ResetPasswordForm onFormSubmit={(data) => mockSubmit(data)} loading={false} />
    )

    const inputPassword = screen.getByTestId('textfield_new_password')
    const inputPasswordConfirm = screen.getByTestId('textfield_new_password_confirm')

    const button = screen.getByTestId('submit-button')

    await userEvent.type(inputPassword, new_password)
    await userEvent.type(inputPasswordConfirm, new_password)

    await userEvent.click(button)

    await waitFor(async () => {
      expect(mockSubmit).toHaveBeenCalledWith({
        new_password,
        new_password_confirm: new_password
      })
    })
  })
})
