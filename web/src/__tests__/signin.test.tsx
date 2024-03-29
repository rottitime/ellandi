import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SigninPage from '@/pages/signin'
import fetchMock from 'jest-fetch-mock'
import { Props } from '@/components/Form/SignInForm/types'
import { renderWithProviders } from '@/lib/test-utils'

const pushSpy = jest.fn()
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(() => ({
    locale: 'en',
    push: pushSpy
  }))
}))

jest.mock('@/components/Form/SignInForm/SignInForm', () => (props: Props) => (
  <button
    data-testid="mock-form-button"
    onClick={() => {
      props.onFormSubmit({ email: 'test@test.com', password: 'test123' })
    }}
  />
))

describe('Page: Sign in', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('redirects on success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ expiry: '1', token: '1' }), {
      status: 200
    })
    renderWithProviders(<SigninPage />)

    const submitButton = screen.getByTestId('mock-form-button')

    expect(submitButton).toBeVisible()

    userEvent.click(submitButton)

    await waitFor(async () =>
      expect(pushSpy).toHaveBeenCalledWith(
        expect.objectContaining({ pathname: 'landingSignin' })
      )
    )
  })

  it('shows server error', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ detail: 'message from server' }), {
      status: 400
    })
    renderWithProviders(<SigninPage />)
    const submitButton = screen.getByTestId('mock-form-button')
    userEvent.click(submitButton)

    await waitFor(async () => {
      expect(screen.getByText('Error: message from server')).toBeInTheDocument()
    })

    expect(pushSpy).not.toHaveBeenCalled()
  })
})
