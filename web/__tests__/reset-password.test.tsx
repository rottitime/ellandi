import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ResetPasswordPage from '@/pages/signin/forgotten-password/reset'
import fetchMock from 'jest-fetch-mock'
import Router from 'next/router'
import { Props } from '@/components/Form/ResetPasswordForm/types'
import { renderWithProviders } from '@/lib/test-utils'

const mockRouter = jest.fn(() => ({ query: { code: 'mycode', user_id: 'abc123' } }))

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  push: jest.fn(),
  useRouter: () => mockRouter()
}))

jest.mock(
  '@/components/Form/ResetPasswordForm/ResetPasswordForm',
  () => (props: Props) =>
    (
      <button
        data-testid="mock-form-button"
        onClick={() =>
          props.onFormSubmit({
            new_password,
            new_password_confirm: new_password
          })
        }
      />
    )
)

const new_password = 'MyPassword123'

describe('Page: Reset Password', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  describe('On submit', () => {
    it('redirects on success', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}), {
        status: 200
      })
      renderWithProviders(<ResetPasswordPage />)

      const submitButton = screen.getByTestId('mock-form-button')

      expect(submitButton).toBeVisible()

      userEvent.click(submitButton)

      await waitFor(async () => {
        expect(Router.push).toHaveBeenCalledWith('/signin/forgotten-password/complete')
      })
    })

    it('shows server error', async () => {
      const error = 'message from server'
      fetchMock.mockResponseOnce(JSON.stringify({ detail: error }), {
        status: 400
      })
      renderWithProviders(<ResetPasswordPage />)
      const submitButton = screen.getByTestId('mock-form-button')
      userEvent.click(submitButton)

      await waitFor(async () => {
        expect(() => {
          screen.getByText(`Error: ${error}`)
        }).toThrow(`Error: ${error}`)
      })

      expect(Router.push).not.toHaveBeenCalled()
    })

    it('shows default error', async () => {
      const error = 'Error: Sorry, there is a problem with the service. Try again later.'
      fetchMock.mockResponseOnce(JSON.stringify('broken message'), {
        status: 400
      })
      renderWithProviders(<ResetPasswordPage />)
      const submitButton = screen.getByTestId('mock-form-button')
      userEvent.click(submitButton)

      await waitFor(async () => {
        expect(() => {
          screen.getByText(error)
        }).toThrow(error)
      })

      expect(Router.push).not.toHaveBeenCalled()
    })
  })
})
