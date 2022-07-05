import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegistrationPage3 from '@/pages/register/page3'

describe('Page: Registration 3', () => {
  it.only('renders', () => {
    render(<RegistrationPage3 />)

    expect(screen.getByRole('button', { name: /Continue/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Email address' })).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: 'Confirm your email address' })
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm your password')).toBeInTheDocument()
  })
  it.only('shows default errors', async () => {
    render(<RegistrationPage3 />)

    const button = screen.getByRole('button', { name: /Continue/i })
    userEvent.click(button)

    await waitFor(async () => {
      expect(screen.getByText('email is a required field')).toBeInTheDocument()
    })

    expect(screen.getAllByText('this is a required field')).toHaveLength(2)
    expect(screen.getByText('password must be at least 8 characters')).toBeInTheDocument()
  })

  it('validates fields match', async () => {
    render(<RegistrationPage3 />)

    const text = 'nonmatch@test.com'

    const button = screen.getByRole('button', { name: /Continue/i })
    const emailField1 = screen.getByLabelText('Email address')
    const emailField2 = screen.getByLabelText('Confirm your email address')
    const passwordField1 = screen.getByLabelText('Password')
    const passwordField2 = screen.getByLabelText('Confirm your password')

    userEvent.type(emailField1, text)
    userEvent.type(emailField2, text + '1')
    userEvent.type(passwordField1, text)
    userEvent.type(passwordField2, text + '1')

    userEvent.click(button)

    await waitFor(async () => {
      expect(screen.getByText('Does not match with email')).toBeInTheDocument()
    })

    expect(screen.getAllByText('Does not match with password')).toHaveLength(2)
  })

  it.skip('submits', async () => {
    //tobe decided
  })
})
