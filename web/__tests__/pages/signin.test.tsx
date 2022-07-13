import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SigninPage from '@/pages/signin'
import { renderWithProviders } from '@/lib/test-utils'

import fetchMock from 'jest-fetch-mock'

describe('Page: Sign in', () => {
  it('renders', () => {
    renderWithProviders(<SigninPage />)

    expect(screen.getByRole('button', { name: /Continue/i })).toBeInTheDocument()
    expect(screen.getByTestId('textfield_email')).toBeInTheDocument()
    expect(screen.getByTestId('textfield_password')).toBeInTheDocument()
  })

  it('submits', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ expiry: '1', token: '1' }), {
      status: 200
    })

    renderWithProviders(<SigninPage />)
    const button = screen.getByRole('button', { name: /Continue/i })
    const inputEmail = screen.getByTestId('textfield_email')
    const inputPassword = screen.getByTestId('textfield_password')
    userEvent.type(inputEmail, 'test@test.com')
    userEvent.type(inputPassword, 'mypassword123')

    userEvent.click(button)
    //TODO: spy on router push
  })
})
