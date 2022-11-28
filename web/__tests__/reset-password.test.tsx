import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ResetPasswordPage from '@/pages/signin/forgotten-password/reset'
import fetchMock from 'jest-fetch-mock'
import Router from 'next/router'
import { Props } from '@/components/Form/ResetPasswordForm/types'
import { renderWithProviders } from '@/lib/test-utils'
import { ValidUserToken } from '@/service/types'

const mockRouter = jest.fn()

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

const mockSuccess: ValidUserToken = { valid: true }
const mockError: ValidUserToken = { valid: false }

describe('Page: Reset Password', () => {
  beforeEach(() => {
    mockRouter.mockImplementation(() => ({
      query: { code: 'mycode', user_id: 'abc123' }
    }))
  })
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('valid user: renders after loading state', async () => {
    fetchMock.mockResponse(JSON.stringify(mockSuccess), { status: 200 })
    renderWithProviders(<ResetPasswordPage />)

    await waitForElementToBeRemoved(() => screen.queryByTestId('skeleton-content'))

    expect(screen.getByTestId('reset-password-success-content')).toBeInTheDocument()
  })

  it('invalid user: redirects with error code', async () => {
    fetchMock.mockResponse(JSON.stringify(mockError), { status: 200 })
    renderWithProviders(<ResetPasswordPage />)

    await waitFor(async () => {
      expect(Router.push).toHaveBeenCalledWith({
        pathname: 'signin',
        query: { ecode: 4 }
      })
    })
  })

  it('missign query paramters', async () => {
    mockRouter.mockImplementation(() => ({ query: {}, isReady: true }))
    fetchMock.mockResponse(JSON.stringify(mockSuccess), { status: 200 })
    renderWithProviders(<ResetPasswordPage />)

    await waitFor(async () => {
      expect(Router.push).toHaveBeenCalledWith({
        pathname: 'signin',
        query: { ecode: 4 }
      })
    })
  })

  describe('On submit', () => {
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(mockSuccess), { status: 200 })
    })

    it('redirects on success', async () => {
      renderWithProviders(<ResetPasswordPage />)

      await waitFor(async () =>
        expect(screen.getByTestId('reset-password-success-content')).toBeVisible()
      )

      fetchMock.mockResponseOnce(JSON.stringify({}), {
        status: 200
      })

      const submitButton = screen.getByTestId('mock-form-button')

      expect(submitButton).toBeVisible()

      userEvent.click(submitButton)

      await waitFor(async () => {
        expect(Router.push).toHaveBeenCalledWith('/signin/forgotten-password/complete')
      })
    })

    it('shows server error', async () => {
      const error = 'message from server'
      renderWithProviders(<ResetPasswordPage />)

      await waitFor(async () =>
        expect(screen.getByTestId('reset-password-success-content')).toBeVisible()
      )

      fetchMock.mockResponseOnce(JSON.stringify({ detail: error }), {
        status: 400
      })
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
      renderWithProviders(<ResetPasswordPage />)

      await waitFor(async () =>
        expect(screen.getByTestId('reset-password-success-content')).toBeVisible()
      )

      fetchMock.mockResponseOnce(JSON.stringify('broken message'), {
        status: 400
      })
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
