import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/lib/test-utils'
import CreateAccountForm from './CreateAccountForm'

describe('CreateAccountForm', () => {
  const email = 'nonmatch@test.com'
  const password = 'abc123456'

  it('renders', () => {
    renderWithProviders(
      <CreateAccountForm defaultValues={null} backUrl="/back" onFormSubmit={jest.fn()} />
    )

    const button = screen.getByRole('button', { name: /Continue/i })
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
    expect(screen.getByRole('textbox', { name: 'Email address' })).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: 'Confirm your email address' })
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm your password')).toBeInTheDocument()
    expect(screen.getByLabelText('I agree to the privacy policy')).toBeInTheDocument()
  })

  it('errors for required fields', async () => {
    renderWithProviders(
      <CreateAccountForm defaultValues={null} backUrl="/back" onFormSubmit={jest.fn()} />
    )

    const button = screen.getByRole('button', { name: /Continue/i })
    expect(button).toBeInTheDocument()

    await userEvent.click(screen.getByTestId('privacy-checkbox'))
    await userEvent.click(button)

    await waitFor(async () => {
      expect(screen.getByTestId('field_email')).toHaveTextContent(
        'Enter your email address'
      )
    })

    expect(screen.getByTestId('field_password')).toHaveTextContent(
      'Password must be 8 characters or more'
    )
  })

  it('error if field do not match', async () => {
    renderWithProviders(
      <CreateAccountForm defaultValues={null} backUrl="/back" onFormSubmit={jest.fn()} />
    )

    const button = screen.getByRole('button', { name: /Continue/i })
    const emailField1 = screen.getByTestId('textfield_email')
    const emailField2 = screen.getByTestId('textfield_emailConfirm')
    const passwordField1 = screen.getByTestId('textfield_password')
    const passwordField2 = screen.getByTestId('textfield_passwordConfirm')

    await userEvent.type(emailField1, email)
    await userEvent.type(emailField2, email + '1')
    await userEvent.type(passwordField1, password)
    await userEvent.type(passwordField2, password + '1')

    await userEvent.click(button)

    await waitFor(async () => {
      expect(screen.getByTestId('field_emailConfirm')).toHaveTextContent(
        'Does not match with email'
      )
    })

    expect(screen.getByTestId('field_passwordConfirm')).toHaveTextContent(
      'Confirm your password'
    )
  })

  it('submits', async () => {
    const mockSubmit = jest.fn()

    renderWithProviders(
      <CreateAccountForm
        defaultValues={null}
        backUrl="/back"
        onFormSubmit={(data) => mockSubmit(data)}
      />
    )

    const button = screen.getByRole('button', { name: /Continue/i })
    const emailField1 = screen.getByTestId('textfield_email')
    const emailField2 = screen.getByTestId('textfield_emailConfirm')
    const passwordField1 = screen.getByTestId('textfield_password')
    const passwordField2 = screen.getByTestId('textfield_passwordConfirm')

    await userEvent.type(emailField1, email)
    await userEvent.type(emailField2, email)
    await userEvent.type(passwordField1, password)
    await userEvent.type(passwordField2, password)
    await userEvent.click(screen.getByTestId('privacy-checkbox'))

    await userEvent.click(button)

    await waitFor(async () => {
      expect(mockSubmit).toHaveBeenCalledWith({
        email,
        emailConfirm: email,
        password,
        passwordConfirm: password,
        privacy_policy_agreement: true
      })
    })
  })

  it('Shows an api driven error message', async () => {
    const error = 'message from server'
    fetchMock.mockResponseOnce(JSON.stringify({ detail: error }), {
      status: 400
    })

    renderWithProviders(
      <CreateAccountForm defaultValues={null} backUrl="/back" onFormSubmit={jest.fn()} />
    )

    const button = screen.getByRole('button', { name: /Continue/i })
    const emailField1 = screen.getByTestId('textfield_email')
    const emailField2 = screen.getByTestId('textfield_emailConfirm')
    const passwordField1 = screen.getByTestId('textfield_password')
    const passwordField2 = screen.getByTestId('textfield_passwordConfirm')

    await userEvent.type(emailField1, email)
    await userEvent.type(emailField2, email)
    await userEvent.type(passwordField1, password)
    await userEvent.type(passwordField2, password)
    await userEvent.click(screen.getByTestId('privacy-checkbox'))

    await userEvent.click(button)

    await waitFor(async () => {
      expect(() => {
        screen.getByText(`Error: ${error}`)
      }).toThrow(`Error: ${error}`)
    })
  })
})
