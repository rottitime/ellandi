import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ResetPasswordForm from './ResetPasswordForm'
import { renderWithProviders } from '@/lib/test-utils'

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  push: jest.fn()
}))

describe('Page: Reset Password', () => {
  const email = 'test@test.com'

  it('renders', () => {
    renderWithProviders(<ResetPasswordForm onFormSubmit={jest.fn()} loading={false} />)
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
    expect(screen.getByTestId('textfield_password')).toBeInTheDocument()
    expect(screen.getByTestId('textfield_passwordConfirm')).toBeInTheDocument()
  })

  it('have values typed', async () => {
    renderWithProviders(<ResetPasswordForm onFormSubmit={jest.fn()} loading={false} />)
    const inputPassword = screen.getByTestId('textfield_password')

    await userEvent.type(inputPassword, email)

    await waitFor(async () => {
      expect(inputPassword).toHaveValue(email)
    })
  })

  it.only('shows errors', async () => {
    const mockSubmit = jest.fn()
    renderWithProviders(
      <ResetPasswordForm onFormSubmit={(data) => mockSubmit(data)} loading={false} />
    )

    const inputPassword = screen.getByTestId('textfield_password')
    const button = screen.getByTestId('submit-button')

    const fieldEmail = screen.getByTestId('field_password')

    await userEvent.type(inputPassword, 't')
    await userEvent.click(button)

    await waitFor(async () => {
      expect(fieldEmail).toHaveTextContent('Enter an email address')
    })

    expect(mockSubmit).not.toHaveBeenCalledWith({ email })
  })

  it('submits', async () => {
    const mockSubmit = jest.fn()
    renderWithProviders(
      <ResetPasswordForm onFormSubmit={(data) => mockSubmit(data)} loading={false} />
    )

    const inputPassword = screen.getByTestId('textfield_password')

    const button = screen.getByTestId('submit-button')

    await userEvent.type(inputPassword, email)

    await userEvent.click(button)

    await waitFor(async () => {
      expect(mockSubmit).toHaveBeenCalledWith({ email })
    })
  })
})
