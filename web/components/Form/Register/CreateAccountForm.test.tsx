import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/lib/test-utils'
import CreateAccountForm from '@/components/Form/Register/CreateAccountForm'

describe.skip('CreateAccountForm', () => {
  it('renders', () => {
    renderWithProviders(<CreateAccountForm backUrl="/back" onFormSubmit={jest.fn()} />)

    expect(screen.getByRole('button', { name: /Continue/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Email address' })).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: 'Confirm your email address' })
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm your password')).toBeInTheDocument()
  })
  it('shows default errors', async () => {
    renderWithProviders(<CreateAccountForm backUrl="/back" onFormSubmit={jest.fn()} />)

    const button = screen.getByRole('button', { name: /Continue/i })
    expect(button).toBeInTheDocument()

    userEvent.click(button)

    await waitFor(async () => {
      //expect(screen.getByTestId('errorhelper-email')).toBeInTheDocument()
      expect(screen.getByTestId('errorhelper-email')).toBeInTheDocument()
      //expect(screen.getAllByText('This is a required field')).toHaveLength(4)
    })

    // expect(screen.getAllByText('this is a required field')).toHaveLength(2)
    // expect(screen.getByText('password must be at least 8 characters')).toBeInTheDocument()
  })

  it('validates fields match', async () => {
    renderWithProviders(<CreateAccountForm />)

    const text = 'nonmatch@test.com'

    const button = screen.getByRole('button', { name: /Continue/i })
    const emailField1 = screen.getByTestId('textfield_email')
    const emailField2 = screen.getByTestId('textfield_emailConfirm')
    const passwordField1 = screen.getByTestId('textfield_password')
    const passwordField2 = screen.getByTestId('textfield_passwordConfirm')

    userEvent.type(emailField1, text)
    userEvent.type(emailField2, text + '1')
    userEvent.type(passwordField1, text)
    userEvent.type(passwordField2, text + '1')

    userEvent.click(button)

    await waitFor(async () => {
      expect(screen.getByText('Does not match email')).toBeInTheDocument()
    })

    // expect(screen.getAllByText('Does not match with password')).toHaveLength(2)
  })

  it.skip('submits', async () => {
    //tobe decided
  })
})
