import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SigninPage from '@/pages/signin'
import { renderWithProviders } from '@/lib/test-utils'
import router from 'next/router'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('Page: Sign in', () => {
  it('renders', () => {
    renderWithProviders(<SigninPage />)

    expect(screen.getByRole('button', { name: /Continue/i })).toBeInTheDocument()
    expect(screen.getByTestId('textfield_email')).toBeInTheDocument()
    expect(screen.getByTestId('textfield_password')).toBeInTheDocument()
  })

  it('submits', async () => {
    // const spy = jest.spyOn('next/router', 'push')
    // const useRouter = jest.spyOn(router, 'useRouter')
    useRouter.mockImplementationOnce(() => ({
      push: { product: 'coffee' }
    }))

    renderWithProviders(<SigninPage />)
    const button = screen.getByRole('button', { name: /Continue/i })
    const inputEmail = screen.getByTestId('textfield_email')
    const inputPassword = screen.getByTestId('textfield_password')
    userEvent.type(inputEmail, 'test@test.com')
    userEvent.type(inputPassword, 'mypassword')

    userEvent.click(button)

    await waitFor(async () => {
      expect(useRouter).toHaveBeenCalled()
    })

    // console.log({ mockPush })
  })

  // it('shows default errors', async () => {
  //   render(<SigninPage />)

  //   const button = screen.getByRole('button', { name: /Continue/i })
  //   userEvent.click(button)

  //   await waitFor(async () => {
  //     expect(screen.getByText('email is a required field')).toBeInTheDocument()
  //   })

  //   expect(screen.getAllByText('this is a required field')).toHaveLength(2)
  //   expect(screen.getByText('password must be at least 8 characters')).toBeInTheDocument()
  // })

  // it('validates fields match', async () => {
  //   render(<SigninPage />)

  //   const text = 'nonmatch@test.com'

  //   const button = screen.getByRole('button', { name: /Continue/i })
  //   const emailField1 = screen.getByLabelText('Email address')
  //   const emailField2 = screen.getByLabelText('Confirm your email address')
  //   const passwordField1 = screen.getByLabelText('Password')
  //   const passwordField2 = screen.getByLabelText('Confirm your password')

  //   userEvent.type(emailField1, text)
  //   userEvent.type(emailField2, text + '1')
  //   userEvent.type(passwordField1, text)
  //   userEvent.type(passwordField2, text + '1')

  //   userEvent.click(button)

  //   await waitFor(async () => {
  //     expect(screen.getByText('Does not match with email')).toBeInTheDocument()
  //   })

  //   expect(screen.getAllByText('Does not match with password')).toHaveLength(2)
  // })

  it.skip('submits', async () => {
    //tobe decided
  })
})
