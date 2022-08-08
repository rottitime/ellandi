import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FeedbackPage from '@/pages/feedback'
import fetchMock from 'jest-fetch-mock'
import { Props } from '@/components/Form/FeedbackForm/types'
import { renderWithProviders } from '@/lib/test-utils'

const mockError = jest.fn()
jest.mock('@/context/UiContext', () => ({
  ...jest.requireActual('@/context/UiContext'),
  useUiContext: () => {
    return {
      setError: mockError
    }
  }
}))

jest.mock('@/components/Form/FeedbackForm/FeedbackForm', () => (props: Props) => (
  <button
    data-testid="mock-form-button"
    onClick={() => {
      props.onFormSubmit({ email: 'test@test.com', name: 'abc def', issue: 'Great site' })
    }}
  />
))

describe('Page: Sign in', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('redirects on success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }), {
      status: 200
    })
    renderWithProviders(<FeedbackPage />)

    const submitButton = screen.getByTestId('mock-form-button')

    expect(submitButton).toBeVisible()

    await userEvent.click(submitButton)

    await waitFor(async () => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument()
    })
  })

  it('shows server error', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ detail: 'message from server' }), {
      status: 404
    })
    renderWithProviders(<FeedbackPage />)
    const submitButton = screen.getByTestId('mock-form-button')
    await userEvent.click(submitButton)
    await waitFor(async () => {
      expect(mockError).toHaveBeenCalledWith(
        'Sorry, there is a problem with the service. Try again later.'
      )
    })
  })
})
