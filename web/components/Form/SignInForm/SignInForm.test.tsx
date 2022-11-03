import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignInForm from '@/components/Form/SignInForm/SignInForm'
import { renderWithProviders } from '@/lib/test-utils'

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  push: jest.fn()
}))

describe('Page: Sign in', () => {
  const email = 'test@test.com',
    password = 'abc123'

  it('renders', () => {
    renderWithProviders(<SignInForm onFormSubmit={jest.fn()} loading={false} />)
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
    expect(screen.getByTestId('textfield_email')).toBeInTheDocument()
    expect(screen.getByTestId('textfield_password')).toBeInTheDocument()
  })

  it('have values typed', async () => {
    renderWithProviders(<SignInForm onFormSubmit={jest.fn()} loading={false} />)
    const inputEmail = screen.getByTestId('textfield_email')
    const inputPassword = screen.getByTestId('textfield_password')

    await userEvent.type(inputEmail, email)
    await userEvent.type(inputPassword, password)

    await waitFor(async () => {
      expect(inputEmail).toHaveValue(email)
    })

    expect(inputPassword).toHaveValue(password)
  })

  it('shows errors', async () => {
    const mockSubmit = jest.fn()
    renderWithProviders(
      <SignInForm onFormSubmit={(data) => mockSubmit(data)} loading={false} />
    )

    const inputEmail = screen.getByTestId('textfield_email')
    const button = screen.getByTestId('submit-button')

    const fieldEmail = screen.getByTestId('field_email')
    const fieldPassword = screen.getByTestId('field_password')

    await userEvent.type(inputEmail, 't')
    await userEvent.click(button)

    await waitFor(async () => {
      expect(fieldPassword).toHaveTextContent('Enter your password')
    })

    expect(fieldEmail).toHaveTextContent('Enter an email address')
    expect(mockSubmit).not.toHaveBeenCalledWith({ email, password })
  })

  it('submits', async () => {
    const mockSubmit = jest.fn()
    renderWithProviders(
      <SignInForm onFormSubmit={(data) => mockSubmit(data)} loading={false} />
    )

    const inputEmail = screen.getByTestId('textfield_email')
    const inputPassword = screen.getByTestId('textfield_password')
    const button = screen.getByTestId('submit-button')

    await userEvent.type(inputEmail, email)
    await userEvent.type(inputPassword, password)
    await userEvent.click(button)

    await waitFor(async () => {
      expect(mockSubmit).toHaveBeenCalledWith({ email, password })
    })
  })
})
