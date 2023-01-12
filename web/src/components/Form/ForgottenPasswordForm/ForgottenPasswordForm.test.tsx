import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ForgottenPasswordForm from './ForgottenPasswordForm'
import { renderWithProviders } from '@/lib/test-utils'

describe('Page: Sign in', () => {
  const email = 'test@test.com'

  it('renders', () => {
    renderWithProviders(
      <ForgottenPasswordForm onFormSubmit={jest.fn()} loading={false} />
    )
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
    expect(screen.getByTestId('textfield_email')).toBeInTheDocument()
  })

  it('have values typed', async () => {
    renderWithProviders(
      <ForgottenPasswordForm onFormSubmit={jest.fn()} loading={false} />
    )
    const inputEmail = screen.getByTestId('textfield_email')

    await userEvent.type(inputEmail, email)

    await waitFor(async () => {
      expect(inputEmail).toHaveValue(email)
    })
  })

  it('shows errors', async () => {
    const mockSubmit = jest.fn()
    renderWithProviders(
      <ForgottenPasswordForm onFormSubmit={(data) => mockSubmit(data)} loading={false} />
    )

    const inputEmail = screen.getByTestId('textfield_email')
    const button = screen.getByTestId('submit-button')

    const fieldEmail = screen.getByTestId('field_email')

    await userEvent.type(inputEmail, 't')
    await userEvent.click(button)

    await waitFor(async () => {
      expect(fieldEmail).toHaveTextContent('Enter an email address')
    })

    expect(mockSubmit).not.toHaveBeenCalledWith({ email })
  })

  it('submits', async () => {
    const mockSubmit = jest.fn()
    renderWithProviders(
      <ForgottenPasswordForm onFormSubmit={(data) => mockSubmit(data)} loading={false} />
    )

    const inputEmail = screen.getByTestId('textfield_email')

    const button = screen.getByTestId('submit-button')

    await userEvent.type(inputEmail, email)

    await userEvent.click(button)

    await waitFor(async () => {
      expect(mockSubmit).toHaveBeenCalledWith({ email })
    })
  })
})
