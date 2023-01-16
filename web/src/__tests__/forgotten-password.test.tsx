import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ForgottenPasswordPage from '@/pages/signin/forgotten-password/index'
import fetchMock from 'jest-fetch-mock'
import { Props } from '@/components/Form/ForgottenPasswordForm/types'
import { renderWithProviders } from '@/lib/test-utils'

const pushSpy = jest.fn()
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(() => ({
    locale: 'en',
    push: pushSpy
  }))
}))

jest.mock(
  '@/components/Form/ForgottenPasswordForm/ForgottenPasswordForm',
  () => (props: Props) =>
    (
      <button
        data-testid="mock-form-button"
        onClick={() => props.onFormSubmit({ email: 'test@test.com' })}
      />
    )
)

describe('Page: Reset Password', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('redirects on success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), {
      status: 200
    })
    renderWithProviders(<ForgottenPasswordPage />)

    const submitButton = screen.getByTestId('mock-form-button')

    expect(submitButton).toBeVisible()

    userEvent.click(submitButton)

    await waitFor(async () =>
      expect(pushSpy).toHaveBeenCalledWith(
        expect.objectContaining({ pathname: '/signin/forgotten-password/next' })
      )
    )
  })

  it('shows server error', async () => {
    const error = 'message from server'
    fetchMock.mockResponseOnce(JSON.stringify({ detail: error }), {
      status: 400
    })
    renderWithProviders(<ForgottenPasswordPage />)
    const submitButton = screen.getByTestId('mock-form-button')
    userEvent.click(submitButton)

    await waitFor(async () => {
      expect(() => {
        screen.getByText(`Error: ${error}`)
      }).toThrow(`Error: ${error}`)
    })

    expect(pushSpy).not.toHaveBeenCalled()
  })

  it('shows default error', async () => {
    const error = 'Error: Sorry, there is a problem with the service. Try again later.'
    fetchMock.mockResponseOnce(JSON.stringify('broken message'), {
      status: 400
    })
    renderWithProviders(<ForgottenPasswordPage />)
    const submitButton = screen.getByTestId('mock-form-button')
    userEvent.click(submitButton)

    await waitFor(async () => {
      expect(() => {
        screen.getByText(error)
      }).toThrow(error)
    })

    expect(pushSpy).not.toHaveBeenCalled()
  })
})
